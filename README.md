# 🌴 HH Goa 2026 — Builder ID Generator

A mobile-first, high-performance web application built for **Hacker House Goa 2026**. Users can upload their photo, enter their builder details, and generate a customized, branded **Hacker House Goa 2026 Builder ID Card** ready to download as a high-resolution PNG or share on X (Twitter).

![Hacker House Goa 2026](https://img.shields.io/badge/HACKER%20HOUSE-GOA%202026-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)

---

## ✨ Features

- **🌴 Hacker House Goa Visual Identity**:
  - Dark forest green background with bright yellow typography and hot pink accents.
  - Custom vector Goa sunset illustration featuring setting sun, palm trees, ocean waves, and surfboards.
  - Retro Didone condensed title typography (`HACKER HOUSE`) with Devanagari script (`गोवा`).

- **📷 Photo Upload & Live Drag/Zoom Controls**:
  - Drag-and-drop or file selector photo upload.
  - Supports **JPEG, PNG, WebP, and HEIC** (automatically converted from iPhones via `heic2any`).
  - Interactive photo controls: **drag to position**, **zoom slider**, and **reset**.

- **⚡ Smart Builder Title Generator**:
  - Automatically generates fun, personalized Builder Titles (e.g. *The Full-Stack Alchemist*, *The Pixel Pirate*, *The Protocol Pioneer*) based on the user's role and stack.

- **⬇ PNG Export & Mobile Downloads**:
  - Export cards at high resolution via `html-to-image`.
  - **Synchronous Blob export** ensures programmatic downloads land directly in the user's local `Downloads` directory as `HH-Goa-2026-Builder-ID.png`.
  - Dedicated **"VIEW / SAVE IMAGE"** button for mobile in-app webviews (Instagram, X webview) to allow tap-and-hold image saving.

- **📱 Mobile-First & Responsive**:
  - Dynamic scaling (`ScaledCard`) keeps the 420px high-res card canvas perfectly responsive on any screen width without layout distortion or overlapping buttons.

---

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v4 + Custom Vanilla CSS Design System
- **Fonts**: Google Fonts (`Playfair Display`, `Yatra One`, `Space Mono`, `Poppins`, `Inter`)
- **Image Processing**: `heic2any` (dynamic chunk for HEIC conversion)
- **DOM Canvas Export**: `html-to-image`

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/atharva07-SYS/HackerHouseGoa.git
   cd HackerHouseGoa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License

MIT License. Built for Hacker House Goa 2026.
