// 1. Select the HTML elements
const statusMessage = document.getElementById("status-message");
const studentList = document.getElementById("student-list");

// 2. Create renderStudents(students)
function renderStudents(students) {
    // Clear the student-list area
    studentList.innerHTML = "";

    // Loop through the students array and create cards
    students.forEach((student) => {
        const card = document.createElement("div");
        card.className = "student-card";
        card.innerHTML = `
            <h3>${student.studentName}</h3>
            <p><strong>Student ID:</strong> ${student.studentId}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Status:</strong> ${student.status}</p>
        `;
        // Append each card to the page
        studentList.appendChild(card);
    });
}

// 3. Create async function loadStudents()
async function loadStudents() {
    try {
        // 4. Show a loading message
        statusMessage.textContent = "Loading students...";

        // 5. Fetch students.json
        const response = await fetch("students.json");

        // Check if the response is okay
        if (!response.ok) {
            throw new Error("Failed to load student data.");
        }

        // 6. Convert JSON into JavaScript objects
        const students = await response.json();

        // 7. Render the students and clear the loading message
        statusMessage.textContent = "";
        renderStudents(students);

    } catch (error) {
        // 8. Handle errors
        statusMessage.textContent = "Error: " + error.message;
    }
}

// 9. Call the function
loadStudents();