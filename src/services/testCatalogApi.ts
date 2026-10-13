export interface TestCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  display_order: number;
  test_count?: number;
}

export interface CatalogTestSummary {
  id: string;
  slug: string;
  name: string;
  abbreviation: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  category_icon?: string;
  short_description: string;
  what_it_measures?: string;
  supported_by_parser: number;
  aliases: string[];
  units: string[];
}

export interface MedicalSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publication_date: string;
  accessed_at: string;
  source_type: string;
}

export interface IllustrativeRange {
  id: string;
  test_id: string;
  source_identifier: string;
  lower_bound: number | null;
  upper_bound: number | null;
  unit: string;
  context: string;
  citation: string;
  is_illustrative: number;
}

export interface CatalogTestDetail extends CatalogTestSummary {
  why_it_is_ordered: string;
  interpretation_limitations: string;
  factors_affecting_result: string;
  common_questions: string[];
  sources: MedicalSource[];
  illustrative_reference_ranges: IllustrativeRange[];
  related_tests: Array<{
    id: string;
    slug: string;
    name: string;
    abbreviation: string;
    short_description: string;
  }>;
}

export interface EducationalArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  read_time: string;
  source_metadata: string;
  review_status: string;
  reviewed_at: string;
  updated_at: string;
}

export async function fetchCategories(): Promise<TestCategory[]> {
  try {
    const res = await fetch('/api/categories');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.categories || [];
  } catch (err) {
    console.warn('[API] Fetch categories fallback:', err);
    return [];
  }
}

export async function fetchTests(params?: {
  q?: string;
  category?: string;
  supported_only?: boolean;
}): Promise<CatalogTestSummary[]> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.set('q', params.q);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.supported_only) searchParams.set('supported_only', 'true');

    const res = await fetch(`/api/tests?${searchParams.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.tests || [];
  } catch (err) {
    console.warn('[API] Fetch tests fallback:', err);
    return [];
  }
}

export async function fetchTestBySlug(slug: string): Promise<CatalogTestDetail | null> {
  try {
    const res = await fetch(`/api/tests/${slug}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.test || null;
  } catch (err) {
    console.warn('[API] Fetch test detail fallback:', err);
    return null;
  }
}

export async function fetchArticles(): Promise<EducationalArticle[]> {
  try {
    const res = await fetch('/api/articles');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.articles || [];
  } catch (err) {
    console.warn('[API] Fetch articles fallback:', err);
    return [];
  }
}

export async function fetchArticleBySlug(slug: string): Promise<EducationalArticle | null> {
  try {
    const res = await fetch(`/api/articles/${slug}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.article || null;
  } catch (err) {
    console.warn('[API] Fetch article detail fallback:', err);
    return null;
  }
}
