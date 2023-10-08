import { RiMastodonLine } from "react-icons/ri";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/router";

function Task({ todo, fetchTodo, next, back }) {
  console.log(todo);
  const router = useRouter();
  const changeTodo = async (id, status) => {
    console.log(id, status);
    const res = await fetch("/api/todos", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    console.log(data);
    fetchTodo();
  };

  const editHandler = (id) => {
    router.replace(`edit-todo/${id}`);
  };
  return (
    <div className="tasks">
      {todo &&
        todo.map((item) => (
          <div
            style={{ position: "relative" }}
            key={item._id}
            className="tasks__card"
          >
            <span className={item.status}></span>
            <RiMastodonLine />
            <h4>{item.title}</h4>
            <h4>{item.descriptions}</h4>
            <div>
              <div
                onClick={() => editHandler(item._id)}
                style={{
                  position: "absolute",
                  top: "1px",
                  right: "15px",
                  cursor: "pointer",
                }}
              >
                <FaRegEdit />
              </div>
              {back ? (
                <button
                  onClick={() => changeTodo(item._id, back)}
                  className="button-back"
                >
                  <BiLeftArrow />
                  Back
                </button>
              ) : null}

              {next ? (
                <button
                  onClick={() => changeTodo(item._id, next)}
                  className="button-next"
                >
                  <BiRightArrow />
                  Next
                </button>
              ) : null}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Task;
