var siteList;
var siteNameInput = document.querySelectorAll('.val')[0]
var siteURLInput = document.querySelectorAll('.val')[1]
var subBtn = document.querySelector('.submitBtn');
var conTable = document.querySelector('.tableContent');


// old user
if (localStorage.getItem('Sites') !== null) {
    siteList = JSON.parse(localStorage.getItem('Sites'))
    displayList();
}

else {
    siteList = [];
}

// siteNameInput
function test() {

    regex = (/^[A-Z][a-z]{3,15}$/)

    if (regex.test(siteNameInput.value)) {
        console.log('hi')
    }

    else {
        console.log('no');
    }

}

test();

// <button class="submitBtn btn px-5 text-white">Submit</button>
subBtn.addEventListener('click', function (info) {
    info.preventDefault();
    addSite();
})

function addSite() {

    var site = {
        name: siteNameInput.value,
        URL: formatURL(siteURLInput.value)
    }

    siteList.push(site);
    localStorage.setItem('Sites', JSON.stringify(siteList))
    displayList();
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


