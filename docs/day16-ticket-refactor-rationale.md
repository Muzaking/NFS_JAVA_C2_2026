# Day 16: Ticket Refactor Rationale

**Files Changed**
* `backend/src/.../service/TicketService.java`
* `frontend/src/components/TicketFormWizard.jsx`
* `frontend/src/components/TicketFormWizard.test.jsx`
* `frontend/src/utils/ticketFormValidation.js` (New)
* `frontend/src/utils/ticketFormValidation.test.js` (New)

**What Behaviour Was Preserved**
* The `POST /api/v1/tickets` and `PUT /api/v1/tickets/{id}` endpoints continue to accept and return the exact same JSON payload structure.
* The React frontend displays the exact same UI layout, and users receive the same inline validation error messages when submitting empty fields.

**What Logic Was Extracted**
* **Backend:** Extracted redundant Entity-to-DTO mapping logic into a `mapToResponse()` helper. Extracted payload sanitization into `normalizeRequired()`, `normalizeStatus()`, and `normalizePriority()` helpers.
* **Frontend:** Extracted inline form validation logic and payload trimming out of the `TicketFormWizard.jsx` component and into a standalone `ticketFormValidation.js` utility file.

**Why the New Version is Easier to Maintain**
* **Separation of Concerns:** The React component is now strictly responsible for rendering the UI and tracking state, while the utility file handles the business rules.
* **Readability:** Backend service methods like `createTicket` now read like plain English instead of being cluttered with raw string manipulation and data mapping.
* **Testability:** Frontend validation rules can now be instantly tested in isolation using Vitest without needing to mount the DOM or mock form submission events.

**Tests & HTTP Requests Run**
* **Playwright E2E:** Ran `npm run test:e2e` to verify the full support desk flow (login, create ticket, view ticket) still functions.
* **Vitest:** Ran `npm run test` to verify all 14 component and utility unit tests pass, specifically confirming the new normalization defaults.
* **Manual HTTP Checks:** Verified `GET /api/v1/tickets?page=0&size=5` successfully fetches paginated results.

**Any Risk That Still Remains**
* If a new required field (e.g., `assignedTo`) is added to the database model in the future, developers must remember to update both the React component's state *and* the isolated validation utility, as they are now decoupled.