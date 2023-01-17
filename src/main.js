import { readTodos, createTodo, updateTodo, deleteTodo } from './request.js';

const formEl = document.querySelector('form');
const inputEl = formEl.querySelector('input');
const todoContainer = document.querySelector('.todo-container');

const renderTodos = (todos) => {
  const liEls = todos.map((todo) => {
    const liEl = document.createElement('li');
    liEl.className = 'todo';
    liEl.innerHTML = `
      <div>
        <span class="material-symbols-outlined">
        radio_button_unchecked
        </span>
        <span contenteditable="true">${todo.title}</span>
      </div>
      <div class="todo__btn">
        <input class="display-none" type ="text"/>
        <button class="doneBtn">확인</button>
        <button>삭제</button>
      </div>
    `;

    const updateBtn = liEl.querySelectorAll('button')[0];
    const updateInput = liEl.querySelector('input');
    const deleteBtn = liEl.querySelectorAll('button')[1];

    updateBtn.addEventListener('click', async () => {
      confirmBtn.classList.remove('display-none');
      updateBtn.classList.add('display-none');
      const newText = liEl.querySelector('input').value;
      updateInput.classList.remove('display-none');

      await updateTodo(todo, newText);
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
