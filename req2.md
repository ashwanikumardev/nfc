MODIFY MY EXISTING WEBSITE — DO NOT REBUILD IT FROM SCRATCH.

I already have an existing NFC Google Review Card website with a dark premium design.

Use the existing website's current:
- Black/dark background
- Gold/beige accent color
- Typography
- Rounded cards
- Thin borders
- Navbar style
- Buttons
- Spacing
- Overall premium aesthetic

The screenshots I provided show the current website and should be treated as the visual reference.

IMPORTANT:
Do NOT change the overall brand identity or redesign the whole website.

I only want to change the ordering/pricing experience.

==================================================
1. REMOVE THE CURRENT ORDER / CHECKOUT SYSTEM
==================================================

Completely remove the existing direct ordering flow.

Remove:
- "Order now" checkout flow
- Details → Payment → Confirmation steps
- Customer details checkout form
- Payment summary
- UPI QR code
- UPI ID
- "Pay in UPI App"
- "Copy UPI ID"
- UTR / Transaction Reference field
- "Submit payment confirmation"
- Order ID generation
- Payment verification
- Payment confirmation screen
- Existing checkout page
- Existing "Track order" functionality
- Any order database logic related to this old checkout system
- Any payment-related JavaScript/state
- Any unnecessary Netlify Forms order submission connected to the old checkout
- Any fake payment/order status

There should NO LONGER be a customer checkout/payment page.

The website should be primarily an informational + product selection website.

==================================================
2. NAVBAR MODIFICATION
==================================================

Keep the existing navbar style from the screenshots.

Current navigation is approximately:

How it works
Real proof
Packs
Track order
FAQ
View packs
Order now

Change it to:

How it works
Real proof
Packs
FAQ

Right side:

View packs
Get started

REMOVE:
- Track order
- Order now

"View packs" should scroll smoothly to the Packs section.

"Get started" should scroll to the Packs section.

Keep the navbar sticky.

==================================================
3. CREATE / REPLACE THE PACKS SECTION
==================================================

Replace the existing ordering/quantity experience with a simple pricing section.

Section heading:

Choose your quantity

Subheading:

Card packs

Minimum order is 10 cards. Choose a ready pack below, then send your business details and order request.

Do NOT show a checkout form here.

Do NOT show payment.

Do NOT show UPI.

==================================================
4. THREE PACK CARDS
==================================================

Create exactly 3 beautiful pricing cards.

Use the same visual design language as the existing website.

Cards should have:
- Dark black background
- Thin subtle border
- Rounded corners
- Gold/beige highlights
- Large price
- Clear card quantity
- Feature list
- CTA button
- Hover animation

--------------------------------------------------
CARD 1
--------------------------------------------------

Label:

Starter pack

Price:

₹2,500

Subtitle:

10 cards • ₹250/card

Features:

✓ 10 NFC review cards
✓ Ideal for first order
✓ Pan-India shipping

Button:

Choose 10 cards

--------------------------------------------------
CARD 2
--------------------------------------------------

Add a small gold badge at the top:

POPULAR

Title:

Business pack

Price:

₹5,000

Subtitle:

20 cards • ₹250/card

Features:

✓ 20 NFC review cards
✓ For multiple counters/tables
✓ Pan-India shipping

Button:

Choose 20 cards

This should be visually emphasized as the recommended option.

--------------------------------------------------
CARD 3
--------------------------------------------------

Title:

Bulk pack

Price:

₹12,500

Subtitle:

50 cards • ₹250/card

Features:

✓ 50 NFC review cards
✓ Suitable for resellers/bulk buyers
✓ Pan-India shipping

Button:

Choose 50 cards

==================================================
5. IMPORTANT BUTTON BEHAVIOR
==================================================

The three buttons:

Choose 10 cards
Choose 20 cards
Choose 50 cards

MUST NOT open the old checkout.

MUST NOT open payment.

MUST NOT create an order.

Instead, clicking a button should select the package and take the user to a simple enquiry/contact section.

For example:

"Selected: 10 cards"

Then show a simple form:

Full name
Business name
Phone / WhatsApp number
City
Selected pack
Message

CTA:

Send enquiry →

The selected pack should automatically populate in the form.

Example:

If the visitor clicks "Choose 20 cards":

Selected pack:
Business pack — 20 cards — ₹5,000

The visitor then submits an enquiry.

After submitting, show:

"Thanks! We've received your request."

"We'll contact you shortly to confirm your card details and order."

IMPORTANT:
Do not collect payment on the website.

==================================================
6. ADD A WHATSAPP OPTION
==================================================

Add a floating WhatsApp button in the bottom-right corner, matching the existing website.

Text:

WhatsApp

When clicked, open WhatsApp with a pre-filled message.

Example:

"Hi, I'm interested in your NFC Review Cards. I would like to order the Business Pack — 20 cards."

Make the WhatsApp number configurable in one place in the code.

Do not hardcode the number in multiple components.

==================================================
7. HOW THE CARD WORKS SECTION
==================================================

Keep the existing visual style.

Replace/ensure the section contains exactly this content:

Heading:

How the card works

Subheading:

No app for the customer. Place the card at your counter, billing desk, table or reception and make the review journey easier.

--------------------------------------------------
01
--------------------------------------------------

Place the card

