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
var profile_pic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field");
var nimEl = document.getElementById("nim");
var nameEl = document.querySelector("#name");
var l_nameEl = document.getElementById("l-name");
var emailEl  = document.querySelector("#email");
var jurusanEl = document.querySelector("#jurusan");
var statusEl = document.querySelector("#status");
var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-btn");
var registerForm = document.querySelector("#register-form");
var imgUrl;
/*end all global variable */

/*start register coding */

registerBtn.onclick = function(e){
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
        nim : nimEl.value,
        jurusan : jurusanEl.value,
        name : nameEl.value,
        l_name : l_nameEl.value,
        email : emailEl.value,
        status : statusEl.value,
        profilePic : imgUrl == undefined ? "img/Student.png" : imgUrl
    });
    var userString  = JSON.stringify(userData);
    localStorage.setItem("userData",userString);
    swal("Good job!", "Registration Success!", "success");
}

//start retruning data on page from localstorage
var tableData = document.querySelector("#table-data");
const getDataFromLocal = () =>{
    tableData.innerHTML = "";
    userData.forEach((data,index)=>{
        tableData.innerHTML +=  `
        <tr index='${index}'>
            <td>${index+1}</td>
            <td><img src="${data.profilePic}" width="40"></td>
            <td>${data.nim}</td>
            <td>${data.jurusan}</td>
            <td>${data.name}</td>
            <td>${data.l_name}</td>
            <td>${data.email}</td>
            <td>${data.status}</td>
            <td>
                <button class="edit-btn"><i class="fa fa-eye"></i></button>
                <button class="del-btn" style="background-color: #EE534F;"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
        `;
    });

    /*start delete coding*/
    var i;
    var allDelBtn = document.querySelectorAll(".del-btn")
    console.log(allDelBtn);
    for(i=0;i<allDelBtn.length;i++){
        allDelBtn[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    userData.splice(id,1);
                    localStorage.setItem("userData",JSON.stringify(userData));
                    tr.remove();
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
        }
    }

    //start update coding
    var allEdit = document.querySelectorAll(".edit-btn");
    for(i=0;i<allEdit.length;i++){
        allEdit[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("TD");
            var index = tr.getAttribute("index");
            var imgTag = td[1].getElementsByTagName("IMG");
            var profilePic = imgTag[0].src;
            var nim = td[2].innerHTML;
            var jurusan = td[3].innerHTML;
            var name = td[4].innerHTML;
            var l_name = td[5].innerHTML;
            var email = td[6].innerHTML;
            var status = td[7].innerHTML;
            addBtn.onclick();
            registerBtn.disabled = true;
            updateBtn.disabled = false;
            nimEl.value = nim;
            nameEl.value = name;
            l_nameEl.value = l_name;
            emailEl.value = email;
            jurusanEl.value = jurusan;
            statusEl.value = status;
            profile_pic.src = profilePic;
            updateBtn.onclick = function(e){
                userData[index] = {
                    nim : nimEl.value,
                    jurusan : jurusanEl.value,
                    name : nameEl.value,
                    l_name : l_nameEl.value,
                    email : emailEl.value,
                    status : statusEl.value,
                    profilePic : uploadPic == "" ? profile_pic.src : imgUrl
                }
                localStorage.setItem("userData",JSON.stringify(userData));
            }

        }
    }

}
getDataFromLocal();


//image procesing
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