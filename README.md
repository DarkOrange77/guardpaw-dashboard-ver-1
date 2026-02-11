###🛡️ GuardPaw Frontend

The UI for AI-Powered Animal Rescue Fraud Detection
GuardPaw is a modern, high-fidelity web application designed to expose fraudulent animal rescue fundraisers. This repository contains the frontend code built with Lovable, featuring a real-time "Analysis Queue" and a forensic reporting dashboard.

<img width="1603" height="908" alt="image" src="https://github.com/user-attachments/assets/3f81edb6-e9f5-46c8-b86d-c987bc60f321" />

## ✨ Key Features

### Forensic Analysis Form
A streamlined input for fundraiser URLs and descriptions with a custom "Analysis Tone" selector.

### Real-time Stats Dashboard
- **Cases Submitted**: Total count of forensic reviews.
- **Threats Detected**: Number of verified high-risk cases.
- **Cleared**: Legitimate fundraisers verified by AI.

### The Analysis Queue
A vertical timeline view showing active and past investigations.

### Detective Reports
Detailed results cards featuring:
- **Risk Level Badge**: Visual indicator (High/Medium/Low).
- **Red Flags List**: Specific extracted triggers (e.g., emotional blackmail, suspicious payment methods).
- **Pattern Matching**: Identifies classic scam signatures.
- **Actionable Recommendations**: Expert advice on how to proceed.

## 🎨 Design System

The UI follows a "Forensic Dark" theme:
- **Primary Color**: #F59E0B (Amber/Orange) for high-visibility actions.
- **Background**: #0F172A (Slate Dark) for a professional, focused atmosphere.
- **Typography**: Clean sans-serif hierarchy to ensure complex forensic data is readable at a glance.

## ⚙️ Technical Architecture

- **Framework**: React + Vite (via Lovable)
- **State Management**: Real-time synchronization with Supabase.
- **Backend Integration**: Triggers complex n8n workflows via secure webhooks.

This project is built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## 🚀 Quick Start

### Clone the Repo:
```bash
git clone https://github.com/your-username/guardpaw-frontend.git
```

### Install Dependencies:
```bash
npm install
```

### Environment Variables
Create a `.env` file and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Run Locally:
```bash
npm run dev
```

## Connection to GuardPaw "Brain" (n8n)

This frontend is designed to work in tandem with the GuardPaw n8n workflow. When a user clicks "Analyze Fundraiser", the following happens:

1. A webhook is sent to n8n with the id, description, and tone.
2. A new record is created in Supabase.
3. The UI listens for the n8n update via Supabase Realtime and automatically pops the "Detective Report" into the queue once processing is complete.
