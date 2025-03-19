const navbtns = document.querySelectorAll('.nav-item');
const content = document.querySelectorAll('.container');
const formPanel = document.getElementById('form-panel');
const formList = document.querySelectorAll('.add-form1');
const formBtn = document.querySelectorAll('.form-btn');

navbtns.forEach((button,index)=>{
    button.addEventListener("click",()=>{
        navbtns.forEach((navbtn)=>navbtn.classList.remove('active'));
        button.classList.add('active');
        content.forEach((content)=>content.classList.remove('active-contetnt'));
        content[index].classList.add('active-contetnt');
    })
})
console.log(formBtn);
console.log(formList);
// form chnaging
formBtn.forEach((button,index)=>{
    button.addEventListener("click",(e)=>{
        e.preventDefault();
        formPanel.classList.add('show-panel');
        formList.forEach((content)=>content.classList.remove('show-form'))
        formList[index].classList.add('show-form');
    })
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

document.getElementById('back-student-detail').addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById('stu-detail-panel').classList.remove('toggle-stu-panel');
})