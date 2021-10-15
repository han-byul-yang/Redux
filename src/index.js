import { createStore } from "redux";

const txt = document.querySelector('.txt')
const form = document.querySelector('form')
const ul = document.querySelector('ul')

const clickDispatch = (context, id) => {
  return {
    type: 'clickbtn',
    context,
    id}
}
const clearDispatch = (ida) => {
  return {
    type: 'clearbtn',
    ida
  }
}

const todoReducer = (todo = [], action) => {
  console.log(todo)
  if (action.type === 'clickbtn') {
    return [...todo, {text:action.context, id:action.id}]
  } else if (action.type === 'clearbtn') {
    return todo.filter(todoC => todoC.id !== action.ida)
  }
  return todo
}

const todoStore = createStore(todoReducer)

const clickTodo = (e) => {
  e.preventDefault()
  const context = txt.value
  txt.value = ''
  const id = Date.now()
  todoStore.dispatch(clickDispatch(context, id))
}

form.addEventListener('submit', clickTodo)

const clearTodo = (e) => {
  const ida = parseInt(e.target.parentNode.id)
  todoStore.dispatch(clearDispatch(ida))
  console.log(ida)
}

const todoSub = () => {
  ul.innerHTML = ''
  todoStore.getState().map((todos)=>{
    const li = document.createElement('li')
    li.innerHTML = (todos.text)
    li.setAttribute('id', todos.id)
    const clear = document.createElement('button')
    clear.innerHTML = 'clear'
    clear.addEventListener('click', clearTodo)
    li.appendChild(clear)
    ul.appendChild(li)
    ;})
}

todoStore.subscribe(todoSub)