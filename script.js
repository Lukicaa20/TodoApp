"use strict";

const inputTodo = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const button = document.getElementById("todo-btn");

const todoList = [];

//Event listeneri
list.addEventListener("click", deleteTodo);
button.addEventListener("click", (e) => {
  addTodo(e);
  console.log(todoList);
});

function addTodo(e) {
  e.preventDefault();

  let todoObject = {};

  // Div
  const todoDiv = document.createElement("div");

  // Li
  const todoLi = document.createElement("p");
  if (inputTodo.value === "") {
    return;
  } else {
    todoLi.innerText = inputTodo.value;
  }
  todoLi.classList.add("list-item");

  // Date
  const todoDate = document.createElement("p");
  todoDate.classList.add("todo-date");
  const currentDate = new Date();
  todoDate.innerText = `Created: ${currentDate.toLocaleString()}`; // Date in a readable format

  // Button delete
  const todoDelete = document.createElement("button");
  todoDelete.classList.add("delete");
  todoDelete.innerHTML = "Delete";

  // Button complete
  const todoComplete = document.createElement("button");
  todoComplete.innerHTML = `✓`;
  todoComplete.classList.add("complete-btn");

  // Append
  todoDiv.appendChild(todoLi);
  todoDiv.appendChild(todoDate);
  todoDiv.appendChild(todoDelete);
  todoDiv.appendChild(todoComplete);

  todoObject = {
    view: todoDiv,
    completed: false,
    todoLi: todoLi,
    time: new Date(),
  };

  todoList.push(todoObject);

  todoList.forEach((todo) => {
    list.appendChild(todo.view);
  });

  inputTodo.value = "";
}

function deleteTodo(e) {
  e.preventDefault();

  const item = e.target;

  if (item.classList[0] === "delete") {
    const div = e.target.parentElement;
    const position = todoList.indexOf(div);
    div.remove();
    todoList.splice(position, 1);
  } else if (item.classList[0] === "complete-btn") {
    const div = e.target.parentElement;
    const obj = todoList.find((task) => task.view === div);

    if (obj) {
      obj.completed = !obj.completed;
    }

    obj.todoLi.classList.toggle("complete");
  }
}
