document.querySelectorAll(".module-header").forEach(header => {
    header.addEventListener("click", function() {
        let content = this.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
});

export const LoadStudentModuleDetails=(student_id)=>{

}