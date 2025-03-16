const modulePanel = document.getElementById('module-result-panel');
async function LoadModules(){
    modulePanel.innerHTML = '';

    try {
        // Fetch batch data from an API
        const response = await fetch('http://localhost:8000/v1/module');
        if (!response.ok) {
            throw new Error('Failed to fetch batch data');
        }

        const modules = await response.json(); // Convert response to JSON

        // Loop through the fetched data
        modules.forEach(module => {
            const batchCard = document.createElement('div');
            batchCard.classList.add('module-card');

            batchCard.innerHTML = `
                <div>${module.title}</div>
                <div>${module.sessions} sessions</div>
                <div>${module.module_char}</div>
                <div></div>
                <div></div>
            `;

            modulePanel.appendChild(batchCard);
        });

    } catch (error) {
        console.error('Error loading programs:', error);
        modulePanel.innerHTML = `<p style="color: red;">Failed to load programs. Please try again.</p>`;
    }
} 

document.getElementById('add-module-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Get form values
    const title = document.getElementById('module-title').value.trim();
    const module_char = document.getElementById('module-char').value.trim();
    const sessions = document.getElementById('module-duration').value.trim();

    // Validation: Ensure all fields are filled
    if (!title || !module_char || !sessions) {
        alert('Please fill in all fields.');
        return;
    }

    // Prepare request body
    const moduleData = {
        title,
        module_char,
        sessions
    };

    try {
        // Send data to API
        const response = await fetch('http://localhost:8000/v1/module/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',  // Ensure authentication cookies are sent
            body: JSON.stringify(moduleData)
        });

        if (!response.ok) {
            throw new Error('Failed to add module');
        }

        // Handle success response
        const result = await response.json();
        alert('Module added successfully!');

        // Optionally clear the form
        document.getElementById('add-module-form').reset();
        LoadModules();

    } catch (error) {
        console.error('Error adding module:', error);
        alert('Error adding module. Please try again.');
    }
});


LoadModules();