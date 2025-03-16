const batchPanel = document.getElementById('batch-container');
const batchDetailsPanel = document.getElementById('batch-details-panel')

async function loadBatches() {
    // Clear existing child elements
    batchPanel.innerHTML = '';

    try {
        // Fetch batch data from an API
        const response = await fetch('http://localhost:8000/v1/batch');
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
    await loadPrograms(); // Load programs into dropdown when page loads
});

// Fetch available programs and populate dropdown
async function loadPrograms() {
    try {
        const response = await fetch('http://localhost:8000/v1/program');
        if (!response.ok) throw new Error('Failed to fetch programs');

        const programs = await response.json();
        const programDropdown = document.getElementById('batch-program');

        // Populate dropdown
        programs.forEach(program => {
            const option = document.createElement('option');
            option.value = program.program_id;
            option.textContent = program.title;
            programDropdown.appendChild(option);
        });

    } catch (error) {
        console.error('Error fetching programs:', error);
        alert('Failed to load programs.');
    }
}

// Handle batch form submission
document.getElementById('add-batch-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const program = document.getElementById('batch-program').value;
    const start_Date = document.getElementById('batch-start-date').value;

    // Validate fields
    if (!program || !start_Date) {
        alert('Please select a program and choose a start date.');
        return;
    }

    const batchData = { program, start_Date};

    try {
        // Send batch creation request
        const response = await fetch('http://localhost:8000/v1/batch/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Send authentication cookies
            body: JSON.stringify(batchData)
        });

        if (!response.ok) throw new Error('Failed to create batch');

        alert('Batch created successfully!');
        document.getElementById('add-batch-form').reset();
        loadBatches();

    } catch (error) {
        console.error('Error creating batch:', error);
        alert('Error creating batch. Please try again.');
    }
});

function loadBatchDetails(batch_id){
    document.getElementById('batch-panel-id').innerHTML = `Batch ${batch_id}`;
    
}
