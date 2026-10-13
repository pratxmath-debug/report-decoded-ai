# Spark Decoded ⚡

> **Tagline:** Understand your lab report. Prepare for your next doctor's visit.  
> **Problem Statement:** AAYU 2026 Hackathon — T02 (Report, Decoded)  
> **Brand & Experience:** Spark Decoded — Next-Generation Laboratory Intelligence UI

[![Test Suite](https://img.shields.io/badge/Vitest-26%20Passed-emerald.svg)](file:///Users/pmathur/.gemini/antigravity/scratch/report-decoded-ai/src/tests/classifier.test.ts)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](file:///Users/pmathur/.gemini/antigravity/scratch/report-decoded-ai/tsconfig.json)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](file:///Users/pmathur/.gemini/antigravity/scratch/report-decoded-ai/vite.config.ts)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-teal.svg)](file:///Users/pmathur/.gemini/antigravity/scratch/report-decoded-ai/src/components/SettingsModal.tsx)

---

## 🌟 1. Product Overview

Patients receive laboratory reports containing unfamiliar numerical values, abbreviations (e.g. ALT, SGOT, TSH, HbA1c), reference ranges, and flags (`H`, `L`, `*`). Patients frequently experience anxiety or turn to unvetted internet searches that present frightening diagnoses.

**Spark Decoded** is a patient-centric, privacy-first web application designed to bridge the medical communication gap:
1. **Extracts** laboratory report parameters from uploaded scans, photos, or text-based PDFs.
2. **Compares** extracted values directly with the specific laboratory reference ranges printed on that report.
3. **Explains** what each test generally measures in plain language using a curated, non-diagnostic glossary.
4. **Prepares** patients for their next doctor's visit by generating structured, safe, and actionable questions.

> ⚠️ **Core Healthcare Safety Principle:**  
> Spark Decoded **never** diagnoses a disease, recommends medical treatment, prescribes medication, or independently decides that an abnormal result indicates a specific clinical condition.

---

## ⚡ 2. Brand Identity & UI Redesign

- **New Identity:** Custom electric cyan and teal lightning-spark symbol inside a dimensional beveled container.
- **Visual Aesthetic:** Refined healthcare SaaS interface blending deep midnight navy (`#0B192C`), medical teal (`#0D9488`), electric cyan (`#06B6D4`), and soft ice-blue glass surfaces (`#F0F9FF`).
- **3D Interactive Hero:** Floating composite laboratory report card with layered isometric perspective, real-time comparison chips, and ambient lighting.
- **Clinical Dashboard:** 5 distinct dimensional summary cards (Total Parameters, Within Range, Above Range, Below Range, Needs Verification), responsive filter chips, and accessible search.

---

## 🔒 3. Privacy & Safety Architecture

- **100% In-Browser Execution:** OCR (`Tesseract.js`), PDF rendering & text extraction (`PDF.js`), range classification, and glossary lookups run entirely inside the user's browser.
- **Zero Server Uploads:** No patient report files, text snippets, or health numbers are transmitted to any remote storage or analytics platform.
- **Session Wipe on Reset:** Resetting or loading a new report clears all state from memory.
- **Safe Fallback for Missing Ranges:** The deterministic rule engine **never** assumes missing information is normal, nor does it substitute arbitrary generic reference ranges.
- **No LLM for Out-of-Range Decisions:** Range comparisons are purely arithmetic and deterministic. LLMs are never used to categorize in-range or out-of-range values.
- **Untrusted Input Protection:** If an optional Google Gemini API key is configured, report contents are treated strictly as untrusted data with system instructions preventing diagnoses or prescriptive decisions.

---

## 🚀 4. Quick Start & Local Development

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node.js `v24.18.0`)
- npm `v9+` or `v11+`

### Installation & Run

```bash
# 1. Navigate to project directory
cd /Users/pmathur/.gemini/antigravity/scratch/report-decoded-ai

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser at `http://127.0.0.1:5173/` or `http://localhost:5173/`.

### Run Automated Unit Tests

```bash
npm test
```
Runs 26 unit tests verifying:
- Values below reference intervals
- Values equal to lower boundary (boundary inclusivity)
- Values equal to upper boundary
- Values above reference intervals
- One-sided reference limits (`< 5.7`, `> 40`, `Up to 35`)
- Qualitative test results (`Negative`, `Non-reactive`)
- Missing value guardrails (`NEEDS_VERIFICATION`)
- Missing reference range guardrails (`NEEDS_VERIFICATION`)
- Invalid intervals (e.g. `100 - 50` where lower > upper)
- Curated medical glossary lookups and exact fallback message for unknown tests

### Production Build

```bash
npm run build
```

---

## 📋 5. User Workflow

```
[ Step 1: Landing Page ]
          │
          ├── "Decode My Report" ──────► [ Step 2: Upload Dropzone ]
          │                                        │
          └── "Explore Sample Report" ─┐          ├── Supported: JPG, JPEG, PNG, PDF
                                       │          ├── Real OCR (Tesseract.js)
                                       │          ├── Real PDF.js parsing + Scanned OCR fallback
                                       │          └── Manual Entry Fallback
                                       ▼                   │
                          [ Step 3: Verification Screen ]
                                       │
                                       ├── Review extracted test names, values, units & ranges
                                       ├── Edit typos, add missing rows, or remove spurious rows
                                       ├── Clear "Needs verification" alerts
                                       ▼
                          [ Step 4: Analysis Dashboard ]
                                       │
                                       ├── Summary Metrics (Total, Within, Above, Below, Needs Verification)
                                       ├── Non-alarmist status classifications
                                       ├── Graphic visual reference scale bars
                                       ├── Curated plain-language explanation cards
                                       ├── Search & category filters
                                       └── "Questions to discuss with your doctor" Checklist (Print / Copy)
```

---

## 🧪 6. Demo Experience (Try Sample Report)

For quick hackathon evaluation without uploading personal documents, click **"Explore Sample Report"** on the landing page or upload screen:

1. **Option 1: Standard Health Screening (Illustrative Demo)**  
   Features realistic fictional values for:
   - **HbA1c:** `6.2 %` (Printed Ref: `< 5.7`) → Classified as *Above lab reference range*
   - **TSH:** `4.85 uIU/mL` (Printed Ref: `0.40 - 4.20`) → Classified as *Above lab reference range*
   - **ALT / SGPT:** `28 U/L` (Printed Ref: `7 - 56`) → Classified as *Within lab reference range*
   - **Hemoglobin (Hb):** `14.1 g/dL` (Printed Ref: `13.2 - 16.6`) → Classified as *Within lab reference range*
   - **Serum Creatinine:** `0.92 mg/dL` (Printed Ref: `0.70 - 1.30`) → Classified as *Within lab reference range*
   - **Total Cholesterol:** `218 mg/dL` (Printed Ref: `< 200`) → Classified as *Above lab reference range*
   - **Platelet Count:** `135 10^3/uL` (Printed Ref: `150 - 450`) → Classified as *Below lab reference range*
   - **Urine Protein:** `Negative` (Printed Ref: `Negative`) → Classified as *Within lab reference range*

2. **Option 2: Low-Confidence / Incomplete Items Demo**  
   Demonstrates how the system handles missing reference ranges (e.g. Vitamin D without printed range) and unreadable smudged values, correctly tagging them as **"Needs verification"** instead of falsely assuming normal.

---

## 🩺 7. Curated Medical-Test Glossary

Covers standard routine and diagnostic parameters:
- **HbA1c (Glycated Hemoglobin)**
- **Blood Glucose (Fasting / Random / RBS)**
- **Hemoglobin (Hb)**
- **TSH (Thyroid Stimulating Hormone)**
- **ALT / SGPT (Alanine Aminotransferase)**
- **AST / SGOT (Aspartate Aminotransferase)**
- **Serum Creatinine**
- **Total Cholesterol, LDL, HDL, Triglycerides**
- **White Blood Cell Count (WBC) & Platelet Count**
- **BUN / Urea, Total Bilirubin, Alkaline Phosphatase (ALP)**
- **Serum Potassium (K+), Serum Sodium (Na+), Vitamin D, CRP**

### Unknown Test Protocol
When a parameter is not cataloged in the verified medical glossary, the app outputs the exact safe string:
> *"An explanation for this parameter is not available in the current glossary. Please ask your healthcare professional."*

---

## 💡 8. Doctor-Preparation Questions

The system dynamically builds patient-centered questions organized into four clear categories:
1. **General Context:** How these results relate to personal history and symptoms.
2. **Testing Validity:** How hydration, timing, recent exercise, or fasting conditions affect numbers.
3. **Follow-up & Monitoring:** Recommended follow-up intervals or confirmatory repeat tests.
4. **Lifestyle & Medications:** Potential interactions with prescription drugs, supplements, or diet.

Features:
- Interactive checkboxes to mark questions during the medical appointment.
- **Copy Checklist** button to copy cleanly formatted notes to clipboard.
- **Print Guide** button with print-optimized CSS for paper handouts.

---

## ⚙️ 9. Optional Gemini AI Integration

- The app operates **100% offline and free** without requiring any API keys.
- If a user wishes to enable interactive questions, they can input a Google Gemini API key via the **AI Settings** modal.
- Key is stored strictly in `sessionStorage` (cleared when tab closes).
- Strict system prompts prohibit diagnosing diseases, prescribing treatments, or modifying deterministic lab rules.

---

## 📊 10. Limitations & Future Roadmap

- **OCR Language:** The client-side Tesseract.js model is currently configured for English character sets.
- **Complex Multi-Column Tabular Scans:** While regex heuristics parse most standard single/double column reports, highly distorted camera photos may require quick manual verification in the Verification screen.
- **Browser Memory:** Very large PDFs (>50 pages) may take several seconds to render canvas frames on low-powered mobile devices.
