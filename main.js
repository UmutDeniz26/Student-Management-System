import { display, displayButtonsDefinations } from "./display.js";

import { infoFunction } from "./info.js";
import { deleteFunction } from "./delete.js";
import { addFunction } from "./add.js";
import { editFunction } from "./update.js";


export let link='http://localhost:3000/students'
//default parameters

//row and column number of modal
var rowNumber=3;
var columnNumber =2;
let functions=[deleteFunction,infoFunction,editFunction]
let functionNames=['delete','info','edit']

const depts = {
    "1": "Bilgisayar Müh.",
    "2": "Elektrik-Elektronik Müh.",
    "3": "Endüstri Müh.",
    "4": "İnşaat Müh."
};


export var data=[]

getData();
displayButtonsDefinations();
validation();
display(5,1,5);

document.querySelector("#add-button").onclick = () => {
    addFunction();
}


function getData(){
    axios.get(`${link}`)
    .then(response => {
        response.data.forEach(element => {
            data.push(element)
        });

        data.forEach((element,index) => {
            try{
                //Data Defination
                defineTableElement(element.fname,element.lname,element.num,element.dept,element.id);   

                //Page Button Defination
                document.querySelector('.page-buttons').innerHTML += `<button class="pageBtn${index}">${index+1}</button>`
                
            }
            catch {console.log('There are undisplayable elements!');}    
            }
        );
        data.forEach(element => {
            for(let i=0;i<3;i++){
                document.getElementById(`${functionNames[i]}${element.id}`).onclick = () =>{
                    functions[i](element.id)
                }
            }
        });
    }
).catch(error => console.log(error));
}
export function defaultModalOperations(modalObject,button,h1text){
    modalObject.style.display = 'block';
    document.querySelector('.modal-icon-header>h1').innerHTML=h1text

    if(button!=null){
        let modalButton=document.querySelector(".default-modal-footer-default-button");
        modalButton.innerHTML=button;
        modalButton.style.display='block'
    }
    else{document.querySelector(".default-modal-footer-default-button").style.display='none'}
    

    // When the user clicks on <span> (x) || Close || somewhere other than the modal
    for(let i=0;i<2;i++){   
        document.querySelectorAll(`.default-modal-close`)[i].onclick = () => {
            modalObject.style.display = "none";
        }
    }
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 27) {
            modalObject.style.display='none'
            }
        }
    )    
}
function searchString(object) {
    let charCnt=0;
    let intCnt=0;
    for (let i = 0; i < object.length; i++) {
        if (isNaN(parseInt(object[i]))) {
            charCnt++;
        }
        else{
            intCnt++;
        }
    }
    let total=charCnt+intCnt;
    return {charCnt,intCnt,total};
}
export function inputsValidator(input){

    let validPoint=0;
    if (searchString(input.firstName).charCnt>=3 && searchString(input.firstName).intCnt==0) {
        validPoint+=1;
    }

    if (searchString(input.lastName).charCnt>=3 && searchString(input.firstName).intCnt==0) {
        validPoint+=1;
    }
    
    if (searchString(input.studentNum).intCnt==12 && searchString(input.studentNum).charCnt==0) {
        validPoint+=1;
    }
    
    if (searchString(input.department).intCnt==1) {
        validPoint+=1;
    }

    if (searchString(input.pob).charCnt>=3 && searchString(input.pob).intCnt==0) {
        validPoint+=1;
    }

    if (validPoint==5) {
        return true;
    }
    return false;
}
export function readDataFromModal(dataToRead){
    let temp;
        for(let i=0; i<rowNumber*columnNumber; i++){

                temp=document.querySelectorAll(".form-control")[i].value;
                dataToRead[Object.keys(dataToRead)[i]]=temp;
            
        }
    return dataToRead;
};
export function writeDataToModal(indexOfDataToWrite,readOnlyFlag,resetflag){
    let temp;
    let row;
    for(let index=0;index<6;index++){
  
        row=document.querySelectorAll(".form-control")[index];
        row.disabled = readOnlyFlag;
        if (resetflag) {
            row.value=null;
            continue;
        }
        temp=data.find(item => item.id === indexOfDataToWrite); //get data by id
        if (Object.keys(temp)[(index)+1]=='dept') {
            row.value=depts[temp[Object.keys(temp)[(index)+1]]]; //write data
        }
        row.value=temp[Object.keys(temp)[(index)+1]]; //write data
    }
    
    }
    

function defineTableElement(firstName,lastName,studentNum,department,elementId){
    let tablelist=document.querySelector('.student-list');
    tablelist.innerHTML+=
    `
        <tr id="row${elementId}">
            <td>${firstName} ${lastName}</td>
            <td>${studentNum}</td>
            <td>${depts[department.toString()]}</td>
            <td class="btn-row">
                <button id="delete${elementId}">Sil</button>
                <button id="edit${elementId}">Düzenle</button>
                <button id="info${elementId}">Detay</button>
            </td>
        </tr>
    `
};
function validation() {
    for (let index = 0; index < 5; index++) {
        let temp=document.querySelectorAll('.modal-elements')[index].querySelector(':nth-child(2)');
        
        temp.addEventListener('input', function() {
            //console.log(searchString(temp.value))
            switch (index) {
                case 2:
                    if (searchString(temp.value).charCnt!=0) {
                        document.querySelectorAll('.modal-elements')[index].querySelector(':nth-child(4)').innerHTML="Harf girme DE"
                    } 
                    else{                                
                        document.querySelectorAll('.modal-elements')[index].querySelector(':nth-child(4)').innerHTML="Okul numarası 12 rakam içermelidir."
                    }
                    if(searchString(temp.value).total!=12 || searchString(temp.value).charCnt!=0){
                        temp.classList.add('is-invalid');
                        temp.classList.remove('is-valid');
                    }
                    else{
                        temp.classList.remove('is-invalid');
                        temp.classList.add('is-valid');
                    }
                    break;
                case 3:
                    if (searchString(temp.value).total==1) {
                        temp.classList.remove('is-invalid');
                        temp.classList.add('is-valid');
                    }
                    else{
                        temp.classList.add('is-invalid');
                        temp.classList.remove('is-valid');
                    }
                    break;
                default:
                    if (searchString(temp.value).intCnt!=0 || searchString(temp.value).charCnt < 3){
                        if (searchString(temp.value).intCnt!=0) {
                            document.querySelectorAll('.modal-elements')[index].querySelector(':nth-child(4)').innerHTML="Sayi girme DE"
                        } 
                        else{                                
                            let text=['İsim','Soyad']
                            document.querySelectorAll('.modal-elements')[index].querySelector(':nth-child(4)').innerHTML=`${
                                text[index%2]} en az 3 harf içermelidir.`
                        }
                        temp.classList.add('is-invalid');
                        temp.classList.remove('is-valid');
                    }
                    else{
                        temp.classList.remove('is-invalid');
                        temp.classList.add('is-valid');
                    }
                    break;
            }
        }
    )
}
        document.getElementById('btnadd').addEventListener('click', function() {//"was-validated" feature is added if there is a missing or incorrect status in the form when the person is added.
            var form = document.getElementById('formId');
            form.classList.add('was-validated');
        }, false);
}


