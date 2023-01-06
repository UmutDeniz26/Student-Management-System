import { defaultModalOperations,writeDataToModal } from "./main.js";

export function infoFunction(index){
    var defaultModal = document.querySelector(".default-modal");
    defaultModalOperations(defaultModal,null,'Öğrenci Bilgileri');
    writeDataToModal(index,true,false);
};