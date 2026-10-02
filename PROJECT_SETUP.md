# PROJECT_SETUP.md — How to Add a New Project

This document is your complete guide for adding a new project to the platform,
from copying the template to verifying HTTPS on the live subdomain.

---

## Overview

Each project follows this lifecycle:

```
1. Copy template  →  2. Customise  →  3. Create GitHub repo
       ↓
4. Create Cloudflare Pages project  →  5. Connect subdomain
       ↓
6. Verify HTTPS  →  7. Submit to Google  →  8. Enable AdSense (optional)
```

---

## Step 1 — Copy the template

In VS Code, duplicate the `project-template/` folder:

```
Copy:  project-template/
Paste: projects/project-001/     (or any name you choose)
```

Or in PowerShell:

```powershell
Copy-Item -Recurse "project-template" "projects\project-001"
```

Rename the folder to match your project slug (e.g. `tools`, `blog`, `project-001`).

---

## Step 2 — Customise the project

Open your new project folder and replace all placeholders.

### Global find-and-replace

| Search for              | Replace with                                |
|-------------------------|---------------------------------------------|
| `PROJECT_NAME`          | Your project's display name (e.g. `Tools`)  |
| `PROJECT_SUBDOMAIN`     | Subdomain slug (e.g. `tools`)               |
| `universeinvedors.tech`             | Your actual domain (e.g. `example.com`)     |
| `PROJECT_DESCRIPTION`   | Unique SEO description ≤ 160 characters     |

In VS Code: `Ctrl+Shift+H` → set scope to the project folder.

### Per-file checklist

- `index.html` — Write your project's actual content.
- `about.html` — Describe this specific project.
- `contact.html` — Add a real contact email or form.
- `privacy.html` — Customise for this project (do not copy-paste from another project).
- `terms.html` — Customise for this project.
- `robots.txt` — Update domain placeholder.
- `sitemap.xml` — Update domain placeholder and add all page URLs.
- `ads.txt` — Leave as placeholder until AdSense approved.
- `assets/icons/` — Add favicon files (see below).
- `assets/images/` — Add `og-image.png` (1200×630px).

### Generate favicons

Use [favicon.io](https://favicon.io) or [realfavicongenerator.net](https://realfavicongenerator.net).

Required files:
```
assets/icons/favicon.ico
assets/icons/favicon.svg
assets/icons/apple-touch-icon.png
```

---

## Step 3 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new).
2. Create a new **public** repository named e.g. `website-project-001`.
3. Do NOT initialise with a README (your project already has one).
4. In VS Code terminal, from inside your project folder:

```powershell
cd "d:\My Websites\projects\project-001"
git init
git add .
git commit -m "Initial commit: project-001"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/website-project-001.git
git push -u origin main
```

---

## Step 4 — Create a Cloudflare Pages project

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com).
2. Select your account → **Workers & Pages** → **Create application** → **Pages**.
3. Click **Connect to Git**.
4. Authorise Cloudflare to access your GitHub account (one-time setup).
5. Select your `website-project-001` repository.
6. Configure the build:

   | Setting               | Value                                    |
   |-----------------------|------------------------------------------|
   | Project name          | `website-project-001` (or any name)      |
   | Production branch     | `main`                                   |
   | Framework preset      | `None` (static HTML, no build step)      |
   | Build command         | *(leave empty)*                          |
   | Build output directory | `/` (root of the repo)                  |

7. Click **Save and Deploy**.
8. Cloudflare will deploy. Note the deployment URL: `your-project.pages.dev`.

---

## Step 5 — Connect the subdomain

1. In Cloudflare Pages → your project → **Custom domains**.
2. Click **Set up a custom domain**.
3. Enter: `project-001.universeinvedors.tech`
4. Click **Continue**.
5. Cloudflare will automatically add the CNAME DNS record if your domain uses
   Cloudflare DNS. If not, add it manually — see `DOMAIN_SETUP.md`.
6. Wait for DNS propagation (usually under 5 minutes on Cloudflare DNS).

---

## Step 6 — Verify HTTPS

Open a browser and navigate to:

```
https://project-001.universeinvedors.tech/
https://project-001.universeinvedors.tech/about.html
https://project-001.universeinvedors.tech/robots.txt
https://project-001.universeinvedors.tech/sitemap.xml
https://project-001.universeinvedors.tech/ads.txt
```

Verify:
- ✅ Green padlock (HTTPS active)
- ✅ No mixed content warnings
- ✅ All pages load correctly
- ✅ `robots.txt` and `sitemap.xml` return correct domain URLs

---

## Step 7 — Submit to Google

### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Add property → **URL prefix** → `https://project-001.universeinvedors.tech/`
3. Verify ownership (use the HTML tag method — add the meta tag to `<head>` in
   `index.html` and redeploy).
4. Submit sitemap: `https://project-001.universeinvedors.tech/sitemap.xml`

### Google Index Request

After verification, use the URL Inspection tool to request indexing of:
- `https://project-001.universeinvedors.tech/`

---

## Step 8 — Enable AdSense (when ready)

See **ADSENSE_SETUP.md** for the full guide. In summary:

1. Receive AdSense approval.
2. Update `ads.txt` with your real publisher ID.
3. Uncomment the AdSense script in `<head>`.
4. Uncomment the `<ins>` ad slot blocks.
5. Update `privacy.html` to disclose advertising.
6. Commit and push — Cloudflare deploys automatically.

---

## Day-to-day workflow (ongoing)

After the initial setup, adding content is simple:

```
1. Edit files in VS Code
2. git add <files>
3. git commit -m "Brief description of changes"
4. git push
5. Cloudflare Pages detects the push and deploys automatically
6. Changes are live in ~30 seconds
```

To update `sitemap.xml` after adding pages:
- Add the new `<url>` entry manually.
- Update the `<lastmod>` date on changed pages.
- Push → Cloudflare deploys → Google re-crawls on its schedule.

---

## Project naming conventions

| Subdomain           | Repo name                   | CF Pages project name    |
|---------------------|-----------------------------|--------------------------|
| `project-001.universeinvedors.tech` | `website-project-001`  | `website-project-001`    |
| `tools.universeinvedors.tech`   | `website-tools`             | `website-tools`          |
| `blog.universeinvedors.tech`    | `website-blog`              | `website-blog`           |
| `games.universeinvedors.tech`   | `website-games`             | `website-games`          |

Use lowercase, hyphen-separated names consistently.

---

## Complete new-project checklist

```
⬜ project-template/ copied to projects/your-project/
⬜ All universeinvedors.tech placeholders replaced
⬜ All PROJECT_NAME placeholders replaced
⬜ All PROJECT_SUBDOMAIN placeholders replaced
⬜ index.html content written
⬜ about.html customised
⬜ privacy.html customised (unique content)
⬜ terms.html customised
⬜ sitemap.xml updated with all page URLs
⬜ robots.txt domain updated
⬜ Favicon files added to assets/icons/
⬜ og-image.png added to assets/images/
⬜ GitHub repo created
⬜ Code pushed to GitHub
⬜ Cloudflare Pages project created
⬜ Custom subdomain connected in CF Pages
⬜ HTTPS verified
⬜ Google Search Console property added
⬜ Sitemap submitted to Search Console
⬜ AdSense enabled (when applicable — see ADSENSE_SETUP.md)
```
