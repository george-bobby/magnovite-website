## Magnovite'25 – Website

Modern landing + gallery site for Magnovite'25 (CHRIST University, Kengeri Campus).

### Features
- Hero scroll experience with GSAP animations on the home page
- Promo video CTA and branded modal player (landscape, controls, Esc/backdrop/close button)
- Unified header and footer with logos from `public/`
- Dedicated Gallery page with responsive grid
- Site-themed lightbox: open on click/tap, next/previous navigation, arrow keys, close via Esc/backdrop/button
- Accessibility: focusable thumbnails, keyboard open (Enter/Space)

### Tech Stack
- HTML, CSS (no framework)
- Vanilla JavaScript
- GSAP + ScrollTrigger (home page only)

### Getting Started
1. Clone the repo
   - `git clone <your-repo-url>`
2. Open locally
   - Use any static server or open `index.html` directly
   - Recommended: `npx serve .` or VS Code Live Server
3. File paths
   - Assets live under `public/`
   - Styles in `src/style.css`
   - Scripts in `src/script.js`

### Project Structure
```
├── index.html           # Home page
├── gallery.html         # Gallery page
├── public/              # Images and media (logos, gallery, video)
│   ├── Gallery/         # All gallery photos
│   ├── christwhite.png  # Christ logo (header/footer)
│   ├── magnovite.png    # Magnovite logo + favicon
│   └── promo.mp4        # Promo video
├── src/
│   ├── style.css        # Site styles
│   └── script.js        # Animations + modal + lightbox
└── README.md
```

### Development Notes
- Home page GSAP is feature-guarded to avoid errors on non-home pages
- Lightbox supports:
  - Open on click/tap/Enter/Space
  - Next/Previous buttons and Arrow keys
  - Close via Esc/backdrop/Close button
  - Smooth open/close transitions

### Deployment
- Static hosting works (GitHub Pages, Netlify, Vercel)
- Ensure paths remain relative (`./public/...`)

### License
This project is intended for Magnovite'25. Media assets belong to their respective owners.
