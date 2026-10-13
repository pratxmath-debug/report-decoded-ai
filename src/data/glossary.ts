import { GlossaryEntry } from '../types/report';

export const UNKNOWN_TEST_EXPLANATION =
  'An explanation for this parameter is not available in the current glossary. Please ask your healthcare professional.';

export const MEDICAL_GLOSSARY: GlossaryEntry[] = [
  {
    id: 'hba1c',
    canonicalName: 'HbA1c (Glycated Hemoglobin)',
    synonyms: ['hba1c', 'glycated hemoglobin', 'glycosylated hemoglobin', 'hemoglobin a1c', 'a1c'],
    whatItMeasures:
      'Measures the percentage of hemoglobin proteins in your red blood cells that have glucose attached to them, reflecting average blood sugar levels over the past 2 to 3 months.',
    clinicalContext:
      'Doctors evaluate this marker to monitor long-term blood glucose regulation and metabolic stability over time rather than day-to-day fluctuations.',
    category: 'Metabolic & Diabetes',
    commonQuestions: [
      'How does my 3-month average compare with my day-to-day fingerstick or continuous glucose monitor readings?',
      'Do conditions like anemia, red blood cell turnover, or recent blood donations affect my HbA1c accuracy?',
      'What target range makes sense for my specific age and general health goals?'
    ]
  },
  {
    id: 'fasting_glucose',
    canonicalName: 'Blood Glucose (Fasting / Random)',
    synonyms: ['fasting blood sugar', 'fasting glucose', 'fbs', 'blood glucose', 'plasma glucose', 'rbs', 'random blood sugar', 'glucose fasting', 'glucose'],
    whatItMeasures:
      'Measures the concentration of circulating glucose (sugar) in your bloodstream at the exact moment the blood sample is collected.',
    clinicalContext:
      'Helps healthcare providers assess immediate energy supply handling and how your body releases and responds to insulin after fasting or eating.',
    category: 'Metabolic & Diabetes',
    commonQuestions: [
      'Was my fasting duration (8–12 hours) adequate for this test, and could water, morning coffee, or stress have influenced it?',
      'Would repeating this test or doing an HbA1c test provide a more complete assessment of my glucose levels?',
      'What timing or dietary modifications do you recommend before my next check?'
    ]
  },
  {
    id: 'hemoglobin',
    canonicalName: 'Hemoglobin (Hb)',
    synonyms: ['hemoglobin', 'hb', 'hgb', 'haemoglobin'],
    whatItMeasures:
      'Measures the amount of the iron-rich protein in red blood cells responsible for binding and carrying oxygen from your lungs to tissues throughout your body.',
    clinicalContext:
      'Assessed by clinicians during routine health checks, before surgery, or when investigating energy levels, oxygen delivery capacity, or hydration status.',
    category: 'Hematology / Blood Counts',
    commonQuestions: [
      'How does this hemoglobin level correlate with my red blood cell indices (MCV, MCH, and Ferritin)?',
      'Could altitude, recent hydration levels, or routine blood loss influence this measurement?',
      'Are additional iron studies or vitamin level checks appropriate to consider?'
    ]
  },
  {
    id: 'tsh',
    canonicalName: 'TSH (Thyroid Stimulating Hormone)',
    synonyms: ['tsh', 'thyroid stimulating hormone', 'thyrotropin', 's.tsh', 'serum tsh'],
    whatItMeasures:
      'Measures the pituitary hormone that signals your thyroid gland in the neck to produce and release thyroxine (T4) and triiodothyronine (T3).',
    clinicalContext:
      'Used by healthcare teams as a primary screening test to evaluate how the brain-thyroid feedback loop is communicating.',
    category: 'Thyroid Function',
    commonQuestions: [
      'Would checking free T3 and free T4 levels help give a fuller picture of my thyroid health?',
      'Can time of day of the blood draw or supplements like biotin alter TSH lab readings?',
      'When is the ideal time to re-check this value to confirm stability?'
    ]
  },
  {
    id: 'alt_sgpt',
    canonicalName: 'ALT / SGPT (Alanine Aminotransferase)',
    synonyms: ['alt', 'sgpt', 'alanine aminotransferase', 'alanine transaminase', 's.alt', 's.sgpt'],
    whatItMeasures:
      'Measures the concentration of an enzyme found primarily inside liver cells that helps convert proteins into energy.',
    clinicalContext:
      'Evaluated to check hepatic cellular integrity. When liver cells experience temporary stress or changes, enzymes can leak into the bloodstream.',
    category: 'Liver Function',
    commonQuestions: [
      'Could recent strenuous physical exercise, over-the-counter pain medications, or dietary habits have influenced this enzyme level?',
      'How does this compare with my other liver tests like AST, ALP, and Bilirubin?',
      'Is a re-test recommended in a few weeks to monitor whether it returns to baseline?'
    ]
  },
  {
    id: 'ast_sgot',
    canonicalName: 'AST / SGOT (Aspartate Aminotransferase)',
    synonyms: ['ast', 'sgot', 'aspartate aminotransferase', 'aspartate transaminase', 's.ast', 's.sgot'],
    whatItMeasures:
      'Measures an enzyme present in liver cells, heart muscle, skeletal muscle, kidneys, and red blood cells.',
    clinicalContext:
      'Clinicians interpret AST alongside ALT to assess whether enzyme variations originate in liver tissue, muscular activity, or other metabolic tissues.',
    category: 'Liver Function',
    commonQuestions: [
      'What does the ratio between my AST and ALT suggest to you?',
      'Could recent intense muscle workouts or muscle soreness have contributed to this result?',
      'Are any lifestyle or medication adjustments advisable before our next follow-up?'
    ]
  },
  {
    id: 'creatinine',
    canonicalName: 'Serum Creatinine',
    synonyms: ['creatinine', 'serum creatinine', 's.creatinine', 'creat', 'blood creatinine'],
    whatItMeasures:
      'Measures the concentration of a natural breakdown byproduct of muscle creatine phosphate that is normally filtered out of blood by healthy kidneys.',
    clinicalContext:
      'Used as a primary indicator of kidney filtration efficiency and to calculate the estimated Glomerular Filtration Rate (eGFR).',
    category: 'Kidney Function',
    commonQuestions: [
      'What is my calculated eGFR based on this creatinine result, my age, and my body build?',
      'Could my hydration state on the morning of testing or dietary protein intake have shifted this value?',
      'Should we verify this with a repeat sample or a simple routine urine test?'
    ]
  },
  {
    id: 'total_cholesterol',
    canonicalName: 'Total Cholesterol',
    synonyms: ['total cholesterol', 'cholesterol total', 's.cholesterol', 'cholesterol', 'serum cholesterol'],
    whatItMeasures:
      'Measures the overall quantity of cholesterol (a vital fatty substance used to build cell membranes and hormones) circulating in all lipoprotein particles.',
    clinicalContext:
      'Examined alongside specific lipid sub-fractions (LDL, HDL, and Triglycerides) to evaluate cardiovascular and metabolic vascular health over time.',
    category: 'Lipid Panel',
    commonQuestions: [
      'How does my total cholesterol balance against my HDL ("protective") and LDL fractions?',
      'What is my overall cardiovascular profile considering my family history, blood pressure, and lifestyle?',
      'What dietary or physical activity strategies do you recommend focusing on first?'
    ]
  },
  {
    id: 'triglycerides',
    canonicalName: 'Triglycerides',
    synonyms: ['triglycerides', 'tg', 'serum triglycerides', 's.triglycerides'],
    whatItMeasures:
      'Measures the most common type of fat stored and transported in the blood, which supplies energy to muscles between meals.',
    clinicalContext:
      'Helps physicians understand lipid metabolism, dietary fat storage, and metabolic health. Levels often respond directly to recent carbohydrate, fat, and alcohol intake.',
    category: 'Lipid Panel',
    commonQuestions: [
      'How much did my pre-test fasting window affect this triglyceride result?',
      'Are there specific carbohydrate or dietary adjustments that typically help balance triglycerides?',
      'When should we re-evaluate my complete lipid panel?'
    ]
  },
  {
    id: 'wbc_count',
    canonicalName: 'White Blood Cell Count (WBC)',
    synonyms: ['wbc', 'white blood cell count', 'total leukocyte count', 'tlc', 'white blood cells', 'total wbc count', 'leukocyte count'],
    whatItMeasures:
      'Measures the total number of circulating defensive immune cells that protect the body against pathogens, foreign particles, and inflammation.',
    clinicalContext:
      'Monitored during routine wellness checks, when investigating infections, systemic immune activity, or general bone marrow production.',
    category: 'Hematology / Blood Counts',
    commonQuestions: [
      'How does the differential breakdown (neutrophils, lymphocytes, monocytes, eosinophils) look alongside this total count?',
      'Could a recent mild cold, allergies, emotional stress, or strenuous exercise have shifted my WBC count?',
      'Is any follow-up test necessary if I currently feel healthy and symptom-free?'
    ]
  },
  {
    id: 'platelet_count',
    canonicalName: 'Platelet Count',
    synonyms: ['platelet count', 'platelets', 'plt', 'thrombocyte count'],
    whatItMeasures:
      'Measures tiny cell fragments produced in bone marrow that clump together to initiate normal blood clotting when vessels are injured.',
    clinicalContext:
      'Used by medical providers to assess blood clotting capacity and bone marrow cell production before procedures or during health reviews.',
    category: 'Hematology / Blood Counts',
    commonQuestions: [
      'Do you see any signs of clumping on the smear that might make this reading an artifact?',
      'Are there any symptoms such as unusual bruising or bleeding I should be mindful of?',
      'Does this require a routine repeat count in a few weeks?'
    ]
  },
  {
    id: 'ldl_cholesterol',
    canonicalName: 'LDL Cholesterol',
    synonyms: ['ldl', 'ldl cholesterol', 'ldl-c', 'low density lipoprotein'],
    whatItMeasures:
      'Measures cholesterol carried by low-density lipoprotein particles, which transport cholesterol to peripheral tissues.',
    clinicalContext:
      'Evaluated by doctors to assess arterial health and guide preventative cardiovascular wellness plans.',
    category: 'Lipid Panel',
    commonQuestions: [
      'What specific LDL target makes the most sense for my individual risk profile and family history?',
      'Was this directly measured or calculated using the Friedewald formula?',
      'What lifestyle modifications tend to have the greatest impact on this number?'
    ]
  },
  {
    id: 'hdl_cholesterol',
    canonicalName: 'HDL Cholesterol',
    synonyms: ['hdl', 'hdl cholesterol', 'hdl-c', 'high density lipoprotein'],
    whatItMeasures:
      'Measures cholesterol carried by high-density lipoprotein particles, which assist in carrying excess cholesterol back to the liver for clearance.',
    clinicalContext:
      'Viewed as a favorable marker of lipid clearance efficiency. Higher numbers generally suggest effective reverse cholesterol transport.',
    category: 'Lipid Panel',
    commonQuestions: [
      'How does my HDL level influence my overall cholesterol ratio?',
      'What aerobic exercise routines or healthy dietary fats can help optimize my HDL levels?',
      'Are other metabolic markers like blood pressure and blood sugar aligned with this result?'
    ]
  },
  {
    id: 'bun_urea',
    canonicalName: 'Blood Urea Nitrogen (BUN) / Urea',
    synonyms: ['blood urea nitrogen', 'bun', 'urea', 'serum urea', 'blood urea'],
    whatItMeasures:
      'Measures nitrogen in your blood that comes from the waste product urea, which is made when protein is broken down in your body.',
    clinicalContext:
      'Looked at together with creatinine to understand kidney function and bodily hydration balance.',
    category: 'Kidney Function',
    commonQuestions: [
      'What does the BUN-to-creatinine ratio tell you about my hydration level?',
      'Could dietary protein or fluid intake the day before testing have shifted this result?',
      'Does this require any further investigation?'
    ]
  },
  {
    id: 'bilirubin_total',
    canonicalName: 'Total Bilirubin',
    synonyms: ['total bilirubin', 'bilirubin total', 's.bilirubin', 'bilirubin', 't. bilirubin'],
    whatItMeasures:
      'Measures the total amount of an orange-yellow pigment formed during the normal breakdown of aging red blood cells.',
    clinicalContext:
      'Assesses how the liver and biliary pathways process and excrete cellular breakdown products into the digestive tract.',
    category: 'Liver Function',
    commonQuestions: [
      'What is the breakdown between direct (conjugated) and indirect (unconjugated) bilirubin?',
      'Could fasting or mild dehydration have contributed to this reading?',
      'Are any additional liver or gallbladder evaluations recommended?'
    ]
  },
  {
    id: 'alkaline_phosphatase',
    canonicalName: 'Alkaline Phosphatase (ALP)',
    synonyms: ['alkaline phosphatase', 'alp', 's.alkaline phosphatase', 'alk phos'],
    whatItMeasures:
      'Measures an enzyme that is especially concentrated in the bile ducts of the liver and in actively remodeling bone tissue.',
    clinicalContext:
      'Used to monitor liver biliary flow and normal bone turnover. Patterns are interpreted alongside other liver enzymes and calcium.',
    category: 'Liver Function',
    commonQuestions: [
      'Does this ALP pattern align more with liver biliary passages or bone metabolism?',
      'Should we consider checking GGT or a bone-specific isoenzyme to confirm its source?',
      'Is any follow-up test suggested?'
    ]
  },
  {
    id: 'vitamin_d',
    canonicalName: 'Vitamin D (25-Hydroxyvitamin D)',
    synonyms: ['vitamin d', '25-oh vitamin d', '25-hydroxy vitamin d', 'vit d', 'vit d3'],
    whatItMeasures:
      'Measures the primary circulating storage form of vitamin D, which regulates calcium absorption, bone strength, and cellular health.',
    clinicalContext:
      'Checked by clinicians to guide bone wellness, mineral balance, and seasonal dietary or sunlight guidance.',
    category: 'Vitamins & Hormones',
    commonQuestions: [
      'Based on this level, do you recommend dietary changes, safe sun exposure, or a specific supplement?',
      'How does this interact with my calcium levels and bone density?',
      'When should we re-check this level after adjusting my routine?'
    ]
  },
  {
    id: 'crp',
    canonicalName: 'C-Reactive Protein (CRP)',
    synonyms: ['crp', 'c-reactive protein', 'hs-crp', 'high sensitivity crp'],
    whatItMeasures:
      'Measures an acute-phase protein synthesized by the liver whose blood levels increase in response to bodily inflammation or immune signaling.',
    clinicalContext:
      'Provides a general gauge of systemic inflammation. It is non-specific and is evaluated alongside a patient’s overall symptoms.',
    category: 'Inflammation & Immunology',
    commonQuestions: [
      'Could a recent minor injury, toothache, or seasonal illness have temporarily raised this marker?',
      'Is this a standard CRP or a high-sensitivity (hs-CRP) test used for cardiovascular tracking?',
      'Should we repeat this test after a couple of weeks to ensure it resolves?'
    ]
  },
  {
    id: 'serum_potassium',
    canonicalName: 'Serum Potassium (K+)',
    synonyms: ['potassium', 'k+', 'serum potassium', 's.potassium'],
    whatItMeasures:
      'Measures an essential electrolyte mineral that controls electrical conductivity in nerve signaling and heart and skeletal muscle contraction.',
    clinicalContext:
      'Closely monitored in cardiovascular care, kidney assessment, and when patients take blood pressure medications or diuretics.',
    category: 'Electrolytes & Minerals',
    commonQuestions: [
      'Could slight sample hemolysis during collection have affected this potassium reading?',
      'Do any of my medications or dietary habits influence my potassium balance?',
      'Does this require immediate re-verification or routine monitoring?'
    ]
  },
  {
    id: 'serum_sodium',
    canonicalName: 'Serum Sodium (Na+)',
    synonyms: ['sodium', 'na+', 'serum sodium', 's.sodium'],
    whatItMeasures:
      'Measures the major extracellular electrolyte mineral responsible for regulating water balance, blood volume, and osmotic pressure.',
    clinicalContext:
      'Reviewed to assess whole-body hydration balance, fluid regulation, and electrolyte homeostasis.',
    category: 'Electrolytes & Minerals',
    commonQuestions: [
      'What does this reflect about my daily fluid intake and hydration state?',
      'Are there any interactions with my salt intake or medications?',
      'When should electrolytes be re-checked?'
    ]
  }
];

