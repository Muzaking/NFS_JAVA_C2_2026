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

# D11 Exercise 06 — Component Tree and Reflection

## Support Desk Component Tree

```text
App
├── Layout
│   └── AppHeader
├── ApiInfoCard
├── TicketFilterPanel
└── div (Ticket Workspace)
    ├── TicketList
    │   ├── PriorityBadge
    │   └── StatusBadge
    └── TicketDetail
        ├── PriorityBadge
        └── StatusBadge

Reflection Answers
1. Which component owns the selected ticket state?
The App component owns the selectedTicket state (along with the filter and search states) so that it can pass the selected data down to the TicketDetail component.

2. Which components receive props?

TicketFilterPanel receives props for search text, status, and priority values (and their update functions).

TicketList receives the filtered tickets array and the onSelectTicket function.

TicketDetail receives the ticket object.

Layout receives children props to wrap the main content.

3. What does useEffect do in your app?
In the ApiInfoCard component, useEffect triggers the fetchApiInfo() network request exactly once when the component first mounts to the screen, preventing it from fetching repeatedly on every render.

4. What loading state did you create?
An isLoading boolean state in ApiInfoCard. When set to true, the component renders a gray box displaying "⏳ Loading API Information..." while waiting for the Java backend to respond.

5. What error state did you create?
An error state in ApiInfoCard. If the fetch request fails (e.g., if the backend server is turned off), the catch block saves the error message to this state, and the component renders a red box displaying "❌ Error: [error message]".

6. What would change when you connect this UI to the protected backend API later?
We will need to capture a JWT token upon user login and attach it to the Authorization: Bearer <token> header for all future fetch requests. We will also need to handle HTTP 401/403 errors by logging the user out or redirecting them back to a login page if their token is missing or expires.