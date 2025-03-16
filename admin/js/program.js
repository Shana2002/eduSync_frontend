const programPanel = document.getElementById('program-container');

async function LoadProgram() {
    // Clear existing child elements
    programPanel.innerHTML = '';

    try {
        // Fetch batch data from an API
        const response = await fetch('http://localhost:8000/v1/program');
        if (!response.ok) {
            throw new Error('Failed to fetch batch data');
        }

        const programs = await response.json(); // Convert response to JSON

        // Loop through the fetched data
        programs.forEach(batch => {
            const batchCard = document.createElement('div');
            batchCard.classList.add('batch-card');

            batchCard.innerHTML = `
                <img src="${batch.image || '../assets/image-2.png'}" alt="">
                <h2>${batch.title}</h2>
                <h3>Duration: ${batch.duration}</h3>
                <h4>${batch.program_characters}</h4>
            `;

            programPanel.appendChild(batchCard);
        });

    } catch (error) {
        console.error('Error loading programs:', error);
        programPanel.innerHTML = `<p style="color: red;">Failed to load programs. Please try again.</p>`;
    }

}


document.getElementById('add-program-submit').addEventListener('click', async (e) => {
    e.preventDefault();

    // Get form values
    const title = document.getElementById('program-title').value.trim();
    const description = document.getElementById('program-desc').value.trim();
    const program_characters = document.getElementById('program-code').value.trim();
    const duration = document.getElementById('program-duration').value.trim();

    // Validation (Ensure all fields are filled)
    if (!title || !description || !program_characters || !duration) {
        alert('Please fill in all fields');
        return;
    }

    // Create request payload
    const programData = {
        title,
        description,
        program_characters,
        duration
    };

    try {
        // Send data to the API
        const response = await fetch('http://localhost:8000/v1/program/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(programData)
        });

        if (!response.ok) {
            throw new Error('Failed to add program');
        }

        // Handle successful response
        const result = await response.json();
        alert('Program added successfully!');

        // Optionally, clear the form after successful submission
        document.querySelector('.add-form1').reset();
        
        // Reload batches to reflect the new addition
        LoadProgram();

    } catch (error) {
        console.error('Fetch error:', error);
        const errorText = await error.response?.text();
        console.error('Server response:', errorText);
        alert(`Error adding program: ${error.message}`);
    }
});



// Call function with the required number of programs
LoadProgram();