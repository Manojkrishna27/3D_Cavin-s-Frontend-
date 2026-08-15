# 🍫 Cavin's — Chocolate Milkshake | Since 1825

A premium, immersive 3D product landing page for **Cavin's Chocolate Milkshake** — built with React, Vite, GSAP animations, and a scroll-driven frame sequence experience.

> *"Rich chocolate. Creamy texture. An indulgent taste made for moments worth slowing down for."*

---

## ✨ Features

- 🎬 **Frame-by-frame scroll animation** — 200-frame image sequence driven by scroll position
- 🌀 **GSAP-powered animations** — smooth entrance effects, timeline-based reveals, and scroll triggers
- 🌊 **Lenis smooth scroll** — buttery-smooth scrolling throughout the page
- 🍦 **Flavour Collection** — interactive showcase of product variants (Chocolate, Butterscotch, Strawberry, Vanilla)
- 🎨 **Premium dark aesthetic** — rich chocolate tones, glassmorphism effects, and cinematic typography
- 📱 **Responsive design** — optimized for all screen sizes
- ⚡ **Vite + React** — blazing-fast dev and build pipeline

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 8](https://vite.dev/) | Build tool & dev server |
| [GSAP 3](https://gsap.com/) | Animations & ScrollTrigger |
| [Lenis](https://github.com/studio-freight/lenis) | Smooth scrolling |
| Vanilla CSS | Styling & responsive layouts |
| Google Fonts | Playfair Display, Cormorant Garamond, Inter |

---

## 📁 Project Structure

```
cavin-website/
├── public/
│   ├── frames/              # 200-frame scroll animation sequence (ezgif-frame-001 to 200)
│   └── icons.svg
├── src/
│   ├── assets/              # Product images (hero, flavours)
│   ├── components/
│   │   ├── LoadingScreen.jsx      # Initial loading animation
│   │   ├── Navigation.jsx         # Top navbar
│   │   ├── HeroSequence.jsx       # Scroll-driven 3D frame sequence
│   │   ├── BrandStory.jsx         # "Since 1825" brand narrative section
│   │   ├── ChocolateSection.jsx   # Rich chocolate feature section
│   │   ├── CreamySection.jsx      # Creamy texture feature section
│   │   ├── FlavourCollection.jsx  # Interactive flavour showcase
│   │   ├── ProductExperience.jsx  # Product details & CTA
│   │   ├── FinalCTA.jsx           # Final call-to-action section
│   │   └── Footer.jsx             # Site footer
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm `>= 9`

### Installation

```bash
# Clone the repository
git clone https://github.com/Manojkrishna27/3D_Cavin-s-Frontend-.git

# Navigate into the project
cd 3D_Cavin-s-Frontend-/cavin-website

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## ☁️ Deployment (Vercel)

This project is deployed on **Vercel**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Manojkrishna27/3D_Cavin-s-Frontend-)

### Manual Vercel Setup

1. Import the GitHub repo on [vercel.com](https://vercel.com)
2. Set the **Root Directory** to `cavin-website`
3. Framework preset: **Vite** (auto-detected)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy** 🚀

---

## 🎨 Design Highlights

- **Color palette** — Deep chocolate browns (`#2c1810`, `#8B4513`) with warm cream accents
- **Typography** — *Playfair Display* for headings, *Cormorant Garamond* for editorial text, *Inter* for UI
- **Animation system** — GSAP ScrollTrigger synced with Lenis for pixel-perfect scroll-driven storytelling
- **3D effect** — Canvas-rendered frame sequence gives the illusion of a rotating 3D product model

---

## 📜 License

This project is for portfolio/demo purposes. All product imagery and branding belongs to **Cavin's** (Hatsun Agro Product Ltd).

---

<p align="center">Made with ❤️ by <a href="https://github.com/Manojkrishna27">Manojkrishna27</a></p>