Keep it where customers naturally finish their visit or payment.

--------------------------------------------------
02
--------------------------------------------------

Customer taps

The customer taps a compatible NFC phone on the card.

--------------------------------------------------
03
--------------------------------------------------

Review page opens

Your configured review link opens so the customer can leave genuine feedback.

Use a clean 3-column layout on desktop.

On mobile, stack the three steps vertically.

==================================================
8. KEEP THE FAQ SECTION
==================================================

Keep the FAQ section from the current website.

Use the same accordion design shown in the screenshot.

Make sure these questions exist:

Does the customer need an app?

Answer:

No. On a compatible NFC phone, the customer taps the card and the programmed link can open directly in the browser.

Can the card be used again?

Answer:

Yes. NFC cards are reusable. Keep the card at your business and different customers can tap it.

Can it open my own business review link?

Answer:

Yes. The card can be configured with the review URL you provide.

What is the minimum order?

Answer:

The minimum order is 10 cards.

Are reviews guaranteed?

Answer:

No. The card makes it easier for customers to reach your review page, but the decision to leave a review and the rating itself remain entirely with the customer.

IMPORTANT:
Do not claim that the cards generate guaranteed reviews or guaranteed 5-star ratings.

==================================================
9. REMOVE MISLEADING / UNNECESSARY TEXT
==================================================

Remove any copy suggesting:

- Guaranteed reviews
- Guaranteed 5-star ratings
- Guaranteed Google ranking
- Guaranteed business growth
- Guaranteed number of reviews

Position the product accurately:

NFC cards make it easier for customers to reach a business's review page.

Customers decide whether to leave feedback.

==================================================
10. HOMEPAGE CTA
==================================================

Wherever the website currently says:

Order now

Change it to:

Get started

The button should scroll to:

Choose your quantity

Do not send users to checkout.

==================================================
11. PACK SECTION DESIGN
==================================================

Make the pricing section visually strong.

Desktop:

Three cards in one row.

Starter | Business | Bulk

Business Pack should have:

POPULAR

badge.

Use the existing gold/beige accent.

Hover effect:
- Slight upward movement
- Slight border highlight
- Smooth transition

Do NOT make the cards overly flashy.

Keep it premium and minimal.

==================================================
12. MOBILE DESIGN
==================================================

The website must be excellent on mobile.

On mobile:

- Stack pricing cards vertically
- Keep buttons full width
- Keep prices large
- Make the Popular badge obvious
- Keep navbar compact
- Keep WhatsApp floating button
- Make all cards easy to tap
- Avoid horizontal scrolling

The pricing section should look like a premium mobile shopping/product page.

==================================================
13. REMOVE OLD ROUTES / COMPONENTS
==================================================

If the project contains routes such as:

/order
/checkout
/payment
/confirmation
/track-order

Remove or disable them if they are only used by the old ordering system.

Also remove unused components related to:

Checkout
Payment
UPI
UTR
Order tracking
Payment confirmation

Clean up unused imports and state.

Do not leave broken links.

==================================================
14. SIMPLE ENQUIRY FLOW
==================================================

The new customer journey should be:

Homepage
↓
How it works
↓
Choose your quantity
↓
Choose 10 / 20 / 50 cards
↓
Simple enquiry form
↓
WhatsApp/contact follow-up

NOT:

Homepage
↓
Checkout
↓
UPI
↓
UTR
↓
Payment confirmation

==================================================
15. EXACT NEW CUSTOMER EXPERIENCE
==================================================

Visitor lands on website.

They see the product.

They understand how NFC review cards work.

They scroll to:

Choose your quantity

They see:

10 cards — ₹2,500
20 cards — ₹5,000
50 cards — ₹12,500

They click:

Choose 20 cards

The website smoothly scrolls to:

"Let's get your cards ready."

Form automatically says:

Selected pack:
Business pack — 20 cards — ₹5,000

They enter their details.

They submit.

Then show:

Request received ✓

"Thanks! We've received your request. We'll contact you shortly to confirm your business details and order."

Also provide:

Chat on WhatsApp →

==================================================
16. VISUAL QUALITY
==================================================

IMPORTANT:

Do not make the new section look like a generic pricing template.

Match the current website shown in the screenshots.

Use:

- #0A0A0A / near-black background
- Warm gold/beige accent
- White/off-white headings
- Muted gray secondary text
- Thin dark-gray borders
- Large rounded corners
- Premium spacing
- Minimal shadows
- Subtle hover animations

The overall feeling should be:

PREMIUM + SIMPLE + TRUSTWORTHY

Not:

cheap + colorful + SaaS template.

==================================================
17. FINAL CHECK
==================================================

After making the modifications:

1. There must be NO old checkout.
2. There must be NO UPI payment section.
3. There must be NO UTR field.
4. There must be NO Track Order.
5. There must be NO Order Now button.
6. There must be NO broken links.
7. "Get started" should go to the packs.
8. Pack buttons should select a pack and open the enquiry flow.
9. The selected pack must automatically appear in the enquiry form.
10. WhatsApp should remain available.
11. FAQ should remain.
12. How It Works should remain.
13. The existing black + gold visual identity must remain.
14. The website must work perfectly on mobile and desktop.

Do not rebuild unrelated sections.

Only modify what is necessary to implement this new product-selection and enquiry experience.