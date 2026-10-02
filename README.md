# universeinvedors.tech — Static Website Platform

A scalable collection of independent static websites hosted on **Cloudflare Pages**, deployed via **GitHub**, served on a **custom domain** with per-project subdomains.

---

## Architecture

```
VS Code
  └─► GitHub repository / repositories
        └─► Cloudflare Pages (auto-deploy on push)
              └─► Custom domain + subdomains
                    ├── universeinvedors.tech           (main site)
                    ├── project1.universeinvedors.tech  (project 001)
                    ├── project2.universeinvedors.tech  (project 002)
                    └── ...
```

### Repository strategy

Each project is a **separate Cloudflare Pages project** pointing to its own GitHub repository (or a separate branch/folder in this monorepo). This gives:

- Independent deploy history per project
- No risk of one project breaking another
- Separate build settings, environment variables, and headers per project

```
GitHub
├── website-main          ← this repo (main/ folder)
├── website-project-001   ← created when you add project 001
├── website-project-002
└── ...
```

> **Why separate repos instead of a monorepo?**
> Cloudflare Pages free tier supports unlimited sites, each connected to its own repo.
> Separate repos mean each project has its own deploy triggers, deploy history, and
> rollback capability. A bad commit to project-003 never risks project-001's live site.

---

## Directory structure

```
d:\My Websites\
├── .gitignore
├── .vscode/
│   └── extensions.json
├── README.md               ← you are here
├── DOMAIN_SETUP.md         ← DNS configuration guide
├── ADSENSE_SETUP.md        ← AdSense integration guide
├── PROJECT_SETUP.md        ← How to add a new project
│
├── main/                   ← Root website (universeinvedors.tech)
│   ├── _headers
│   ├── _redirects
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   ├── privacy.html
│   ├── terms.html
│   ├── 404.html
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── ads.txt
│   ├── css/style.css
│   ├── js/main.js
│   └── assets/
│       ├── images/
│       └── icons/
│
├── project-template/       ← Copy this to create each new project
│   ├── _headers
│   ├── _redirects
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   ├── privacy.html
│   ├── terms.html
│   ├── 404.html
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── ads.txt
│   ├── css/style.css
│   ├── js/main.js
│   ├── assets/images/
│   └── assets/icons/
│
└── components/
    └── ads/                ← Reusable AdSense ad slot snippets
        ├── README.md
        ├── header-ad.html
        ├── content-ad.html
        ├── sidebar-ad.html
        └── footer-ad.html
```

---

## Quick start

### 1. Set up the main site

1. Open this folder in VS Code.
2. Find and replace `universeinvedors.tech` everywhere with your actual domain.
3. Fill in your real contact email in `contact.html` and `privacy.html`.
4. Add your favicon files to `main/assets/icons/`.
5. Add your OG image to `main/assets/images/og-image.png`.

### 2. Deploy to Cloudflare Pages

See **DOMAIN_SETUP.md** and **PROJECT_SETUP.md** for the full guide.

### 3. Add a project

See **PROJECT_SETUP.md → "Adding a new project"**.

---

## Documentation

| File                | Purpose                                      |
|---------------------|----------------------------------------------|
| `DOMAIN_SETUP.md`   | DNS records you must configure manually      |
| `ADSENSE_SETUP.md`  | How to connect Google AdSense                |
| `PROJECT_SETUP.md`  | Step-by-step: add a new project              |

---

## Technology

- **Hosting:** Cloudflare Pages (free tier)
- **CDN:** Cloudflare global network
- **CI/CD:** GitHub → Cloudflare Pages auto-deploy
- **Stack:** Static HTML, CSS, vanilla JS — no build step required
- **HTTPS:** Automatic via Cloudflare

---

## Placeholders reference

Search and replace these strings when customising:

| Placeholder              | Meaning                                     |
|--------------------------|---------------------------------------------|
| `universeinvedors.tech`              | Your actual domain (e.g. `example.com`)     |
| `PROJECT_NAME`           | Display name of a project                   |
| `PROJECT_SUBDOMAIN`      | Subdomain slug (e.g. `tools`, `blog`)       |
| `PROJECT_DESCRIPTION`    | SEO description ≤ 160 chars                 |
| `[YOUR_EMAIL@EXAMPLE.COM]` | Your contact email                        |
| `[DATE]`                 | Date for legal pages                        |
| `[OWNER NAME]`           | Your name / company                         |
| `ca-pub-XXXXXXXXXXXXXXXX`| AdSense publisher ID (after approval)       |
| `XXXXXXXXXX`             | AdSense ad unit IDs (after approval)        |
