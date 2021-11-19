const list = document.getElementById("list");
const input = document.getElementById("input")
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const LINE_THROUGH = "lineThrough"
let LIST, id ;


function loadToDo(array){
    array.forEach(function (item){
        addtoDo(item.name , item.id , item.done,item.trash)
    })
}

let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    loadToDo(LIST) ;
    id = LIST.length

}else{
    LIST = [] ;
    id = 0 ;
}

function completeToDo(element){
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)
    // LIST[element.id].done = LIST[element.id].done ? false : true ;
    LIST[element.id].done = !LIST[element.id].done  ;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash = true ;
}

list.addEventListener("click" , function (event){
    let element = event.target ;
    const elementJOB = event.target.attributes.job.value ;
    if (elementJOB === "complete"){
        completeToDo()
    }else if(elementJOB === "delete"){
        removeToDo()
    }
})


document.addEventListener("keyup",function (event){
    if (event.code === "Enter"){
        const toDo = input.value ;
        console.log("Enter pressed")
        if (toDo) {
            addtoDo(toDo,id,false,false)
            LIST.push(
                {
                    name : toDo ,
                    id : id ,
                    done : false ,
                    trash : false
                }
            )
            localStorage.setItem("TODO" , JSON.stringify(LIST))

        }
        input.value =""
        id++ ;
    }
});

function addtoDo (toDo,id,done,trash){

    if (trash){return;}

    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : ""

    const text =
        `
    <li class="item">
                <i class="fa ${DONE} complete" job="complete" id="${id}"></i>
                <p class="text ${LINE}" >${toDo}</p>
                <i class="fa fa-trash-o delete" job="delete" id="${id}"></i>
    </li>
    
    
    `
    const position = "beforeend"

    list.insertAdjacentHTML(position,text)
}



