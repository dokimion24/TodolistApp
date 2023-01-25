import { readTodos, addTodo, editTodo, deleteTodo } from './api.js';
import { renderDate } from './date.js';

const todoForm = document.querySelector('form');
const todosContainer = document.querySelector('.todos__container');
const deleteAllBtn = document.querySelector('.delete-all-btn');

const validateTodoInputHandler = async (event) => {
  event.preventDefault();

  const todoInput = todoForm.querySelector('input');
  let todoInputText = todoInput.value;

  if (todoInputText.trim() === '') {
    return;
  }

  await addTodo(todoInputText);
  showTodos();
  todoInput.value = '';
};

const deleteTodoAllHandler = async () => {
  const todos = await readTodos();

  todos.map(async (todo) => {
    await deleteTodo(todo.id);
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

  const count = todos.length;
  todoCounter.innerHTML = `
    <span class=''>남은 할일 ${count}</span>
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

const finishEditTodo = async (todoContainer) => {
  const todo = {
    id: todoContainer.dataset.id,
    title: todoContainer.querySelector('.todo-text').textContent,
    done: 'true' === todoContainer.dataset.done,
  };

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

const toggleTodoIcon = async (todoContainer) => {
  const todo = {
    id: todoContainer.dataset.id,
    title: todoContainer.querySelector('.todo-text').textContent,
    done: 'true' === todoContainer.dataset.done,
  };

  todoContainer.dataset.done = `${!todo.done}`;
  todo.done = !todo.done;
  await editTodo(todo);

  showTodos();
};

//todo__container Handler
const clickTodosHandler = async (e) => {
  const todoContainer = e.target.closest('.todos__container > div');

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
  if (e.target.matches('.toggle-todo')) {
    toggleTodoIcon(todoContainer);
  }
};

const renderTodos = (notDoneTodos, doneTodos) => {
  todosContainer.innerHTML = ``;
  const notDoneTodosEl = notDoneTodos
    .map(
      (todo) =>
        `
        <div class='todo__container' data-id=${todo.id} data-done=${todo.done}>
          <div class='todo__container__task'>
            <span class='material-symbols-outlined toggle-todo'>radio_button_unchecked</span>
            <span class='todo-text'>${todo.title}</span>
            <input class='edit-input display-none' type ='text'/>
          </div>
          <div class='todo__container__btn'>
            <span class='material-symbols-outlined edit-btn'>edit</span>
            <span class='material-symbols-outlined done-btn display-none'>done</span>
            <span class='material-symbols-outlined delete-btn'>delete</span>
          </div>
        </div>
        `
    )
    .join('');

  const doneTodoTitle = `
    <div class='todo-done'>
      <div class='todo-done__btn'>
        <span class='material-symbols-outlined slide-btn'>chevron_right</span>
        <span class='slide-btn'>완료됨 ${doneTodos.length}</span>
      </div>
    </div>
  `;

  const doneTodosEl = doneTodos
    .map(
      (todo) =>
        `
        <div class='todo__container color-gray' data-id=${todo.id} data-done='${todo.done}'>
          <div class='todo__container__task'>
            <span class='material-symbols-outlined toggle-todo'>check_circle</span>
            <span class='todo-text line-through'>${todo.title}</span>
          </div>
          <div class='todo__container__btn'>
            <span class='material-symbols-outlined delete-btn'>delete</span>
          </div>
        </div>
        `
    )
    .join('');

  todosContainer.innerHTML += `${notDoneTodosEl}${doneTodoTitle}${doneTodosEl}`;
};

renderDate();
showTodos();

todoForm.addEventListener('submit', validateTodoInputHandler);
todosContainer.addEventListener('click', clickTodosHandler);
deleteAllBtn.addEventListener('click', deleteTodoAllHandler);

setInterval(() => {
  renderDate();
}, 1000);
