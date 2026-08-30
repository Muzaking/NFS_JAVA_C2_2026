# NFS_JAVA_C2_2026 | Full-Stack Development with Java, React & MongoDB



## Programme Description



This 20-day programme is designed to help participants build a complete full-stack web application using Java, Spring Boot, React, and MongoDB.



The programme takes learners from programming and web fundamentals to backend API development, frontend interface design, database modelling, authentication, testing, performance improvement, and final capstone presentation.



Throughout the programme, participants will work on practical exercises and gradually build a small but production-like web application. The final outcome is a working capstone project that demonstrates the use of a React frontend, Spring Boot backend, MongoDB database, secure authentication, API documentation, testing practices, and deployment-readiness basics.



AI tools such as Gemini are used as learning accelerators to help scaffold examples, suggest refactoring ideas, draft tests, generate sample data, and support MongoDB query or aggregation design. However, participants are expected to review, verify, understand, and take ownership of all generated code.



---



## Programme Duration



* Duration: 20 training days

* Daily Duration: 7 hours per day

* Total Training Hours: 140 hours

* Mode: Instructor-led training with guided labs, team build activities, review sessions, quizzes, and capstone development



---



## Programme Objectives



By the end of this programme, participants will be able to:



* Understand web fundamentals, HTTP, REST, and JSON.

* Write basic to intermediate Java and JavaScript code.

* Build REST APIs using Spring Boot.

* Apply validation, authentication, authorisation, and error-handling practices.

* Model data effectively using MongoDB.

* Use MongoDB indexes, queries, pagination, and aggregation pipelines.

* Build accessible React user interfaces with routing, forms, state, and data fetching.

* Apply testing practices for backend and frontend development.

* Use AI coding assistants responsibly for learning, refactoring, testing, and documentation.

* Design, build, document, and present a full-stack capstone project.



---





---



## AI-Assisted Learning Guidelines



Participants may use AI tools to:



* Generate README drafts and documentation sections.

* Create API call examples and JSON payload samples.

* Suggest method signatures and edge cases.

* Propose refactoring options.

* Draft test scenarios for backend and frontend features.

* Suggest MongoDB document structures, queries, indexes, and aggregation pipelines.

* Improve demo scripts and presentation notes.



Participants must always review, verify, test, and understand any AI-generated output. No passwords, API keys, tokens, private keys, or confidential data should be placed into AI prompts.

Day 12 Exercise 6: Protected Route Reflection


What is the role of BrowserRouter?
BrowserRouter is the core wrapper for the React application that connects it to the browser's URL. It uses the HTML5 History API to keep the UI in sync with the current URL without requiring a full page reload.

What is the difference between Routes and Route?

<Routes> acts as a container or a switchboard. It looks at the current URL and searches through all its children to find the best matching route.

<Route> defines a single, specific URL path and tells the application exactly which component (element) to render when that path is visited.

Why do we use Outlet?
<Outlet> acts as a placeholder inside a parent layout component (like an AppShell). It tells React Router exactly where to render the nested child components (like Dashboard or Tickets) while keeping the parent's surrounding layout (like sidebars and navigation menus) static on the screen.

What does Navigate do?
<Navigate> is used to instantly redirect a user to a different URL. In our app, it acts as a bouncer—if a user tries to access a protected page without a token, <Navigate to="/login"/> instantly kicks them back to the login screen.

Why is frontend route protection not enough by itself?
Frontend code runs entirely inside the user's browser, which means a malicious user can inspect, manipulate, or bypass the JavaScript code to force the protected UI to render. True security requires the backend to refuse access to the actual data.

Which backend endpoints still need to enforce security?
Every single backend endpoint that deals with sensitive data or state changes must enforce security. This includes all API routes for fetching, creating, updating, or deleting Tickets, Reports, Users, and Assets. The backend must independently verify the JWT token on every single incoming request.


## Day 17 Exercise 05 - Input Sanitisation
* **What is validation?** Checking whether input data meets business rules, constraints, and structural requirements before processing. Invalid data is rejected.
* **What is sanitisation?** Modifying or cleaning input data to make it safe and consistent (e.g., stripping hidden characters or trimming spaces) before validation.
* **Give one example where input should be cleaned.** An asset tag with accidental trailing spaces and lowercase letters (e.g., `" lap-2026-4721 "`) should be cleaned to `"LAP-2026-4721"`.
* **Give one example where input should be rejected.** A completely empty payload or missing required field (like `serialNumber`). This cannot be fixed by cleaning and must be rejected with a 400 Bad Request.

## Day 18 Exercise 04 - Environment and Secrets
**Why `.env` Should Never Be Committed**

* **Security Risk:** Your `.env` file contains sensitive live credentials, database passwords, and cryptographic keys (like `APP_JWT_SECRET`). Committing this to Git permanently exposes your security keys to anyone with access to the repository.
* **Environment Differences:** Environment variables are meant to change depending on where the code is running. Your local machine might need port `27018`, but the production server will likely use port `80` or `443`. Hardcoding state in version control causes conflicts between developer machines and deployment servers.

## Day 18 Exercise 05 - Broken Docker Compose Troubleshooting Lab
Part E: Reflection Answers

The difference between down and down -v: The standard down command stops and removes containers and networks but safely preserves your named volumes (and the data inside them). Adding the -v (volumes) flag deliberately destroys those named volumes alongside the containers.

MongoDB data behavior: Containers are ephemeral by default, meaning any data written inside them disappears when the container is removed. The Compose volume acts as a persistent lifeline mapped to MongoDB's internal /data/db directory. When you remove the volume, that lifeline is severed, and the database is permanently erased.

Using down -v before a demo: It guarantees a completely clean slate. Whether you are demonstrating a fresh installation of an application like SelfBorn or doing a final-year project presentation at Universiti Teknologi Malaysia, wiping the volume ensures no awkward leftover test entries or corrupted states leak into your live demo.