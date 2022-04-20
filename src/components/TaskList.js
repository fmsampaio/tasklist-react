import styles from './TaskList.module.css'

function TaskList( {tasks} ) {
    return (
        <div className={styles.container}>
            {tasks.length === 0 ? (
                <p>No tasks found</p>
            ) : (
                <div>
                    {tasks.map( (task) => (
                        <p>{task.description}</p>
                    ))}
                </div>
            )
            }
        </div>
    )
}

export default TaskList