import { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
// import { Todo } from '../models/index';

const initialFormState: any = { name: '', description: '' };

function Demo() {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    // const apiData: any = await API.graphql({ query: listTodos });
    // const todosFromAPI = apiData.data.listTodos.items;
    // await Promise.all(todosFromAPI.map(async (todo: Todo) => {
    //   if (todo.image) {
    //     const image = await Storage.get(todo.image);
    //     console.log(todo);
    //     console.log(image);
    //     return Todo.copyOf(todo, updated => {
    //       updated.image = image as any;
    //     });
    //   }
    //   return todo;
    // }));
    // setTodos(apiData.data.listTodos.items);
  }

  async function createTodo() {
    if (!formData.name || !formData.description) return;
    // await API.graphql({ query: createTodoMutation, variables: { input: formData } });
    // if (formData.image) {
    //   const image = await Storage.get(formData.image);
    //   formData.image = image;
    // }
    // setTodos([...todos, formData]);
    setFormData(initialFormState);
  }

  async function deleteTodo({ id }: { id: string }) {
    // const newTodosArray = todos.filter((todo: Todo) => todo.id !== id);
    // setTodos(newTodosArray);
    // await API.graphql({ query: deleteTodoMutation, variables: { input: { id } }});
  }

  async function onChange(e: any) {
    const files = e.target.files;
    if (!files[0]) return;
    const file = files[0];
    console.log(file);
    // setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchTodos();
  }

  return (
    <div className="App">
      {/* <AuthComponent /> */}
      <h1>My Todos App</h1>
      <input
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Todo name"
        value={formData.name}
      />
      <input
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Todo description"
        value={formData.description}
      />
      <input type="file" onChange={(e: any) => onChange(e)} />
      <button onClick={createTodo}>Create Todo</button>
      <div style={{ marginBottom: 30 }}>
        {/* {todos.map((todo: Todo) => (
          <div key={todo.id || todo.name}>
            <h2>{todo.name}</h2>
            <p>{todo.description}</p>
            <button onClick={() => deleteTodo(todo)}>Delete note</button>
            {todo.image && <img src={todo.image} style={{ width: 400 }} alt="" />}
          </div>
        ))} */}
      </div>
      {/* <AmplifySignOut /> */}
    </div>
  );
}

// export default withAuthenticator(Demo);
export default Demo;
