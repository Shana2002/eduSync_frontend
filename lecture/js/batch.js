const batchPanel = document.getElementById('batch-container');
const batchDetailsPanel = document.getElementById('batch-details-panel');


async function loadBatches() {
    // Clear existing child elements
    batchPanel.innerHTML = '';

    try {
        // Fetch batch data from an API
        const response = await fetch('http://localhost:8000/v1/batch/lecture',{
            credentials:'include',
            method:'GET'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch batch data');
        }

        const batches = await response.json(); // Convert response to JSON

        // Loop through the fetched data
        batches.forEach(batch => {
            const batchCard = document.createElement('div');
            batchCard.classList.add('batch-card');
            batchCard.setAttribute('data-id',batch.batch_id); // Add data-id attribute

            batchCard.innerHTML = `
                <img src="../assets/image-6.png" alt="">
                <h2>Batch ${batch.batch_id}</h2>
                <h3>${batch.title}</h3> 
                <p>${120} Students enrolled</p>
            `;

            // Add click event listener
            batchCard.addEventListener('click', function () {
                showBatchDetailsPanel(batch.batch_id)
            });

            batchPanel.appendChild(batchCard);
        });

    } catch (error) {
        console.error('Error loading programs:', error);
        batchPanel.innerHTML = `<p style="color: red;">Failed to load programs. Please try again.</p>`;
    }
}

// Call function with the required number of batches
loadBatches();

function showBatchDetailsPanel(batch_id){
    //alert(`Batch ID: ${batch_id}`);
    loadBatchDetails(batch_id);
    batchDetailsPanel.classList.add('toglle-batch');
}
document.addEventListener('DOMContentLoaded', async () => {
   
});

// Fetch available programs and populate dropdown


async function loadBatchDetails(batch_id){
    document.getElementById('batch-panel-id').innerHTML = `Batch ${batch_id}`;
    try {
        // Fetch batch data from an API
        const response = await fetch(`http://localhost:8000/v1/batch/${batch_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch batch data');
        }

        const batch = await response.json(); // Convert response to JSON
        document.getElementById('panel-batch-title').innerHTML = batch.title;
        document.getElementById('panel-batch-stu').innerHTML = 120;
        document.getElementById('panel-batch-start').innerHTML = 1;
        document.getElementById('panel-batch-end').innerHTML = 1;
        

    } catch (error) {
        console.error('Error loading programs:', error);
        batchPanel.innerHTML = `<p style="color: red;">Failed to load programs. Please try again.</p>`;
    }
    await LoadStudentsBatchPanel(batch_id);
}

async function LoadStudentsBatchPanel(batch_id) {
    const batchStudentPanel = document.getElementById('batch-student-container');
    batchStudentPanel.innerHTML='';
    try {
        // Fetch batch data from an API
        const response = await fetch(`http://localhost:8000/v1/module/lecture/${batch_id}`,{
            method:'GET',
            credentials:'include'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch batch data');
        }

        const students = await response.json(); // Convert response to JSON

        // Loop through the fetched data
        students.forEach(student => {
            const studentCard = document.createElement('div');
            studentCard.classList.add('batch-stu-card');
            studentCard.setAttribute('data-id-stu',student.student_id); // Add data-id attribute

            studentCard.innerHTML = `
                <div class="div1"><img src="../assets/image-2.png" alt=""></div>
                <div class="div2">${student.title}</div>
                <div class="div3">Sessions${student.sessions}</div>
                <div class="div4" onClick="LoadBatchAssigment(${student.module_assign_id})">View Assigments</div>
            `;
             batchStudentPanel.appendChild(studentCard);
            
        });

    } catch (error) {
        console.error('Error loading programs:', error);
        batchStudentPanel.innerHTML = `<p style="color: red;">Failed to load programs. Please try again.</p>`;
    }
}

async function LoadBatchAssigment(module_assign) {
    const batchStudentPanel = document.getElementById('assigment-table-container');
    document.getElementById('assigment-panel').classList.add('toggle-assigment');
    batchStudentPanel.innerHTML = '';

    try {
        // Fetch batch assignment data from the API
        const response = await fetch(`http://localhost:8000/v1/assigment/lecture/${module_assign}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch batch data');
        }

        const assignments = await response.json();

        if (!assignments.length) {
            batchStudentPanel.innerHTML = `<p style="color: gray;">No assignments available for this batch.</p>`;
            return;
        }

        // Create a table dynamically
        let tableHTML = `
            <div class="assigment-table-container">
                <div class="assigment-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Marks</th>
                                <th>Download</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>`;

        assignments.forEach(assignment => {
            const marksInput = assignment.marks_obtain === null
                ? `<input type="number" class="table-input" id="marks-${assignment.username}" placeholder="Enter Marks" min="0" max="100" style="width:60px;">
                   <button onclick="submitMarks('${assignment.username}')">Submit</button>`
                : assignment.marks_obtain;

            tableHTML += `
                <tr>
                    <td>${assignment.first_name} ${assignment.last_name}</td>
                    <td>${assignment.username}</td>
                    <td>${assignment.status || 'Not Submitted'}</td>
                    <td>${marksInput}</td>
                    <td>${assignment.file ? `<a href="${assignment.file}" download>Download</a>` : '-'}</td>
                    <td>${assignment.marks_obtain === null ? 'Pending' : 'Graded'}</td>
                </tr>`;
        });

        tableHTML += `
                        </tbody>
                    </table>
                </div>
            </div>`;

        batchStudentPanel.innerHTML = tableHTML;
    } catch (error) {
        console.error('Error loading assignments:', error);
        batchStudentPanel.innerHTML = `<p style="color: red;">Failed to load assignments. Please try again.</p>`;
    }
}

// Function to submit marks
async function submitMarks(username) {
    const marks = document.getElementById(`marks-${username}`).value;
    
    if (!marks || marks < 0 || marks > 100) {
        alert("Please enter valid marks between 0-100.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/v1/assigment/marks/${username}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ marks_obtain: marks })
        });

        if (!response.ok) {
            throw new Error("Failed to submit marks");
        }

        alert("Marks submitted successfully!");
        LoadBatchAssigment(module_assign); // Refresh table after submission
    } catch (error) {
        console.error('Error submitting marks:', error);
        alert("Error submitting marks. Please try again.");
    }
}


// Example functions for upload and manage buttons
function uploadAssignment(assignmentId) {
    alert(`Upload function triggered for assignment ID: ${assignmentId}`);
}

function manageContents(assignmentId) {
    alert(`Manage function triggered for assignment ID: ${assignmentId}`);
}
