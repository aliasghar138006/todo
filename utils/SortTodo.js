

export default function SortTodo(todos){
    const sortedTodo = {};
    todos.map(todo => {
        if(!sortedTodo[todo.status]) sortedTodo[todo.status] = [];
        sortedTodo[todo.status].push(todo);
    });
    return sortedTodo;
}