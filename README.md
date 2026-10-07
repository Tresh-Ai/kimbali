# KÍMBÀLÌ: Crafted Luxury

KÍMBÀLÌ — CUSTOM LEATHER BAG DESIGN STUDIO



Build a complete website for KÍMBÀLÌ, a Nigerian custom leather bag design studio.



The attached reference image is only a general visual reference for the quality and type of website being built. Do not copy its design, layout, typography, colors, sections, or visual identity.



Do not follow a predefined visual style from this prompt.



Make your own design decisions based on the KÍMBÀLÌ brand, products, and content.



The goal is to build a polished, production-ready ecommerce-style website where customers can browse available bag designs, customize them, add them to a cart, and send the completed order to KÍMBÀLÌ through WhatsApp.



There is NO backend checkout system.



WhatsApp is the final order channel.



==================================================

BRAND

==================================================



Name:



KÍMBÀLÌ



Business:



Custom Leather Bag Design Studio



Location:



Made in Nigeria



Core idea:



Customers can either choose an existing bag design from the archive and customize it, or submit an entirely custom bag idea.



==================================================

PAGES

==================================================



Create these pages:



1. HOME



2. THE ARCHIVE



3. PRODUCT DETAIL



4. CUSTOM ORDER



5. THE STUDIO



6. YOUR BAG / CART



7. ORDER / WHATSAPP HANDOFF



The navigation should allow users to move naturally between these areas.



==================================================

HOME

==================================================



The homepage should introduce KÍMBÀLÌ and make it easy to discover the archive or start a custom order.



Include appropriate sections for:



- KÍMBÀLÌ introduction

- Featured bag designs

- Archive preview

- Custom-order introduction

- Materials / craftsmanship information

- Inspiration / Pinterest

- Made in Nigeria

- WhatsApp call-to-action



The exact visual composition and layout are up to you.



Do not create unnecessary sections simply to make the homepage longer.



==================================================

THE ARCHIVE

==================================================



Create a product archive containing the 22 existing bag references provided in the project content.



The archive should allow users to browse the available designs.



Each product should have:



- product name

- product image

- short description

- product identifier

- available customization

- product detail link



The architecture should make it easy to add more products later.



Use structured product data rather than hardcoding product information throughout the interface.



The archive should support appropriate categorization/filtering if useful.



==================================================

PRODUCT DETAIL

==================================================



Each bag should have its own product detail page.



The customer should be able to select/customize:



- Bag design

- Material

- Color

- Custom color

- Hardware where applicable

- Other available customization options

- Additional notes



Material options can include:



- Leather

- Suede

- Ostrich leather

- Other / Custom



Color should support predefined choices and a custom color option.



For custom color, allow the customer to describe/specify the color.



Where useful, allow a reference image to be supplied.



The customer should be able to add the configured product to their cart.



The selected configuration must be stored with the cart item.



==================================================

CUSTOM ORDER

==================================================



Create a dedicated custom-order experience for customers who want a bag that is not already in the archive.



The customer should be able to provide:



Bag type:



- Shoulder bag

- Tote

- Crossbody

- Clutch

- Backpack

- Briefcase

- Other



Material:



- Leather

- Suede

- Ostrich leather

- Other



Color:



- Existing color

- Custom color



Reference:



Allow the customer to upload a reference image, photograph, screenshot, or sketch.



Description:



Allow the customer to describe what they want.



Additional notes:



Provide an optional field for anything else they want KÍMBÀLÌ to know.



The final action should prepare the custom-order details for WhatsApp.



==================================================

YOUR BAG / CART

==================================================



Create a client-side cart.



No backend is required.



The cart should contain:



- selected products

- quantity

- selected material

- selected color

- custom color

- hardware

- customization details

- customer notes

- custom-order information where applicable



Users should be able to:



- add items

- remove items

- edit items

- change quantities

- continue browsing

- clear the cart



Persist the cart locally so that refreshing the page does not immediately remove the customer's selections.



==================================================

WHATSAPP ORDER FLOW

==================================================



There is no traditional online checkout.



When the customer is ready to order, provide:



SEND ORDER TO WHATSAPP



Generate a structured WhatsApp message from the cart.



The message should include all relevant order information.



Example:



Hello KÍMBÀLÌ,



I'd like to place an order.



1. Vintage Shoulder Bag

Material: Leather

Color: Brown

Hardware: Gold

Customization: Adjustable strap



2. Custom Tote

Material: Leather

Color: Custom

Notes: ...



Please let me know the next steps.



The generated message should be encoded correctly into the WhatsApp URL.



Use KÍMBÀLÌ's actual WhatsApp number when it is provided.



Do not invent a phone number.



For uploaded custom-order references, make it clear to the customer that they should send/attach the reference image in the WhatsApp conversation if the image cannot be transferred automatically through the WhatsApp URL.



==================================================

PRODUCT DATA

==================================================



Keep all product information in a centralized data structure.



Each product should support fields such as:



id

name

slug

description

image

images

category

materials

colors

hardwareOptions

customizable

notes

availability



Do not scatter product information across components.



Make the product system easy to expand.



==================================================

THE STUDIO

==================================================



Create a page explaining KÍMBÀLÌ as a custom leather bag design studio.



Use the supplied brand information and content.



This page can explain:



