const batchSelect = document.getElementById('batch');
const moduleSelect = document.getElementById('module');
const sessionNumberInput = document.getElementById('session-number');
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