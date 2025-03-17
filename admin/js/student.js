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
                option.textContent = batch.title;
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

    if (students.length === 0) {
        resultHolder.innerHTML = '<p style="color: gray;">No students found.</p>';
        return;
    }

    show_student.forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.classList.add('student-card-long');

        studentCard.innerHTML = `
            <div class="stu-img-s"></div>
            <div class="stu-details">
                <h3>${student.first_name} ${student.last_name} / ID: ${student.username} / NIC: ${student.mobile}</h3>
                <p>${student.program}</p>
            </div>
            <h4 class="view-more-btn" onclick="viewStudent(${student.student_id})">View more</h4>
        `;

        resultHolder.appendChild(studentCard);
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
function viewStudent(studentId) {
    alert(`View details for Student ID: ${studentId}`);
}
