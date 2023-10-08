import React from "react";
import EditTodoPage from "../../components/templates/EditTodoPage";
import { useRouter } from "next/router";

function EditTodo() {
  const router = useRouter();
  const { todoId } = router.query;
  return <EditTodoPage id={todoId} />;
}

export default EditTodo;
