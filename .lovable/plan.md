# HBL premium website and admin redesign

## Goal
Transform the current HBL site into a premium, image-led real-estate experience that exceeds the reference site in presentation and usefulness, while remaining distinctly HBL. Rebuild the dashboard so non-technical administrators can update all public content without editing code.

## Locked design direction
- Use the selected **Premium editorial narrative** composition with immersive full-width photography, layered editorial storytelling, and strong project showcases.
- Keep the chosen HBL palette: deep navy `#07143D`, soft ice `#F4F8FC`, clear sky blue `#3A9FD9`, and white. Do not introduce the gold palette shown in the concept preview.
- Use **Instrument Serif** for expressive headings and **Work Sans** for clear body and interface text.
- Preserve the supplied HBL logo and brand identity.
- Use the reference site only for real-estate content patterns; do not copy its wording, images, identity, or proprietary composition.

## Public website
### Shared experience
- Redesign the header, mobile navigation, footer, inquiry prompts, WhatsApp action, and page introductions as one consistent premium system.
- Add cinematic image treatments, restrained scroll reveals, subtle image parallax, project-card transitions, and number-count animations with reduced-motion support.
- Keep every page fast, accessible, mobile-friendly, and easy to scan.

### Home
- Build an immersive opening with the HBL name, focused value proposition, and project/inquiry actions.
- Add company introduction, trust metrics, featured projects, reasons to choose HBL, design/build process, key neighborhoods or project locations, affiliations, testimonials, FAQ, and a final inquiry section.
- Keep all claims editable and avoid inventing unverifiable awards, dates, or delivery statistics.

### Corporate
- Match the selected editorial composition: image-led opening, company story, mission, vision, values, approach, quality commitments, and leadership link.
- Use alternating full-width visual bands instead of the current short two-column page.

### Projects
- Add clear filters for status and location with useful empty states.
- Upgrade project cards with stronger image hierarchy, location, status, and direct detail access.
- Expand each project page with overview, editable facts, amenities, image gallery, floor-plan/download area when supplied, progress/status information, location/map, inquiry action, and related projects.

### Management and contact
- Redesign team profiles with image, name, role, phone, biography, and polished fallbacks when no portrait exists.
- Add office information, editable social links, map/location area, inquiry type selection, and improved form feedback.

## Easy content dashboard
- Redesign the dashboard as a clear workspace with sidebar navigation, summary counts, unsaved-change feedback, confirmation dialogs, success/error notices, and mobile usability.
- Add dedicated editors for:
  - Home and Corporate page sections
  - Global contact details, social links, footer, and inquiry settings
  - Projects, facts, amenities, status, location, featured/published state, and related content
  - Project galleries, image ordering, captions, and optional documents/floor plans
  - Team profiles including portrait, name, role, phone, biography, order, and visibility
  - Affiliations/partners, testimonials, FAQs, and trust metrics
  - Contact messages with unread/read state, filtering, archive/delete, and contact shortcuts
- Replace raw image URL fields with straightforward uploads and previews while retaining URL support where appropriate.
- Add reorder controls and draft/published visibility so administrators can control sequence and publication safely.
- Preserve role-based access and database-enforced authorization; public visitors only see published material.

## Content and data work
- Reuse the existing projects, team, affiliations, messages, and flexible site-content records where suitable.
- Add structured records only where repeatable content needs independent editing: project media/documents, testimonials, and FAQs.
- Store public images and documents in managed storage with safe file rules.
- Include seeded HBL sample content so every redesigned section is complete on first load, while clearly treating unconfirmed business details as placeholders.

## Verification
- Check every public page and the individual-project journey on desktop and mobile.
- Sign in as an authorized administrator and verify create, edit, upload, reorder, publish/unpublish, and message-management flows end to end.
- Confirm admin edits appear correctly on public pages, hidden content stays private, forms submit successfully, metadata is unique, animations respect accessibility settings, and the final build has no runtime or console errors.

## Technical notes
- Continue using TanStack Start server functions for app operations and Lovable Cloud row-level policies for access control.
- Keep public reads limited to published safe fields; keep administrative writes authenticated and role-authorized.
- Apply schema changes through migrations with explicit grants and row-level policies for every new table, then regenerate/use the typed data shapes throughout the app.
- Implement the selected palette as semantic design tokens and load Instrument Serif and Work Sans through document font links.
