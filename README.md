<div align="center">

# Angular Line Chart with Error Bars

Chart.js line chart with stacked above/below "error bars" in Angular, powered by ng2-charts.

[![Live demo](https://img.shields.io/badge/StackBlitz-live%20demo-1389FD?logo=stackblitz&logoColor=white)](https://stackblitz.com/edit/angular-ivy-nmrsrj)
[![GitHub stars](https://img.shields.io/github/stars/niccolofanton/Angular-chart.js-lineChart-with-error-bars?style=social)](https://github.com/niccolofanton/Angular-chart.js-lineChart-with-error-bars/stargazers)

**[▶ Open the live demo on StackBlitz](https://stackblitz.com/edit/angular-ivy-nmrsrj)**

![Preview](https://raw.githubusercontent.com/niccolofanton/Angular-chart.js-lineChart-with-error-bars/master/BPwEX14.png)

</div>

## What it does

A small Angular demo that combines a **line chart** (the `Target` series) with
stacked **deviation bars** rendered on top of it to imitate error bars. Each data
point shows how much the actual value sits **above** (`More`) or **below**
(`Less`) its target, using two floating, range-style bar datasets so the
deviation is visible at a glance.

It is meant as a worked example of how to push Chart.js v3 beyond the built-in
chart types: floating bars (`[from, to]` values) with rounded corners and
conditional `borderSkipped`, per-dataset data labels via
`chartjs-plugin-datalabels`, custom tooltip callbacks that report the absolute
deviation and running total, and a click-to-toggle interaction that swaps the
whole dataset for an alternate "entity" layout. The `Target` series is seeded
with Perlin noise; the per-point `More` / `Less` deviations are random values.

## Quick start

```bash
# install dependencies
npm install

# run the dev server (http://localhost:4200)
npm start

# production build
npm run build
```

> No lockfile is committed, so the exact package manager isn't pinned; the npm
> scripts above (`start` → `ng serve`, `build` → `ng build`) come straight from
> `package.json`.

Open `http://localhost:4200` and **click anywhere on the chart** to toggle
between the two visualizations.

## Features

- Line chart (`Target`) overlaid with stacked `More` / `Less` deviation bars
- Floating range bars (`[from, to]` values) with rounded corners and smart `borderSkipped`
- Custom data labels per dataset (anchor, align, color, offset) via `chartjs-plugin-datalabels`
- Tooltip callbacks showing absolute deviation and the resulting total
- Click-to-toggle between the default view and an alternate "entity" layout
- `Target` series seeded with Perlin noise; `More` / `Less` deviations use random values

## Tech stack

- [Angular](https://angular.io/) — runtime `@angular/*` ^12.1.0, built with the Angular 11 CLI toolchain (`@angular/cli` ~11.0.4)
- [Chart.js](https://www.chartjs.org/) 3 + [ng2-charts](https://github.com/valor-software/ng2-charts) 2
- [chartjs-plugin-datalabels](https://chartjs-plugin-datalabels.netlify.app/)
- [perlin-noise](https://www.npmjs.com/package/perlin-noise) for the target series
- TypeScript

## Credits

Created by [niccolofanton](https://github.com/niccolofanton). Originally
prototyped on [StackBlitz](https://stackblitz.com/edit/angular-ivy-nmrsrj).
