const navbtns = document.querySelectorAll('.nav-item');
const content = document.querySelectorAll('.container');
const formPanel = document.getElementById('form-panel');

navbtns.forEach((button,index)=>{
    button.addEventListener("click",()=>{
        navbtns.forEach((navbtn)=>navbtn.classList.remove('active'));
        button.classList.add('active');
        content.forEach((content)=>content.classList.remove('active-contetnt'));
        content[index].classList.add('active-contetnt');
    })
})

document.getElementById('add-shedule').addEventListener("click",(e)=>{
    e.preventDefault();
    formPanel.classList.add('show-panel');
})

document.getElementById('close-btn-form').addEventListener("click",(e)=>{
    e.preventDefault();
    formPanel.classList.remove('show-panel');
})

document.getElementById('close-btn-panel').addEventListener("click",(e)=>{
    e.preventDefault();
    document.getElementById('batch-details-panel').classList.remove('toglle-batch');
})

document.getElementById('assigment-manage-btn').addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById('assigment-panel').classList.add('toggle-assigment');
})

document.getElementById('back-assigment-mange').addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById('assigment-panel').classList.remove('toggle-assigment');
})