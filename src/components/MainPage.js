import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import Header from "./Header"
import Message from "./Message"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

function MainPage() {

    const [showTaskForm, setShowTaskForm] = useState(false)
    const [showTaskFormforCreate, setShowTaskFormforCreate] = useState(false)
    const [task, setTask] = useState({})
    const [tasks, setTasks] = useState([])
    const [typeMessage, setTypeMessage] = useState("")
    const [textMessage, setTextMessage] = useState("")

    useEffect( () => {
        fetchTasks()
    }, [])

    function handleNewTaskButton() {
        //toggle new task form
        setShowTaskForm(true)
        setShowTaskFormforCreate(true)
    }

    function toggleForm() {
        setShowTaskForm(!showTaskForm)
    }

    function createTask(task) {
        setTextMessage('')
        fetch('http://localhost:5000/tasks', {
            method : "POST",
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(task)
        })
        .then((resp) => resp.json())
        .then((data) => {
            const updatedTasks = tasks
            updatedTasks.push(data)
            setTasks(updatedTasks)
            setShowTaskForm(false)
            setTextMessage("Task created successfuly!")
            setTypeMessage("success")
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

    function editTask(task) {
        setTextMessage('')
        fetch(`http://localhost:5000/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(task)
        })
        .then((resp) => resp.json())
        .then((data) => {
            const updatedTasks = tasks.filter((t) => t.id !== task.id)          
            updatedTasks.push(data)

            setTasks(updatedTasks)
            setShowTaskForm(false)
            setTextMessage('Task editted successfuly')
            setTypeMessage('success')
        })
        .catch((err) => console.log(err))
    }

    function removeTask(task) {
        setTextMessage('')
        fetch(`http://localhost:5000/tasks/${task.id}`, {
            method: 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(task)
        })
        .then((resp) => resp.json())
        .then((data) => {
            const updatedTasks = tasks.filter((t) => t.id !== task.id)
            setTasks(updatedTasks)
            setShowTaskForm(false)
            setTextMessage('Task removed successfuly')
            setTypeMessage('success')
        })
        .catch((err) => console.log(err))
    }

    function handleEditForm(task) {
        setShowTaskForm(true)
        setShowTaskFormforCreate(false)
        setTask(task)
    }

    return (
        <Container maxWidth="md">
            <Header handleNewTaskButton={handleNewTaskButton} />
            <Message type={typeMessage} msg={textMessage} />
            {showTaskForm && (
                showTaskFormforCreate ? (
                    <TaskForm btnText="Save" handleSubmit={createTask} toggleForm={toggleForm}/>
                ) : (
                    <TaskForm taskData={task} btnText="Edit" handleSubmit={editTask} toggleForm={toggleForm}/>
                )

            )}
            <TaskList tasks={tasks} handleEditForm={handleEditForm} handleRemoveTask={removeTask}/>
        </Container>
    )
}

export default MainPage