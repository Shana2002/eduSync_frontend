const batchPanel = document.getElementById('batch-container');
const batchDetailsPanel = document.getElementById('batch-details-panel')

function loadBatches(batchCount) {
    // Clear existing child elements
    batchPanel.innerHTML = '';

    // Loop to add new batch cards
    for (let i = 0; i < batchCount; i++) {
        const batchCard = document.createElement('div');
        batchCard.classList.add('batch-card');
        batchCard.setAttribute('data-id', i + 1); // Add data-id attribute

        batchCard.innerHTML = `
            <img src="../assets/image-6.png" alt="">
            <h2>Bsc(HONS). Software Engineering</h2>
            <h3>Batch number ${112 + i}</h3> 
            <p>${120 + i * 5} Students enrolled</p>
        `;

        // Add click event listener
        batchCard.addEventListener('click', function () {
            showBatchDeatailsPanel()
        });

        batchPanel.appendChild(batchCard);
    }
}

// Call function with the required number of batches
loadBatches(10);

function showBatchDeatailsPanel(){
    batchDetailsPanel.classList.add('toglle-batch');
}