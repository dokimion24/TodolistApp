import { readTodos, createTodo, editTodo, deleteTodo } from './request.js';

const formEl = document.querySelector('form');
const inputEl = formEl.querySelector('input');
const todoContainer = document.querySelector('.todo__container');

const renderTodos = (todos) => {
  const liEls = todos.map((todo) => {
    const liEl = document.createElement('li');
    liEl.className = 'todo';
    liEl.innerHTML = `
      <div>
        <span class="material-symbols-outlined">
        radio_button_unchecked
        </span>
        <span class="text">${todo.title}</span>
        <input class="display-none" type ="text"/>
      </div>
      <div class="todo__btn">
        <button class="edit-Btn">
          <span class="material-symbols-outlined">edit</span>
        </button>
        <button class="done-Btn display-none">
          <span class="material-symbols-outlined">done</span>
        </button>
        <button>
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    `;
    let newText = '';

    const todoText = liEl.querySelector('.text');
    const editInput = liEl.querySelector('input');
    const editBtn = liEl.querySelectorAll('button')[0];
    const doneBtn = liEl.querySelectorAll('button')[1];
    const deleteBtn = liEl.querySelectorAll('button')[2];

    editBtn.addEventListener('click', async () => {
      doneBtn.classList.remove('display-none');
      editBtn.classList.add('display-none');
      editInput.classList.remove('display-none');
      todoText.classList.add('display-none');

      editInput.value = `${todo.title}`;
    });

    doneBtn.addEventListener('click', async () => {
      doneBtn.classList.add('display-none');
      editBtn.classList.remove('display-none');

      newText = editInput.value;
      await editTodo(todo, newText);
      const todos = await readTodos();
      renderTodos(todos);
    });

    deleteBtn.addEventListener('click', async () => {
      await deleteTodo(todo);
      const todos = await readTodos();
      renderTodos(todos);
    });

    return liEl;
  });

  todoContainer.innerHTML = '';
  todoContainer.append(...liEls);
};

let inputText = '';
formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  inputText = inputEl.value;

  await createTodo(inputText);
  const todos = await readTodos();
  renderTodos(todos);
});

(async () => {
  const todos = await readTodos();
  renderTodos(todos);
})();
