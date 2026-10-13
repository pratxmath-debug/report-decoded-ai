import express from 'express';
import cors from 'cors';
import { db } from './db.mjs';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`[API] ${req.method} ${req.url} - ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  try {
    const testCountRow = db.prepare('SELECT COUNT(*) as count FROM test_catalog').get();
    const articleCountRow = db.prepare('SELECT COUNT(*) as count FROM educational_articles').get();
    res.json({
      status: 'ok',
      service: 'Spark Decoded Medical Knowledge API',
      version: '3.0.0',
      database: 'SQLite (node:sqlite DatabaseSync)',
      tests_count: testCountRow?.count || 0,
      articles_count: articleCountRow?.count || 0,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Categories list
app.get('/api/categories', (req, res) => {
  try {
    const categories = db.prepare(`
      SELECT 
        c.id, c.slug, c.name, c.description, c.icon, c.display_order,
        COUNT(t.id) as test_count
      FROM test_categories c
      LEFT JOIN test_catalog t ON t.category_id = c.id
      GROUP BY c.id
      ORDER BY c.display_order ASC
    `).all();

    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve categories', details: err.message });
  }
});

// Search tests specifically
app.get('/api/tests/search', (req, res) => {
  try {
    const query = (req.query.q || '').toString().trim().toLowerCase();
    if (!query) {
      return res.json({ tests: [] });
    }

    const matchingTests = db.prepare(`
      SELECT DISTINCT
        t.id, t.slug, t.name, t.abbreviation, t.category_id,
        t.short_description, t.supported_by_parser,
        c.name as category_name, c.slug as category_slug
      FROM test_catalog t
      JOIN test_categories c ON c.id = t.category_id
      LEFT JOIN test_aliases a ON a.test_id = t.id
      WHERE 
        LOWER(t.name) LIKE '%' || ? || '%' OR
        LOWER(t.abbreviation) LIKE '%' || ? || '%' OR
        LOWER(t.short_description) LIKE '%' || ? || '%' OR
        LOWER(a.alias) LIKE '%' || ? || '%' OR
        LOWER(c.name) LIKE '%' || ? || '%'
      LIMIT 20
    `).all(query, query, query, query, query);

    res.json({ query, count: matchingTests.length, tests: matchingTests });
  } catch (err) {
    res.status(500).json({ error: 'Failed to search tests', details: err.message });
  }
});

// Tests list with filtering and search
app.get('/api/tests', (req, res) => {
  try {
    const query = (req.query.q || '').toString().trim().toLowerCase();
    const categorySlug = (req.query.category || '').toString().trim();
    const supportedOnly = req.query.supported_only === 'true';

    let sql = `
      SELECT DISTINCT
        t.id, t.slug, t.name, t.abbreviation, t.category_id,
        t.short_description, t.what_it_measures, t.supported_by_parser,
        t.created_at, t.updated_at,
        c.name as category_name, c.slug as category_slug, c.icon as category_icon
      FROM test_catalog t
      JOIN test_categories c ON c.id = t.category_id
      LEFT JOIN test_aliases a ON a.test_id = t.id
      WHERE 1=1
    `;

    const params = [];

    if (categorySlug) {
      sql += ` AND c.slug = ? `;
      params.push(categorySlug);
    }

    if (supportedOnly) {
      sql += ` AND t.supported_by_parser = 1 `;
    }

    if (query) {
      sql += ` AND (
        LOWER(t.name) LIKE '%' || ? || '%' OR
        LOWER(t.abbreviation) LIKE '%' || ? || '%' OR
        LOWER(t.short_description) LIKE '%' || ? || '%' OR
        LOWER(a.alias) LIKE '%' || ? || '%' OR
        LOWER(c.name) LIKE '%' || ? || '%'
      ) `;
      params.push(query, query, query, query, query);
    }

    sql += ` ORDER BY c.display_order ASC, t.name ASC `;

    const tests = db.prepare(sql).all(...params);

    // Attach units and aliases to each test in list
    const testsWithDetails = tests.map(test => {
      const aliases = db.prepare('SELECT alias FROM test_aliases WHERE test_id = ?').all(test.id).map(r => r.alias);
      const units = db.prepare('SELECT unit FROM test_units WHERE test_id = ?').all(test.id).map(r => r.unit);
      return {
        ...test,
        aliases,
        units
      };
    });

    res.json({
      total: testsWithDetails.length,
      category: categorySlug || null,
      tests: testsWithDetails
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve test catalog', details: err.message });
  }
});

// Single test detail by slug
app.get('/api/tests/:slug', (req, res) => {
  try {
    const slug = req.params.slug;
    const test = db.prepare(`
      SELECT 
        t.*,
        c.name as category_name,
        c.slug as category_slug,
        c.icon as category_icon
      FROM test_catalog t
      JOIN test_categories c ON c.id = t.category_id
      WHERE t.slug = ?
    `).get(slug);

    if (!test) {
      return res.status(404).json({ error: 'Test not found', slug });
    }

    // Parse JSON common_questions
    let commonQuestions = [];
    try {
      commonQuestions = test.common_questions ? JSON.parse(test.common_questions) : [];
    } catch {
      commonQuestions = [];
    }

    // Get aliases
    const aliases = db.prepare(`
      SELECT alias, alias_type FROM test_aliases WHERE test_id = ?
    `).all(test.id);

    // Get units
    const units = db.prepare(`
      SELECT unit, unit_description, is_supported_for_comparison FROM test_units WHERE test_id = ?
    `).all(test.id);

    // Get accredited medical sources
    const sources = db.prepare(`
      SELECT s.*
      FROM medical_sources s
      JOIN test_source_links l ON l.source_id = s.id
      WHERE l.test_id = ?
    `).all(test.id);

    // Get illustrative reference range benchmarks
    const referenceRanges = db.prepare(`
      SELECT * FROM test_reference_ranges WHERE test_id = ?
    `).all(test.id);

    // Get related tests from same category
    const relatedTests = db.prepare(`
      SELECT id, slug, name, abbreviation, short_description
      FROM test_catalog
      WHERE category_id = ? AND id != ?
      LIMIT 4
    `).all(test.category_id, test.id);

    res.json({
      test: {
        ...test,
        common_questions: commonQuestions,
        aliases,
        units,
        sources,
        illustrative_reference_ranges: referenceRanges,
        related_tests: relatedTests
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve test detail', details: err.message });
  }
});

// Educational articles list
app.get('/api/articles', (req, res) => {
  try {
    const articles = db.prepare(`
      SELECT id, slug, title, summary, category, read_time, source_metadata, review_status, reviewed_at, updated_at
      FROM educational_articles
      ORDER BY id ASC
    `).all();

    res.json({ articles });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve articles', details: err.message });
  }
});

// Single educational article by slug
app.get('/api/articles/:slug', (req, res) => {
  try {
    const article = db.prepare(`
      SELECT * FROM educational_articles WHERE slug = ?
    `).get(req.params.slug);

    if (!article) {
      return res.status(404).json({ error: 'Article not found', slug: req.params.slug });
    }

    res.json({ article });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve article', details: err.message });
  }
});

// Sources catalog
app.get('/api/sources', (req, res) => {
  try {
    const sources = db.prepare(`
      SELECT s.*, COUNT(l.test_id) as linked_test_count
      FROM medical_sources s
      LEFT JOIN test_source_links l ON l.source_id = s.id
      GROUP BY s.id
      ORDER BY s.title ASC
    `).all();

    res.json({ sources });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve sources', details: err.message });
  }
});

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('[API Error]', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

if (process.argv[1] && process.argv[1].endsWith('index.mjs')) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Spark Decoded 3.0 Backend API listening on http://0.0.0.0:${PORT}`);
  });
}

export default app;
