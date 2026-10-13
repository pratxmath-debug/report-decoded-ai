import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  ExternalLink, 
  X, 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Clock,
  Droplets,
  Heart,
  Shield,
  Zap,
  Sun,
  Flame,
  ChevronRight,
  Database
} from 'lucide-react';
import { IllustratedPageBackground } from '../components/illustrations/IllustratedPageBackground';
import { 
  fetchCategories, 
  fetchTests, 
  fetchTestBySlug,
  TestCategory, 
  CatalogTestSummary, 
  CatalogTestDetail 
} from '../services/testCatalogApi';

interface TestsExplorerPageProps {
  onDecodeReport: () => void;
}

export const TestsExplorerPage: React.FC<TestsExplorerPageProps> = ({
  onDecodeReport
}) => {
  const [categories, setCategories] = useState<TestCategory[]>([]);
  const [tests, setTests] = useState<CatalogTestSummary[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Selected test for modal detail view
  const [activeTestSlug, setActiveTestSlug] = useState<string | null>(null);
  const [activeTestDetail, setActiveTestDetail] = useState<CatalogTestDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  // Load categories and initial test list from database
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [cats, testList] = await Promise.all([
          fetchCategories(),
          fetchTests()
        ]);
        setCategories(cats);
        setTests(testList);
      } catch (err) {
        console.error('Failed to load catalog:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // When activeTestSlug changes, fetch full detail from DB
  useEffect(() => {
    if (!activeTestSlug) {
      setActiveTestDetail(null);
      return;
    }

    async function loadDetail() {
      setIsLoadingDetail(true);
      try {
        const detail = await fetchTestBySlug(activeTestSlug!);
        setActiveTestDetail(detail);
      } catch (err) {
        console.error('Failed to load test detail:', err);
      } finally {
        setIsLoadingDetail(false);
      }
    }
    loadDetail();
  }, [activeTestSlug]);

  // Alphabet letter list
  const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  // Client-side filtering across loaded DB results
  const filteredTests = useMemo(() => {
    return tests.filter((t) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || t.category_slug === selectedCategory;

      // Letter filter
      const matchesLetter =
        selectedLetter === 'ALL' ||
        t.name.toUpperCase().startsWith(selectedLetter);

      // Search query filter (matches name, abbreviation, aliases, description, category)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.abbreviation.toLowerCase().includes(q) ||
        t.short_description.toLowerCase().includes(q) ||
        t.category_name.toLowerCase().includes(q) ||
        (t.aliases && t.aliases.some((a) => a.toLowerCase().includes(q)));

      return matchesCategory && matchesLetter && matchesSearch;
    });
  }, [tests, selectedCategory, selectedLetter, searchQuery]);

  return (
    <IllustratedPageBackground className="min-h-screen pb-20">
      
      {/* Header */}
      <section className="pt-12 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5F3ED] border border-[#A8C8BA] text-[#124E4A] text-xs font-bold mb-4 shadow-2xs">
          <Database className="w-3.5 h-3.5 text-[#287F78]" />
          <span>NATIVE SQLITE DATABASE • ACCREDITED MEDICAL REPOSITORY</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#124E4A] tracking-tight leading-tight max-w-3xl mx-auto">
          Medical Laboratory Test{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#124E4A] to-[#287F78]">
            Knowledge Catalog
          </span>
        </h1>

        <p className="mt-4 text-base text-[#667773] max-w-2xl mx-auto leading-relaxed">
          Explore what tests measure, why healthcare providers order them, factors that alter results, and what questions to ask your physician.
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by test name, abbreviation (HbA1c, ALT, TSH), or category..."
            className="w-full pl-12 pr-10 py-4 text-sm rounded-2xl bg-white border border-slate-200/90 shadow-glass focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* Categories Horizontal Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#124E4A] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Categories ({tests.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.slug
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{cat.name}</span>
              {cat.test_count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.slug ? 'bg-teal-950 text-teal-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.test_count}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Alphabetical Browser Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-1 overflow-x-auto py-1 px-2 bg-white/80 rounded-xl border border-slate-200/80 shadow-2xs text-[11px] font-bold scrollbar-none">
          <span className="text-slate-400 mr-2 shrink-0">Browse A–Z:</span>
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-2 py-1 rounded-md transition-all shrink-0 cursor-pointer ${
                selectedLetter === letter
                  ? 'bg-teal-700 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </section>

      {/* Test Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-glass">
            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">Connecting to Medical Knowledge Database...</p>
          </div>
        ) : filteredTests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 p-8 shadow-2xs">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No tests match your filter criteria.</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching for common terms like "glucose", "alt", "cholesterol", or click "All Categories".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLetter('ALL');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 hover:bg-teal-100 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveTestSlug(t.slug)}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-glass hover:shadow-glass-hover hover:border-teal-300/80 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {t.category_name}
                    </span>
                    {t.supported_by_parser ? (
                      <span className="text-[10px] font-bold text-teal-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-teal-600" />
                        <span>OCR Parser Active</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Educational Catalog</span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-[#071426] tracking-tight group-hover:text-teal-800 transition-colors">
                    {t.name}
                  </h3>

                  {t.abbreviation && t.abbreviation !== t.name && (
                    <span className="text-xs font-bold text-cyan-700 block mt-0.5">
                      Abbr: {t.abbreviation}
                    </span>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                    {t.short_description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    {t.units && t.units.length > 0 && (
                      <span>Units: <strong>{t.units.join(', ')}</strong></span>
                    )}
                  </div>
                  <span className="text-teal-700 font-bold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* DETAIL MODAL / DRAWER */}
      {activeTestSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto flex flex-col animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    Clinical Knowledge Entry
                  </span>
                  {activeTestDetail && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {activeTestDetail.category_name}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-black text-[#071426] tracking-tight">
                  {activeTestDetail?.name || 'Loading Test Details...'}
                </h2>
                {activeTestDetail?.abbreviation && (
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Common Clinical Abbreviation: <strong>{activeTestDetail.abbreviation}</strong>
                  </p>
                )}
              </div>

              <button
                onClick={() => setActiveTestSlug(null)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            {isLoadingDetail || !activeTestDetail ? (
              <div className="py-16 text-center">
                <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-bold">Retrieving structured test records...</p>
              </div>
            ) : (
              <div className="space-y-6 pt-5">
                
                {/* Section 1: What It Measures */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                    <span>What This Test Measures</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {activeTestDetail.what_it_measures}
                  </p>
                </div>

                {/* Section 2: Why Healthcare Teams Order It */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-800 mb-1.5 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Why Clinicians Order It</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {activeTestDetail.why_it_is_ordered}
                  </p>
                </div>

                {/* Section 3: Interpretation Limitations & Biological Caveats */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950">
                  <h4 className="font-bold flex items-center gap-1.5 text-amber-900 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                    <span>Important Interpretation Limitations</span>
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    {activeTestDetail.interpretation_limitations}
                  </p>
                </div>

                {/* Section 4: Factors That Affect Results */}
                {activeTestDetail.factors_affecting_result && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Everyday Factors That Shift Results</span>
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {activeTestDetail.factors_affecting_result}
                    </p>
                  </div>
                )}

                {/* Section 5: Doctor Questions */}
                {activeTestDetail.common_questions && activeTestDetail.common_questions.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 mb-2 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
                      <span>Questions to Discuss With Your Doctor</span>
                    </h4>
                    <ul className="space-y-2">
                      {activeTestDetail.common_questions.map((q, idx) => (
                        <li key={idx} className="p-3 rounded-xl bg-purple-50/50 border border-purple-200/60 text-xs text-purple-950 font-medium">
                          "{q}"
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Section 6: Accredited Sources */}
                {activeTestDetail.sources && activeTestDetail.sources.length > 0 && (
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Accredited Medical References:
                    </span>
                    <div className="space-y-1.5">
                      {activeTestDetail.sources.map((s) => (
                        <div key={s.id} className="text-[11px] text-slate-600 flex items-center justify-between">
                          <span>{s.title} ({s.publisher})</span>
                          {s.url && (
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-teal-700 hover:text-teal-900 font-bold inline-flex items-center gap-1 ml-2"
                            >
                              <span>Verify</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 7: Action Button to Decode a Report */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500">
                    Have a lab report containing {activeTestDetail.name}?
                  </span>
                  <button
                    onClick={() => {
                      setActiveTestSlug(null);
                      onDecodeReport();
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white text-xs font-bold hover:shadow-sm cursor-pointer"
                  >
                    Decode My Report
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </IllustratedPageBackground>
  );
};
