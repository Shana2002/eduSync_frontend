const programPanel = document.getElementById('program-container');

function loadBatches(batchCount) {
    // Clear existing child elements
    programPanel.innerHTML = '';

    // Loop to add new batch cards
    for (let i = 0; i < batchCount; i++) {
        const batchCard = document.createElement('div');
        batchCard.classList.add('batch-card');

        batchCard.innerHTML = `
            <img src="../assets/image-2.png" alt="">
            <h2>Software Engineering</h2>
            <h3>Duration 4years</h3>
        `;

        programPanel.appendChild(batchCard);
    }
}

// Call function with the required number of batches
loadBatches(10);