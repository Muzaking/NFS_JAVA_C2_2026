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


Day 1 Exercise 01 - Code Explanation
1. What is the purpose of Course.java?
It defines the blueprint for a Course object. It encapsulates the data (fields like course name, code, or credits) and behaviors (methods like adding students or assigning instructors) specific to a course. Think of these classes as foundational domain models—very similar to the Java entity files you might map out, debug, and compile for a backend Spring Boot service.

2. What is the purpose of Instructor.java?
It serves as the template for creating Instructor objects. It holds the attributes specific to a teacher (like name, department, or employee ID) and the actions they can perform within the system.

3. What is the purpose of Student.java?
It provides the structure for Student objects, tracking individual student states (like name, student ID, and enrolled courses) and defining what a student can do.

4. What does the constructor do?
The constructor initializes a newly created object. When you instantiate an object using the new keyword, the constructor sets up its initial state by allocating memory and assigning default or provided values to the object's fields.

5. Why are the fields marked as private?
This enforces encapsulation, a core object-oriented programming principle. By making fields private, you restrict direct modification from outside the class, preventing unintended interference or invalid data assignment. Other classes must interact with these fields through controlled, public methods (getters and setters).

6. What does course1.assignInstructor(instructor1); mean?
This demonstrates an object relationship (specifically, an association). It calls the assignInstructor method on the course1 object and passes the instructor1 object as an argument. This links that specific instructor instance to that specific course instance.

7. What does student1.printProfile(); do?
This invokes an instance method on the student1 object. It executes the logic defined inside the printProfile method of the Student class, which likely accesses the object's private fields to output a formatted summary of the student's details.

AI-Assisted Task: TypeScript & C# Comparison
Since you have a choice between TypeScript and C#, here is an explanation focusing heavily on TypeScript, which translates perfectly if you are used to building frontend web applications with frameworks like Angular:

Explanation for a TypeScript or C# Developer:
"A Java class functions almost identically to a class in TypeScript or C#—it is the blueprint for instantiating objects.

Syntax & Typing: Like TypeScript and C#, Java is statically typed, meaning you must declare the data types for all fields and return values (e.g., String name, int age).

Constructors: Instead of TypeScript's constructor() keyword, Java (like C#) uses a method with the exact same name as the class and no return type. For example, public Student() { ... }.

Self-Reference: To refer to the current instance's variables, Java uses the this keyword (e.g., this.name = name;). This is the exact equivalent of this.name in TypeScript and C#.

Encapsulation: Java enforces strict access modifiers (private, public, protected) directly on each field and method, operating identically to how they work in both TypeScript and C#."
