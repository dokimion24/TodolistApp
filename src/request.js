const headers = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202301',
  username: 'KDT4_LeeChanYoung',
};

export const createTodo = async (title) => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
      }),
    }
  );
  const json = await res.json();
  return json;
};

export const readTodos = async () => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    {
      method: 'GET',
      headers,
    }
  );
  const json = await res.json();
  return json;
};

export const updateTodo = async (todo) => {
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        title: `${todo.title}!`,
        done: todo.done,
      }),
    }
  );
  const json = await res.json();
  return json;
};

export const deleteTodo = async (todo) => {
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
    {
      method: 'DELETE',
      headers,
    }
  );
  const json = await res.json();
};
