const navbtns = document.querySelectorAll('.nav-item');
const content = document.querySelectorAll('.container');

navbtns.forEach((button,index)=>{
    button.addEventListener("click",()=>{
        navbtns.forEach((navbtn)=>navbtn.classList.remove('active'));
        button.classList.add('active');
        content.forEach((content)=>content.classList.remove('active-contetnt'));
        content[index].classList.add('active-contetnt');
    })
})