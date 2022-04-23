import { Checkbox, Chip, IconButton, Typography } from '@mui/material'
import styles from './TaskCard.module.css'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

function TaskCard( {task, handleEditForm, handleRemoveTask} ) {

    const [completed, setCompleted] = useState(task.completed)

    const edit = (e) => {
        e.preventDefault()
        handleEditForm(task)
    }

    const remove = (e) => {
        e.preventDefault()
        handleRemoveTask(task)
    }

    function onCompletedChange(e) {
        setCompleted(e.target.checked)

        const updatedTask = task
        updatedTask.completed = e.target.checked

        fetch(`http://localhost:5000/tasks/${updatedTask.id}`, {
            method : "PATCH",
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(updatedTask)
        })
        .then((resp) => resp.json())
        .then((data) => {
            
        })
        .catch((err) => console.log(err))
    }

    function convertDateToStr(dateNum) {
        const date = new Date(dateNum)
        const returnable = ((date.getMonth()+1) >= 10) ? `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` : `${date.getDate()}/0${date.getMonth()+1}/${date.getFullYear()}`
        return returnable
    }

    function isOverdueTask() {
        const dateTask = new Date(task.due_date)
        const today = new Date()
        return dateTask < today
    }

    return(
        <div className={ `${styles.card} ${styles[completed ? "completed" : "not_completed"]}`}>
            <div className={styles.card_text}>
                {!completed ? (
                    <Typography variant="body1">{task.description}</Typography>
                ) : (
                    <Typography variant="body1" sx={{textDecoration : "line-through", paddingBottom : "0"}}>{task.description}</Typography>
                )}
                <Chip sx={{marginLeft : "1em"}} label={task.category.name}/>
                <Chip sx={{marginLeft : "1em"}} color={isOverdueTask() ? "error" : "success"} label={convertDateToStr(task.due_date)}/>
            </div>
            <div className={styles.card_actions}>
                <Checkbox
                    sx={{marginRight : "1em", paddingRight : "0.1em", paddingLeft : "0.1em"}}
                    checked={completed}
                    onChange={onCompletedChange}
                />
                <IconButton color="primary" aria-label="edit" size="large" onClick={edit}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton color="error" aria-label="delete" size="large" onClick={remove}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>                
            </div>
        </div>
    )
}

export default TaskCard

//