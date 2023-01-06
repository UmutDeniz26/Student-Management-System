import { link,data } from "./main.js";

var listlimit=5;
var currentPage=1;
export var missedDataCounter=0;
export function display(listlimit,initialPoint,finalPoint){
    axios.get(`${link}`)
    .then(() => {
    noneDisplay();
    data.forEach((element,index) => {
        if (index<Math.ceil(data.length/listlimit)) {
            let object= document.querySelector(`.pageBtn${index}`);
            object.style.display='';
        }
        try{
            if (index+1 >= initialPoint && index+1 <= finalPoint) {
                let object= document.querySelector(`#row${element.id}`);
                object.style.display='';
                missedDataCounter++;
            }
        }
        catch{console.log('There are undisplayable elements!');}
    });
    missedDataCounter=listlimit-missedDataCounter;
    })
};

function noneDisplay(){
    data.forEach((element,index) => {
        let btn= document.querySelector(`.pageBtn${index}`);
        btn.style.display='none';
        let row = document.querySelector(`#row${element.id}`);
        row.style.display='none';
    });

};

export function callOnclick(){//arranged by page numbers.

    display(listlimit,((currentPage-1)*listlimit)+1,(((currentPage-1)*listlimit)+listlimit));
    document.querySelector('.footer-title').innerHTML=`<strong>${data.length}</strong> öğrenciden <strong>${
        ((currentPage-1)*listlimit)+1}</strong>-<strong>${(((currentPage-1)*listlimit)+listlimit-missedDataCounter)} </strong>arası gösteriliyor`
    if (missedDataCounter!=0) {
        missedDataCounter=0;
    }
}
function buttonColor(index,isItPageButton){
    if (isItPageButton==true) {
        data.forEach((item,cnt) => {
            if (index==cnt) {
                document.querySelector(`.page-buttons>button:nth-child(${cnt+1})`).style.backgroundColor='blue'
                document.querySelector(`.page-buttons>button:nth-child(${cnt+1})`).style.color='white'
            }
            else{
                document.querySelector(`.page-buttons>button:nth-child(${cnt+1})`).style.backgroundColor='white'
                document.querySelector(`.page-buttons>button:nth-child(${cnt+1})`).style.color='black'
            } 
        });  
    }
    else{
        for(let j=1;j<=3;j++){
            if (index==j) {
                document.querySelector(`.limiter-buttons>button:nth-child(${j})`).style.backgroundColor='blue';
                document.querySelector(`.limiter-buttons>button:nth-child(${j})`).style.color='white';
                
            }
            else{
                document.querySelector(`.limiter-buttons>button:nth-child(${j})`).style.backgroundColor='white';
                document.querySelector(`.limiter-buttons>button:nth-child(${j})`).style.color='blue';
            }
        }
    }
}
export function displayButtonsDefinations(){
    axios.get(`${link}`)
    .then(() => {
        data.forEach((element,index) => {
            
            //define page button functions
            document.querySelector(`.pageBtn${index}`).onclick = () => {
                currentPage=parseInt(document.querySelector(`.pageBtn${index}`).innerHTML);
                callOnclick();
                buttonColor(index,true);
                //console.log(currentPage,listlimit)
            }
        });



        //define limiter button functions
        for(let i=1;i<=3;i++){
            document.querySelector(`.limiter-buttons > button:nth-child(${i})`).onclick = () => {
                listlimit=parseInt(document.querySelector(`.limiter-buttons > button:nth-child(${i})`).innerHTML);
                if(currentPage>data.length/listlimit){
                    currentPage=Math.round(data.length/listlimit);
                }
                callOnclick();
                buttonColor(i,false);
                //console.log(currentPage,listlimit)
                
            }   
        }
        }
    )
}
