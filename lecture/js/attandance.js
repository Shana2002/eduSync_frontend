const currentPanel = document.getElementById('result-holder');

async function LoadCurrent(){
    currentPanel.innerHTML = '';
    
    try {
        const response = await fetch('http://localhost:8000/v1/session/current',{
            method:'GET',
            credentials:'include'
        }); // Replace with your actual API
        if (!response.ok) throw new Error('Failed to fetch students');

        currnts = await response.json();
        if (currnts.length === 0) {
            currentPanel.innerHTML = '<p style="color: gray;">No Current Sessions  found.</p>';
            return;
        }
    
        currnts.forEach(currnt => {
            const studentCard = document.createElement('div');
            studentCard.classList.add('student-card-long');
    
            studentCard.innerHTML = `
                <div class="stu-details">
                  <h3>${currnt.title} ${currnt.session_name}</h3>
                  <p>${currnt.program}  - Batch ${currnt.batch_id}</p>
                </div>
                <a  class="view-more-btn" target="_blank" href="qr-attandance.html?session=${currnt.session_id}">Generate Qr</a>
            `;
    
            currentPanel.appendChild(studentCard);
        });
    } catch (error) {
        console.error('Error loading students:', error);
    }
        
        
}
LoadCurrent();
function generateQr(){
    
}