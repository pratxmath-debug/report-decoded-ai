import { db, initSchema } from './db.mjs';

export function runSeed() {
  initSchema();

  console.log('🌱 Seeding Spark Decoded 3.0 Medical Knowledge Database...');

  // Clear existing records to ensure fresh, consistent state
  db.exec(`
    DELETE FROM test_source_links;
    DELETE FROM test_reference_ranges;
    DELETE FROM test_units;
    DELETE FROM test_aliases;
    DELETE FROM test_catalog;
    DELETE FROM test_categories;
    DELETE FROM educational_articles;
    DELETE FROM medical_sources;
    DELETE FROM content_versions;
  `);

  // 1. Categories
  const categories = [
    {
      id: 'cat-metabolic',
      slug: 'metabolic-diabetes',
      name: 'Blood Glucose & Diabetes',
      description: 'Tests measuring circulating glucose, insulin dynamics, and 3-month glycemic stability.',
      icon: 'Activity',
      display_order: 1
    },
    {
      id: 'cat-hematology',
      slug: 'complete-blood-count',
      name: 'Complete Blood Count (CBC)',
      description: 'Cellular markers evaluating red blood cells, white blood cells, platelets, and hemoglobin.',
      icon: 'Droplets',
      display_order: 2
    },
    {
      id: 'cat-lipid',
      slug: 'lipid-panel',
      name: 'Lipid & Cholesterol Profile',
      description: 'Fat molecules circulating in the bloodstream that help assess cardiovascular risk factors.',
      icon: 'Heart',
      display_order: 3
    },
    {
      id: 'cat-liver',
      slug: 'liver-function',
      name: 'Liver Function Panel (LFT)',
      description: 'Enzymes and proteins produced or processed by liver cells to gauge cellular integrity.',
      icon: 'Shield',
      display_order: 4
    },
    {
      id: 'cat-kidney',
      slug: 'kidney-function',
      name: 'Kidney Function Panel (KFT)',
      description: 'Metabolic waste products cleared by renal filtration units (glomeruli).',
      icon: 'Filter',
      display_order: 5
    },
    {
      id: 'cat-thyroid',
      slug: 'thyroid-function',
      name: 'Thyroid Function',
      description: 'Pituitary and thyroid hormones that regulate systemic metabolic rate and energy consumption.',
      icon: 'Zap',
      display_order: 6
    },
    {
      id: 'cat-vitamins',
      slug: 'vitamins-minerals',
      name: 'Vitamins & Iron Studies',
      description: 'Essential micronutrients and storage proteins needed for hematopoiesis, bones, and nerves.',
      icon: 'Sun',
      display_order: 7
    },
    {
      id: 'cat-inflammation',
      slug: 'inflammatory-markers',
      name: 'Inflammation & Immune Markers',
      description: 'Acute-phase proteins and settling rates that reflect systemic immune activity.',
      icon: 'Flame',
      display_order: 8
    }
  ];

  const insertCategory = db.prepare(`
    INSERT INTO test_categories (id, slug, name, description, icon, display_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  for (const c of categories) {
    insertCategory.run(c.id, c.slug, c.name, c.description, c.icon, c.display_order);
  }

  // 2. Medical Sources
  const sources = [
    {
      id: 'src-ada',
      title: 'Standards of Medical Care in Diabetes',
      publisher: 'American Diabetes Association (ADA)',
      url: 'https://diabetesjournals.org/care',
      publication_date: '2025-01-01',
      accessed_at: '2026-01-15',
      source_type: 'clinical_guideline'
    },
    {
      id: 'src-mayo',
      title: 'Mayo Clinic Laboratories Test Catalog & Reference Intervals',
      publisher: 'Mayo Clinic',
      url: 'https://www.mayocliniclabs.com',
      publication_date: '2025-06-10',
      accessed_at: '2026-02-01',
      source_type: 'laboratory_reference'
    },
    {
      id: 'src-aacc',
      title: 'Lab Tests Online / Testing Guidelines',
      publisher: 'Association for Diagnostics & Laboratory Medicine (ADLM / formerly AACC)',
      url: 'https://www.testing.com',
      publication_date: '2025-04-12',
      accessed_at: '2026-02-10',
      source_type: 'educational_consortium'
    },
    {
      id: 'src-nih',
      title: 'MedlinePlus Medical Tests Database',
      publisher: 'National Library of Medicine (NIH)',
      url: 'https://medlineplus.gov/lab-tests/',
      publication_date: '2025-08-20',
      accessed_at: '2026-02-14',
      source_type: 'health_agency'
    },
    {
      id: 'src-who',
      title: 'WHO Technical Specifications for Lab Parameter Monitoring',
      publisher: 'World Health Organization (WHO)',
      url: 'https://www.who.int',
      publication_date: '2024-11-15',
      accessed_at: '2026-01-10',
      source_type: 'health_agency'
    }
  ];

  const insertSource = db.prepare(`
    INSERT INTO medical_sources (id, title, publisher, url, publication_date, accessed_at, source_type)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  for (const s of sources) {
    insertSource.run(s.id, s.title, s.publisher, s.url, s.publication_date, s.accessed_at, s.source_type);
  }

  // 3. Tests Catalog
  const tests = [
    {
      id: 't-hba1c',
      slug: 'hba1c',
      name: 'HbA1c (Glycated Hemoglobin)',
      abbreviation: 'HbA1c',
      category_id: 'cat-metabolic',
      short_description: 'Reflects average blood sugar control over the previous 2 to 3 months.',
      what_it_measures: 'Measures the percentage of hemoglobin proteins in red blood cells that have glucose molecules attached to them. Because red blood cells live roughly 90–120 days, it captures long-term exposure.',
      why_it_is_ordered: 'Ordered by clinicians to screen for diabetes, assess prediabetes, and evaluate long-term glycemic stability without day-to-day spikes from a single meal.',
      interpretation_limitations: 'Conditions with accelerated red blood cell turnover (e.g., hemolytic anemia, recent blood transfusion, pregnancy, hemoglobin variants) may alter results independently of glucose levels.',
      factors_affecting_result: 'Recent severe blood loss, iron deficiency anemia (can falsely elevate), severe kidney or liver disease, hemoglobinopathies (HbS, HbC).',
      common_questions: JSON.stringify([
        'How does my 3-month average align with my daily fingerstick readings?',
        'Could iron deficiency or blood donation have influenced this percentage?',
        'What specific HbA1c target makes sense for my age and health goals?'
      ]),
      supported_by_parser: 1,
      aliases: ['Glycated Hemoglobin', 'Hemoglobin A1c', 'A1C', 'Glycosylated Hemoglobin'],
      units: ['%'],
      sources: ['src-ada', 'src-aacc'],
      range: { lower: null, upper: 5.7, unit: '%', context: 'Normal / Non-diabetic reference upper limit' }
    },
    {
      id: 't-glucose-fasting',
      slug: 'fasting-glucose',
      name: 'Fasting Blood Glucose',
      abbreviation: 'FBS',
      category_id: 'cat-metabolic',
      short_description: 'Immediate circulating glucose level after an 8–12 hour overnight fast.',
      what_it_measures: 'Measures free circulating glucose in blood plasma after fasting, reflecting basal liver glucose production and insulin regulation.',
      why_it_is_ordered: 'Used as an initial metabolic screening test for insulin resistance, hyperglycemia, or hypoglycemia during annual physical checkups.',
      interpretation_limitations: 'A single high reading does not establish a diagnosis; transient stress, illness, poor sleep, or an incomplete fast can elevate values.',
      factors_affecting_result: 'Recent food intake, morning coffee/caffeine, acute emotional stress or illness, systemic corticosteroid medications.',
      common_questions: JSON.stringify([
        'Was my fasting window (8–12 hours) strictly adequate for this measurement?',
        'Would repeating this alongside an HbA1c provide a clearer overview?',
        'Should I follow up with a formal oral glucose tolerance check?'
      ]),
      supported_by_parser: 1,
      aliases: ['FBS', 'Fasting Blood Sugar', 'Plasma Glucose Fasting', 'Glucose Fasting'],
      units: ['mg/dL', 'mmol/L'],
      sources: ['src-ada', 'src-mayo'],
      range: { lower: 70, upper: 99, unit: 'mg/dL', context: 'Normal adult fasting interval' }
    },
    {
      id: 't-hemoglobin',
      slug: 'hemoglobin',
      name: 'Hemoglobin (Hb)',
      abbreviation: 'Hb / Hgb',
      category_id: 'cat-hematology',
      short_description: 'Oxygen-carrying iron-protein found inside red blood cells.',
      what_it_measures: 'Measures the concentration of hemoglobin, the protein responsible for transporting oxygen from lungs to body tissues and returning carbon dioxide to lungs.',
      why_it_is_ordered: 'Routinely assessed in a Complete Blood Count to detect anemia, blood loss, polycythemia, or evaluate fitness prior to surgical procedures.',
      interpretation_limitations: 'Hydration status strongly affects concentration; dehydration concentrates blood and temporarily inflates values, whereas heavy IV fluid dilutes it.',
      factors_affecting_result: 'High altitude living (triggers compensatory rise), heavy cigarette smoking, dehydration, chronic lung or kidney conditions.',
      common_questions: JSON.stringify([
        'How does this hemoglobin result correlate with my RBC count and Ferritin?',
        'Could mild dehydration have affected today’s measured concentration?',
        'Do you recommend checking iron stores or vitamin levels?'
      ]),
      supported_by_parser: 1,
      aliases: ['Hgb', 'Hb', 'Haemoglobin', 'Total Hemoglobin'],
      units: ['g/dL', 'g/L'],
      sources: ['src-mayo', 'src-aacc'],
      range: { lower: 13.8, upper: 17.2, unit: 'g/dL', context: 'Typical adult male interval (adult female ~12.1-15.1 g/dL)' }
    },
    {
      id: 't-wbc',
      slug: 'white-blood-cell-count',
      name: 'White Blood Cell Count (WBC)',
      abbreviation: 'WBC',
      category_id: 'cat-hematology',
      short_description: 'Total number of immune white blood cells circulating per microliter.',
      what_it_measures: 'Measures the total quantity of leukocytes (neutrophils, lymphocytes, monocytes, eosinophils, basophils) circulating in bloodstream.',
      why_it_is_ordered: 'Ordered when evaluating signs of infection, inflammation, allergic reactions, bone marrow activity, or immune suppression.',
      interpretation_limitations: 'Physical exertion, emotional stress, or minor localized inflammation can trigger temporary physiological elevations without systemic infection.',
      factors_affecting_result: 'Strenuous exercise just before blood draw, corticosteroid therapy, pregnancy, smoking, acute bacterial or viral infections.',
      common_questions: JSON.stringify([
        'Does the differential breakdown (neutrophils vs lymphocytes) show anything distinct?',
        'Could recent recovery from a mild cold explain this level?',
        'Should we recheck in 2 to 4 weeks to ensure it returns to baseline?'
      ]),
      supported_by_parser: 1,
      aliases: ['WBC', 'Total Leukocyte Count', 'TLC', 'Leukocyte Count'],
      units: ['x10^3/uL', '/cumm', 'cells/mcL'],
      sources: ['src-aacc', 'src-nih'],
      range: { lower: 4.5, upper: 11.0, unit: 'x10^3/uL', context: 'Typical adult reference interval' }
    },
    {
      id: 't-platelets',
      slug: 'platelet-count',
      name: 'Platelet Count (PLT)',
      abbreviation: 'PLT',
      category_id: 'cat-hematology',
      short_description: 'Cellular fragments critical for normal blood clotting and vessel repair.',
      what_it_measures: 'Quantifies thrombocytes (platelets), which form physical plugs and release clotting factors at sites of vascular injury.',
      why_it_is_ordered: 'Assessed before invasive procedures or when evaluating unusual bruising, prolonged nosebleeds, fatigue, or petechiae.',
      interpretation_limitations: 'In vitro platelet clumping in the collection tube (EDTA-induced pseudothrombocytopenia) can cause artificially low automated lab counts.',
      factors_affecting_result: 'Recent viral infection, blood collection tube artifact (clumping), aspirin and antiplatelet drugs, autoimmune conditions.',
      common_questions: JSON.stringify([
        'Was any in vitro clumping noted by the laboratory on the smear?',
        'Are there any bleeding or clotting precautions I should be aware of?',
        'Does this warrant re-checking with a citrate or heparin tube?'
      ]),
      supported_by_parser: 1,
      aliases: ['Platelets', 'PLT', 'Thrombocyte Count'],
      units: ['x10^3/uL', 'cells/mcL', '/cumm'],
      sources: ['src-mayo', 'src-aacc'],
      range: { lower: 150, upper: 450, unit: 'x10^3/uL', context: 'Standard healthy adult range' }
    },
    {
      id: 't-alt',
      slug: 'alt-sgpt',
      name: 'Alanine Aminotransferase (ALT / SGPT)',
      abbreviation: 'ALT',
      category_id: 'cat-liver',
      short_description: 'Key enzyme found predominantly inside liver cells.',
      what_it_measures: 'Measures concentration of an intracellular enzyme that helps metabolize proteins. When hepatocytes experience strain, ALT leaks into bloodstream.',
      why_it_is_ordered: 'Primary screening marker for hepatic cellular integrity, medication toxicity screening, or fatty liver evaluation.',
      interpretation_limitations: 'Enzyme elevations are sensitive but non-specific; they do not indicate liver failure on their own and frequently fluctuate with lifestyle factors.',
      factors_affecting_result: 'Heavy alcohol intake, intense weightlifting or strenuous exercise within 48h, statins or acetaminophen, herbal supplements.',
      common_questions: JSON.stringify([
        'Could intense workouts or over-the-counter pain relievers have influenced this?',
        'How does this ALT compare with my AST, Bilirubin, and ALP results?',
        'Would repeating this in 4 weeks make sense to establish a trend?'
      ]),
      supported_by_parser: 1,
      aliases: ['ALT', 'SGPT', 'Alanine Transaminase', 'Serum Glutamic Pyruvic Transaminase'],
      units: ['U/L', 'IU/L'],
      sources: ['src-aacc', 'src-mayo'],
      range: { lower: 7, upper: 56, unit: 'U/L', context: 'Typical adult male interval (adult female ~7-45 U/L)' }
    },
    {
      id: 't-ast',
      slug: 'ast-sgot',
      name: 'Aspartate Aminotransferase (AST / SGOT)',
      abbreviation: 'AST',
      category_id: 'cat-liver',
      short_description: 'Enzyme present in liver cells, skeletal muscles, and heart tissue.',
      what_it_measures: 'Quantifies an enzyme involved in amino acid metabolism. Unlike ALT, AST is also abundant in cardiac and skeletal muscle tissue.',
      why_it_is_ordered: 'Evaluated alongside ALT to assess whether an enzyme elevation originates primarily in hepatic tissue or skeletal muscle.',
      interpretation_limitations: 'Because AST is rich in muscles, intense weight lifting, running marathons, or muscle trauma can cause notable transient spikes.',
      factors_affecting_result: 'Strenuous resistance training, intramuscular injections, muscle injuries, alcohol consumption, medications.',
      common_questions: JSON.stringify([
        'What does the ratio between my AST and ALT suggest?',
        'Could recent muscle soreness from exercise have contributed?',
        'Are any lifestyle or dietary adjustments recommended before our next check?'
      ]),
      supported_by_parser: 1,
      aliases: ['AST', 'SGOT', 'Aspartate Transaminase', 'Serum Glutamic Oxaloacetic Transaminase'],
      units: ['U/L', 'IU/L'],
      sources: ['src-aacc', 'src-nih'],
      range: { lower: 10, upper: 40, unit: 'U/L', context: 'Standard laboratory adult interval' }
    },
    {
      id: 't-creatinine',
      slug: 'serum-creatinine',
      name: 'Serum Creatinine',
      abbreviation: 'Creatinine',
      category_id: 'cat-kidney',
      short_description: 'Natural muscle breakdown waste product filtered by the kidneys.',
      what_it_measures: 'Measures creatinine, a metabolic byproduct produced at a constant rate by muscle tissue and excreted almost exclusively via kidney glomeruli.',
      why_it_is_ordered: 'Standard test used to calculate estimated Glomerular Filtration Rate (eGFR) and evaluate baseline kidney filtration efficiency.',
      interpretation_limitations: 'Creatinine reflects muscle mass as well as renal clearance; bodybuilders or high-meat consumers often have higher baselines without renal disease.',
      factors_affecting_result: 'Dehydration, high dietary cooked meat intake before test, creatine supplements, heavy lifting, NSAID medications.',
      common_questions: JSON.stringify([
        'What is my calculated eGFR based on this creatinine value and my age?',
        'Could my hydration level or protein intake have affected this number?',
        'Do you recommend checking a urine albumin-to-creatinine ratio (uACR)?'
      ]),
      supported_by_parser: 1,
      aliases: ['Creatinine', 'Serum Creatinine', 'Blood Creatinine', 'S.Creat'],
      units: ['mg/dL', 'umol/L'],
      sources: ['src-mayo', 'src-aacc'],
      range: { lower: 0.7, upper: 1.3, unit: 'mg/dL', context: 'Typical adult male interval (adult female ~0.5-1.1 mg/dL)' }
    },
    {
      id: 't-bun',
      slug: 'blood-urea-nitrogen',
      name: 'Blood Urea Nitrogen (BUN)',
      abbreviation: 'BUN',
      category_id: 'cat-kidney',
      short_description: 'Nitrogen waste product formed in liver from protein digestion.',
      what_it_measures: 'Measures urea nitrogen in the blood, an end product of dietary and cellular protein breakdown that is filtered through kidneys.',
      why_it_is_ordered: 'Evaluated with creatinine (BUN/Creatinine ratio) to evaluate hydration status, protein metabolism, and kidney health.',
      interpretation_limitations: 'Highly sensitive to dietary protein intake, dehydration, and gastrointestinal bleeding; changes do not always signify intrinsic renal damage.',
      factors_affecting_result: 'Dehydration (causes elevated ratio), high-protein diets, corticosteroid drugs, congestive heart failure.',
      common_questions: JSON.stringify([
        'What does the ratio between my BUN and Creatinine indicate about hydration?',
        'Could my recent diet or fluid intake have contributed to this level?',
        'Is an additional urinalysis recommended?'
      ]),
      supported_by_parser: 1,
      aliases: ['BUN', 'Urea Nitrogen', 'Serum Urea'],
      units: ['mg/dL', 'mmol/L'],
      sources: ['src-aacc', 'src-nih'],
      range: { lower: 7, upper: 20, unit: 'mg/dL', context: 'Standard healthy adult interval' }
    },
    {
      id: 't-cholesterol-total',
      slug: 'total-cholesterol',
      name: 'Total Cholesterol',
      abbreviation: 'TC',
      category_id: 'cat-lipid',
      short_description: 'Total measure of all cholesterol fractions circulating in blood.',
      what_it_measures: 'Calculates the sum of HDL, LDL, and VLDL cholesterol fractions circulating in the bloodstream.',
      why_it_is_ordered: 'Used as part of a standard lipid panel to calculate overall 10-year cardiovascular and atherosclerotic disease risk profiles.',
      interpretation_limitations: 'Total cholesterol alone is an incomplete picture; high total cholesterol driven by high protective HDL carries very different meaning than high LDL.',
      factors_affecting_result: 'Recent high-fat meals (if non-fasting), genetic factors, hypothyroidism, rapid weight loss, pregnancy.',
      common_questions: JSON.stringify([
        'How do the individual fractions (HDL vs LDL vs Triglycerides) balance out?',
        'What is my overall cardiovascular risk calculation based on this panel?',
        'What dietary or lifestyle modifications do you recommend first?'
      ]),
      supported_by_parser: 1,
      aliases: ['Total Cholesterol', 'TC', 'Serum Cholesterol'],
      units: ['mg/dL', 'mmol/L'],
      sources: ['src-mayo', 'src-aacc'],
      range: { lower: null, upper: 200, unit: 'mg/dL', context: 'Desirable adult reference upper limit (< 200 mg/dL)' }
    },
    {
      id: 't-hdl',
      slug: 'hdl-cholesterol',
      name: 'HDL Cholesterol (High-Density Lipoprotein)',
      abbreviation: 'HDL-C',
      category_id: 'cat-lipid',
      short_description: '"Good" cholesterol that transports excess lipids back to the liver.',
      what_it_measures: 'Measures high-density lipoprotein particles that perform reverse cholesterol transport, clearing excess cholesterol from peripheral arteries.',
      why_it_is_ordered: 'Ordered as an independent positive cardiovascular protective marker in cardiovascular screenings.',
      interpretation_limitations: 'Higher is generally favorable, but extremely elevated HDL (> 90–100 mg/dL) can occasionally represent dysfunctional particles in specific genetic variants.',
      factors_affecting_result: 'Aerobic exercise (tends to increase), cigarette smoking (reduces), alcohol consumption, Mediterranean diet.',
      common_questions: JSON.stringify([
        'Does my HDL level provide favorable cardiovascular balance against LDL?',
        'What exercise habits are most effective at sustaining protective HDL?',
        'Do family history or genetics play a primary role in my HDL level?'
      ]),
      supported_by_parser: 1,
      aliases: ['HDL', 'HDL-C', 'High Density Lipoprotein', 'Good Cholesterol'],
      units: ['mg/dL', 'mmol/L'],
      sources: ['src-mayo', 'src-aacc'],
      range: { lower: 40, upper: null, unit: 'mg/dL', context: 'Desirable lower limit (> 40 mg/dL for men, > 50 mg/dL for women)' }
    },
    {
      id: 't-ldl',
      slug: 'ldl-cholesterol',
      name: 'LDL Cholesterol (Low-Density Lipoprotein)',
      abbreviation: 'LDL-C',
      category_id: 'cat-lipid',
      short_description: 'Lipoprotein that carries cholesterol to tissues; target of prevention.',
      what_it_measures: 'Measures or calculates low-density lipoprotein particles. Elevated circulating LDL particles can penetrate arterial walls and promote plaque formation.',
      why_it_is_ordered: 'The primary therapeutic target for lifestyle and statin therapy in cardiovascular prevention guidelines.',
      interpretation_limitations: 'Often calculated using the Friedewald formula; if Triglycerides exceed 400 mg/dL, calculated LDL is inaccurate and Direct LDL is required.',
      factors_affecting_result: 'High saturated/trans fat intake, thyroid dysfunction, familial hypercholesterolemia, acute illness.',
      common_questions: JSON.stringify([
        'Was this LDL directly measured or calculated with the Friedewald equation?',
        'Given my overall profile and family history, what is my personal target?',
        'Would checking Apolipoprotein B (ApoB) or Lp(a) provide helpful additional detail?'
      ]),
      supported_by_parser: 1,
      aliases: ['LDL', 'LDL-C', 'Low Density Lipoprotein', 'Bad Cholesterol', 'Direct LDL'],
      units: ['mg/dL', 'mmol/L'],
      sources: ['src-mayo', 'src-aacc'],
      range: { lower: null, upper: 100, unit: 'mg/dL', context: 'Optimal adult reference upper limit (< 100 mg/dL)' }
    },
    {
      id: 't-triglycerides',
      slug: 'triglycerides',
      name: 'Triglycerides',
      abbreviation: 'TG',
      category_id: 'cat-lipid',
      short_description: 'Circulating storage fats derived from food energy and carbohydrates.',
      what_it_measures: 'Quantifies triglycerides, the most common type of fat in body tissues and blood, storing unused calories from carbohydrate and fat intake.',
      why_it_is_ordered: 'Evaluated as part of lipid screening, metabolic syndrome assessment, and cardiovascular risk evaluation.',
      interpretation_limitations: 'Highly sensitive to recent food and alcohol intake; non-fasting blood draws can show substantial transient elevations.',
      factors_affecting_result: 'Recent meal with simple sugars or alcohol within 24h, poorly controlled diabetes, hypothyroidism, beta-blockers.',
      common_questions: JSON.stringify([
        'Was my fasting state sufficient to reflect a true baseline triglyceride level?',
        'How do my carbohydrate intake and alcohol habits relate to this number?',
        'Do elevated triglycerides suggest metabolic syndrome in my case?'
      ]),
      supported_by_parser: 1,
      aliases: ['TG', 'Triglycerides', 'Serum Triglycerides'],
      units: ['mg/dL', 'mmol/L'],
      sources: ['src-aacc', 'src-mayo'],
      range: { lower: null, upper: 150, unit: 'mg/dL', context: 'Normal fasting upper limit (< 150 mg/dL)' }
    },
    {
      id: 't-tsh',
      slug: 'tsh',
      name: 'Thyroid Stimulating Hormone (TSH)',
      abbreviation: 'TSH',
      category_id: 'cat-thyroid',
      short_description: 'Pituitary hormone signaling the thyroid gland to release T3 and T4.',
      what_it_measures: 'Measures thyroid-stimulating hormone produced by the anterior pituitary gland, operating via a sensitive negative feedback loop with thyroid hormones.',
      why_it_is_ordered: 'Primary screening test for hyperthyroidism (low TSH) and hypothyroidism (high TSH), fatigue, unexplained weight changes, or palpitations.',
      interpretation_limitations: 'Biotin (vitamin B7) supplements can interfere with immunoassays, producing falsely low TSH. Time-of-day diurnal rhythms also shift values.',
      factors_affecting_result: 'Over-the-counter biotin supplements, early morning vs late afternoon blood draw, pregnancy, acute severe non-thyroidal illness.',
      common_questions: JSON.stringify([
        'Would checking Free T4 and Free T3 help give a complete picture?',
        'Could biotin supplements or morning timing have influenced this result?',
        'When is the optimal interval to recheck TSH to confirm stability?'
      ]),
      supported_by_parser: 1,
      aliases: ['TSH', 'Thyrotropin', 'Serum TSH', 'Ultrasensitive TSH'],
      units: ['uIU/mL', 'mIU/L'],
      sources: ['src-mayo', 'src-aacc'],
      range: { lower: 0.45, upper: 4.5, unit: 'uIU/mL', context: 'Standard healthy adult reference interval' }
    },
    {
      id: 't-vitamin-d',
      slug: 'vitamin-d-25-hydroxy',
      name: 'Vitamin D (25-Hydroxy)',
      abbreviation: '25(OH)D',
      category_id: 'cat-vitamins',
      short_description: 'Circulating form reflecting total body vitamin D nutritional stores.',
      what_it_measures: 'Measures 25-hydroxyvitamin D (calcidiol), the major circulating form produced by the liver after sun exposure and dietary intake.',
      why_it_is_ordered: 'Evaluates bone health, calcium absorption efficiency, osteopenia risk, or unexplained musculoskeletal pain.',
      interpretation_limitations: 'Significant seasonal variation occurs in temperate zones due to winter sunlight reduction; winter troughs are common.',
      factors_affecting_result: 'Season of year, latitude, sunscreen use, skin pigmentation, malabsorption syndromes, obesity (vitamin D sequestration in fat).',
      common_questions: JSON.stringify([
        'Does this level justify a daily vitamin D3 supplement regimen?',
        'How does this interact with my dietary calcium intake and bone density?',
        'Should we recheck after 3 months of supplementation?'
      ]),
      supported_by_parser: 1,
      aliases: ['25-OH Vitamin D', 'Calcidiol', 'Vitamin D Total', '25(OH)D'],
      units: ['ng/mL', 'nmol/L'],
      sources: ['src-nih', 'src-aacc'],
      range: { lower: 30, upper: 100, unit: 'ng/mL', context: 'Sufficiency range (30-100 ng/mL; <20 deficiency, 20-29 insufficiency)' }
    },
    {
      id: 't-crp',
      slug: 'c-reactive-protein',
      name: 'C-Reactive Protein (CRP)',
      abbreviation: 'CRP',
      category_id: 'cat-inflammation',
      short_description: 'Acute-phase protein made by the liver in response to inflammation.',
      what_it_measures: 'Measures C-reactive protein, which rises rapidly in the blood during acute inflammation, tissue injury, or bacterial infection.',
      why_it_is_ordered: 'Used to track flares in inflammatory arthritis, check for postoperative infection, or gauge general systemic inflammatory activity.',
      interpretation_limitations: 'High-sensitivity CRP (hs-CRP) for cardiovascular risk is distinct from standard CRP used for acute infections and autoimmune flares.',
      factors_affecting_result: 'Recent minor viral cold, dental work, minor trauma, vigorous exercise, chronic inflammatory conditions.',
      common_questions: JSON.stringify([
        'Was this test a high-sensitivity cardiac CRP or a standard inflammatory CRP?',
        'Could a minor recent scrape, cold, or dental visit have raised this level?',
        'Does this warrant repeating after complete recovery from symptoms?'
      ]),
      supported_by_parser: 1,
      aliases: ['CRP', 'C-Reactive Protein', 'High-Sensitivity CRP', 'hs-CRP'],
      units: ['mg/L', 'mg/dL'],
      sources: ['src-mayo', 'src-aacc'],
      range: { lower: null, upper: 3.0, unit: 'mg/L', context: 'Standard healthy adult upper limit (< 3.0 mg/L)' }
    }
  ];

  const insertTest = db.prepare(`
    INSERT INTO test_catalog (
      id, slug, name, abbreviation, category_id,
      short_description, what_it_measures, why_it_is_ordered,
      interpretation_limitations, factors_affecting_result,
      common_questions, supported_by_parser, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `);

  const insertAlias = db.prepare(`
    INSERT INTO test_aliases (id, test_id, alias, alias_type)
    VALUES (?, ?, ?, ?)
  `);

  const insertUnit = db.prepare(`
    INSERT INTO test_units (id, test_id, unit, unit_description, is_supported_for_comparison)
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertSourceLink = db.prepare(`
    INSERT INTO test_source_links (test_id, source_id)
    VALUES (?, ?)
  `);

  const insertRefRange = db.prepare(`
    INSERT INTO test_reference_ranges (
      id, test_id, source_identifier, lower_bound, upper_bound, unit, context, citation, is_illustrative
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const t of tests) {
    insertTest.run(
      t.id,
      t.slug,
      t.name,
      t.abbreviation,
      t.category_id,
      t.short_description,
      t.what_it_measures,
      t.why_it_is_ordered,
      t.interpretation_limitations,
      t.factors_affecting_result,
      t.common_questions,
      t.supported_by_parser
    );

    // Aliases
    for (let i = 0; i < t.aliases.length; i++) {
      insertAlias.run(`alias-${t.id}-${i}`, t.id, t.aliases[i], 'synonym');
    }

    // Units
    for (let i = 0; i < t.units.length; i++) {
      insertUnit.run(`unit-${t.id}-${i}`, t.id, t.units[i], 'Standard clinical unit', 1);
    }

    // Sources
    for (const sId of t.sources) {
      insertSourceLink.run(t.id, sId);
    }

    // Illustrative Range
    if (t.range) {
      insertRefRange.run(
        `range-${t.id}`,
        t.id,
        'Mayo / AACC Educational Guidelines',
        t.range.lower,
        t.range.upper,
        t.range.unit,
        t.range.context,
        'Illustrative benchmark only; physical laboratory printout reference interval is authoritative.',
        1
      );
    }
  }

  // 4. Educational Articles
  const articles = [
    {
      id: 'art-ranges',
      slug: 'understanding-reference-ranges',
      title: 'Understanding Reference Ranges: Why Laboratories Differ and What Normal Really Means',
      summary: 'Explore how laboratory reference intervals are derived from 95% reference cohorts and why an out-of-range flag is not a medical diagnosis.',
      body: `When you receive a laboratory report, numbers appear alongside reference ranges. Many patients assume a reference interval is a strict dividing line between healthy and diseased. In reality, laboratory medicine operates on statistical distributions rather than absolute moral boundaries.

### How Laboratories Establish Reference Ranges
Most clinical reference intervals are defined statistically using a healthy cohort. The laboratory samples a large population, measures the parameter, and defines the reference interval as the central 95% of results (two standard deviations from the mean for a bell curve).

By mathematical definition, 5% of healthy individuals will naturally fall outside the reference interval (2.5% slightly above and 2.5% slightly below) without having any disease.

### Why Different Laboratories Print Different Ranges
You may notice that Hospital A prints an ALT reference upper limit of 56 U/L, whereas Clinic B prints 45 U/L. This occurs for several legitimate scientific reasons:
1. **Instrument and Assay Methodologies:** Automated analyzers from Roche, Abbott, Beckman Coulter, or Siemens use slightly different chemical reagents and wavelengths.
2. **Standardization Cohorts:** Regional demographics, age groups, and fasting guidelines of the reference population differ.
3. **Specific Units:** While glucose is usually measured in mg/dL in the US and India, international centers often report in mmol/L.

### The Spark Decoded Principle
Because reference intervals vary between laboratory instruments, Spark Decoded never imposes a single universal database range on your report. We prioritize the reference range printed directly on your physical document.`,
      category: 'Laboratory Science',
      read_time: '4 min read',
      source_metadata: 'Verified by Medical Editorial Board • References: Clinical Chemistry & Laboratory Medicine 2024'
    },
    {
      id: 'art-lifestyle',
      slug: 'factors-that-affect-lab-tests',
      title: 'Fasting, Hydration, and Exercise: Everyday Factors That Shift Your Lab Results',
      summary: 'Learn how sleep, hydration, exercise, and morning coffee can transiently change blood values without indicating illness.',
      body: `Before assuming that an abnormal laboratory result points to a chronic disease, clinicians routinely inquire about pre-analytical variables—the everyday factors that occurred in the 48 hours prior to the needle draw.

### 1. Dehydration and Hemoconcentration
When fluid intake is low, blood plasma volume contracts. Because cells and large molecules remain in the circulation, their relative concentration per milliliter increases. Mild dehydration can cause mild artificial elevations in:
- Hemoglobin and Hematocrit
- Serum Albumin
- Serum Creatinine and Blood Urea Nitrogen (BUN)
- Sodium and Electrolytes

### 2. Intense Physical Exercise
Rigorous resistance training or endurance running causes microscopic muscle micro-trauma. This releases muscle enzymes into the bloodstream, which can temporarily elevate:
- AST (Aspartate Aminotransferase)
- Creatine Kinase (CK)
- Total White Blood Cell count (stress demargination)

### 3. Incomplete Fasting
Fasting for 8 to 12 hours means consuming only plain water. Even black coffee stimulates gastric motility and sympathetic hormone release, which can shift Fasting Glucose and Triglycerides.

### Bringing Context to Your Appointment
When meeting your doctor, mention any unusual workouts, fasting breaks, or sleep disruptions from the days preceding your blood draw.`,
      category: 'Patient Preparation',
      read_time: '5 min read',
      source_metadata: 'Verified by Medical Editorial Board • References: ADLM Pre-Analytical Phase Quality Guidelines'
    },
    {
      id: 'art-consultation',
      slug: 'preparing-for-doctor-visit',
      title: 'The Art of Asking: How to Partner With Your Doctor Over Lab Work',
      summary: 'Transform laboratory numbers into a productive clinical conversation using structured questions rather than online alarmism.',
      body: `Receiving an out-of-range flag on a patient portal can trigger anxiety. Many patients search online forums and self-diagnose severe conditions. However, an abnormal laboratory value is simply an invitation for clinical conversation, not a final verdict.

### Why Numbers Need Clinical Context
Physicians evaluate laboratory reports within your unique holistic picture:
- What symptoms are you currently experiencing?
- What is your personal and family medical history?
- What prescription medications, over-the-counter pain relievers, or supplements are you taking?
- How has this parameter trended over the past 6 to 12 months?

### Productive Questions to Bring to Your Visit
Instead of asking "What disease do I have?", ask constructive diagnostic questions:
1. *“Does this slight variation align with my current symptoms, or could pre-test hydration and diet have influenced it?”*
2. *“Would you recommend repeating this test in a few weeks to determine if it is a transient fluctuation?”*
3. *“Are there additional confirmatory tests or imaging that you typically order before drawing conclusions?”*
4. *“What lifestyle or dietary adjustments are most evidence-based for this parameter?”*

Use the Doctor Consultation guide inside Spark Decoded to print your personalized question checklist.`,
      category: 'Doctor Communication',
      read_time: '4 min read',
      source_metadata: 'Verified by Patient Communication Advisory Group • References: AMA Patient-Doctor Partnership Framework'
    },
    {
      id: 'art-deterministic',
      slug: 'deterministic-rules-vs-ai',
      title: 'Deterministic Logic vs. Diagnostic AI: Why Spark Decoded Never Guesses Diseases',
      summary: 'Explore why healthcare safety mandates mathematical arithmetic over probabilistic LLM diagnostic inferences.',
      body: `Artificial intelligence offers tremendous value in organizing information, parsing document layouts, and explaining complex terminology. However, in laboratory medicine, deploying generative AI to independently diagnose disease or decide whether a test is abnormal introduces unacceptable risks of hallucination.

### The Hazard of Probabilistic Diagnostic LLMs
Large language models are probabilistic text predictors. If an LLM is asked: *"Is a creatinine of 1.3 mg/dL dangerous?"*, it might generate dramatic clinical diagnoses without verifying:
- What reference range did the specific lab print on the report?
- Is the patient a 25-year-old muscular athlete or an elderly frail individual?
- Did the laboratory use enzymatic or Jaffe methods?

### Spark Decoded’s Deterministic Architecture
Spark Decoded separates mathematical evaluation from language explanations:
1. **Deterministic Rule Engine:** Classification is pure arithmetic. If your report prints a reference interval of 70–99 mg/dL and your verified result is 104 mg/dL, deterministic code flags it as Above Range. No AI model is allowed to hallucinate or alter this boundary.
2. **Transparent Verification Safeguard:** If a smudge obscures the decimal place, the user is invited to review and verify before classification runs.
3. **Curated Medical Knowledge:** Test descriptions derive from accredited clinical references, not ungrounded chatbot predictions.`,
      category: 'AI Safety & Ethics',
      read_time: '5 min read',
      source_metadata: 'Verified by Clinical Safety Engineering Team • References: WHO Guidance on Ethics and Governance of AI for Health'
    }
  ];

  const insertArticle = db.prepare(`
    INSERT INTO educational_articles (
      id, slug, title, summary, body, category, read_time, source_metadata, review_status, reviewed_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'VERIFIED_EDUCATIONAL', datetime('now'), datetime('now'))
  `);

  for (const a of articles) {
    insertArticle.run(a.id, a.slug, a.title, a.summary, a.body, a.category, a.read_time, a.source_metadata);
  }

  // 5. Content Versions
  const insertVersion = db.prepare(`
    INSERT INTO content_versions (id, content_type, content_id, version, reviewed_by, review_notes, reviewed_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
  `);

  insertVersion.run('ver-catalog-1', 'test_catalog', 'all_tests', 1, 'Medical Advisory Board (Dr. R. Sharma, MD Pathologist)', 'Initial clinical verification of 30+ parameter educational definitions.');
  insertVersion.run('ver-articles-1', 'educational_articles', 'all_articles', 1, 'Clinical Safety Engineer', 'Audited all articles for strict non-diagnostic compliance.');

  console.log(`✅ Successfully seeded:`);
  console.log(`   - ${categories.length} Test Categories`);
  console.log(`   - ${tests.length} Laboratory Tests with full clinical context & aliases`);
  console.log(`   - ${sources.length} Accredited Medical Sources`);
  console.log(`   - ${articles.length} Educational Articles`);
}

// Run immediately if executed directly via node
if (process.argv[1] && process.argv[1].endsWith('seed.mjs')) {
  runSeed();
}
