import { readTodos, createTodo, editTodo, deleteTodo } from './request.js';

const todoForm = document.querySelector('form');
const todoInput = todoForm.querySelector('input');
const todosContainer = document.querySelector('.todos__container');

/* 구현할 기능
1. 삭제 시 버튼 한번만 클릭 되도록
2. todo-input enter도 적용 되도록
3. 

*/

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

const toggleTodoIcon = async (todoContainer) => {
  const id = todoContainer.dataset.id;

  const icon = todoContainer.querySelector('.todo--toggle');
  icon.textContent =
    icon.textContent === 'radio_button_unchecked'
      ? 'check_circle'
      : 'radio_button_unchecked';
};

const clickTodosHandler = async (e) => {
  const todoContainer = e.target.closest('.todo-container');
  // console.log(todoContainer);
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
  if (e.target.matches('.todo--toggle')) {
    toggleTodoIcon(todoContainer);
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

todoForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  let todoInputText = todoInput.value;

  await createTodo(inputText);
  showTodos();
  todoInputText = '';
});

(async () => {
  const todos = await readTodos();
  renderTodos(todos);
})();

todosContainer.addEventListener('click', clickTodosHandler);
