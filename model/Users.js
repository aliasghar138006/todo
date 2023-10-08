import { Schema, models, model } from "mongoose";

const todoSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: { type: String },
  lastName: { type: String },
  todos: [{ title: String, status: String, descriptions: String }],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const TodoUser = models.TodoUser || model("TodoUser", todoSchema);

export default TodoUser;
