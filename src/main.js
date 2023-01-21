import { readTodos, createTodo, editTodo, deleteTodo } from "./request.js";
import { renderDate } from "./date.js";
const todoForm = document.querySelector("form");
const todoInput = todoForm.querySelector("input");
const todosContainer = document.querySelector(".todos__container");
const deleteAllBtn = document.querySelector(".todo-option, .delete-all-btn");

const deleteTodoAllHandler = async () => {
  console.log(deleteAllBtn);
  const todos = await readTodos();
  todos.map((todo) => {
    deleteTodo(todo.id);
  });
  todosContainer.innerHTML = "";
};

const showTodos = async () => {
  const todos = await readTodos();
  renderTodos(todos);
  countTodo(todos);
};

const countTodo = (todos) => {
  const todoCounter = document.querySelector(".todo-counter");
  const count = todos.filter((todo) => todo.done === false).length;
  todoCounter.innerHTML = `
    <span class="">남은 할일 ${count}</span>
  `;
};

const startEditTodo = (todoContainer) => {
  const editBtn = todoContainer.querySelector(".edit-btn");
  editBtn.classList.add("display-none");

  const doneBtn = todoContainer.querySelector(".done-btn");
  doneBtn.classList.remove("display-none");

  const editInput = todoContainer.querySelector(".edit-input");
  editInput.classList.remove("display-none");

  const todoText = todoContainer.querySelector(".todo-text");
  todoText.classList.add("display-none");
  editInput.value = todoText.textContent;
};

const finishEditTodo = async (todoContainer, todo) => {
  const editBtn = todoContainer.querySelector(".edit-btn");
  editBtn.classList.remove("display-none");

  const doneBtn = todoContainer.querySelector(".done-btn");
  doneBtn.classList.add("display-none");

  const editInput = todoContainer.querySelector(".edit-input");

  todo.title = editInput.value;

  await editTodo(todo);
  showTodos();
};

const deleteEditTodo = async (todoContainer) => {
  const id = todoContainer.dataset.id;
  await deleteTodo(id);
  showTodos();
};

const toggleTodoIcon = async (todoContainer, todo) => {
  todoContainer.dataset.done = `${!todo.done}`;
  console.log(todoContainer);
  todo.done = !todo.done;
  await editTodo(todo);
  showTodos();
};

const clickTodosHandler = async (e) => {
  const todoContainer = e.target.closest(".todo-container");

  if (!todoContainer) {
    return;
  }

  const todo = {
    id: todoContainer.dataset.id,
    title: todoContainer.querySelector(".todo-text").textContent,
    done: "true" === todoContainer.dataset.done,
  };

  if (e.target.matches(".edit-btn")) {
    startEditTodo(todoContainer);
  }
  if (e.target.matches(".done-btn")) {
    finishEditTodo(todoContainer, todo);
  }
  if (e.target.matches(".delete-btn")) {
    deleteEditTodo(todoContainer);
  }
  if (e.target.matches(".todo--toggle")) {
    toggleTodoIcon(todoContainer, todo);
  }
};

const renderTodos = (todos) => {
  todosContainer.innerHTML = "";
  const todosEl = todos
    .map(
      (todo) =>
        `<li class="todo-container" data-id=${todo.id} data-done='${todo.done}'>
          <div class="todo-container__task">
            <span class="material-symbols-outlined todo--toggle">${
              todo.done ? "check_circle" : "radio_button_unchecked"
            }</span>
            <span class="todo-text">${todo.title}</span>
            <input class="edit-input display-none" type ="text"/>
          </div>
          <div class="todo-container__btn">
            <span class="material-symbols-outlined edit-btn">edit</span>
            <span class="material-symbols-outlined done-btn display-none">done</span>
            <span class="material-symbols-outlined delete-btn">delete</span>
          </div>
        </li> 
    `
    )
    .join("");
  todosContainer.innerHTML += todosEl;
};

todoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let todoInputText = todoInput.value;

  await createTodo(todoInputText);
  showTodos();
  todoInputText = "";
});

renderDate();
showTodos();

todosContainer.addEventListener("click", clickTodosHandler);
deleteAllBtn.addEventListener("click", deleteTodoAllHandler);

setInterval(() => {
  renderDate();
}, 1000);
