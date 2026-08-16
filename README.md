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


## Day 8 Exercise 3: Submission Notes

### Indexing and Logging
* Added `@Indexed` annotations to `status`, `priority`, `category`, `createdBy`, and `createdAt` in the `Ticket` model to optimize database read operations.
* Enabled auto-index creation in `application.properties`.
* Integrated SLF4J `Logger` into `TicketService`.
* **Verification:** Terminal logs successfully confirm incoming filter variables during `GET` requests, pagination variables, and the final generated MongoDB `ObjectId` when a new ticket is saved via `POST`.


## Day 8 Exercise 4: Query Test File and Notes

**1. Which query parameters did you implement?**
I implemented `status`, `priority`, and `category` for the filtering endpoint. For the pagination and sorting endpoint, I implemented `page`, `size`, `sortBy`, and `direction`.

**2. Which fields did you index?**
In the `Ticket` model, I applied the `@Indexed` annotation to the `status`, `priority`, `category`, `createdBy`, and `createdAt` fields to optimize database read performance.

**3. Why should an API use pagination?**
An API should use pagination to prevent the server from crashing or slowing down when trying to return massive datasets. Returning thousands or millions of records at once consumes too much memory, bandwidth, and processing power. Pagination breaks the data into manageable chunks, significantly improving performance and user experience.

**4. What log messages appear when you call the filtering endpoint?**
When calling the filtering endpoint (e.g., `GET /api/tickets?status=OPEN`), the SLF4J logger prints:
`INFO ... c.e.assettracker.service.TicketService : Fetching tickets with filters - status: OPEN, priority: null, category: null`

**5. What endpoint proves your sorting works?**
The endpoint `GET /api/tickets/paged?page=0&size=5&sortBy=createdAt&direction=desc` proves the sorting works, as modifying the `sortBy` or `direction` parameters changes the order of the array returned in the `content` field of the JSON response.


## Day 9 Exercise 5 - Authentication Reflection Notes

**1. What is authentication?**
Authentication is the process of verifying *who* a user is. It confirms the user's identity, typically by checking credentials like an email and password against a database.

**2. What is authorisation?**
Authorisation is the process of verifying *what* a user is allowed to do. Once a user is authenticated, authorisation determines their permissions, such as whether they have the "ADMIN" role required to create a ticket.

**3. What does 401 mean?**
`401 Unauthorized` means the client must authenticate itself to get the requested response. It happens when a token is missing, expired, or entirely invalid.

**4. What does 403 mean?**
`403 Forbidden` means the client's identity is known (they are authenticated), but they do not have the correct access rights to the content. It happens when a "USER" tries to access an endpoint that strictly requires an "ADMIN" role.

**5. Why do we hash passwords?**
We hash passwords to protect user credentials in the event of a database breach. Hashing uses a one-way mathematical algorithm (like BCrypt) that cannot be reversed. This ensures plain text passwords are never stored or exposed.

**6. Where is the JWT placed in an HTTP request?**
The JWT is placed in the HTTP headers under the `Authorization` key, using the `Bearer` schema. Format: `Authorization: Bearer <token_string>`.


## Day 10 Exercise 1 - Reflection

**Why might a company keep both `/api/tickets` and `/api/v1/tickets` temporarily?**
A company keeps both endpoints for backwards compatibility. If they instantly delete the old `/api/tickets` endpoint, they will break the existing frontend applications or mobile apps currently relying on it. By keeping both temporarily, developers give their clients time to migrate their code to use the new `/api/v1/tickets` route without causing sudden downtime.

## Day 10 Exercise 2 - Reflection

**Why is a grouped report endpoint better than asking the frontend to download all tickets and count them manually?**
Downloading all tickets to the frontend requires transferring a massive amount of data over the network, which is extremely slow and wastes bandwidth. By using a grouped report endpoint, the backend utilizes MongoDB's highly optimized aggregation engine to do the heavy lifting. The frontend then only receives a tiny summary JSON payload, making the application significantly faster, more efficient, and infinitely more scalable.

## Day 10 Exercise 3 - Reflection

**How could this report help a support manager decide where to assign staff?**
A priority report provides immediate visibility into the urgency of the current workload. If the report shows a massive spike in "HIGH" priority tickets, the manager can proactively reassign staff from lower-priority tasks or administrative work to tackle the critical issues immediately, ensuring service level agreements (SLAs) are met and critical system blocks are resolved first.


## Day 10 Exercise 4 - Reflection

**Why is API documentation useful before frontend integration?**
API documentation acts as a clear "contract" between the backend and frontend teams. It allows frontend developers to see exactly what endpoints exist, what HTTP methods to use, what security tokens are required, and what JSON structures to expect. This means the frontend team can start building their UI and integrating the API immediately without having to wait for backend developers to explain things or dig through backend Java code to figure it out.


## Day 10 Exercise 5 - Reflection

**What is one thing you would improve before connecting this backend to React?**
One crucial improvement would be configuring CORS (Cross-Origin Resource Sharing) globally in the Spring Security setup. Currently, the backend runs on port 8080. When a React frontend starts up (usually on port 3000 or 5173), the web browser will block any API requests due to the differing origins. Explicitly allowing the frontend's specific origin URL in the backend's CORS policy is required to allow seamless communication between the two applications.