import React, { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import Radioutton from "../elements/Radioutton";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function EditTodoPage({ id }) {
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [status, setStatus] = useState("todo");

  const router = useRouter();

  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    const { todos } = data;
    let filteredTodo = todos.filter((todo) => {
      return todo._id === id;
    });
    console.log(filteredTodo);
    setTitle(filteredTodo[0].title);
    setStatus(filteredTodo[0].status);
    setDescriptions(filteredTodo[0].descriptions);
  };
  const editHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, status, descriptions }),
    });

    const data = await res.json();
    if (data.status == "success") {
      toast.success("updated Todo");
      router.replace("/");
    }
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Edit Todo
      </h2>

      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="descriptions">Descriptions</label>
          <input
            type="text"
            id="descriptions"
            value={descriptions}
            onChange={(e) => setDescriptions(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <Radioutton
            title="Todo"
            value="todo"
            status={status}
            setStatus={setStatus}
            icon={<BsAlignStart />}
          />
          <Radioutton
            title="In Progress"
            value="inProgress"
            status={status}
            setStatus={setStatus}
            icon={<FiSettings />}
          />
          <Radioutton
            title="Review"
            value="review"
            status={status}
            setStatus={setStatus}
            icon={<AiOutlineFileSearch />}
          />
          <Radioutton
            title="Done"
            value="done"
            status={status}
            setStatus={setStatus}
            icon={<MdDoneAll />}
          />
        </div>
        <button onClick={editHandler}>Edit</button>
      </div>
    </div>
  );
}

export default EditTodoPage;
