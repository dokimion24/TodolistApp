import { readTodos, createTodo, editTodo, deleteTodo } from './request.js';

const formEl = document.querySelector('form');
const inputEl = formEl.querySelector('input');
const todosContainer = document.querySelector('.todos__container');

const showTodos = async () => {
  todosContainer.innerHTML = '';
  const todos = await readTodos();
  renderTodos(todos);
};

const startEditTodo = (todoContainer) => {
  const editBtn = todoContainer.querySelector('.edit-btn');
  editBtn.classList.add('display-none');

  const doneBtn = todoContainer.querySelector('.done-btn');
  doneBtn.classList.remove('display-none');

  const editInput = todoContainer.querySelector('.edit-input');
  editInput.classList.remove('display-none');

  const todoText = todoContainer.querySelector('.todo-text');
  todoText.classList.add('display-none');
  editInput.value = todoText.textContent;
};

const finishEditTodo = async (todoContainer) => {
  const id = todoContainer.dataset.id;

  const editBtn = todoContainer.querySelector('.edit-btn');
  editBtn.classList.remove('display-none');

  const doneBtn = todoContainer.querySelector('.done-btn');
  doneBtn.classList.add('display-none');

  const editInput = todoContainer.querySelector('.edit-input');
  const newText = editInput.value;

  await editTodo(id, newText);
  showTodos();
};

const deleteEditTodo = async (todoContainer) => {
  const id = todoContainer.dataset.id;
  await deleteTodo(id);
  showTodos();
};

const clickTodosHandler = async (e) => {
  const todoContainer = e.target.closest('.todo-container');
  console.log(todoContainer);
  if (!todoContainer) {
    return;
  }
  if (e.target.matches('.edit-btn')) {
    startEditTodo(todoContainer);
  }
  if (e.target.matches('.done-btn')) {
    finishEditTodo(todoContainer);
  }
  if (e.target.matches('.delete-btn')) {
    deleteEditTodo(todoContainer);
  }
};

const renderTodos = (todos) => {
  const todosEl = todos
    .map(
      (todo) =>
        `<li class="todo-container" data-id=${todo.id}>
          <div>
            <span class="material-symbols-outlined todo--toggle">radio_button_unchecked</span>
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
    .join('');
  todosContainer.innerHTML += todosEl;
};

let inputText = '';
formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  inputText = inputEl.value;

  await createTodo(inputText);

  showTodos();
});

(async () => {
  const todos = await readTodos();
  renderTodos(todos);
})();

todosContainer.addEventListener('click', clickTodosHandler);
