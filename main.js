

const addBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const resetBtn = document.getElementById('reset-btn');
const recordContainer = document.querySelector('.record-container');
const deleteBtn = document.getElementById('delete-btn');


const name = document.getElementById('name');
const address = document.getElementById('address');
const number = document.getElementById('contact-num');

let ContactArray = [];
let id = 0;


function Contact(id, name, address, number){
    this.id = id;
    this.name = name;
    this.address = address;
    this.number = number;
}

document.addEventListener('DOMContentLoaded', function(){
    if(localStorage.getItem('contacts') == null){
        ContactArray = [];
    } else {
        ContactArray = JSON.parse(localStorage.getItem('contacts'));
        lastID(ContactArray);
    }
    displayRecord();
});

function displayRecord(){
    ContactArray.forEach(function(singleContact){
        addToList(singleContact);
    });
}

function lastID(ContactArray){
    if(ContactArray.length > 0){
        id = ContactArray[ContactArray.length - 1].id;
    } else {
        id = 0;
    }
}


addBtn.addEventListener('click', function(){
    if(checkInputFields([name, address, number])){
        setMessage("success", "Record added successfully!");
        id++;
        const contact = new Contact(id, name.value, address.value, number.value);
        ContactArray.push(contact);

        localStorage.setItem('contacts', JSON.stringify(ContactArray));
        clearInputFields();


        addToList(contact);
    } else {
        setMessage("error", "Empty input fields or invalid input!");
    }
    
});


    function addToList(item){
        const newRecordDiv = document.createElement('div');
        newRecordDiv.classList.add('record-item');
        newRecordDiv.innerHTML = `
        <div class = "record-el">
            <span id = "labelling">Contact ID: </span>
            <span id = "contact-id-content">${item.id}</span>
        </div>

        <div class = "record-el">
            <span id = "labelling">Name: </span>
            <span id = "name-content">${item.name}</span>
        </div>

        <div class = "record-el">
            <span id = "labelling">Address: </span>
            <span id = "address-content">${item.address}</span>
        </div>

        <div class = "record-el">
            <span id = "labelling">Contact Number: </span>
            <span id = "contact-num-content">${item.number}</span>
        </div>

        <button type = "button" id = "delete-btn">
            <span>
                <i class = "fas fa-trash"></i>
            </span> Delete
        </button>
        `;
        recordContainer.appendChild(newRecordDiv);
    }

recordContainer.addEventListener('click', function(event){

    if(event.target.id === 'delete-btn'){

        let recordItem = event.target.parentElement;
        recordContainer.removeChild(recordItem);
        let tempContactList = ContactArray.filter(function(record){
            return (record.id !== parseInt(recordItem.firstElementChild.lastElementChild.textContent));
        });
        ContactArray = tempContactList;

        localStorage.setItem('contacts', JSON.stringify(ContactArray));
    }
});


resetBtn.addEventListener('click', function(){
    ContactArray = [];
    localStorage.setItem('contacts', JSON.stringify(ContactArray));
    location.reload();
})

function setMessage(status, message){
    let messageBox = document.querySelector('.message');
    if(status == "error"){
        messageBox.innerHTML = `${message}`;
        messageBox.classList.add('error');
        removeMessage(status, messageBox);
    }
    if(status == "success"){
        messageBox.innerHTML = `${message}`;
        messageBox.classList.add('success');
        removeMessage(status, messageBox);
    }
}


cancelBtn.addEventListener('click', function(){
    clearInputFields();
});

function clearInputFields(){
    name.value = "";
    address.value = "";
    number.value = "";
}


function removeMessage(status, messageBox){
    setTimeout(function(){
        messageBox.classList.remove(`${status}`);
    }, 2000);
}


function checkInputFields(inputArr){
    for(let i = 0; i < inputArr.length; i++){
        if(inputArr[i].value === ""){
            return false;
        }
    }
    if(!phoneNumCheck(inputArr[2].value)){
        return false;
    }
    return true;
}

function phoneNumCheck(inputtxt){
    let phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(inputtxt.match(phoneNo)){
        return true;
    } else {
        return false;
    }
}

