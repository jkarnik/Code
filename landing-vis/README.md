Landing Visualization demo

This is a minimal static landing page that shows a Chart.js bar chart on load.

Run locally with a simple static server (Python):

```bash
# from the project root
cd /Users/jkarnik/Code/landing-vis
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Files:
- `index.html` — landing page that includes Chart.js from CDN and `script.js`
- `styles.css` — basic styles
- `script.js` — chart initialization and simple controls

Next steps you might want:
- Replace Chart.js CDN with a local bundler setup (Vite/Parcel)
- Feed real data via fetch() to the chart
- Add accessibility improvements and tests