export function findGlossaryEntry(testName: string): GlossaryEntry | null {
  if (!testName) return null;
  const normalized = testName.trim().toLowerCase().replace(/[^a-z0-9]/g, ' ');
  const tokens = normalized.split(/\s+/).filter(Boolean);

  // 1. Direct match on id or exact canonical/synonym
  for (const entry of MEDICAL_GLOSSARY) {
    if (entry.id.toLowerCase() === normalized) return entry;
    for (const syn of entry.synonyms) {
      const synNorm = syn.toLowerCase().replace(/[^a-z0-9]/g, ' ');
      if (normalized === synNorm) return entry;
    }
  }

  // 2. Substring or multi-token match
  for (const entry of MEDICAL_GLOSSARY) {
    for (const syn of entry.synonyms) {
      const synNorm = syn.toLowerCase().replace(/[^a-z0-9]/g, ' ');
      // Exact word inclusion
      const regex = new RegExp(`\\b${synNorm}\\b`, 'i');
      if (regex.test(normalized)) return entry;
    }
  }

  // 3. Fallback token containment for abbreviations like alt, ast, tsh, hb
  for (const entry of MEDICAL_GLOSSARY) {
    for (const syn of entry.synonyms) {
      if (syn.length >= 2 && tokens.includes(syn.toLowerCase())) {
        return entry;
      }
    }
  }

  return null;
}
