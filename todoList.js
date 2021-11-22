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

// list.addEventListener("click" , function (event){
//     let element = event.target ;
//     const elementJOB = event.target.attributes.job.value ;
//     if (elementJOB === "complete"){
//         completeToDo()
//     }else if(elementJOB === "delete"){
//         removeToDo()
//     }
// })


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
    <li class="todo-item " id="${id}" style="">
                <div class="description">
                    <div class="input-check " onclick="completeToDo()"></div>
                    <span>${toDo}</span>
                </div>
                <button aria-label="Delete task"  class="delete-icon enabled " onclick="removeToDo()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                        <path fill="#494C6B" fill-rule="evenodd"
                              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"></path>
                    </svg>
                </button>
    </li>
    
    
    `
    const position = "beforeend"

    list.insertAdjacentHTML(position,text)
}



