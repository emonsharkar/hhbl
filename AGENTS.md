<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public marketing content is database-backed with seeded fallback content so first render remains complete; admin edits are protected by database role policies.
- The admin area uses the managed authenticated route layout and keeps role authorization enforced by row-level database rules.
- Website media uploads use the private site-media bucket and time-limited signed URLs so administration stays role-protected.

- Public sections and shared contact details resolve published site_content records with official source fallbacks; empty collections stay empty so unpublished samples do not reappear.
- Primary call and WhatsApp destinations are shared through one browser-safe contact module so all contact controls stay consistent.
