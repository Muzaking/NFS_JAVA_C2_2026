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

Day 7 Exercise 1

### Reflection Questions

**What is the purpose of the admin database?**
It is a special internal database used by MongoDB to store system configurations, user credentials, and role-based access privileges for the entire server.

**Why should an application use its own database user instead of the root administrator?**
This follows the Principle of Least Privilege. If a hacker breaches your application, they will only gain access to that specific app's data. If the app uses the root account, the hacker gains full control over every database on the entire server.

**What is the difference between authentication and authorization?**
Authentication verifies who you are (e.g., logging in with a username and password). Authorization determines what you are allowed to do once you are logged in (e.g., having "readWrite" permission vs "root" permission).

**What would happen if authentication was disabled on a production database?**
Anyone who finds the server's IP address on the internet could freely connect to it, read all sensitive customer data, modify it, or completely delete all databases without needing a password.


## Day 7 Exercise 3: Submission Notes

### Database Confirmation
I successfully confirmed that the API data was retrieved from MongoDB rather than the temporary in-memory list from Day 6. 

**Evidence:**
* **Data Match:** The `GET /api/tickets` endpoint returned the exact sample document I manually inserted into the `support_desk_db` database using MongoDB Compass during Exercise 1.
* **ObjectId Generation:** The `id` field in the JSON response is a 24-character hexadecimal string (e.g., `"6a67ba32bf66d52f3ada82d3"`). This is an authentic `ObjectId` generated natively by MongoDB, completely replacing the simple string IDs used in the previous Java list implementation.


## Day 7 Exercise 4: Submission Notes

### Create Ticket Confirmation
The `POST /api/tickets` endpoint successfully creates and saves new tickets directly to MongoDB. 

**Evidence:**
* Sending a valid JSON request returns a `201 Created` response containing the mapped Response DTO, which includes a newly generated MongoDB `ObjectId` (e.g., `"6a67ba..."`), an auto-generated timestamp for `createdAt`, and the default status of `"OPEN"`.
* Sending an invalid JSON body triggers the `@Valid` annotations and successfully returns a `400 Bad Request` without attempting to save to the database.
* **Database Verification:** I verified via MongoDB Compass that the new document is successfully persisted in the `support_desk_db` database inside the `tickets` collection.

## Day 7 Exercise 5: Persistence Checkpoint

### Persistence Test Confirmation
I successfully confirmed that the Support Desk API permanently stores data in MongoDB, replacing the volatile in-memory list.

**Test Steps & Results:**
* Started MongoDB and the Spring Boot application.
* Sent a `POST /api/tickets` request to create a new ticket (Title: "Cannot access email").
* **Ticket ID Created:** `6a7fe86428597028693ca714`
* Sent a `GET /api/tickets` request and verified the ticket appeared in the list.
* Stopped the Spring Boot application server completely.
* Restarted the Spring Boot application.
* Sent another `GET /api/tickets` request. 
* **Confirmation:** The ticket with ID `6a7fe86428597028693ca714` was still present in the response array, proving successful data persistence.

---

### Reflection Questions

**1. What is the role of the repository?**
The repository acts as the bridge (or data access layer) between the Spring Boot application and the MongoDB database. By extending `MongoRepository`, it provides built-in methods for standard CRUD (Create, Read, Update, Delete) operations, allowing the application to interact with the database using standard Java methods instead of writing raw database query language.

**2. What is the difference between Ticket and TicketResponse?**
`Ticket` is the internal database model (Entity) representing exactly how the data is mapped and stored inside MongoDB. `TicketResponse` is a Data Transfer Object (DTO) used to define exactly what data is sent back to the client over the network. Using a DTO prevents exposing sensitive internal database fields and allows us to format data (like converting Date objects to Strings) before the client sees it.

**3. What does MongoDB store as the document ID?**
MongoDB automatically generates and stores a 24-character hexadecimal string called an `ObjectId`. In the database document, this is stored under the exact field name `_id`. 

**4. Why should the controller not talk directly to MongoDB?**
This violates the "Separation of Concerns" design principle. The Controller's only job should be receiving HTTP requests and sending HTTP responses. If it talks directly to the database, business logic gets tangled with routing logic, making the application extremely difficult to test, maintain, and scale. By routing data through a Service layer to the Repository, we keep the architecture clean and modular.