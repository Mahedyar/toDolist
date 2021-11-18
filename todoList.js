const list = document.getElementById("list");
const input = document.getElementById("input")
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const LINE_THROUGH = "lineThrough"
let LIST = [] ;
let id = 0 ;

document.addEventListener("keyup",function (event){
    if (event.code === "Enter"){
        const toDo = input.value ;
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

        }
        input.value =""
        id++ ;
    }
});

function completeToDo(element){
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)
    // LIST[element.id].done = LIST[element.id].done ? false : true ;
    LIST[element.id].done = !LIST[element.id].done  ;
}

function addtoDo (toDo,id,done){

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

