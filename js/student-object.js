// 1. Create the student object using an object literal {}
const student = {
    studentId: "S001",
    studentName: "Ignacio de Paul",
    email: "ignacio@example.com",
    status: "Active"
};

// 2. Print the whole object
console.log("=== Student Object ===");
console.log(student);
console.log(""); // Adds a blank line for clean formatting

// 3. Print each property one by one

// Using Dot Notation (Required at least twice)
console.log("Student ID: " + student.studentId);
console.log("Name: " + student.studentName);

// Using Bracket Notation (Required at least once)
console.log("Email: " + student["email"]);
console.log("Status: " + student["status"]);