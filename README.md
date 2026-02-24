# WOLA Website — Deployment Guide

## Files included
```
wola-site/
├── index.html          ← Home page
├── css/
│   ├── style.css       ← Global styles
│   └── pages.css       ← Page-specific styles
├── js/
│   └── main.js         ← All interactive behaviour
└── pages/
    ├── about.html      ← About + chapters + partners
    ├── programs.html   ← All 6 programs
    ├── events.html     ← Events with filter tabs
    ├── team.html       ← Leadership bios
    ├── contact.html    ← Contact form
    └── join.html       ← Membership form + donation
```

---

## Step 1 — Set up the contact & membership forms (Formspree)

The contact form and membership form use [Formspree](https://formspree.io) — free, no backend needed.

1. Go to **https://formspree.io** and create a free account
2. Click **"New Form"** → name it (e.g. "WOLA Contact")
3. Copy your **Form ID** (looks like `xpzgkjal`)
4. In `pages/contact.html`, find this line and replace `YOUR_FORMSPREE_ID`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORMSPREE_ID"
   ```
5. Do the same in `pages/join.html` (the membership form)
6. Repeat step 2–3 for a second form called "WOLA Membership" (optional — you can use the same form ID for both)

**Free tier:** 50 submissions/month per form. Upgrade at any time.

---

## Step 2 — Set up the donation button (PayPal)

1. Go to **https://paypal.com** → sign in or create an account for WOLA
2. Enable **PayPal.me** and create a link: `paypal.me/YourWOLAname`
3. In `pages/join.html`, find and replace `wolaafrika` with your actual PayPal.me username:
   ```html
   href="https://paypal.me/wolaafrika"
   ```
   and
   ```js
   btn.href = 'https://paypal.me/wolaafrika/' + amount + 'GBP';
   ```

**Alternative:** For a full donation widget, sign up at [GoFundMe](https://gofundme.com) or [Donorbox](https://donorbox.org) and embed their widget instead.

---

## Step 3 — Deploy to GitHub Pages (free hosting)

### Option A — Via the GitHub website (easiest)

1. Go to **https://github.com** → sign in → click **"New repository"**
2. Name it: `wola-website` (or anything you like)
3. Set it to **Public** → click **"Create repository"**
4. Click **"uploading an existing file"**
5. Drag and drop the entire `wola-site` folder contents (all files and folders)
6. Click **"Commit changes"**
7. Go to **Settings → Pages**
8. Under **"Source"**, select `main` branch and `/ (root)` folder → click **Save**
9. Your site will be live at: `https://YOUR-USERNAME.github.io/wola-website/`

### Option B — Via GitHub Desktop (recommended for updates)

1. Download [GitHub Desktop](https://desktop.github.com)
2. Click **"Add existing repository"** → select the `wola-site` folder
3. Publish to GitHub → set repository to **Public**
4. Go to repository Settings → Pages → enable as above
5. To update the site later: edit files locally → open GitHub Desktop → commit → push

---

## Step 4 — Custom domain (optional)

If you have a domain like `wolaafrika.org`:

1. Go to your domain registrar (e.g. Namecheap, GoDaddy)
2. Add these DNS records:
   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME www   YOUR-USERNAME.github.io
   ```
3. In GitHub: Settings → Pages → Custom domain → enter your domain
4. Check **"Enforce HTTPS"**

DNS changes can take up to 24 hours to propagate.

---

## Updating content

All content is plain HTML — just open any file in a text editor and make changes. Key sections:

| What to update | Where |
|---|---|
| Home hero text | `index.html` — search for `hero-headline` |
| Events / news | `pages/events.html` — copy an `event-card` div |
| Team bios | `pages/team.html` — find `bio-card` divs |
| Contact details | All pages, footer section |
| Partners | `pages/about.html` — find `partner-strip` |

---

## Adding photos

Replace the placeholder programme cards with real photos:
```html
<!-- Replace this: -->
<span class="prog-icon">🔥</span>

<!-- With this: -->
<img src="../images/your-photo.jpg" alt="Event description" style="width:100%;height:200px;object-fit:cover;margin-bottom:1.5rem"/>
```

Upload photos to the `images/` folder in your repository.

---

## Need help?

Email: **wolaafrika@gmail.com**
