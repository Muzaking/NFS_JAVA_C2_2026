// 1. Create an array containing at least 4 instructor objects
const instructors = [
    {
        instructorId: "I001",
        instructorName: "Ignacio de Paul",
        expertise: "Java and Spring Boot"
    },
    {
        instructorId: "I002",
        instructorName: "Roberto Tan",
        expertise: "React Development"
    },
    {
        instructorId: "I003",
        instructorName: "Juan Carlos Lee",
        expertise: "MongoDB"
    },
    {
        instructorId: "I004",
        instructorName: "Carlos Kim",
        expertise: "Testing"
    }
];

console.log("=== Instructor List ===");

// 2. Use a for...of loop to print each instructor
for (const instructor of instructors) {
    console.log(instructor.instructorId + " - " + instructor.instructorName + " - " + instructor.expertise);
}

console.log(""); // Adds a blank line for clean formatting

// 3. Print the total number of instructors using .length
console.log("Total instructors: " + instructors.length);