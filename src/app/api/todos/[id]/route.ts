import { NextResponse } from "next/server";
import { TODOS } from "../route";

//@ts-ignore
export function PUT(req: Request, context) {
  const { id } = context.params;
  const todoIndex = TODOS.findIndex((el) => el.id === parseInt(id, 10));

  TODOS[todoIndex] = { ...TODOS[todoIndex], done: !TODOS[todoIndex]?.done };

  return NextResponse.json(TODOS[todoIndex]);
}
//@ts-ignore
export function DELETE(req: Request, context) {
  const { id } = context.params;
  const todosIndex = TODOS.findIndex((el) => el.id === parseInt(id, 10));
  const todo = TODOS[todosIndex];

  TODOS.splice(todosIndex, 1);

  return NextResponse.json(todo);
}
