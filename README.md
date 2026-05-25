Fardin - Gaming-style Portfolio

This folder contains a simple gaming-themed portfolio page for Fardin, based on the styling and layout of the referenced portfolio repo. Open `fardin/index.html` in a browser to view.
Files of interest:
- `fardin/index.html` — main portfolio page
- `fardin/styles.css` — styles and theme
- `fardin/script.js` — small interactions (contact/hire buttons)
- `fardin/assets/avatar.svg` — avatar image used in the header

Run / Preview

1. Open locally (double-click or use the `open` command on macOS):

```bash
open fardin/index.html
```

2. Or serve via a simple HTTP server (recommended for consistent asset loading):

```bash
# from the Fardin folder
python3 -m http.server 8000
# then open http://localhost:8000/fardin/index.html
```

Next steps you can ask me to do:
- Swap placeholder contact emails with real ones
- Add more gaming assets (background art, sprites)
- Integrate into your GitHub repo and create a branch/commit
 - Add an animated hero background (canvas-based) — implemented
Single-page behavior

- The site is now a single-page portfolio with a fixed top navigation. Clicking a nav link scrolls to the corresponding section using smooth scrolling. The active nav item highlights while scrolling.
