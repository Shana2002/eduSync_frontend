document.querySelectorAll(".module-header").forEach(header => {
    header.addEventListener("click", function() {
        let content = this.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
});

export const LoadStudentModuleDetails = async (student_id) => {
    const staticsPanel = document.getElementById('stu-static-panel');
    staticsPanel.innerHTML = ''; // Clear any existing content
    staticsPanel.innerHTML += '<h2>HD Software Engineering</h2>';

    try {
        const response = await fetch(`http://localhost:8000/v1/student/${student_id}/modules`);  // API endpoint
        const data = await response.json();
        
        data.forEach((dataModule, index) => {
            let innerData = `
                <div class="module-header" id="module-${index + 1}-header">
                    Module ${index + 1}: ${dataModule.module.title} <span>▼</span>
                </div>
                <div class="module-content" id="module-${index + 1}-content" style="display:none;">
                    <div class="info-cards">
                        <div class="info-card">
                            <h3>Sessions</h3>
                            <p>${dataModule.module.title} Sessions covered, ${dataModule.module.title} session available</p>
                        </div>
                        <div class="info-card">
                            <h3>Attendance</h3>
                            <p>${dataModule.module.title} Sessions gone, ${dataModule.module.title} attendance found</p>
                        </div>
                        <div class="info-card">
                            <h3>Assignments</h3>
                            <a href="${dataModule.module.title}" class="download-link">Download</a>
                        </div>
                    </div>

                    <div class="session-list">
                        <ul id="module-${index + 1}-session-list-ul">
                            ${dataModule.AttandanceDetails.map((session, sessionIndex) => `
                                <li>
                                    <span>${sessionIndex + 1}. ${session.session_name}</span>
                                    <span class="${session.status==='Attended' ? 'attended' : 'not-attended'}">
                                        ${session.status==='Attended' ? 'Attended' : session.status==='Not Attended' ?'Not Attended':'Not Started Yet'}
                                    </span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>`;

            // Append the dynamically created module details to the panel
            staticsPanel.innerHTML += innerData;

            // Add event listener to toggle visibility of module content
            const moduleHeader = document.getElementById(`module-${index + 1}-header`);
            const moduleContent = document.getElementById(`module-${index + 1}-content`);
            
            moduleHeader.addEventListener("click", function() {
                moduleContent.style.display = moduleContent.style.display === "block" ? "none" : "block";
            });
        });
        document.querySelectorAll(".module-header").forEach(header => {
            header.addEventListener("click", function() {
                let content = this.nextElementSibling;
                content.style.display = content.style.display === "block" ? "none" : "block";
            });
        });
    } catch (error) {
        console.error('Error fetching module data:', error);
    }
}

export const LoadStudentDetails = async (student_id) => {
    try {
        const response = await fetch(`http://localhost:8000/v1/student/${student_id}`); // Replace with your API endpoint
        const student = await response.json();

        // Populate student details in the DOM
        document.querySelector(".div3 h1").textContent = student[0].first_name+ ' ' + student[0].last_name;
        document.querySelector(".div4 h5").textContent = student[0].program;

        console.log(student)
        const detailsDiv = document.querySelector(".div6");
        detailsDiv.innerHTML = `
            <div><p>Name</p></div>
            <div><p>${student[0].first_name} ${student[0].last_name}</p></div>
            <div>Student Number</div>
            <div>${student[0].username}</div>
            <div>Email</div>
            <div>${student[0].email}</div>
            <div>Mobile</div>
            <div>${student[0].mobile}</div>
            <div>Birthday</div>
            <div>${student[0].birthday}</div>
            <div>Date Joined</div>
            <div>${student[0].date_joined}</div>
        `;

        // Set student profile image
        // document.querySelector(".div1 img").src = student.profile_image || "default.jpg";

    } catch (error) {
        console.error("Error fetching student details:", error);
    }
};

LoadStudentDetails(1);

  
LoadStudentModuleDetails(1);
  