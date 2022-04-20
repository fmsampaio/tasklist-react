import { Container } from "@mui/material"
import { useState } from "react"
import Header from "./layout/Header"
import TaskForm from "./task/TaskForm"

function MainPage() {

    const [showTaskForm, setShowTaskForm] = useState(false)
    const [task, setTask] = useState({})

    function handleNewTaskButton() {
        //toggle new task form
        setShowTaskForm(true)
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
        })
        .catch((err) => console.log(err))
    }

    return (
        <Container maxWidth="md">
            <Header handleNewTaskButton={handleNewTaskButton} />
            {showTaskForm && (
                <TaskForm taskData={task} btnText="Save" handleSubmit={createTask}/>
            )}
        </Container>
    )
}

export default MainPage