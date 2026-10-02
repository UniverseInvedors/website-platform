# DOMAIN_SETUP.md — DNS Configuration Guide

This document lists every DNS record you must configure manually in your domain
registrar or DNS provider (e.g. Cloudflare DNS, Namecheap, GoDaddy, Google Domains).

> ⚠️ **DNS has NOT been configured automatically.** Every record below requires
> manual action from you. Nothing in this repository touches your DNS.

---

## Prerequisites

Before configuring DNS:

1. ✅ You own the domain `universeinvedors.tech`.
2. ✅ You have a Cloudflare account (free tier is sufficient).
3. ✅ You have created at least one Cloudflare Pages project (see `PROJECT_SETUP.md`).
4. ⬜ You have noted the Cloudflare Pages deployment URLs for each project
   (format: `your-project.pages.dev`).

---

## Step 1 — Move DNS to Cloudflare (recommended)

Cloudflare Pages custom domains work best when Cloudflare manages your DNS.

**Already using Cloudflare DNS?** Skip to Step 2.

1. Log in to [cloudflare.com](https://cloudflare.com).
2. Click **Add a Site** → enter `universeinvedors.tech`.
3. Select the **Free** plan.
4. Cloudflare will scan your existing DNS records. Review and import them.
5. Cloudflare will give you two nameservers, e.g.:
   ```
   anita.ns.cloudflare.com
   brad.ns.cloudflare.com
   ```
6. Log in to your domain registrar and replace your current nameservers with
   the two Cloudflare nameservers.
7. Wait for propagation (up to 48 hours; usually under 1 hour).

---

## Step 2 — Root domain (apex) records

### Already configured by Cloudflare Pages

When you add a custom domain inside a Cloudflare Pages project, Cloudflare
automatically creates the necessary DNS record.

### Manual configuration required

In Cloudflare DNS → **Add record**:

| Type  | Name | Content / Target           | Proxy    | Notes                              |
|-------|------|----------------------------|----------|------------------------------------|
| CNAME | `@`  | `your-main.pages.dev`      | Proxied ☁️ | Root domain → main Pages project  |
| CNAME | `www` | `your-main.pages.dev`     | Proxied ☁️ | www → same main Pages project     |

> **Note:** Some registrars do not allow CNAME on the apex (`@`).
> Cloudflare DNS supports "CNAME flattening" which resolves this automatically.
> If you are NOT using Cloudflare DNS, use an **ALIAS** or **ANAME** record instead,
> or point to Cloudflare's IP addresses (not recommended — IPs can change).

---

## Step 3 — Subdomain records (one per project)

For each project subdomain, add one DNS record.

### Already configured by Cloudflare Pages

Cloudflare automatically adds the CNAME when you connect a custom domain in the
Pages dashboard.

### Manual configuration required

Repeat for each project:

| Type  | Name                | Content / Target                  | Proxy    |
|-------|---------------------|-----------------------------------|----------|
| CNAME | `project1`          | `your-project1.pages.dev`         | Proxied ☁️ |
| CNAME | `project2`          | `your-project2.pages.dev`         | Proxied ☁️ |
| CNAME | `project3`          | `your-project3.pages.dev`         | Proxied ☁️ |
| CNAME | `tools`             | `your-tools-project.pages.dev`    | Proxied ☁️ |
| CNAME | `blog`              | `your-blog-project.pages.dev`     | Proxied ☁️ |

Replace `your-project1.pages.dev` with the actual Pages deployment URL shown in
your Cloudflare dashboard.

---

## Step 4 — HTTPS / TLS

**Already handled automatically by Cloudflare.** No manual certificate management.

When you proxy traffic through Cloudflare (☁️ icon), TLS certificates are issued
and renewed automatically. Ensure:

- SSL/TLS mode is set to **Full (strict)** in Cloudflare → SSL/TLS settings.
- "Always Use HTTPS" is enabled in Cloudflare → SSL/TLS → Edge Certificates.

---

## Step 5 — ads.txt (manual)

`ads.txt` must be served at the root of every domain and subdomain that runs ads.

| URL to verify                              | File location in project |
|--------------------------------------------|--------------------------|
| `https://universeinvedors.tech/ads.txt`                | `main/ads.txt`           |
| `https://project1.universeinvedors.tech/ads.txt`       | `projects/project1/ads.txt` |

Once you have your real AdSense publisher ID, update each `ads.txt` file.
See `ADSENSE_SETUP.md` for the exact format.

---

## Step 6 — Verify records

After DNS propagation, verify each record:

```
# Check apex
nslookup universeinvedors.tech

# Check www
nslookup www.universeinvedors.tech

# Check a subdomain
nslookup project1.universeinvedors.tech
```

Or use an online tool such as [dnschecker.org](https://dnschecker.org).

---

## Summary checklist

```
⬜ Domain registrar nameservers updated to Cloudflare
⬜ CNAME @ → main Pages project (root domain)
⬜ CNAME www → main Pages project
⬜ CNAME project1 → project1 Pages project
⬜ CNAME project2 → project2 Pages project
⬜ SSL/TLS mode set to Full (strict)
⬜ Always Use HTTPS enabled
⬜ DNS propagation verified for all records
⬜ ads.txt updated with real publisher ID on each domain
```

---

## Important notes

- DNS changes can take up to 48 hours to propagate worldwide.
- Cloudflare's free plan includes DDoS protection, CDN, and automatic HTTPS for
  all proxied records.
- Never expose your Cloudflare API token in any file committed to GitHub.
