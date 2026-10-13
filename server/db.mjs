import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = join(__dirname, 'data');
mkdirSync(dataDir, { recursive: true });

const dbPath = join(dataDir, 'spark_decoded.sqlite');
export const db = new DatabaseSync(dbPath);

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

export function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS test_categories (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      display_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS test_catalog (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      abbreviation TEXT,
      category_id TEXT NOT NULL,
      short_description TEXT NOT NULL,
      what_it_measures TEXT NOT NULL,
      why_it_is_ordered TEXT NOT NULL,
      interpretation_limitations TEXT NOT NULL,
      factors_affecting_result TEXT,
      common_questions TEXT, -- JSON array string
      supported_by_parser INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES test_categories(id)
    );

    CREATE TABLE IF NOT EXISTS test_aliases (
      id TEXT PRIMARY KEY,
      test_id TEXT NOT NULL,
      alias TEXT NOT NULL,
      alias_type TEXT NOT NULL DEFAULT 'synonym', -- synonym, abbreviation, lab_code, common_name
      FOREIGN KEY (test_id) REFERENCES test_catalog(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS test_units (
      id TEXT PRIMARY KEY,
      test_id TEXT NOT NULL,
      unit TEXT NOT NULL,
      unit_description TEXT,
      is_supported_for_comparison INTEGER DEFAULT 1,
      FOREIGN KEY (test_id) REFERENCES test_catalog(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS medical_sources (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      publisher TEXT NOT NULL,
      url TEXT,
      publication_date TEXT,
      accessed_at TEXT,
      source_type TEXT NOT NULL DEFAULT 'clinical_guideline' -- clinical_guideline, laboratory_reference, academic_journal, health_agency
    );

    CREATE TABLE IF NOT EXISTS test_source_links (
      test_id TEXT NOT NULL,
      source_id TEXT NOT NULL,
      PRIMARY KEY (test_id, source_id),
      FOREIGN KEY (test_id) REFERENCES test_catalog(id) ON DELETE CASCADE,
      FOREIGN KEY (source_id) REFERENCES medical_sources(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS test_reference_ranges (
      id TEXT PRIMARY KEY,
      test_id TEXT NOT NULL,
      source_identifier TEXT NOT NULL,
      lower_bound REAL,
      upper_bound REAL,
      unit TEXT NOT NULL,
      context TEXT,
      citation TEXT,
      is_illustrative INTEGER DEFAULT 1,
      FOREIGN KEY (test_id) REFERENCES test_catalog(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS educational_articles (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      body TEXT NOT NULL,
      category TEXT NOT NULL,
      read_time TEXT DEFAULT '4 min read',
      source_metadata TEXT,
      review_status TEXT DEFAULT 'VERIFIED_EDUCATIONAL',
      reviewed_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS content_versions (
      id TEXT PRIMARY KEY,
      content_type TEXT NOT NULL,
      content_id TEXT NOT NULL,
      version INTEGER NOT NULL DEFAULT 1,
      reviewed_by TEXT NOT NULL,
      review_notes TEXT,
      reviewed_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_tests_category ON test_catalog(category_id);
    CREATE INDEX IF NOT EXISTS idx_tests_slug ON test_catalog(slug);
    CREATE INDEX IF NOT EXISTS idx_aliases_test ON test_aliases(test_id);
    CREATE INDEX IF NOT EXISTS idx_aliases_text ON test_aliases(alias);
  `);
}

// Auto-run schema setup on import
initSchema();
