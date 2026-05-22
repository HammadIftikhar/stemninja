# STEM Ninja Website

> **Learn how to ~~learn~~ think better**

Personal tutoring website for Hammad Iftikhar — STEM Ninja.  
Live at: `your-domain.com`

---

## 📁 Repo Structure

```
stemninja/
├── index.html              ← Home page
├── assets/
│   ├── style.css           ← Global stylesheet (Ubuntu + DM Sans fonts)
│   ├── nav.js              ← Shared navigation (injected into every page)
│   ├── apps-script.gs      ← Google Apps Script (paste into Apps Script editor)
│   ├── logo_animated.gif   ← Animated logo (spinning gear)
│   ├── logo_dark.png       ← Dark logo (on light backgrounds)
│   ├── logo_silver.png     ← Silver logo (on dark backgrounds)
│   ├── hammad_grey.png     ← Headshot (grey suit)
│   └── hammad_navy.png     ← Headshot (navy suit)
└── pages/
    ├── about.html
    ├── courses.html
    ├── tutoring.html
    ├── notes.html
    ├── boosters.html
    └── signup.html
```

---

## 🚀 Deploy to Netlify (from GitHub)

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from GitHub
3. Build settings: leave blank (static site, no build command needed)
4. Publish directory: `/` (root)
5. Deploy — done!
6. Connect your GoDaddy domain under Site Settings → Domain Management

---

## 📧 Setting Up the Sign-Up Form (Google Apps Script)

1. Create a new Google Sheet (name it "STEM Ninja Sign-Ups")
2. Go to **Extensions → Apps Script**
3. Delete the default code, paste the contents of `assets/apps-script.gs`
4. Update the config at the top of the script:
   - `YOUR_EMAIL` — your Gmail address
   - `PREPLY_PHYSICS` — your Preply profile URL
   - `SUPERPROF_PHYSICS` — your Superprof Physics profile URL
   - `SUPERPROF_MATHS` — your Superprof Maths profile URL
   - `PATREON_CALENDAR` — your Patreon / Google Calendar booking link
5. Click **Deploy → New Deployment → Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the Web App URL
7. Open `pages/signup.html`, find `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` and replace it

---

## 🔗 Links to Update

Search for these placeholders and replace with your real URLs:

| Placeholder | Where | What it is |
|---|---|---|
| `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` | `pages/signup.html` | Apps Script web app URL |
| `YOUR_ID` (Preply) | `pages/tutoring.html`, `assets/apps-script.gs` | Preply profile URL |
| `YOUR_PHYSICS_PROFILE` (Superprof) | `pages/tutoring.html`, `assets/apps-script.gs` | Superprof Physics URL |
| `YOUR_MATHS_PROFILE` (Superprof) | `pages/tutoring.html`, `assets/apps-script.gs` | Superprof Maths URL |
| `YOUR_FOLDER_ID` (Google Drive) | `pages/notes.html`, `pages/boosters.html` | Free resources folder URL |

---

## ✏️ Adding a New Page

1. Copy any existing page from `pages/`
2. Update the `<title>` tag
3. Add a link in `assets/nav.js` (both desktop and mobile nav sections)
4. Add a link in the `<footer>` of relevant pages

---

## 📱 Fonts Used

- **Headings**: [Ubuntu](https://fonts.google.com/specimen/Ubuntu) — loaded via Google Fonts
- **Body**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) — loaded via Google Fonts

Both load from CDN, no installation needed.
