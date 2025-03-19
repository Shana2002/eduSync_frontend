const batchSelect = document.getElementById('batch');
const moduleSelect = document.getElementById('module');
const sessionNumberInput = document.getElementById('session-number');
const lectureName = document.getElementById('lecture-name');
const moduleAssign = document.getElementById('module-assign-id');
const lectureHallSelect = document.getElementById('lecture-hall');

async function loadBatches() {
    try {
        const response = await fetch('http://localhost:8000/v1/batch');
        const batches = await response.json();
        batchSelect.innerHTML = '<option selected disabled>Select Batch</option>';

        batches.forEach(batch => {
            let option = document.createElement("option");
            option.value = batch.batch_id;
            option.textContent = `batch ${batch.batch_id} - ${batch.title} `;
            batchSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching batches:", error);
        batchSelect.innerHTML = '<option selected disabled>Error loading batches</option>';
    }
}

batchSelect.addEventListener("change", async function() {
    moduleSelect.innerHTML = '<option selected disabled>Loading modules...</option>';
    moduleSelect.disabled = true;
    
    try {
        const response = await fetch(`http://localhost:8000/v1/module/${batchSelect.value}`);
        const modules = await response.json();
        moduleSelect.innerHTML = '<option selected disabled>Select Module</option>';

        modules.forEach(module => {
            let option = document.createElement("option");
            option.value = module.module_id;
            option.textContent = module.title;
            moduleSelect.appendChild(option);
        });

        moduleSelect.disabled = false;
    } catch (error) {
        console.error("Error fetching modules:", error);
        moduleSelect.innerHTML = '<option selected disabled>Error loading modules</option>';
    }
});

moduleSelect.addEventListener("change", async function() {
    sessionNumberInput.value = '';
    try {
        const response = await fetch(`http://localhost:8000/v1/session/gen?module=${moduleSelect.value}&batch=${batchSelect.value}`);
        const data = await response.json();
        sessionNumberInput.value = data.session;
        lectureName.value = data.lecture || '';
        moduleAssign.value = data.module_assign || '';
    } catch (error) {
        console.error("Error fetching lecture halls:", error);
    }
});

async function LoadHalls(){
    try {
        const response = await fetch(`http://localhost:8000/v1/hall/`);
        const halls = await response.json();
        lectureHallSelect.innerHTML = '<option selected disabled>Select Lecture Hall</option>';

        halls.forEach(hall => {
            let option = document.createElement("option");
            option.value = hall.hall_id;
            option.textContent = hall.hall_id + ' - ' + hall.type;
            lectureHallSelect.appendChild(option);
        });

        lectureHallSelect.disabled = false;
    } catch (error) {
        console.error("Error fetching lecture halls:", error);
        lectureHallSelect.innerHTML = '<option selected disabled>Error loading halls</option>';
    }
} 

LoadHalls();
loadBatches();

document.getElementById('add-shedule-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const batch_id = document.getElementById('batch').value;
    const moduleid = document.getElementById('module').value;
    const sessionName = document.getElementById('session-number').value;
    const hall_id = document.getElementById('lecture-hall').value;
    const lectureName = document.getElementById('lecture-name').value;
    const module_assign_id = document.getElementById('module-assign-id').value;
    const shedule_data = document.getElementById('date-shedule').value;
    const start_time = document.getElementById('start-time-shedule').value;
    const end_time = document.getElementById('end-time-shedule').value;

    if(!module_assign_id || !lectureName){
        alert('Module not Assigend for lecture, Assign Lecture and Try again');
        return;
    }
    // Validate required fields
    if (!module_assign_id || !batch_id || !batch_id || !hall_id || !lectureName || !shedule_data || !start_time || !end_time) {
        alert('All fields are required');
        return;
    }

    try {
        // Send POST request to schedule a class
        const response = await fetch('http://localhost:8000/v1/session/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials:'include',
            body: JSON.stringify({
                batch_id,
                moduleid,
                module_assign_id,
                hall_id,
                shedule_data,
                start_time,
                end_time
            })
        });
        alert('hello');
        const data = await response.json();

        if (response.ok) {
            alert('Class scheduled successfully');
            document.getElementById('add-shedule-form').reset(); // Reset form
        } else {
            alert(data.message || 'Failed to schedule class');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

