import Todolist from "./Todolist";
import React, {useState, useRef, useEffect} from "react";
import './App.css';
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

    function enterPressed(event) {
        const code = event.keyCode || event.which;
        if (code === 13) {
            addTodo()
        }
    }

    return (<>
            <h1>Task List Creator</h1>
            <Todolist todo={todo} toggleTodo={toggleTodo}/ >
                <input onKeyPress={enterPressed.bind(this)}
                       placeholder={"Enter Task"}
                       ref={todoNameRef}
                       type="text"/>
                <button onClick={addTodo}> Add Task</button>
                <button onClick={clearTodo}> Clear Completed</button>
                <div className={"div1"}>{todo.filter(todo => !todo.complete).length} tasks left!</div>
                <footer><small><i>Made by <a href="https://github.com/nimobenne">Nimo Benne</a> &lt;3 Kam</i></small></footer>
            </>
            )

            }

            export default App;