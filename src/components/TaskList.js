import styles from './TaskList.module.css'
import TaskCard from './TaskCard'
import { Typography } from '@mui/material'


function TaskList( {tasks, handleEditForm, handleRemoveTask} ) {
    return (
        <div className={styles.container}>
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
    )
}

export default TaskList