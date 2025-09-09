import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

import { getDb } from "../helpers/db_client.ts";

const router = new Router();

interface Todo {
  _id?: ObjectId; // mongo uses _id internally
  text: string;
}

// GET all todos
router.get("/todos", async (ctx) => {
  const todos = await getDb().collection<Todo>("todos").find().toArray();

  const transformedTodos = todos.map((todo) => ({
    id: todo._id?.toString(),
    text: todo.text,
  }));

  ctx.response.body = { todos: transformedTodos };
});

// POST create todo
router.post("/todos", async (ctx) => {
  const body = await ctx.request.body.json();

  const newTodo: Todo = {
    text: body.text,
  };

  const insertedId = await getDb().collection<Todo>("todos").insertOne(newTodo);

  ctx.response.body = { message: "Created", todo: { id: insertedId.toString(), text: newTodo.text } };
});

// PUT update todo
router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const body = await ctx.request.body.json();

  await getDb().collection<Todo>("todos").updateOne(
    { _id: new ObjectId(tid) },
    { $set: { text: body.text } },
  );

  ctx.response.body = { message: "Updated" };
});

// DELETE todo
router.delete("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;

  await getDb().collection<Todo>("todos").deleteOne({ _id: new ObjectId(tid) });

  ctx.response.body = { message: "Deleted" };
});

export default router;
