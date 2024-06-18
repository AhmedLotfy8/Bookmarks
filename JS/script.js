var siteList;
var siteNameInput = document.querySelectorAll('.val')[0]
var siteURLInput = document.querySelectorAll('.val')[1]
var subBtn = document.querySelector('.submitBtn');
var conTable = document.querySelector('.tableContent');
var alrDiv = document.querySelector('.alertDiv');
var alrDivlyr = document.querySelector('.alertDivLayer');
var alrDivBtn = document.querySelector('.alertDivBtn');


// old user
if (localStorage.getItem('Sites') !== null) {
    siteList = JSON.parse(localStorage.getItem('Sites'))
    displayList();
}

else {
    siteList = [];
}

function validateName() {

    regex = (/^[a-z]{3,15}$/)

    siteNameInput.classList.remove('is-valid', 'is-invalid')
    var flag

    if (regex.test(siteNameInput.value)) {
        siteNameInput.classList.add('is-valid')
        flag = true
    }

    else {
        siteNameInput.classList.add('is-invalid')
        flag = false
    }

    return flag;

}

function validateURL() {

    regex = (/^w{3}\.\w+\.\w+$/)

    siteURLInput.classList.remove('is-valid', 'is-invalid')
    var flag

    if (regex.test(siteURLInput.value)) {
        flag = true
        siteURLInput.classList.add('is-valid')
    }

    else {
        flag = false
        siteURLInput.classList.add('is-invalid')
    }

    return flag;
}

// <button class="submitBtn btn px-5 text-white">Submit</button>
subBtn.addEventListener('click', function (info) {
    info.preventDefault();
    addSite();
    siteNameInput.classList.remove('is-valid', 'is-invalid')
    siteURLInput.classList.remove('is-valid', 'is-invalid')

})

// <button class="alertDivBtn border-0 bg-white position-absolute end-0"> <span class="fa fa-x"></span> </button>
alrDivBtn.addEventListener('click', function(){
    alrDiv.classList.add('d-none')
    alrDivlyr.classList.add('d-none')
})

function addSite() {

    console.log(validateName() + "   " + validateURL());

    // valid inputs
    if (validateName() && validateURL()) {
        var site = {
            name: siteNameInput.value,
            URL: formatURL(siteURLInput.value)
        }

        siteList.push(site);
        localStorage.setItem('Sites', JSON.stringify(siteList))
        displayList();
    }

    // wrong inputs
    else {
        alrDiv.classList.remove('d-none')
        alrDivlyr.classList.remove('d-none')
    }

}

function formatURL(url) {

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    return url;
}

function displayList() {

    var htmlCode = ''

    for (var i = 0; i < siteList.length; i++) {
        htmlCode += `<tr>
                        <td>${i + 1}</td>
                        <td>${siteList[i].name}</td>

                        <td><a href="${siteList[i].URL}"> <button class="btn bg-success text-white"><span class="me-1"><i
                                        class="fa fa-eye"></i></span>
                                Visit</button> </a> </td>

                        <td><button onclick="deleteSite(${i})" class="btn bg-danger text-white"><span><i class="fa fa-trash-can"></i></span>
                                Delete</button></td>
                    </tr>`
    }


    conTable.innerHTML = htmlCode
    clearInputs()
}

function clearInputs() {
    siteNameInput.value = ''
    siteURLInput.value = ''
}

// <button class="btn bg-danger text-white"><span><i class="fa fa-trash-can"></i></span> Delete</button>
function deleteSite(index) {
    siteList.splice(index, 1)
    displayList()
    localStorage.setItem('Sites', JSON.stringify(siteList))
}


