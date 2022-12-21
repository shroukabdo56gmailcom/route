var submitbtn = document.querySelector(".bookmarker .btn")
var visitbtn = document.querySelector(".btn-primary")
var deletebtn = document.querySelector(".btn-danger")
var nameInput = document.getElementsByName("name")[0]
var urlInput = document.getElementsByName("url")[0]
var resultDiv = document.getElementById("resultDiv")
var validAlert = document.getElementById("validAlert")
var validUrlAlert = document.getElementById("validUrlAlert")
var webList = [];
var nameRegx = /^[a-zA-Z ]{3,80}[0-9]?$/
if (localStorage.getItem("list") != null) {
    webList = JSON.parse(localStorage.getItem("list"))
    display()
}

submitbtn.addEventListener("click", addObj)
function addObj() {
    validName()
    validurl()
    if (validName()&&validurl()) {
        var website = {
            name: nameInput.value,
            url: urlInput.value
        }
        webList.push(website)
        display()
    }
}
function display() {
    var temp = ``
    for (let i = 0; i < webList.length; i++) {
        temp += ` <div class="d-flex justify-content-between flex-nowrap bg-light 
         p-3 my-3">
        <h2>${webList[i].name}</h2>
        <div>
            <a href="${webList[i].url}" target="_blank"class="btn btn-primary" >Visit</a>
            <button class="btn btn-danger" onclick="deleteobj(${i})">Delete</button>
        </div>
    </div>

    `
    }
    localStorage.setItem("list", JSON.stringify(webList))
    resultDiv.innerHTML = temp;
    nameInput.value = "";
    urlInput.value = "";
}
function deleteobj(index) {
    webList.splice(index, 1)
    display()
}
urlInput.addEventListener("blur", validurl)
function validurl() {
    if (urlInput.value != "") {
        urlInput.classList.add("is-valid")
        validUrlAlert.classList.replace("d-block", "d-none")
        return true
    }
    else {
        urlInput.classList.remove("is-valid")
        validUrlAlert.classList.replace("d-none", "d-block")
        validUrlAlert.innerHTML = "URL is required"
        return false
    }
}
nameInput.addEventListener("blur", validName)
nameInput.addEventListener("change", validName)
function validName() {
    if (nameRegx.test(nameInput.value)) {
        nameInput.classList.add("is-valid")
        validAlert.classList.replace( "d-block","d-none",)

        return true
    }
    else if (nameInput.value == "") {
        nameInput.classList.remove("is-valid")
        validAlert.classList.replace("d-none", "d-block")
        validAlert.innerHTML = "Name is required"
        return false
    }
    else {
        nameInput.classList.remove("is-valid")
        validAlert.classList.replace("d-none", "d-block")
        validAlert.innerHTML = "Name shoud contain at least 3 charecter"
        return false
    }
}