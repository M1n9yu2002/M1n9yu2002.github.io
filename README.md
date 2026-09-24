# Mingyu Wang — portfolio

Source for [m1n9yu2002.github.io](https://m1n9yu2002.github.io/).

This is a static, multi-page site built with Node.js 22. Run `npm ci` and `npm run build` to generate the production site in `dist/`. Run `npm run preview` to serve that output locally.

Pushes to `main` build and deploy `dist/` through the GitHub Pages workflow in `.github/workflows/deploy-pages.yml`. The source repository excludes generated output, local QA captures, and private research materials.