- what KÍMBÀLÌ does

- custom design

- craftsmanship

- materials

- Nigerian production

- the relationship between existing designs and custom commissions



Do not invent specific claims about the company's history, production capacity, certifications, years of experience, or manufacturing process.



Only use information supplied by the project.



==================================================

INSPIRATION

==================================================



Include a way for customers to find inspiration.



The supplied content includes:



"Want a different style? Click here to explore our Pinterest Board for more ideas."



Create an appropriate Pinterest link/section.



Do not invent the Pinterest URL.



Leave it configurable until the actual URL is supplied.



==================================================

CONTENT

==================================================



Use the supplied archive content as the starting product catalogue.



The archive currently contains 22 bag references:



01 — 22



The existing descriptions include:



1. Exquisitely crafted vintage leather shoulder bag with intricate stitching and patterns.



2. Two elegant leather tote bags, tan and white, showcasing minimalistic style.



3. Brown leather crossbody bag with adjustable strap.



4. Sleek and contemporary brown leather clutch with button accents.



5. Cream leather purse with sleek design and metal detailing.



6. Brown leather messenger bag.



7. Stylish brown leather handbag being unveiled.



8. Brown leather messenger bag.



9. High-quality brown leather handbag.



10. Sophisticated brown leather purse.



11. Brown leather briefcase.



12. Elegant brown leather handbag.



13. Stylish orange handbag.



14. Sleek leather backpack.



15. Stylish brown leather bag.



16. Handmade leather carry case.



17. Ostrich leather handbag.



18. Vintage leather bag.



19. Brown leather bag with gold chain.



20. Ruched leather bag.



21. Leather handbag presented in a showroom setting.



22. Brown leather handbag with vintage camera.



Use the actual product images/assets supplied with the project when available.



Do not generate fake product information.



==================================================

CUSTOM ORDER COPY

==================================================



The existing concept is:



FIND YOUR BAG



"Found a bag you love? Take a screenshot of it and click the button below to send it to WhatsApp."



"Want a different style? Explore our Pinterest Board for more ideas."



"Have your own design? Send us your sketch on WhatsApp and let's bring your idea to life."



"Made for your idea."



"Begin a conversation."



"CHAT DIRECTLY ON WHATSAPP"



Use these ideas as source content, but improve the presentation/copy where necessary without changing the meaning.



==================================================

NO BACKEND

==================================================



This is intentionally a frontend-first ecommerce experience.



Do NOT create:



- user accounts

- authentication

- database

- admin dashboard

- online payment processing

- server-side checkout

- order management system



The first version should work without a backend.



Use local/client-side state for:



- cart

- product customization

- order preparation



==================================================

TECHNICAL REQUIREMENTS

==================================================



Build the project with a maintainable modern frontend architecture.



Prefer:



- React

- Next.js where appropriate

- TypeScript



Use reusable components.



Keep:



- product data

- cart logic

- WhatsApp message generation

- product configuration

- page components



properly separated.



Avoid unnecessary dependencies.



Do not create a huge monolithic component.



==================================================

RESPONSIVENESS

==================================================



The website must work properly on:



- mobile

- tablet

- laptop

- desktop



Do not treat mobile as an afterthought.



Product browsing, customization, cart management, and WhatsApp ordering must all work properly on mobile.



==================================================

ACCESSIBILITY

==================================================



Use semantic HTML.



All interactive controls must be keyboard accessible.



Forms must have proper labels.



Images need meaningful alt text.



Maintain appropriate contrast.



Respect prefers-reduced-motion if animations are introduced.



Do not make important information dependent on animation.



==================================================

PERFORMANCE

==================================================



Prioritize performance.



Use:



- optimized images

- responsive image sizes

- lazy loading where appropriate

- code splitting where useful

- efficient client-side state

- minimal dependencies



Do not load resources that are not needed.



Do not sacrifice usability for decorative effects.



==================================================

SEO

==================================================



Create appropriate:



- page titles

- meta descriptions

- semantic headings

- clean URLs

- product metadata

- Open Graph metadata



Product pages should be indexable.



==================================================

IMPORTANT

==================================================



Do not invent:



- prices

- WhatsApp number

- Pinterest URL

- product specifications

- company history

- guarantees

- delivery times

- payment methods

- policies

- materials that KÍMBÀLÌ has not confirmed



Where information is missing, make the relevant value configurable or clearly mark it as content that needs to be supplied.



Do not use placeholder lorem ipsum.



Do not create fake customer reviews.



Do not create fake statistics.



Do not create fake testimonials.



==================================================

DESIGN FREEDOM

==================================================



You are responsible for making the visual design decisions.



Do not treat this prompt as a design system.



Do not force a specific color palette.



Do not force a specific typography system.



Do not force a specific layout.



Do not force a specific animation style.



Do not force a specific component style.



Do not create a generic AI-generated ecommerce design.



Use the supplied KÍMBÀLÌ brand, products, imagery, and reference material to make the interface feel specific to the business.



The final result should be a real, usable custom-commerce website for KÍMBÀLÌ, with WhatsApp as the final order channel.



Please i don't want AI generic design, no AI slop. Simple design that's alive with story telling no just page. I dont mean it should be telling story but the scrolls should be meaningful.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e518341a-da8f-416a-a76a-c2e0d8c01de1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
