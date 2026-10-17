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
- Keep conceptual campaign imagery in a separate editorial data module and link it to archive browsing, not individual products, so missing catalogue photography is never misrepresented.
- Use the existing Embla library for editorial carousels and shared intersection-based reveal styling for motion, so touch navigation and reduced-motion support stay consistent.
- Keep About at the existing studio URL and custom creation at the custom-order URL, so existing links remain valid while the two purposes are distinct.
- Keep optional customization in a collapsible details section of the shared form, so editing retains all fields without overwhelming first-time visitors.
- Send the cart directly to the centralized WhatsApp serializer from Your Bag, keeping the existing order URL as a compact fallback so ordering needs no intermediate preview step.
- Only hide scroll-reveal content after an observer registers it, and observe newly mounted content so client-side navigation cannot leave pages invisible.

- Use shared Archive cover and commercial collection components on content pages and homepage previews so the three commercial pillars remain visually consistent.
- Keep illustrative complimentary imagery separate from verified products and identify it as conceptual on collection pages so draft combinations never claim authentic catalogue photography.
- Use nested Complimentary index/detail routes with an Outlet parent so every draft combination has a focused studio enquiry and its own address.
