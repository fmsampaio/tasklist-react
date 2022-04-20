import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import Header from "./Header"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

function MainPage() {

    const [showTaskForm, setShowTaskForm] = useState(false)
    const [task, setTask] = useState({})
    const [tasks, setTasks] = useState([])

    useEffect( () => {
        fetchTasks()
    }, [])

    function handleNewTaskButton() {
        //toggle new task form
        setShowTaskForm(true)
    }

    function toggleForm() {
        setShowTaskForm(!showTaskForm)
    }

    function createTask(task) {
        fetch('http://localhost:5000/tasks', {
            method : "POST",
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(task)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log('Task criada!')
            const updatedTasks = tasks
            updatedTasks.push(data)
            setTasks(updatedTasks)
            setShowTaskForm(false)
        })
        .catch((err) => console.log(err))
    }

    function fetchTasks() {
        fetch('http://localhost:5000/tasks', {
            method : "GET",
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setTasks(data)
        })
        .catch((err) => console.log(err))
    }

    return (
        <Container maxWidth="md">
            <Header handleNewTaskButton={handleNewTaskButton} />
            {showTaskForm && (
                <TaskForm taskData={task} btnText="Save" handleSubmit={createTask} toggleForm={toggleForm}/>
            )}
            <TaskList tasks={tasks}/>
        </Container>
    )
}

export default MainPage