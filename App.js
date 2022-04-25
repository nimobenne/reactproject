import Todolist from "./Todolist";
import React, {useState, useRef, useEffect} from "react";

import {v4} from "uuid";

const LOCALSTORAGEKEY = 'todoApp.todo'

function App() {
    const [todo, setTodos] = useState([])
    const todoNameRef = useRef()

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(todo))
    }, [todo])

    function toggleTodo(id) {
        const newTodos = [...todo]
        const todos = newTodos.find(todo => todo.id === id)
        todos.complete = !todos.complete
        setTodos((newTodos))
    }

    function addTodo(e) {
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTodo => {
            return [...prevTodo, {id: v4(), name: name, complete: false}]
        })
        todoNameRef.current.value = null
    }

    function clearTodo() {
        const newTodos = todo.filter(todo => !todo.complete)
        setTodos(newTodos)
    }


    return (<>
        <Todolist todo={todo} toggleTodo={toggleTodo}/ >
            <input ref={todoNameRef} type="text"/>
            <button onClick={addTodo}> Add Todo</button>
            <button onClick={clearTodo}> Clear Completed</button>
            <div>{todo.filter(todo => !todo.complete).length} left to do</div>
        </>
        )

        }

        export default App;