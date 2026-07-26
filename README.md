 🛡️ OneHealth Surveillance Network

> An integrated public health, veterinary, and environmental surveillance platform for real-time risk mitigation, outbreak reporting, and GIS biosecurity tracking.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue?style=for-the-badge&logo=vercel)](https://one-chi-beryl.vercel.app/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

---

## 🌐 Live Application

Access the live deployed application here:
👉 **[https://one-chi-beryl.vercel.app/](https://one-chi-beryl.vercel.app/)**

---

## 📋 Overview

**OneHealth Surveillance** is a full-spectrum epidemiological and ecological threat monitoring platform designed according to the **OneHealth triad** (Human Health, Animal Health, and Environmental Factors). It empowers epidemiologists, biosecurity personnel, field officers, and health administrators to detect, report, and coordinate responses to emerging pathogen threats and zoonotic outbreaks.

---

## ✨ Key Features

### 📊 1. Public Health Surveillance Dashboard
- **Real-Time Epidemiological Metrics**: Tracks active outbreak alerts, total verified case reports, vaccination coverage percentages, and novel pathogen detections.
- **Regional Viral Load Heatmap**: High-level visual grid displaying geographic threat concentrations with direct GIS map launching.
- **OneHealth Threat Indicators**: Live tri-sector status badges for Human Health (Spillover cases), Animal Health (Avian/Wildlife mortality), and Environmental Health (Water/Aquifer testing).
- **Recent Critical Outbreak Stream**: Real-time ticker of verified field reports with status badges and quick mobilization controls.

### 📝 2. Field Disease Reporting Module
- **Intuitive Multi-Step Reporting**: Step-by-step reporting wizard for logging new pathogen sightings, vector clusters, or environmental anomalies.
- **Structured Threat Data**: Captures disease strain (e.g., Avian Flu H5N1, Dengue Virus, Lassa Fever, Water Contamination), location coordinates, species affected, and population impact counts.
- **Automated Alert Synchronization**: Submitting a report automatically broadcasts a critical alert to the system-wide notification feed.

### 🗺️ 3. Interactive GIS Surveillance Map
- **Geo-Spacial Outbreak Markers**: Interactive map canvas displaying critical outbreak points, warning signals, and stable surveillance nodes.
- **Outbreak Detail Cards**: Deep-dive popup cards showing 7-day incidence trends, species affected, identification codes, team mobilization actions, and alert sharing.
- **Layer & Severity Filters**: Instant filtering by pathogen category, species type, timeframe, or risk level.
- **Expandable Metrics Drawer**: Collapsible bottom statistics sheet providing sectoral breakdowns for human cases, animal alerts, and environmental sensor data.

### 🚨 4. Alerts & Notifications Center
- **Severity-Coded Warning Stream**: Real-time notification feed categorized by Critical, High, Medium, and Low risk levels.
- **Active vs. Historical Archives**: Easily toggle between unread active warnings and resolved historical logs.
- **Multi-Channel Subscriptions**: Configurable notification preferences for Email transmission and SMS broadcast alerts.
- **Major Event Timeline**: Historic milestone tracker logging vector control operations, WHO report submissions, and regional quarantine alerts.

### 🔐 5. Role-Based Access Control
- **Multi-Role Authentication**: Dedicated portals for Senior Epidemiologists, Field Surveillance Officers, Veterinary Specialists, and Environmental Analysts.
- **Demo Credentials**: One-click quick login buttons for immediate demonstration and testing.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 (TypeScript)
- **Build Tool & Dev Server**: Vite 6
- **Styling & Design System**: Tailwind CSS v4, Lucide React Icons
- **Animation Engine**: Motion (`motion/react`)
- **Backend Architecture**: Node.js / Express (ESM & CJS bundle support)
- **Deployment Platform**: Vercel

---

## 📁 Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── AlertsCenter.tsx         # Alerts stream & notification settings
│   │   ├── Dashboard.tsx            # Main epidemiology dashboard
│   │   ├── Login.tsx                # Role selection & login screen
│   │   ├── NavigationLayout.tsx     # Responsive sidebar & desktop app shell
│   │   ├── ReportForm.tsx           # Multi-step disease reporting form
│   │   └── SurveillanceMap.tsx      # GIS map & interactive outbreak drawer
│   ├── App.tsx                      # Root screen router & animated transitions
│   ├── data.ts                      # Initial surveillance reports & alert data
│   ├── types.ts                     # TypeScript definitions for reports & alerts
│   ├── main.tsx                     # React application entry point
│   └── index.css                    # Tailwind CSS configuration & global styles
├── metadata.json                    # Application metadata
├── package.json                     # Dependencies & build scripts
├── vite.config.ts                   # Vite configuration
└── README.md                        # Documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)

### Local Installation & Development

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/onehealth-surveillance.git
   cd onehealth-surveillance
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Type Check & Lint**:
   ```bash
   npm run lint
   ```

---

## 📄 License

Distributed under the Apache-2.0 License. See `LICENSE` for more information.
