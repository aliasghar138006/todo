import { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import Radioutton from "../elements/Radioutton";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [status, setStatus] = useState("todo");

  const session = useSession();

  useEffect(() => {
    if (session.status == "unauthenticated") {
      toast.error("Please Login in Todos Page!");
    }
  }, []);

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, status, descriptions }),
    });

    const data = await res.json();
    if (data.status == "success") toast.success("Added Todo");
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
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
        <button onClick={addHandler}>Add</button>
      </div>
    </div>
  );
}

export default AddTodoPage;
