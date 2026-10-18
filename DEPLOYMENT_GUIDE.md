# Consortium Against Rabies (CAR) - Modernized Web Platform
### 100% Free-Tier Architecture ($0/Month Forever)

A complete modernization of the Consortium Against Rabies website from static legacy HTML to a high-performance **Next.js App Router** platform with a backend, database, and admin panel—**hosted entirely on Vercel's free tier without paying for AWS S3 or any storage service**.

---

## 🌟 Key Features Built

1. **Life Members Directory (`/members`)**:
   - 179 Life Members migrated from hardcoded HTML into structured records.
   - Real-time instant search by Doctor Name, Registration ID, Hospital/Institution, and City.
   - State filter pills with real-time counts (Delhi, UP, Uttarakhand, Haryana, Himachal, Rajasthan, etc.).
   - Grid and Table view toggles.
   - **One-click CSV Export** for Secretariat and members.

2. **Dedicated Admin Portal (`/admin`)**:
   - Secure login screen protected by `ADMIN_SECRET_KEY` (default: `car_admin_2026_secure`).
   - Add new life members with auto-suggested CAR registration numbers.
   - Edit member details inline.
   - Delete members with confirmation.
   - Storage Engine status indicator: seamlessly switches between **Local / Git Persistence** and **Supabase Cloud PostgreSQL**.

3. **Online Life Membership Application (`/apply`)**:
   - Multi-step online web form with real-time client validation.
   - Generates instant reference application ID (`CAR-APP-XXXX`).
   - Direct download fallback for official `.doc` offline application form.

4. **National CARCON Conferences Archive (`/conferences`)**:
   - Dedicated history of CARCON editions (2014, 2017, 2018, 2019, 2020, 2023).
   - Direct brochure downloads and CME symposium links.

5. **Clinical Guidelines & Bite Management (`/guidelines`)**:
   - Interactive WHO Category I, II, III bite triage classification cards.
   - Immediate first-aid emergency advice (15-minute soap-and-water washing).
   - Intradermal Rabies Vaccination (IDRV) clinical guide (up to 80% cost savings).
   - Rabies Immunoglobulin (RIG) dosage calculator (ERIG 40 IU/kg vs HRIG 20 IU/kg).

6. **Resource Center & Downloads (`/downloads`)**:
   - Filterable library for WHO papers, PEP algorithm charts, CME presentations, and booklets.

7. **Photo Gallery (`/gallery`)**:
   - Lightbox modal preview for CARCON assemblies, Mewat outreach, APRICON, and NORC field photos.

8. **Executive Leadership & Messages (`/leadership`)**:
   - Patron and Founder President Dr. A.T. Kannan's message with photo.
   - Executive committee directory and honor roll of past presidents.

---

## 🚀 How to Deploy on Vercel (100% Free)

### Step 1: Push Changes to GitHub
```bash
git add .
git commit -m "feat: complete Next.js modernization with admin panel and Supabase integration"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New Project"** and select `ConsortiumAgainstRabies`.
3. In **Environment Variables**, add:
   - `ADMIN_SECRET_KEY`: Choose any password you want for `/admin` (e.g., `car_secret_2026`).
4. Click **Deploy**. Your site will be live on a `*.vercel.app` URL with automated SSL in under 60 seconds!

### Step 3: Connect Your Custom Domain (`consortiumagainstrabies.in`)
1. In your Vercel Project Dashboard, navigate to **Settings** → **Domains**.
2. Type `consortiumagainstrabies.in` and click **Add**.
3. Follow the DNS instructions (add the CNAME `cname.vercel-dns.com` or A record `76.76.21.21` at your domain registrar).
4. Vercel automatically provisions and renews free SSL certificates!

---

## 🗄️ Setting Up Supabase Database (100% Free Tier - 500MB)

Your website currently works out-of-the-box using the bundled JSON data. To enable cloud database persistence:

1. Go to [supabase.com](https://supabase.com) and create a **Free Project**.
2. Open the **SQL Editor** in the left sidebar.
3. Open the file [`supabase_schema.sql`](./supabase_schema.sql) in this repository, copy everything, paste it into the Supabase SQL Editor, and click **Run**.
   - This creates the `members` table with RLS security policies and pre-seeds all 179 members!
4. Go to **Project Settings** → **API** in Supabase and copy:
   - `Project URL`
   - `Project API anon key`
5. In your Vercel project, add these two environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your-anon-key`
6. The admin panel will automatically switch its status to **"Supabase PostgreSQL"**!

---

## ☁️ Media Storage Without S3 (100% Free)

You do not need AWS S3:
1. **GitHub Repository**: All standard logos and conference banners are in `/public` and served by Vercel's global Edge CDN for free.
2. **Supabase Storage (1 GB Free)**: Built directly into your Supabase project for member photo uploads or new PDFs.
3. **Cloudinary (25 GB/Month Free)**:
   - If you want automated WebP compression and CDN delivery, sign up for Cloudinary (free) and add:
     - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = `your-cloud-name`
   - The utility in `lib/cloudinary.js` handles optimization automatically.
