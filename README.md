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

# Day 5 Exercise 5.1: HTTP Investigation

## 1. Investigation Table

| Method | URL | Status Code | Response Type | What Happened? |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `http://localhost:8080/api/course-offerings` | 200 OK | List | The request successfully retrieved an array containing all available course offerings in the database. |
| **GET** | `http://localhost:8080/api/course-offerings/1` | 200 OK | Single object | The request successfully retrieved the specific details for the single course offering with ID 1. |
| **GET** | `http://localhost:8080/api/course-offerings/999` | 404 Not Found | Error object | The request failed because it searched for an ID (999) that does not exist in the database. The server returned a clear "Not Found" error message. |
| **POST** | `http://localhost:8080/api/course-offerings` | 201 Created | Single object | Sent a request with a valid JSON payload. The server successfully created a new record in the database and returned the newly created object (including its newly generated ID). |
| **POST** | `http://localhost:8080/api/course-offerings` | 400 Bad Request | Error object | Sent a request with an invalid or empty JSON payload (e.g., missing required fields). The server rejected the creation and returned a validation error message. |

---

## 2. Questions to Answer

**1. Which request returned a successful list response?**
The `GET` request made to the base endpoint (`/api/course-offerings`) without specifying a specific ID. 

**2. Which request returned a not-found response?**
The `GET` request made to a specific endpoint ID that did not exist in the mock database (e.g., `/api/course-offerings/999`), resulting in a 404 status.

**3. Which request returned a validation error?**
The `POST` request where the JSON body was either empty or missing required data fields. The server caught the bad data and rejected it with a 400 status.

**4. What is the difference between a successful response and an error response?**
A successful response (usually 200-level status codes like 200 OK or 201 Created) returns the actual data the client asked for, such as a List or a Single Object. An error response (like 400 Bad Request or 404 Not Found) returns an Error Object containing details about what went wrong and why the server could not fulfill the request.

**5. Why is the status code important for frontend developers?**
Status codes give frontend developers an immediate, standardized way to check if a request succeeded or failed before attempting to parse the data. In JavaScript, checking `if (!response.ok)` allows the frontend to easily decide whether to display the loaded data to the user or to show an appropriate error message on the screen.

---

## 3. Reflection

**What is one thing you understand better about REST after this exercise?**
I have a much clearer understanding of how HTTP methods (GET, POST) and Status Codes work together as a standardized communication language. Instead of every API responding in its own unique way, REST relies on predictable status codes (like 200, 201, 400, 404) to instantly tell the frontend exactly what happened, making it much easier to write reliable application logic.


# Day 5 Exercise 5.2: REST API Design

## 1. API Specification Table

| Resource | Method | Endpoint | Purpose | Request Body Needed? | Success Status | Possible Error Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Event** | `GET` | `/api/events` | Retrieve a list of all available events. | No | 200 OK | 500 Internal Server Error |
| **Event** | `GET` | `/api/events/{eventId}` | Retrieve the details of one specific event. | No | 200 OK | 404 Not Found |
| **Booking** | `POST` | `/api/bookings` | Create a new booking for an event. | Yes | 201 Created | 400 Bad Request, 404 Not Found |
| **Booking** | `GET` | `/api/bookings` | Retrieve a list of all bookings. | No | 200 OK | 500 Internal Server Error |
| **Booking** | `GET` | `/api/bookings/{bookingId}` | Retrieve the details of one specific booking. | No | 200 OK | 404 Not Found |
| **Booking** | `DELETE`| `/api/bookings/{bookingId}` | Cancel and remove a specific booking. | No | 204 No Content | 404 Not Found, 400 Bad Request |

---

## 2. Request Body Planning

| Endpoint | Request Body Description |
| :--- | :--- |
| `POST /api/bookings` | Must contain the required details to secure a spot at an event. This includes the `eventId` of the event being booked, the `userId` (or email) of the person making the booking, and the `quantity` of tickets/seats they are reserving. |

*(Note: None of the `GET` or `DELETE` requests require a body, as the necessary information to find or delete the resource is passed directly in the URL path).*

---

## 3. Error Planning

| Error Case | Related Endpoint | Suitable Status Code | Explanation |
| :--- | :--- | :--- | :--- |
| **Record does not exist** | `GET /api/events/{eventId}` | **404 Not Found** | The user clicked on or requested an event ID that does not exist in the database (e.g., the event was deleted, or the ID was typed incorrectly). The server cannot return data it doesn't have. |
| **Required field is missing** | `POST /api/bookings` | **400 Bad Request** | The user attempted to submit a booking but left a required field blank (like forgetting to send the `quantity` of tickets). The server rejects the creation because the data is incomplete. |
| **Event is fully booked** | `POST /api/bookings` | **409 Conflict** | The user submitted a perfectly formatted request, but the server rejects it because the event has 0 seats left. It creates a state conflict in the database's business logic. |

---

## 4. REST Principles Reflection

**Why do my endpoint names follow REST principles?**
My endpoint names strictly follow REST principles because they use **nouns** representing the resources (`/events`, `/bookings`) rather than **verbs** representing actions (like `/getAllEvents` or `/cancelBooking`). 

In REST, the URL should only identify *what* you are interacting with. The *action* you want to perform is dictated entirely by the HTTP method used (`GET` to read, `POST` to create, `DELETE` to remove). Using path variables like `/{eventId}` cleanly identifies a specific resource within a collection without needing messy action URLs.