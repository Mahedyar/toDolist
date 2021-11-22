//model two

//Selectors
const toDoInput = document.querySelector('.todo-input')
const toDoButton = document.querySelector('.todo-button')
const toDoList = document.querySelector('.todo-list')
const allFilter = document.querySelector('.all')
const activeFilter = document.querySelector('.active')
const completedFilter = document.querySelector('.completed')
const clear = document.querySelector('.clear-completed')

//Variables
let todos = []
let ALL = 'all'
let ACTIVE = 'active'
let COMPLETED = 'completed'

//Event Listeners
toDoButton.addEventListener('click', addTodo)
toDoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTodo()
    }
})
toDoList.addEventListener('click', changeToDoMode)
allFilter.addEventListener('click', () => filterToDos(ALL))
completedFilter.addEventListener('click', () => filterToDos(COMPLETED))
activeFilter.addEventListener('click', () => filterToDos(ACTIVE))
clear.addEventListener('click', clearCompleted)

//Functions

function addTodo(event) {
    event.preventDefault()
    if (toDoInput.value === "" || toDoInput.value === " ") {
        return;
    }

    const newToDo = {content: toDoInput.value, checked: false};
    todos.push(newToDo);
    renderToDos()

    toDoInput.value = ""
}

function changeToDoMode(event) {
    let item = event.target
    let toDo = item.parentElement

    if (item.classList[0] === 'delete-icon') {
        todos.splice(toDo['id'], 1)
        renderToDos()
    } else {
        todos[toDo['id']].checked = !todos[toDo['id']].checked
        renderToDos()
    }
}


function renderToDos() {
    console.log(todos)
    toDoList.innerHTML = todos.map((todo, index) => {
        if (!todo.isClear) {
            return `
                <div id=${index} class= 'todo ${todo.checked ? "complete-todo" : ''}'>
                    <li>${todo.content}</li>
                    <span class="delete-icon material-icons">close</span>
                </div>
        `
        }
    }).join(' ')
}

allFilter.classList.add('filter-active')

function filterToDos(mode) {
    todos.forEach(todo => {
        if (mode === ALL) {
            // change button style
            allFilter.classList.add('filter-active')
            completedFilter.classList.remove('filter-active')
            activeFilter.classList.remove('filter-active')
            todo.isClear = false
            renderToDos()
        } else if (mode === COMPLETED) {
            // change button style
            completedFilter.classList.add('filter-active')
            allFilter.classList.remove('filter-active')
            activeFilter.classList.remove('filter-active')
            //filter list
            todo.isClear = !todo.checked;
            renderToDos()

        } else if (mode === ACTIVE) {
            // change button style
            activeFilter.classList.add('filter-active')
            allFilter.classList.remove('filter-active')
            completedFilter.classList.remove('filter-active')
            //filter list
            todo.isClear = todo.checked;
            renderToDos()
        }
    })
}

function clearCompleted() {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].checked) {
            todos[i].isClear = true
        }
    }
    renderToDos()
}