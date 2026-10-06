# Haque Home & Builders Limited website and admin dashboard

## Goal
Build a complete real-estate website that closely follows the reference site’s layout, navigation, visual hierarchy, and interactions, while using HBL branding, original demo content, and original property imagery rather than presenting the reference company’s assets as HBL’s.

## Public website
- Create a shared header, mobile navigation, footer, contact details, and floating WhatsApp-style contact action.
- Build five public pages: **Home**, **Corporate**, **Projects**, **Management Team**, and **Contact**.
- Match the reference experience with a full-width architectural opening image, centered company introduction, blue HBL accents, project galleries, mission/values, supplier affiliations, team profiles, and contact section.
- Add individual project detail pages with galleries, location, status, overview, amenities, and project facts.
- Use the uploaded HBL logo as the official logo and derive the visual palette from its deep navy blue and white.
- Populate the first version with clearly fictional but polished Bangladesh-focused demo projects, team members, company copy, affiliations, and contact details.
- Generate or source original architectural imagery for the demo properties; do not reuse the reference company’s protected project images or identity.
- Ensure navigation, galleries, forms, menus, and layouts work cleanly on mobile and desktop.

## Admin access
- Add a dedicated sign-in page and protected admin dashboard.
- Create the initial super-admin account `admin@admin.com` with the requested initial password `admin@admin.com`.
- Store the super-admin permission in a separate protected roles table; no profile table is needed.
- Do not expose public signup. Only authenticated, authorized administrators can enter the dashboard or change content.
- Include sign-out and a clear signed-in admin state.

## Editable content
The dashboard will provide create, edit, publish/unpublish, reorder, and delete controls where appropriate for:
- Projects and project image galleries
- Team members
- Company introduction, mission, values, and key corporate copy
- Contact information and social/contact links
- Supplier and affiliation logos
- Homepage opening content and featured projects

Public pages will read published content from the database so dashboard changes appear on the website.

## Contact messages
- Make the contact form functional and store submissions securely.
- Add an admin inbox to review contact messages and mark them read.
- Include practical validation, success feedback, and spam-resistant server-side handling.

## Data and security
- Enable Lovable Cloud for authentication, database storage, and media storage.
- Create tables for site content, projects, project media, team members, affiliations, contact messages, and user roles.
- Seed the database with the complete demo content shown on first load.
- Apply row-level access rules: public visitors can read only published website content and submit contact messages; only verified administrators can manage content or read messages.
- Validate all admin actions on the server in addition to protecting the dashboard pages.

## Quality and discoverability
- Give every public page unique HBL titles, descriptions, and social-sharing metadata.
- Add accessible labels, keyboard-friendly controls, meaningful image descriptions, loading/empty/error states, and restrained motion.
- Verify the complete visitor flow and authenticated admin editing flow on desktop and mobile, including confirming that an admin change is visible on the public site.

## Technical approach
- Keep the existing TanStack Start application and add route-based public pages plus a protected admin area.
- Use shared components and semantic design tokens for consistent HBL styling.
- Use server functions for database operations, protected by authenticated role checks.
- Store uploaded website media in managed storage and keep only safe public URLs in content records.
