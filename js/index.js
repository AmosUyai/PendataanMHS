/*start for control coding */

var addBtn = document.querySelector("#add-btn");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon");
addBtn.onclick = function(){
    modal.classList.add("active");
}
closeBtn.addEventListener("click",()=>{
    modal.classList.remove("active");
})


/*start all global variable*/
var userData = [];
var idEl = document.getElementById("id");
var nameEl = document.querySelector("#name");
var l_nameEl = document.getElementById("l-name");
var emailEl  = document.querySelector("#email");
var officeEl = document.querySelector("#office-code");
var jobTitleEl = document.querySelector("#job-title");
var registerBtn = document.querySelector("#register-btn");
var registerForm = document.querySelector("#register-form");
var imgUrl;
/*end all global variable */

/*start register coding */

registerForm.onsubmit = function(e){
    e.preventDefault();
    regitrationData();
    getDataFromLocal();
    registerForm.reset('');
    closeBtn.click();
}
if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}



function regitrationData(){
    userData.push({
        id : idEl.value,
        name : nameEl.value,
        l_name : l_nameEl.value,
        email : emailEl.value,
        officeCode : officeEl.value,
        jobTitle : jobTitleEl.value,
        profilePic : imgUrl == undefined ? "img/Student.png" : imgUrl
    });
    var userString  = JSON.stringify(userData);
    localStorage.setItem("userData",userString);
}

//start retruning data on page from localstorage
var tableData = document.querySelector("#table-data");
const getDataFromLocal = () =>{
    tableData.innerHTML = "";
    userData.forEach((data,index)=>{
        tableData.innerHTML +=  `
        <tr index='${index}'>
            <td>${index+1}</td>
            <td><img src="${data.profilePic}" width="30" height"60"></td>
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.l_name}</td>
            <td>${data.email}</td>
            <td>${data.officeCode}</td>
            <td>${data.jobTitle}</td>
            <td>
                <button><i class="fa fa-eye"></i></button>
                <button style="background-color: #EE534F;"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
        `;
    })
}
getDataFromLocal();

//image procesing
var profile_pic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field");
uploadPic.onchange = function(){
    if(uploadPic.files[0].size < 1000000){

        var fReader = new FileReader();
        fReader.onload = function(e){
            imgUrl = e.target.result;
            profile_pic.src = imgUrl;
            console.log(imgUrl);
        }
        fReader.readAsDataURL(uploadPic.files[0]);

    }else{
        alert("Ukuran File Terlalu Panjang");
    }
}