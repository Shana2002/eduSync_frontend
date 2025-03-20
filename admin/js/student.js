import {LoadStudentModuleDetails,LoadStudentDetails} from './studentModule.js'

document.addEventListener('DOMContentLoaded', () => {
    loadBatches(); 
    loadStudents();
});

var students = [];

// Function to load batches from API
async function loadBatches() {
    try {
        const response = await fetch('http://localhost:8000/v1/batch'); // Replace with your actual API
        if (!response.ok) throw new Error('Failed to fetch batches');

        const batches = await response.json();
        const batchSelectors = document.querySelectorAll('.selector-dec');

        // Clear existing options and add "Select Batch"
        batchSelectors.forEach(select => {
            select.innerHTML = '<option value="">Select Batch</option>';
            batches.forEach(batch => {
                const option = document.createElement('option');
                option.value = batch.batch_id;
                option.textContent = `${batch.title} batch ${batch.batch_id}`;
                select.appendChild(option);
            });

            // Add event listener to filter students
            select.addEventListener('change', filterStudents);
        });

    } catch (error) {
        console.error('Error loading batches:', error);
    }
}

// Function to load students from API
async function loadStudents() {
    students = [];
    try {
        const response = await fetch('http://localhost:8000/v1/student'); // Replace with your actual API
        if (!response.ok) throw new Error('Failed to fetch students');

        students = await response.json();
        renderStudents(students);
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

// Function to render students
function renderStudents(show_student) {
    const resultHolder = document.querySelector('.result-holder');
    resultHolder.innerHTML = '';

    if (show_student.length === 0) {
        resultHolder.innerHTML = '<p style="color: gray;">No students found.</p>';
        return;
    }

    show_student.forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.classList.add('student-card-long');

        studentCard.innerHTML = `
            <img class="stu-img-s" src="../assets/Customer.png" alt="">
            <div class="stu-details">
                <h3>${student.first_name} ${student.last_name} / ID: ${student.username} / NIC: ${student.mobile}</h3>
                <p>Batch ${student.batch_id} - ${student.title}</p>
            </div>
            <h4 class="view-more-btn" data-student-id="${student.student_id}">View more</h4>
        `;

        resultHolder.appendChild(studentCard);
    });

    // Corrected event listener outside the loop
    document.querySelectorAll('.view-more-btn').forEach((btn) => {
        btn.addEventListener('click', function () {
            const studentId = this.getAttribute('data-student-id');
            document.getElementById('stu-detail-panel').classList.add('toggle-stu-panel');
            LoadStudentDetails(studentId);
            LoadStudentModuleDetails(studentId)
        });
    });
}


// Function to filter students based on selected batch
async function filterStudents() {
    const selectedBatch = document.querySelector('.selector-dec').value;
    try {
        const response = await fetch(`http://localhost:8000/v1/students?batch_id=${selectedBatch}`);
        if (!response.ok) throw new Error('Failed to fetch students');

        const students = await response.json();
        renderStudents(students);
    } catch (error) {
        console.error('Error filtering students:', error);
    }
}

// Function to implement live search
document.getElementById('search-student').addEventListener('input', async function () {
    const query = this.value.toLowerCase();
    try {
        const filteredStudents = students.filter(student =>
            student.first_name.toLowerCase().includes(query) ||
            student.last_name.toLowerCase().includes(query) ||
            student.student_id.toString().includes(query) ||
            student.mobile.includes(query) ||
            student.username.toLowerCase().includes(query)
        );

        renderStudents(filteredStudents);
    } catch (error) {
        console.error('Error filtering students by search:', error);
    }
});

// Function to handle view more click
export function viewStudent(studentId) {
    alert(`View details for Student ID: ${studentId}`);
    document.getElementById('stu-detail-panel').classList.add('toggle-stu-panel')
}

// 
document.addEventListener("DOMContentLoaded", async () => {
    const batchSelect = document.getElementById("student-batch");

    // Fetch available batches
    try {
        const response = await fetch("http://localhost:8000/v1/batch");
        if (!response.ok) throw new Error("Failed to load batches");

        const batches = await response.json();
        batchSelect.innerHTML = `<option selected disabled>Select Batch</option>`; // Reset options

        batches.forEach(batch => {
            const option = document.createElement("option");
            option.value = batch.batch_id;
            option.textContent = `Batch ${batch.batch_id} - ${batch.title}`;
            batchSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading batches:", error);
        batchSelect.innerHTML = `<option disabled>Error loading batches</option>`;
    }
});

// Handle form submission
document.getElementById("add-student-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const email = document.getElementById("student-email").value.trim();
    const first_name = document.getElementById("student-firstname").value.trim();
    const last_name = document.getElementById("student-lastname").value.trim();
    const mobile = document.getElementById("student-mobile").value.trim();
    const batch = document.getElementById("student-batch").value;

    // Validation
    if (!email || !first_name || !last_name || !mobile || !batch) {
        alert("Please fill in all fields");
        return;
    }

    // Create request payload
    const studentData = { email, first_name, last_name, mobile, batch };

    try {
        const response = await fetch("http://localhost:8000/v1/student/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData),
        });

        if (!response.ok) throw new Error("Failed to add student");

        alert("Student added successfully!");
        loadStudents();
        // Clear the form after successful submission
        document.getElementById("add-student-form").reset();
    } catch (error) {
        console.error("Error adding student:", error);
        alert("Error adding student. Please try again.");
    }
});
