# ADSENSE_SETUP.md — Google AdSense Integration Guide

This document explains how to connect Google AdSense to your websites after you
receive approval. **No AdSense ID has been generated or configured automatically.**

> ⚠️ Do not follow these steps until Google has approved your AdSense application.
> Displaying ads before approval will disqualify your account.

---

## Your publisher ID placeholder

```
ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
```

Replace `ca-pub-XXXXXXXXXXXXXXXX` with your real publisher ID from your
[AdSense dashboard](https://adsense.google.com).

---

## Step 1 — Apply for AdSense

1. Go to [adsense.google.com](https://adsense.google.com) and sign in.
2. Click **Get started**.
3. Enter your website URL (start with `universeinvedors.tech` — the root domain).
4. Connect your Google account.
5. Add the AdSense verification snippet to `<head>` of your site
   (Google will provide this snippet — it looks like the one below):

```html
<script async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossorigin="anonymous"></script>
```

6. Wait for Google to crawl and review your site (can take days to weeks).
7. Once approved, you will receive a confirmation email.

---

## Step 2 — Update ads.txt on every domain

After receiving your publisher ID, update the `ads.txt` file at the root of
**every** domain and subdomain where ads will run.

Open the relevant `ads.txt` file and replace the placeholder content with:

```
google.com, ca-pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Replace `ca-pub-XXXXXXXXXXXXXXXX` with your real publisher ID.
The certification authority ID (`f08c47fec0942fa0`) is Google's standard value
and does not change.

### Files to update

| File                                    | Domain it covers                |
|-----------------------------------------|---------------------------------|
| `main/ads.txt`                          | `universeinvedors.tech`                     |
| `projects/project-001/ads.txt`          | `project-001.universeinvedors.tech`         |
| `projects/project-002/ads.txt`          | `project-002.universeinvedors.tech`         |
| *(repeat for each project)*             |                                 |

Verify each ads.txt is live:
```
https://universeinvedors.tech/ads.txt
https://project-001.universeinvedors.tech/ads.txt
```

---

## Step 3 — Activate AdSense script on each site

In each project's `index.html` (and any other HTML pages where you want ads),
uncomment the AdSense script in `<head>`:

```html
<!-- BEFORE (commented out): -->
<!--
<script async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossorigin="anonymous"></script>
-->

<!-- AFTER (active): -->
<script async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossorigin="anonymous"></script>
```

---

## Step 4 — Activate ad slots

Ad slot HTML is pre-written and commented out in each project's HTML files.
Find the ad slot comments (search for `PLACEHOLDER — DO NOT DEPLOY AS-IS`)
and uncomment the `<ins>` blocks.

Replace `ca-pub-XXXXXXXXXXXXXXXX` and `XXXXXXXXXX` with your real publisher ID
and ad unit IDs from your AdSense dashboard.

### Ad units to create in AdSense

Create one ad unit per slot type per site, or use auto ads:

| Slot          | Recommended type         |
|---------------|--------------------------|
| Header        | Display — Leaderboard    |
| Content       | In-article               |
| Sidebar       | Display — Medium Rectangle |
| Footer        | Display — responsive     |

Or simply enable **Auto ads** in AdSense and AdSense will place ads automatically.

---

## Step 5 — Privacy policy update

When ads are active, your Privacy Policy **must** disclose:

- That Google AdSense is used.
- That cookies are used for advertising.
- How users can opt out (link to Google's ad settings).

Update `privacy.html` in each project.

### Required disclosures

Add these to your Privacy Policy:

```
This website uses Google AdSense, a web advertising service provided by Google LLC.
Google AdSense uses cookies to serve ads based on your prior visits to this website
and other websites on the internet. You may opt out of personalised advertising at
https://www.google.com/settings/ads
```

---

## Step 6 — Cookie consent (GDPR / CCPA)

If you have visitors from the EU or California, you are required to obtain
consent before loading advertising cookies.

Options (all have free tiers):
- [Cookiebot](https://www.cookiebot.com) — GDPR / CCPA compliant
- [Osano](https://www.osano.com)
- [CookieYes](https://www.cookieyes.com)

Google also provides a consent management tool integrated with AdSense.

---

## AdSense policies reminder

- ❌ Never click your own ads.
- ❌ Never ask others to click your ads.
- ❌ Never place ads in a way that encourages accidental clicks
  (e.g., immediately next to navigation buttons).
- ❌ Never use AdSense on pages with scraped, duplicate, or thin content.
- ✅ Every page with ads must have a Privacy Policy.
- ✅ ads.txt must be current and accurate on every domain.

Full policies: [support.google.com/adsense/answer/48182](https://support.google.com/adsense/answer/48182)

---

## Summary checklist

```
⬜ AdSense application submitted
⬜ AdSense verification snippet added to site
⬜ AdSense approval received
⬜ Publisher ID (ca-pub-XXXXXXXXXXXXXXXX) noted
⬜ ads.txt updated on all domains
⬜ AdSense script uncommented in all HTML files
⬜ Ad unit IDs created and inserted in HTML
⬜ Privacy Policy updated to disclose AdSense
⬜ Cookie consent solution added (if EU/CA visitors expected)
⬜ ads.txt live and verified on all domains
```
