// 1. Create the array of at least 4 students
const students = [
    { studentId: "S001", studentName: "Ignacio de Paul", email: "ignacio@example.com", status: "Active" },
    { studentId: "S002", studentName: "Ben Tan", email: "ben@example.com", status: "Inactive" },
    { studentId: "S003", studentName: "Chong Mei", email: "mei@example.com", status: "Active" },
    { studentId: "S004", studentName: "Danish Nawaz", email: "danish@example.com", status: "Active" }
];

// 2. Select the empty div from the HTML
// Make sure your index.html has a div with id="student-list"
const studentListContainer = document.getElementById("student-list");

// 3. Loop through the array using forEach
students.forEach((student) => {
    
    // 4. Create a new div element for each student card
    const card = document.createElement("div");
    
    // Adding a CSS class to the new div so it gets styled
    card.className = "student-card"; 

    // 5. Use innerHTML to insert the student details
    card.innerHTML = `
        <h3>${student.studentName}</h3>
        <p><strong>ID:</strong> ${student.studentId}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Status:</strong> ${student.status}</p>
    `;

    // 6. Append the new card to the main container on the page
    studentListContainer.appendChild(card);
});