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


Day 4 Exercise 1 

**What is one difference between a Java object and a JavaScript object?**
In Java, you must define a strict blueprint (a `class`) before you can create an object. In JavaScript, you can create an object instantly on the fly using an object literal (`{}`) without ever needing to write a class first. Additionally, JavaScript objects are highly flexible—you can easily add or remove properties from them after they are created, whereas Java objects have a fixed structure.

Day 4 Exercise 2
**How is a JavaScript array similar to Java ArrayList?**
A JavaScript array is very similar to a Java ArrayList because both are dynamic. In standard Java arrays, you have to define the exact size upfront (e.g., `new String[10]`), and it can never change. Both JavaScript arrays and Java ArrayLists allow you to add, remove, and modify items on the fly without worrying about a fixed size limit. They also both use zero-based indexing and have built-in methods (like `.length` in JS or `.size()` in Java) to check how many items are inside.

Day 4 Exercise 3
**Why are arrow functions important before learning React?**
Arrow functions are absolutely essential for React because React relies heavily on functional programming patterns. In modern React, entire UI components are written as arrow functions. Additionally, they are constantly used for array methods (like `.map()` to render lists) and event handlers (like `onClick`). Their shorter syntax keeps React code clean and readable, and they also handle the `this` keyword much more predictably than traditional functions.

Day 4 Exercise 4

**1. What is the difference between filter, find, and map?**
- `filter` returns a completely *new array* containing ALL items that match your condition. 
- `find` returns only the *first single object* that matches your condition (or `undefined` if nothing matches).
- `map` returns a *new array* of the exact same size, but transforms every single item inside it into something else (like extracting just the emails).

**2. Which four array methods change the original array?**
`push`, `pop`, `shift`, and `unshift`.

**3. What does push return?**
It returns the new total length of the array (a number).

**4. What does pop return?**
It returns the exact object/item that was just removed from the end of the array.

**5. What is the difference between shift and unshift?**
`shift` removes an item from the very beginning (index 0) of the array, while `unshift` adds a new item to the very beginning of the array.

Day 4 Exercise 5
**What does the DOM allow JavaScript to do?**
The DOM (Document Object Model) acts as a bridge between HTML and JavaScript. It allows JavaScript to dynamically read, create, change, or delete HTML elements and CSS styles on a web page in real-time. Instead of a webpage being a static, unchangeable document, the DOM allows JavaScript to turn it into an interactive application.

Day 4 Exercise 6
**How is JavaScript filter used in a search feature?**
In a search feature, the `.filter()` method is used to scan through an array of objects and check if a specific property (like `studentName`) contains the user's search query. By converting both the source property value and the search input text to lowercase via `.toLowerCase()`, the search feature becomes case-insensitive. `.filter()` outputs a completely new array containing only the matching elements, leaving the original data array untouched. This filtered array is then passed directly to a UI rendering function to dynamically update the view.