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

## Frontend architecture
- Keep catalogue references and verified studio destinations in centralized data modules so content can expand without duplicating page logic.
- Use a browser-hydrated cart provider with local persistence; never add a checkout backend because orders are conversation briefs.
- Keep customization forms and WhatsApp serialization reusable and separate from routes so cart editing preserves the same configuration fields.
- Use nested archive routes with an Outlet parent and index/detail leaves so each reference has its own indexable URL.
- Generated visual studies are explicitly illustrative and must not populate verified catalogue image fields, preventing unverified products from appearing authentic.
