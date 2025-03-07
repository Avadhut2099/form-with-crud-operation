let editIndex = null;

document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const studentData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    fathersName: document.getElementById("fathersName").value,
    mothersName: document.getElementById("mothersName").value,
    birthDate: document.getElementById("birthDate").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value,
    education: document.getElementById("education").value,
    gender: document.querySelector('input[name="gender"]:checked')?.value || "",
    course: document.getElementById("course").value,
    address: document.getElementById("address").value,
  };

  let students = JSON.parse(localStorage.getItem("students") || "[]");

  if (editIndex !== null) {
    students[editIndex] = studentData;
    editIndex = null;
  } else {
    students.push(studentData);
  }

  localStorage.setItem("students", JSON.stringify(students));
  document.getElementById("studentForm").reset();
  displayStudents();
});

// Display students in table
function displayStudents() {
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const tableBody = document.querySelector("#studentsTable tbody");
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.mobile}</td>
      <td>${student.course}</td>
      <td>
        <button  onclick="editStudent(${index})" style="background: #ffc107; 
          color: black; 
          border: none; 
          padding: 6px 12px; 
          margin: 2px;
          cursor: pointer;
          border-radius: 5px;
          transition: background 0.3s" >Edit</button>
        <button onclick="deleteStudent(${index})" style="background: #dc3545; 
          color:black; 
          border: none; 
          padding: 6px 12px; 
          margin: 2px;
          cursor: pointer;
          border-radius: 5px;
          transition: background 0.3s">Delete</button>
        <button onclick="viewStudent(${index})" style=" background: #17a2b8; 
          color: black; 
          border: none; 
          padding: 6px 12px; 
          margin: 2px;
          cursor: pointer;
          border-radius: 5px;
          transition: background 0.3s">View</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Edit student data
function editStudent(index) {
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const student = students[index];

  Object.keys(student).forEach((key) => {
    const field = document.getElementById(key);
    if (field) field.value = student[key];
  });

  if (student.gender) {
    document.querySelector(
      `input[name="gender"][value="${student.gender}"]`
    ).checked = true;
  }

  editIndex = index;
}

// Delete student data
function deleteStudent(index) {
  let students = JSON.parse(localStorage.getItem("students") || "[]");
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

// View student details
function viewStudent(index) {
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  alert(JSON.stringify(students[index], null, 2));
}

window.onload = displayStudents;
