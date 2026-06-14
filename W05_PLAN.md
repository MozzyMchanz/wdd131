# W05 Product Review Form - Edit Plan

## Information Gathered
- `form.html` contains a complete form with: product select (required), overall rating radio group (required), installation date (required), checkbox group, optional written review, and optional name.
- `styles/form.css` defines the form UI, including text color variables and a few custom colors: `--surface-3` (#1f2840), `--accent` (#d46c22), `--accent-soft` (#fde7d3), `.rating-hint` (#57627e), `.star` (#8b9bb6), `.required-marker` (#c73d2d).
- `scripts/form.js` populates the product `<select>` from `window.productCatalog`.

## Plan
### 1) form.html (semantic/accessibility/SEO)
- Add `autocomplete` attributes (e.g., `name="userName" autocomplete="name"`, optional) to reduce Best Practices warnings.
- Add `aria-describedby` for the rating hint so it is properly referenced.
- Ensure the `required` marker does not create contrast issues: keep it but verify it is styled via a CSS rule only (already is).
- Keep label associations already present (`for`/`id`) and ensure any placeholder-only text doesn’t substitute for labels.

### 2) styles/form.css (color contrast AA)
- Adjust `.rating-hint` and `.star` colors to darker tones that maintain AA contrast against the form’s backgrounds.
- Adjust hover/focus state colors if needed (e.g., `.rating-label:hover` background `--accent-soft` with text/star).
- Ensure submit button hover/focus state text contrast remains sufficient.

### 3) Verify
- Re-run Lighthouse and DevTools CSS Overview manually in the browser for `form.html` on both Mobile and Desktop.
- Confirm: no HTML audit errors; Lighthouse Accessibility/Best Practices/SEO >= 95 on mobile+desktop; no AA+ contrast errors.

## Dependent Files to Edit
- `form.html`
- `styles/form.css`

## Followup Steps
- Run Lighthouse for mobile and desktop on `form.html`.
- Open DevTools → CSS Overview → check for contrast errors.


