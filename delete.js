import { link ,data} from "./main.js";

export function deleteFunction(index){

    // Get the modal
    var modal = document.querySelector(".delete-pop-up");
    modal.style.display='block';
    
    document.querySelector('.delete-pop-up-information').innerHTML=
        `<b>${data.find(item => item.id === index).fname} ${data.find(item => item.id === index).lname
        }</b> isimli öğrenciyi siliyorsunuz. Bu işlem geri alınamaz. Devam etmek istediğinize emin misiniz?`

    document.querySelector(`.close-pop-up`).onclick = () => {
        modal.style.display = "none";
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 27) {//esc 
            modal.style.display='none'
        }
        })

    for (let i = 0; i < 2; i++) {

        document.querySelector(`.delete-pop-up-buttons button:nth-child(${i+1})`).onclick = () => {
            if (JSON.parse(document.querySelector(`.delete-pop-up-buttons button:nth-child(${i+1})`).value.toLowerCase())) 
                {
                    axios.delete(`${link}/${index}`)
                    .then((event) => {
                        event.preventDefault()
                        console.log('Delete successful')
                    })
                    .catch((error)=>{console.log('Delete error: '+error)})
                    
                } 
            else {modal.style.display='none';};
        };
    };
};
