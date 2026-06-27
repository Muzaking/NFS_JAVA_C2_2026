// 1. Array of student records
const students = [
    { studentId: "S001", studentName: "Ignacio de Paul", email: "ignacio@example.com", status: "Active" },
    { studentId: "S002", studentName: "Ben Tan", email: "ben@example.com", status: "Inactive" },
    { studentId: "S003", studentName: "Chong Mei", email: "mei@example.com", status: "Active" },
    { studentId: "S004", studentName: "Danish Nawaz", email: "danish@example.com", status: "Active" }
];

// 2. DOM element references
const studentListContainer = document.getElementById("student-list");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resetButton = document.getElementById("reset-button");

// 3. Reusable render function
function renderStudents(studentArray) {
    // Clear out the container completely before rendering
    studentListContainer.innerHTML = "";

    // If no records match, display the fallback message
    if (studentArray.length === 0) {
        studentListContainer.innerHTML = "<p class='no-results'>No students found</p>";
        return;
    }

    // Otherwise, generate and append the cards
    studentArray.forEach((student) => {
        const card = document.createElement("div");
        card.className = "student-card"; 
        card.innerHTML = `
            <h3>${student.studentName}</h3>
            <p><strong>ID:</strong> ${student.studentId}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Status:</strong> ${student.status}</p>
        `;
        studentListContainer.appendChild(card);
    });
}

// 4. Search Button Behavior
searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Filter rows based on whether the name contains the search term string
    const filteredStudents = students.filter((student) => {
        return student.studentName.toLowerCase().includes(searchTerm);
    });
    
    // Render only the matching results
    renderStudents(filteredStudents);
});

// 5. Reset Button Behavior
resetButton.addEventListener("click", () => {
    searchInput.value = ""; // Clear out text input field
    renderStudents(students); // Render original full list
});

// Initial load: render all students when the page first opens
renderStudents(students);