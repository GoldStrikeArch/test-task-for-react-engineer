import { NextResponse } from "next/server";

export type Todo = {
  id: number;
  text: string;
  active: boolean;
  done: boolean;
};

export const TODOS: Todo[] = [
  { id: 1, text: "Learn Nextjs 13", active: true, done: false },
  { id: 2, text: "Find a job", active: false, done: false },
  { id: 3, text: "Win a game in Dota2", active: false, done: false },
  { id: 4, text: "Apply to more jobs", active: false, done: false },
  { id: 5, text: "Buy a present for my wife", active: false, done: false },
  { id: 6, text: "Toy with RTK query", active: false, done: false },
  { id: 7, text: "Learn Redux", active: false, done: false },
  { id: 8, text: "Learn Vue", active: false, done: false },
  { id: 9, text: "Learn Angular", active: false, done: false },
  { id: 10, text: "Create a web app", active: false, done: false },
];

export function GET() {
  return NextResponse.json(TODOS);
}

export async function POST(req: Request) {
  const { text } = await req.json();

  TODOS.push({
    id: Math.floor(Math.random() * Date.now()),
    text,
    active: false,
    done: false,
  });

  return NextResponse.json({ text });
}
