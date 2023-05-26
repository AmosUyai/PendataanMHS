/*start for control coding */
var addBtn = document.querySelector("#add-btn");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon");
addBtn.onclick = function(){
    modal.classList.add("active")
}
closeBtn.addEventListener("click",()=>{
    modal.classList.remove("active");
})
/*start all global variable*/
var userData = [];
var idEl = document.getElementById("id");
var nameEl = document.querySelector("#name");
var l_nameEl = document.getElementById("l-name");
var emailEl  = document.getElementById("#e-mail");
var officecodeEl = document.getElementById("#office-code");
var jobTitleEl = document.querySelector("#job-title");

var registerBtn = document.querySelector("#register-btn");

/*end all global variable */

/*start register coding */

registerBtn.onclick = function(){
    regitrationData();
}
function regitrationData(){
    userData.push({
        id : idEl.ariaValueMax,
        name : nameEl.value,
        l_name : l_nameEl.value,
        email : emailEl.value,
        officeCode : officecodeEl.value,
        jobTitle : jobTitleEl.value
    });
    var userString  = JSON.stringify(userData);
    localStorage.setItem(userString);
}

