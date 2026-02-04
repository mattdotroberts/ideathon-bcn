# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IdeathonBcn is a static website for a one-day hackathon event (March 23rd, 2025) in Barcelona that connects SMBs with developers, consultants, and strategists. The site serves three audiences: businesses seeking solutions, builders seeking opportunities, and sponsors seeking visibility.

## Tech Stack

- **Static site**: Pure HTML/CSS/JS (no build system, no framework)
- **Forms**: Submit via Relay.app webhook
- **i18n**: Client-side language switching (EN/ES/CA) using `translations.js` and `data-i18n` attributes
- **Design**: Bauhaus-inspired "Graphic Brutalist" style with Bebas Neue + DM Sans fonts

## Development

```bash
# Start local server
python3 -m http.server 8080

# View site
open http://localhost:8080
```

No build step required - edit files directly and refresh browser.

## Architecture

### Core Files
- `index.html` - Single-page site structure with all sections
- `styles.css` - Main stylesheet (Graphic Brutalist design)
- `script.js` - Countdown timer, language switching, form submission
- `translations.js` - All text content in EN/ES/CA

### Form Submission
Forms POST to webhook: `https://hook.relay.app/api/v1/playbook/cml7vyme40f1g0om3fnu24c51/trigger/MYWOji31SUNMPb1GIv5B9w`

Three form types: `business`, `builder`, `partner` (distinguished by hidden `type` field).

### Language System
- Elements use `data-i18n="key.path"` attributes
- `translations` object in `translations.js` contains all strings
- `setLanguage(lang)` function updates all elements
- Language preference stored in localStorage

### Design Variants
Alternative designs preserved for reference:
- `styles-v1.css` - Bauhaus Barcelona
- `styles-v2.css` - Mediterranean Grid
- `styles-v3.css` - Graphic Brutalist (basis for main `styles.css`)

## Spec

Full requirements documented in `specs/website.md`.
