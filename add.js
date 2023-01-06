import { link,data ,defaultModalOperations,writeDataToModal, readDataFromModal,inputsValidator } from "./main.js";

export function addFunction() {
    //define Modal buttons
    var defaultModal = document.querySelector(".default-modal");
    defaultModalOperations(defaultModal,'Ekle','Eklenecek Öğrenci Bilgileri');
    
    writeDataToModal(null,false,true);

    //add operation
    
    document.querySelector('.default-modal-footer-default-button').addEventListener('click',async function (event) {
        //console.log(event)
        //Read inputs as a dict
        let insertData={firstName: null, lastName: null, studentNum: null, department: null, pob: null, dob: null}
        insertData=readDataFromModal(insertData);
        if(inputsValidator(insertData)==false){
            return
        }

        //execute default operation
        const response = await axios.post(`${link}`, {  
            id: data[`${data.length-1}`].id+1,
            fname: insertData.firstName,
            lname: insertData.lastName,
            num: insertData.studentNum,
            dept: insertData.department,
            pob: insertData.pob,
            dob: insertData.dob
        }).then(event.preventDefault())
        .catch(function (error) {
            console.log("execute default operation error function: "+error);
        });
    })
}