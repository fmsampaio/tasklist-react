import { Checkbox, IconButton, Typography } from '@mui/material'
import styles from './TaskCard.module.css'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

function TaskCard( {task, handleEditForm} ) {

    const [completed, setCompleted] = useState(task.completed)

    const edit = (e) => {
        e.preventDefault()
        handleEditForm(task)
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

    return(
        <div className={ `${styles.card} ${styles[completed ? "completed" : "not_completed"]}`}>
            <div className={styles.card_text}>
                {!completed ? (
                    <Typography variant="body1">{task.description}</Typography>
                ) : (
                    <Typography variant="body1" sx={{textDecoration : "line-through"}}>{task.description}</Typography>
                )}

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
                <IconButton color="error" aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" />
                </IconButton>                
            </div>
        </div>
    )
}

export default TaskCard

//