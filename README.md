# EduPro School Website & Portal Template

A complete, professional school website template and portal system designed for web developers and digital agencies to resell to private schools, colleges, and academies for **₦30,000 – ₦100,000+**.

---

## 🌟 Key Features

### 1. Public School Website (High-End & Fully Mobile Responsive)
- **Top Bar**: Contact phone, email, and live WhatsApp direct connection.
- **Hero Slider**: Automatic and manual slideshow highlighting academic distinction, moral values, and admissions.
- **About Us & School History**: Editable history, mission statement, vision, and core educational pillars.
- **Academics & Curriculum**: Comprehensive breakdown of Creche, Nursery, Primary, Junior & Senior Secondary with subject highlights.
- **Online Admissions Section**: High-converting call-to-action with admission requirements and session details.
- **Photo Gallery**: Filterable category tabs (Campus, Academics, Sports, Science Labs, Cultural) with full-screen lightbox modal.
- **News & Calendar Events**: Latest announcements, inter-house sports, and academic calendar notices.
- **Faculty & Leadership**: Spotlight on the Principal and Heads of Department.
- **Contact Us & Map**: Address, direct phone links, interactive contact message form, and embeddable Google Map.
- **Footer**: Social media links, accreditation badges, and **an editable "Designed by [Your Company]" reseller credit with backlinks**.
- **Floating WhatsApp Button**: Pre-filled admissions inquiry message that opens WhatsApp directly on mobile and web.

---

### 2. Online Student Admission Portal (`/admission`)
- Multi-step, beautifully validated applicant registration form:
  - Student Bio-Data & Passport Photo upload.
  - Class Applying For (Nursery to SSS 3).
  - Parent / Guardian Contact Details & Sponsor Info.
  - Previous School Records.
- Instant automated generation of an official **Application Reference ID** (e.g. `SCH/2026/0004`).
- **Official Printable PDF Slip**: Includes school crest, candidate photograph, official watermark, test dates, required examination materials, and signature slots formatted for clean standard A4 printouts.

---

### 3. Online Terminal Result Checker (`/result-checker`)
- Clean, secure verification portal for parents and students.
- Requires **Student Registration Number** + **10-Digit Scratchcard PIN**.
- Demo quick-fill buttons for immediate testing during proprietor demonstrations.
- Anti-abuse tracking: PINs enforce a configurable maximum check limit (e.g., 5 uses per student).
- **Comprehensive Terminal Report Card (Printable A4)**:
  - School Crest, Motto, and Student Passport.
  - Continuous Assessment (CA 1, CA 2) + Exam Scores.
  - Letter Grades (A1, B2, C4, etc.), Class Average, Overall Percentage, and Class Position.
  - Form Teacher Remark, Principal Remark & Stamp, and Next Term Resumption Date.

---

### 4. Comprehensive Admin Dashboard (`/admin`)
- **Default Credentials**: Username: `admin` | Password: `admin123`
- **School Branding & Theming**:
  - One-click theme presets: Royal Blue & Gold, Emerald Forest, Crimson Burgundy, Navy Bronze, Slate Modern.
  - Custom hex color pickers for exact blazer and crest matching.
  - Real-time school crest / logo upload (persisted in localStorage).
  - Edit School Name, Motto, Campus Address, Contact Numbers, WhatsApp, and Fees.
  - Edit the **"Designed by [Your Agency]"** credit and portfolio backlink.
- **Admissions Management**:
  - Search and filter applicants by class or admission status.
  - Update status (`Pending`, `Under Review`, `Admitted`, `Rejected`).
  - View full applicant dossiers and re-print candidate exam slips.
  - **Export to CSV / Excel**: Download complete applicant rosters for school boards.
- **Result Management**:
  - Enter student terminal scores with automated calculation of grades, percentages, and positions.
  - **Batch CSV Upload**: Upload an entire class result sheet in seconds.
  - Download blank CSV template formatted for Excel.
- **Scratchcard PIN Generator**:
  - Generate batches of 10, 25, 50, or 100 scratchcard PINs in one click.
  - **Print Scratchcard Sheets**: Printable grids formatted for card printing to sell to parents for ₦500 – ₦2,000 each.
  - PIN usage audit log (track which student used which PIN).
- **Campus Gallery Manager**:
  - Upload new photos directly from phone or computer.
  - Categorize by Academics, Sports, Science Lab, Events, etc.
- **News & Announcements Manager**:
  - Publish news releases and term dates with custom feature images.
- **Backup & Restore**:
  - Export the entire school website database to a single `.json` file.
  - One-click restore or reset to demo data.

---

## 🚀 How to Deploy on Netlify / Cloudflare Pages (100% Free Hosting)

This template runs entirely as a high-performance, client-side application utilizing the browser's `localStorage` for complete standalone functionality without needing an expensive monthly server or database.

### Deploying in 3 Steps:
1. **Build the production bundle**:
   ```bash
   npm run build
   ```
2. **Deploy to Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com) and log in.
   - Drag and drop the `dist/` folder into the Netlify dashboard.
   - Or connect your GitHub repository and set build command to `npm run build` and publish directory to `dist`.
3. **Connect Custom Domain**:
   - Add the school's custom domain (e.g. `www.brightstarsacademy.sch.ng` or `.com`).
   - Netlify will automatically provision a free SSL certificate!

---

## 💰 Reseller Business Guide (₦30,000 Promo Strategy)

1. **Targeting**: Reach out to proprietors of private Nursery, Primary, and Secondary schools in your city or state.
2. **The Offer**: *"Get a modern, mobile-friendly school website, complete with online entrance exam slip generation and a parent scratchcard result checking portal for a one-time setup fee of ₦30,000."*
3. **Recurring Income**:
   - Offer annual domain renewal (`.sch.ng` or `.com`) for ₦10,000/year.
   - Offer termly result batch upload service for ₦15,000/term.
   - Schools sell result checker PINs to parents for ₦1,000 per term, creating an immediate ROI that covers their website cost within the very first week!
