import styles from './TaskList.module.css'
import TaskCard from './TaskCard'

function TaskList( {tasks} ) {
    return (
        <div className={styles.container}>
            {tasks.length === 0 ? (
                <p>No tasks found</p>
            ) : (
                <>
                {tasks.map( (task) => (
                    <TaskCard key={task.id} task={task}/>
                ))}
                </>
            
            )
            }
        </div>
    )
}

export default TaskList