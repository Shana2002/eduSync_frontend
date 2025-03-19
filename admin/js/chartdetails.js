const ctx = document.getElementById('summaryChart').getContext('2d');
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Attendants','not-Attand'],
        datasets: [{
            data: [65, 35],
            backgroundColor: ['#0D0B69', '#F2F2F2'],
            borderWidth: 0
        }]
    },
    options: {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        }
    }
});

const ctx1 = document.getElementById('studentChart').getContext('2d');
        
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: [17, 18, 19, 20, 21, 22, 24, 25], // X-axis values
                datasets: [{
                    label: 'Students (in K)',
                    data: [17, 50, 100, 100, 150, 100, 20, 120], // Y-axis values
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3, // Smooth line effect
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });