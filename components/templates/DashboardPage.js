import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiMastodonLine } from "react-icons/ri";
import Task from "../modules/Task";

function DashboardPage() {
  const [todos, setTodos] = useState({});
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(status);
    if (status == "unauthenticated") {
      router.replace("/signin");
    }
    fetchTodo();
  }, [status]);
  const fetchTodo = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data.data);
  };
  return (
    <div className="home-page">
      <div className="home-page--todo todos-list">
        <p>Todo</p>
        <Task todo={todos.todo} fetchTodo={fetchTodo} next="inProgress" />
      </div>
      <div className="home-page--inProgress todos-list">
        <p>In Progress</p>
        <Task
          todo={todos.inProgress}
          fetchTodo={fetchTodo}
          back="todo"
          next="review"
        />
      </div>
      <div className="home-page--review todos-list">
        <p>Review</p>
        <Task
          todo={todos.review}
          fetchTodo={fetchTodo}
          back="inProgress"
          next="done"
        />
      </div>
      <div className="home-page--done todos-list">
        <p>Done</p>
        <Task todo={todos.done} fetchTodo={fetchTodo} back="review" />
      </div>
    </div>
  );
}

export default DashboardPage;
