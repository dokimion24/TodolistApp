const headers = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202301',
  username: 'KDT4_LeeChanYoung',
};

export const createTodo = async (title) => {
  await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
      }),
    }
  );
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

export const editTodo = async (id, text) => {
  await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        title: `${text}`,
        done: 'false',
      }),
    }
  );
};

export const deleteTodo = async (id) => {
  await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
    {
      method: 'DELETE',
      headers,
    }
  );
};
