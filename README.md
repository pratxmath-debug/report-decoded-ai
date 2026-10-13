# Spark Decoded

> **Understand your lab report. Prepare for your next doctor's visit.**  
> **Team:** Solvyn  
> **Event:** AAYU Hackathon 2026 — Problem Statement T02 (Report, Decoded)  
> **Domain:** Healthcare AI & Patient Communication  

[![Test Suite](https://img.shields.io/badge/Vitest-28%20Passed-124E4A.svg)](file:///Users/pmathur/.gemini/antigravity/scratch/report-decoded-ai/src/tests/classifier.test.ts)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-287F78.svg)](file:///Users/pmathur/.gemini/antigravity/scratch/report-decoded-ai/tsconfig.json)
[![Vite](https://img.shields.io/badge/Vite-5.4-A8C8BA.svg)](file:///Users/pmathur/.gemini/antigravity/scratch/report-decoded-ai/vite.config.ts)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-124E4A.svg)](file:///Users/pmathur/.gemini/antigravity/scratch/report-decoded-ai/src/components/SettingsModal.tsx)
[![Database](https://img.shields.io/badge/Database-Native%20SQLite%203-287F78.svg)](file:///Users/pmathur/.gemini/antigravity/scratch/report-decoded-ai/server/db.mjs)

---

## 1. Product Overview

Patients receive laboratory reports containing unfamiliar numerical values, abbreviations (e.g. ALT, SGOT, TSH, HbA1c), reference ranges, and flags (`H`, `L`, `*`). Patients frequently experience anxiety or turn to unvetted internet searches that present frightening diagnoses.

**Spark Decoded** is a patient-centric, privacy-first healthcare AI platform designed to bridge the medical communication gap:
1. **Extracts** laboratory report parameters from uploaded scans, photos, or text-based PDFs.
2. **Enables Patient Verification** with side-by-side editing before any interpretation is made.
3. **Compares** extracted values directly with the specific laboratory reference ranges printed on that report using deterministic arithmetic.
4. **Explains** what each test generally measures in plain language using an accredited educational glossary.
5. **Prepares** patients for their next doctor's visit by generating structured, safe, and actionable questions.

> ⚠️ **Core Healthcare Safety Principle:**  
> Spark Decoded **never** diagnoses a disease, recommends medical treatment, prescribes medication, or independently decides that an abnormal result indicates a specific clinical condition.

---

## 2. Visual Identity & Brand System

- **Medical Shield & Clarity Emblem:** A custom clinical identity combining a medical shield, precision healthcare cross, and central four-pointed clarity spark.
- **Premium Clinical Palette:**
  - **Deep Forest Teal:** `#124E4A` (Primary headers, high-contrast text, brand elements)
  - **Medical Teal:** `#287F78` (Primary accents, interactive highlights, active badges)
  - **Muted Sage:** `#A8C8BA` (Borders, subtle iconography, structural accents)
  - **Pale Mint:** `#E5F3ED` (Badges, pill containers, soft highlighted cards)
  - **Soft Ivory:** `#FAF9F5` (Base background, clean clinical reading surfaces)
  - **Ice White:** `#FFFFFF` (Card surfaces, elevated glass panels)
  - **Dark Graphite:** `#253532` (Body typography and reading contrast)
  - **Muted Slate:** `#667773` (Secondary captions, metadata labels)
- **Illustrated Healthcare Visuals:** Illustrated medical backgrounds with ambient lighting, friendly clinician-patient consultation graphics, and 3D Three.js intelligence core.
- **Multi-Page Experience:**
  - `/` — Interactive Report Decoder, 4-Stage Workflow, Reference Range Science, Responsible AI Commitments, FAQ
  - `/features` — In-depth breakdown of all 11 core clinical & UX capabilities
  - `/how-it-works` — 6-stage clinical explanation workflow + interactive test bench
  - `/tests` — Live database-powered medical catalog with search, category tabs, and test detail modals

---

## 3. Privacy & Safety Architecture

- **100% In-Browser Execution:** OCR (`Tesseract.js`), PDF rendering & text extraction (`PDF.js`), range classification, and glossary lookups run entirely inside the user's browser.
- **Zero Server Health Data Storage:** No patient report files, text snippets, or health numbers are transmitted to any remote storage or analytics platform. The SQLite database stores *strictly public educational test information*.
- **Session Wipe on Reset:** Resetting or loading a new report clears all state from memory.
- **Safe Fallback for Missing Ranges:** The deterministic rule engine **never** assumes missing information is normal, nor does it substitute arbitrary generic reference ranges. Parameters missing ranges are tagged as `Needs Verification`.
- **No LLM for Out-of-Range Decisions:** Range comparisons are purely arithmetic and deterministic. LLMs are never used to categorize in-range or out-of-range values.
- **Untrusted Input Protection:** If an optional Google Gemini API key is configured, report contents are treated strictly as untrusted data with system instructions preventing diagnoses or prescriptive decisions.

---

## 4. Quick Start & Local Development

### Prerequisites
- Node.js `v18+`, `v20+`, or `v24+` (tested on Node.js `v24.18.0`)
- npm `v9+` or `v11+`

### Installation & Run

```bash
# 1. Navigate to project directory
cd /Users/pmathur/.gemini/antigravity/scratch/report-decoded-ai

# 2. Install dependencies
npm install

# 3. Seed educational medical database (already seeded)
npm run db:seed

# 4. Start local development server (Vite + Express API middleware)
npm run dev
```

Open your browser at `http://localhost:5173/`.

### Run Automated Unit Tests

```bash
npm test
```
Runs 28 unit tests verifying:
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
- Multi-report delta calculations

### Production Build

```bash
npm run build
```
Executes TypeScript type checking (`tsc`) and Vite production bundling with chunk optimization.

---

## 5. User Workflow

```
[ Step 1: Landing Page ]
          │
          ├── "Decode My Report" ──────► [ Step 2: Upload Dropzone ]
          │                                  │
          └── "Try Sample Report"            ├── Drag & drop image / PDF
                     │                       ├── Tesseract.js OCR / PDF.js
                     ▼                       ▼
          [ Step 3: Patient Verification Screen ]
                     │  - Inspect side-by-side extracted values
                     │  - Correct OCR misreads or missing units
                     │  - Add manual tests if desired
                     ▼
          [ Step 4: Results & Doctor Preparation Dashboard ]
                     ├── Summary Cards (Total, Within, Above, Below, Verify)
                     ├── Range Visualizer Bars (Report Value vs Lab Bounds)
                     ├── Plain-Language Test Explanations (Curated Glossary)
                     ├── Generated Questions for Doctor Consultation
                     ├── Longitudinal Report Comparison Modal
                     └── Printer-Friendly Doctor Consultation Brief Export
```

---

## 6. Project Architecture

```
report-decoded-ai/
├── index.html                   # HTML entry point with medical favicon & title
├── package.json                 # Dependencies & scripts
├── vite.config.ts               # Vite bundler & API middleware integration
├── tailwind.config.js           # Design tokens (forest teal, medical teal, sage)
├── server/                      # Local Backend Services
│   ├── db.mjs                   # Native Node 24 SQLite connection (node:sqlite)
│   ├── index.mjs                # Express REST API (/api/tests, /api/categories)
│   ├── seed.mjs                 # Clinical database seeding script
│   └── data/                    # SQLite database storage (spark_decoded.sqlite)
└── src/
    ├── App.tsx                  # Main app router & report workflow coordinator
    ├── main.tsx                 # React DOM mount with BrowserRouter
    ├── index.css                # Global clinical styles & ambient gradients
    ├── components/
    │   ├── Navbar.tsx           # Compact clinical navigation
    │   ├── Footer.tsx           # Platform footer with sources & disclaimer
    │   ├── SparkLogo.tsx        # Medical shield & clarity spark SVG emblem
    │   ├── SparkCore3D.tsx      # Three.js 3D Intelligence Core
    │   ├── LandingHero.tsx      # Hero section with 3D Core & trust metrics
    │   ├── LandingSections.tsx  # End-to-end workflow, test preview, FAQ
    │   ├── ReportUpload.tsx     # Drag-and-drop file upload & OCR engine
    │   ├── VerificationScreen.tsx # Patient parameter verification & edit
    │   ├── ResultsDashboard.tsx # Results cards, ranges, & doctor questions
    │   ├── RangeVisualizer.tsx  # Dynamic reference-range comparison bar
    │   ├── ExplanationCard.tsx  # Plain-language biomarker explanation
    │   ├── DoctorQuestionsPanel.tsx # Structured consultation questions
    │   ├── ReportComparisonModal.tsx # Multi-report longitudinal comparison
    │   ├── ParameterDetailModal.tsx  # In-depth clinical biomarker drawer
    │   ├── SettingsModal.tsx    # Optional Gemini AI key configuration
    │   └── illustrations/       # Original healthcare SVG illustrations
    │       ├── DoctorReviewingReport.tsx
    │       ├── DoctorPatientDiscussion.tsx
    │       ├── ReportTransformationGraphic.tsx
    │       ├── MedicalEquipmentKit.tsx
    │       └── IllustratedPageBackground.tsx
    ├── pages/
    │   ├── FeaturesPage.tsx     # 11 platform capabilities deep-dive
    │   ├── HowItWorksPage.tsx   # 6-stage workflow & parameter test bench
    │   └── TestsExplorerPage.tsx # Database-backed medical test catalog
    ├── data/
    │   ├── glossary.ts          # Curated clinical test dictionary
    │   └── sampleReports.ts     # Illustrative CBC & Metabolic panel reports
    ├── services/
    │   └── testCatalogApi.ts    # REST API client for medical test repository
    ├── types/
    │   └── report.ts            # TypeScript definitions
    └── utils/
        ├── classifier.ts        # Deterministic reference-range rule engine
        ├── comparator.ts        # Longitudinal report delta comparison
        ├── doctorQuestions.ts   # Safe doctor question generator
        ├── extractor.ts         # OCR & PDF orchestrator
        ├── geminiAi.ts          # Optional Gemini client with safety guardrails
        ├── labParser.ts         # Regex & tokenization heuristics
        └── pdfParser.ts         # PDF.js text extraction
```

---

## 7. License & Credits

Built for the **AAYU 2026 Hackathon** by **Team Solvyn**.  
Problem Statement: **T02 — Report, Decoded**.  
All patient report data processing runs strictly on-device.
