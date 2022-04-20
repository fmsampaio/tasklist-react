import { Checkbox, IconButton, Typography } from '@mui/material'
import styles from './TaskCard.module.css'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

function TaskCard( {task} ) {

    const [completed, setCompleted] = useState(task.completed)

    function onCompletedChange(e) {
        setCompleted(e.target.checked)
    }

    return(
        <div className={styles.card}>
            <div className={styles.card_text}>
                <Typography variant="body1">{task.description}</Typography>
            </div>
            <div className={styles.card_actions}>
                <Checkbox
                    sx={{marginRight : "1em", paddingRight : "0.1em", paddingLeft : "0.1em"}}
                    checked={completed}
                    onChange={onCompletedChange}
                />
                <IconButton color="primary" aria-label="edit" size="large">
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