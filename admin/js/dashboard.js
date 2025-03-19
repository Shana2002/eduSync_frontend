const programPanelDashboard = document.getElementById('dashboard-program-container');

async function LoadProgram() {
    // Clear existing child elements
    programPanelDashboard.innerHTML = '';

    try {
        // Fetch batch data from an API
        const response = await fetch('http://localhost:8000/v1/program');
        if (!response.ok) {
            throw new Error('Failed to fetch batch data');
        }

        const programs = await response.json(); // Convert response to JSON

        // Loop through only the first 4 fetched items
        programs.slice(0, 4).forEach(batch => {
            const batchCard = document.createElement('div');
            batchCard.classList.add('batch-card');

            batchCard.innerHTML = `
                <img src="${batch.image || '../assets/image-2.png'}" alt="">
                <h2>${batch.title}</h2>
                <h3>Duration: ${batch.duration}</h3>
                <h4>${batch.program_characters}</h4>
            `;

            programPanelDashboard.appendChild(batchCard);
        });

    } catch (error) {
        console.error('Error loading programs:', error);
        programPanelDashboard.innerHTML = `<p style="color: red;">Failed to load programs. Please try again.</p>`;
    }
}

// Call the function
LoadProgram();
