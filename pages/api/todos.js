import Connect from "../../utils/connectD";
import TodoUser from "../../model/Users";
import { getSession } from "next-auth/react";
import SortTodo from "../../utils/SortTodo";

export default async function handler(req, res) {
  await Connect();
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "please first login!" });
  }
  const user = await TodoUser.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(401)
      .json({ status: "failed", message: "user not found!" });
  }
  if (req.method === "POST") {
    const { title, status, descriptions } = req.body;
    console.log(descriptions);
    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "invalid data" });
    }
    user.todos.push({ title, status, descriptions });
    user.save();
    res.status(201).json({ status: "success", message: "added todo" });
  } else if (req.method == "GET") {
    const sortedTodo = SortTodo(user.todos);
    return res.json({ data: sortedTodo, todos: user.todos });
  } else if (req.method == "PATCH") {
    const { id, status } = req.body;
    if (!id || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "invalid Data!" });
    }
    const updatedTodo = await TodoUser.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );
    res
      .status(200)
      .json({ status: "success", message: "updated todo", data: updatedTodo });
  } else if (req.method == "PUT") {
    const { id, title, descriptions, status } = req.body;
    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "invalid data" });
    }
    const updatedTodo = await TodoUser.updateOne(
      { "todos._id": id },
      {
        $set: {
          "todos.$.status": status,
          "todos.$.title": title,
          "todos.$.descriptions": descriptions,
        },
      }
    );
    res
      .status(200)
      .json({ status: "success", message: "updated todo", data: updatedTodo });
  }
}
