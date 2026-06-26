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

DAY 3 EXERCISE 1
Reflection:
When courseService.getCourseById("C004") is called in the demo, the request follows this exact path:

First, it goes to CourseService.java: The service receives the request from the demo. It acts as the gatekeeper.

Second, it goes to CourseRepository.java / InMemoryCourseRepository.java: The service passes the ID to the repository layer, asking it to search its storage (findById).

Third, it goes to the Course.java model: Once the repository finds the correct data in its memory (the LinkedHashMap), it returns it packaged as a Course object back up the chain to the demo class.

DAY 3 EXERCISE 2
**Why is InMemoryCourseRepository temporary storage?**
It is temporary because it stores data inside the computer's short-term memory (RAM) using a Java data structure like a `LinkedHashMap`. Because it only exists in memory, the moment your Java program stops running or the server restarts, all of your saved courses are completely erased and lost forever.

**What would probably replace it later when we use MongoDB?**
It will be replaced by a real database implementation, typically a Spring Data interface like `MongoRepository`. Instead of saving data in a temporary Java map, this new repository will send the data to an actual MongoDB database, which writes the information permanently to a hard drive so it survives even if the application shuts down.

DAY 3 EXERCISE 3
**Why is throwing CourseNotFoundException better than printing inside CourseService?**
Throwing an exception keeps the business logic (the Service) completely separate from the presentation layer (the Demo). A console app, a web API, and a frontend app may all display the same error differently. If the Service prints directly using `System.out.println`, a Web API wouldn't be able to turn that into a proper HTTP 404 response, and a frontend React app couldn't use it to show a red popup to the user. By throwing an exception, the Service simply signals that a rule was broken, leaving it up to the caller to decide the best way to handle and display that error.

DAY 3 EXERCISE 4
**Why is CourseOffering a better design than putting start date, end date, and capacity directly inside Course?**
A `Course` is just a blueprint or syllabus (like "Java Fundamentals"). If we put a specific start date directly inside the `Course` object, we could only ever teach that course one single time! By separating them, we use Composition to link one `Course` blueprint to multiple `CourseOffering` events. This allows us to teach the exact same Java Fundamentals course in June, July, and August without having to duplicate the core curriculum data.

DAY 3 EXERCISE 5
**Which version is easier to understand: loop or stream? Why?**
For a beginner, the loop is easier to understand because it explicitly shows every single step of the process: creating an empty list, grabbing one item at a time, checking the condition, and manually adding it. The stream version is much shorter and cleaner to read once you are used to it, but it hides all that "how-to" logic behind the scenes.

**What does filter() do in a stream?**
The `.filter()` method acts as an invisible `if` statement inside a loop. It checks every item in the stream against a condition (like checking if the level matches). If the condition is true, it keeps the item in the stream; if it is false, it throws the item out.

DAY 3 EXERCISE 6

**How is StudentService similar to CourseService?**
They both follow the exact same architectural pattern. Both services act as the "manager" for their specific data (Courses vs. Students). They enforce business rules (like checking for nulls, validating fields, and preventing duplicates), throw custom exceptions when rules are broken, and delegate all actual data saving and searching to a Repository interface.

**Which file stores students temporarily while the program is running?**
`InMemoryStudentRepository.java`. It stores the student data in the computer's short-term memory (RAM) using a Java data structure like a `LinkedHashMap`.