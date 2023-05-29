"use client";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { todoApi } from "../store";
import { Fragment, useCallback, useRef } from "react";
import type { Todo } from "../api/todos/route";

const App = () => {
  const { data: todos } = todoApi.useGetAllQuery();
  const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const [addTodo] = todoApi.useAddTodoMutation();
  const textRef = useRef<HTMLInputElement>(null);

  const onToggle = useCallback(
    (todo: Todo) => updateTodo({ ...todo, done: !todo.done }),
    [updateTodo]
  );

  const onDelete = useCallback((todo: Todo) => deleteTodo(todo), [deleteTodo]);
  const onAdd = useCallback(() => {
    addTodo(textRef!.current!.value ?? "");
    textRef.current!.value = "";
  }, [addTodo]);
  return (
    <main>
      {todos?.map((todo) => (
        <Fragment key={todo.id}>
          <div>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => onToggle(todo)}
            />
            <span>{todo.text}</span>
            <button onClick={() => onDelete(todo)}>Delete</button>
          </div>
        </Fragment>
      ))}
      <div>
        <input type="text" ref={textRef} />
        <button onClick={() => onAdd()}>Add todo</button>
      </div>
    </main>
  );
};

const TodosApp = () => {
  return (
    <ApiProvider api={todoApi}>
      <App />
    </ApiProvider>
  );
};

export default TodosApp;
