import { link,defaultModalOperations,writeDataToModal,readDataFromModal,inputsValidator } from "./main.js";

export function editFunction(index){
    
    //define Modal buttons
    var defaultModal = document.querySelector(".default-modal");
    defaultModalOperations(defaultModal,'Düzenle','Düzenlenecek Öğrenci Bilgileri');
    
    writeDataToModal(index,false,false);
    document.querySelector(".default-modal-footer-default-button").onclick = () =>{
        var forms=document.querySelectorAll(".needs-validation");
        //console.log(Array.prototype.slice.call(forms)[0][0].checkValidity())
        //console.log(forms)
        
        //Read inputs as a dict
        let updateData={firstName: null, lastName: null, studentNum: null, department: null, pob: null, dob: null}
        updateData=readDataFromModal(updateData);
        if(inputsValidator(updateData)==false){
            return
        }
        //execute edit operation
        axios.patch(`${link}/${index}`, {  
            fname: updateData.firstName,
            lname: updateData.lastName,
            num: updateData.studentNum,
            dept: updateData.department,
            pob: updateData.pob,
            dob: updateData.dob
        })
        .catch(function (error) {
            console.log("execute default operation error function: "+error);
        });
    };
};
