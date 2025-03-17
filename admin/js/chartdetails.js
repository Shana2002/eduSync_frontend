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