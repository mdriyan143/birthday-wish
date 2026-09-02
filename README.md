# 🎀 Birthday Wish — Animated Birthday Surprise Website

A multi-screen, animated birthday surprise website built with vanilla HTML, CSS, and JavaScript. The site takes the visitor through a story-like journey — from a locked envelope intro to a personal letter, a candle-blowing cake, and a final celebration screen — instead of showing everything on one page.

🔗 **Live Demo:** https://mdriyan143.github.io/birthday-wish
📦 **Repository:** https://github.com/mdriyan143/birthday-wish

🔐 **Demo access:** <br>Date — 28 June 2024 <br> Passcode — 2806

## ✨ Features

- 🔒 **Passcode-protected intro** — visitor must enter a specific date to unlock the surprise
- 🎬 **9-screen animated flow**: envelope intro → date lock → loading → hero → mail → letter → cake → countdown → celebration
- 💌 **Personal letter screen** with a photo gallery and graceful image fallbacks
- 🎂 **Interactive cake screen** — tap the candle to "blow it out"
- 🎉 **Canvas-based celebration screen** with confetti/fireworks effects and a typewriter text effect
- 🩷 **Glassmorphism UI, floating emoji particles, and smooth CSS transitions** throughout
- 📱 Fully responsive, mobile-friendly layout

## 🛠️ Tech Stack

- **HTML5** — semantic screen-based structure
- **CSS3** — animations, glassmorphism effects, responsive layout
- **Vanilla JavaScript** — screen navigation, passcode logic, canvas confetti, typewriter effect
- **Google Fonts** — Dancing Script, Playfair Display, Quicksand

## 📦 Dependencies

This is a pure vanilla front-end project — no npm packages or build tools required.

- [Google Fonts](https://fonts.google.com/) (loaded via CDN link in `index.html`)

## 🚀 Getting Started (Run Locally)

1. Clone the repository
   ```bash
   git clone https://github.com/mdriyan143/birthday-wish.git
   cd birthday-wish
   ```
2. Open `index.html` directly in your browser, **or** serve it with a local dev server (recommended, avoids file:// path issues):
   ```bash
   # using VS Code Live Server extension, or:
   npx serve .
   ```
3. Replace the images in the `image/` folder with your own photos if you want to personalize it further.

## 📁 Project Structure

```
birthday-wish/
├── index.html      # Screen markup for all 9 sections
├── style.css       # Animations, layout, glassmorphism styling
├── script.js       # Screen transitions, passcode check, cake/confetti logic
└── image/          # Photos and GIFs used across the letter/celebration screens
```

## 🔗 Links

- Live Demo: https://mdriyan143.github.io/birthday-wish
- Repository: https://github.com/mdriyan143/birthday-wish
