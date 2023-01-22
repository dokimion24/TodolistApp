import { readTodos, createTodo, editTodo, deleteTodo } from './request.js';
import { renderDate } from './date.js';
const todoForm = document.querySelector('form');
const todoInput = todoForm.querySelector('input');
const todosContainer = document.querySelector('.todos__container');

const deleteAllBtn = document.querySelector('.delete-all-btn');

const deleteTodoAllHandler = async () => {
  const todos = await readTodos();

  todos.map((todo) => {
    deleteTodo(todo.id);
  });
  todosContainer.innerHTML = '';
  countTodo([]);
};

const showTodos = async () => {
  const todos = await readTodos();
  const notDoneTodos = todos.filter((todo) => todo.done === false);
  const doneTodos = todos.filter((todo) => todo.done === true);
  renderTodos(notDoneTodos, doneTodos);
  countTodo(notDoneTodos);
};

const countTodo = (todos) => {
  const todoCounter = document.querySelector('.todo-util__counter');
  const count = todos.filter((todo) => todo.done === false).length;
  todoCounter.innerHTML = `
    <span class="">남은 할일 ${count}</span>
  `;
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

const finishEditTodo = async (todoContainer, todo) => {
  const editBtn = todoContainer.querySelector('.edit-btn');
  editBtn.classList.remove('display-none');

  const doneBtn = todoContainer.querySelector('.done-btn');
  doneBtn.classList.add('display-none');

  const editInput = todoContainer.querySelector('.edit-input');

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
  todo.done = !todo.done;
  await editTodo(todo);

  // if (todo.done === false) {
  //   todoContainer.classList.add('fade-in__down');
  // } else {
  //   todoContainer.classList.add('fade-in__up');
  // }

  showTodos();
};

const clickTodosHandler = async (e) => {
  const todoContainer = e.target.closest('.todo__container');

  if (!todoContainer) {
    return;
  }

  const todo = {
    id: todoContainer.dataset.id,
    title: todoContainer.querySelector('.todo-text').textContent,
    done: 'true' === todoContainer.dataset.done,
  };

  if (e.target.matches('.edit-btn')) {
    startEditTodo(todoContainer);
  }
  if (e.target.matches('.done-btn')) {
    finishEditTodo(todoContainer, todo);
  }
  if (e.target.matches('.delete-btn')) {
    deleteEditTodo(todoContainer);
  }
  if (e.target.matches('.todo--toggle')) {
    toggleTodoIcon(todoContainer, todo);
  }
};

const renderTodos = (notDoneTodos, doneTodos) => {
  todosContainer.innerHTML = ``;
  const notDoneTodosEl = notDoneTodos
    .map(
      (todo) =>
        `
        <div class="todo__container" data-id=${todo.id} data-done='${todo.done}'>
          <div class="todo__container__task">
            <span class="material-symbols-outlined todo--toggle">radio_button_unchecked</span>
            <span class="todo-text">${todo.title}</span>
            <input class="edit-input display-none" type ="text"/>
          </div>
          <div class="todo__container__btn">
            <span class="material-symbols-outlined edit-btn">edit</span>
            <span class="material-symbols-outlined done-btn display-none">done</span>
            <span class="material-symbols-outlined delete-btn">delete</span>
          </div>
        </div>
        `
    )
    .join('');

  const doneTodoTitle = `
    <div class="todo-done__menu">
        <button>
          <span class="material-symbols-outlined">chevron_right</span>
          <span>완료됨</span>
        </button>
    </div>
  `;

  const doneTodosEl = doneTodos
    .map(
      (todo) =>
        `
        <div class="todo__container" data-id=${todo.id} data-done='${todo.done}'>
          <div class="todo__container__task">
            <span class="material-symbols-outlined todo--toggle">check_circle</span>
            <span class="todo-text line-through">${todo.title}</span>
          </div>
          <div class="todo__container__btn">
            <span class="material-symbols-outlined delete-btn">delete</span>
          </div>
        </div>
        `
    )
    .join('');

  todosContainer.innerHTML += `${notDoneTodosEl}${doneTodoTitle}${doneTodosEl}`;
};

todoForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  let todoInputText = todoInput.value;

  await createTodo(todoInputText);
  showTodos();
  todoInputText = '';
});

renderDate();
showTodos();

todosContainer.addEventListener('click', clickTodosHandler);
deleteAllBtn.addEventListener('click', deleteTodoAllHandler);

// setInterval(() => {
//   renderDate();
// }, 1000);
