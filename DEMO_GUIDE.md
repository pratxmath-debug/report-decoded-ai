# Spark Decoded — Judge Demonstration Guide

**Project:** Spark Decoded  
**Team:** Solvyn  
**Event:** AAYU Hackathon 2026  
**Problem Statement:** T02 — Report, Decoded  
**Live Demo URL:** `http://localhost:5173/`  

---

## ⏱️ 3-Minute Hackathon Demo Script

### 1. Introduction (0:00 – 0:30)
- **Hook:** *"Every year, millions of patients receive laboratory reports full of numerical values, abbreviations, and out-of-range flags. They leave the clinic anxious, searching Google, and finding catastrophic self-diagnoses."*
- **Solution:** *"Spark Decoded is an educational, privacy-first healthcare AI platform. It decodes lab results in plain language, compares them with printed reference ranges, and prepares patients to have a constructive, informed conversation with their doctor."*
- **Key Tenet:** *"We never diagnose diseases or recommend treatments. Everything is deterministic, verified, and completely private on your device."*

---

### 2. Live Walkthrough Step-by-Step (0:30 – 2:15)

#### Step 1: The Landing Page & 3D Core
1. Show the **Landing Page** at `http://localhost:5173/`.
2. Highlight the **Medical Shield & Clarity Spark** logo and the Three.js **3D Spark Intelligence Core**.
3. Point out the core headline: *"Understand Your Lab Reports. Discover the Meaning Behind Every Number."*
4. Click **"Explore Interactive Demo"** or **"Try Sample Report"**.

#### Step 2: Sample Selection & OCR Demonstration
1. The app loads our sample **Comprehensive Metabolic & Lipid Panel** (or you can drag-and-drop a sample scan image/PDF).
2. Explain: *"Spark Decoded uses in-browser Tesseract.js and PDF.js. No patient health records ever touch a remote server."*

#### Step 3: Patient Verification Step (Critical Safety Step)
1. Point to the **Patient Verification Screen**.
2. Explain to the judges: *"OCR is rarely 100% flawless in medicine. Rather than blindly trusting machine vision, Spark Decoded empowers patients to review, edit, or adjust their numbers side-by-side with confidence indicators before any analysis occurs."*
3. Show how a value can be reviewed or edited.
4. Click **"Confirm & Decode Report"**.

#### Step 4: Results Dashboard & Deterministic Classification
1. The dashboard opens with 5 distinct summary cards:
   - **Total Tests**, **Within Range**, **Above Range**, **Below Range**, and **Needs Verification**.
2. Point out **HbA1c (6.2%)**:
   - Highlight the **Dynamic Range Visualizer Bar**: The golden marker clearly sits above the printed upper limit (`< 5.7%`).
   - Click the parameter or view the plain-language explanation: *"Average blood sugar levels over the past 2 to 3 months."*
3. Show **Deterministic Integrity**:
   - *"We never use an LLM to decide whether a number is high or low. That is 100% deterministic math based on the lab printout. An LLM is only used (if configured) for educational language phrasing with strict safety guardrails."*

#### Step 5: Doctor Consultation Questions & Print Export
1. Scroll to the **"Questions for Your Next Doctor's Visit"** section.
2. Show the structured questions:
   - *"How does my 3-month average HbA1c align with my daily glucose readings?"*
   - *"Could recent hydration or fasting time have influenced my ALT level?"*
3. Click **"Print Doctor Consultation Brief"** to show the clean, printer-friendly summary report designed to be taken directly into the doctor's appointment.

#### Step 6: Multi-Report Comparison
1. Click the **"Compare"** button in the navbar or dashboard.
2. Show longitudinal trend tracking comparing the current report against a prior baseline report, displaying percentage shifts and directional delta indicators.

#### Step 7: Educational Medical Test Catalog
1. Click **"Medical Tests"** in the top navbar (`/tests`).
2. Show the live **SQLite Database-backed Catalog** with 16 comprehensive clinical biomarkers and 8 categories.
3. Click on **HbA1c** or **Serum Creatinine** to open the clinical drawer showing:
   - What it measures
   - Why doctors order it
   - Clinical interpretation limitations
   - Accredited citations (ADLM, Mayo Clinic, NIH MedlinePlus, ADA, WHO)

---

### 3. Summary & Judge Takeaways (2:15 – 3:00)

| Core Judge Criterion | Spark Decoded Implementation |
|---|---|
| **Clinical Safety** | Zero diagnostic claims. Strict disclaimer presence. Deterministic range math. |
| **Patient Privacy** | 100% in-browser OCR and parsing. No patient health records stored on server. |
| **Reliability** | 28 automated unit tests passing. Deterministic fallbacks if AI is not configured. |
| **UI/UX Excellence** | Premium clinical palette (forest teal, medical teal, sage, ivory), custom vector illustrations, 3D Three.js core. |
| **Architectural Depth** | React + TypeScript frontend with a real native SQLite database (`node:sqlite`) and Express REST API. |

---

## 🛠️ Backup Demo Steps (In Case of Questions)

- **What if a lab report has unusual units?**  
  Show the manual entry fallback in the verification screen where users can add or modify custom units and reference intervals.
- **What if internet connectivity drops?**  
  The core report decoder runs 100% offline in client browser memory.
- **Where are accredited sources cited?**  
  Every test detail in `/tests` cites ADLM, Mayo Clinic Laboratories, or the NIH National Library of Medicine.
