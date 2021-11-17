const list = document.getElementById("list");
const input = document.getElementById("input")
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
        
    }
});

function addtoDo (toDo){

    const text =
        `
    <li class="item">
                <i class="fa fa-circle-thin complete" job="complete"></i>
                <p class="text">${toDo}</p>
                <i class="fa fa-trash-o delete" job="delete"></i>
    </li>
    
    
    `
    const position = "beforeend"

    list.insertAdjacentHTML(position,text)
}

