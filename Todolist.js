import React from "react";
import Todo from "./Todo";

export default function Todolist({todo, toggleTodo}) {
    return (todo.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo}/>
    }))

}