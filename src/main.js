import { readTodos, createTodo, updateTodo, deleteTodo } from './request.js';

const formEl = document.querySelector('form');
const inputEl = formEl.querySelector('input');
const listEl = document.querySelector('.list');

const renderTodos = (todos) => {
  const liEls = todos.map((todo) => {
    const liEl = document.createElement('li');
    liEl.innerHTML = /* html */ `
      <span>${todo.title}</span>
    `;
    liEl.addEventListener('click', async () => {
      await updateTodo(todo);
      const todos = await readTodos();
      renderTodos(todos);
    });

    const btnEl = document.createElement('button');
    btnEl.textContent = '삭제!';
    btnEl.addEventListener('click', async () => {
      await deleteTodo(todo);
      const todos = await readTodos();
      renderTodos(todos);
    });
    liEl.append(btnEl);

    return liEl;
  });
  listEl.innerHTML = '';
  listEl.append(...liEls);
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
  console.log(todos);
  renderTodos(todos);
})();
