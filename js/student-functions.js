// 1. Create the student object
const student = {
    studentId: "S001",
    studentName: "Aina Rahman",
    email: "aina@example.com",
    status: "Active"
};

// 2. Normal Function
function formatStudent(student) {
    return student.studentId + " - " + student.studentName + " (" + student.status + ")";
}

// 3. Arrow Function (with curly braces and return keyword)
const getStudentEmail = (student) => {
    return student.email;
};

// 4. Short Arrow Function (implicit return, no curly braces)
const getStudentStatus = (student) => student.status;


// === Print the Required Output ===
console.log(formatStudent(student));
console.log(getStudentEmail(student));
console.log(getStudentStatus(student));