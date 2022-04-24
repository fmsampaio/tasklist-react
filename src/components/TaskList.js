import styles from './TaskList.module.css'
import TaskCard from './TaskCard'
import { Typography } from '@mui/material'
import OrgToggleButtons from './OrgToggleButtons'
import { useState } from 'react'


function TaskList( {tasks, handleEditForm, handleRemoveTask} ) {

    const [orgOption, setOrgOption] = useState('completed')

    return (
        <div className={styles.container}>
            <OrgToggleButtons initOrg={orgOption}/>
            <div>
            {tasks.length === 0 ? (
                <Typography variant="body1" color="error">No tasks found!</Typography>
            ) : (
                <>
                {tasks.map( (task) => (
                    <TaskCard key={task.id} task={task} handleEditForm={handleEditForm} handleRemoveTask={handleRemoveTask}/>
                ))}
                </>
            
            )
            }
            </div>
        </div>
    )
}

export default TaskList