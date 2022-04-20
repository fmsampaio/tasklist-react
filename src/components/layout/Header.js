import { Button, Typography } from "@mui/material";

import styles from './Header.module.css'

function Header( {handleNewTaskButton} ) {

    const handleOnClick = (e) => {
        e.preventDefault()
        handleNewTaskButton()
    }

    return (
        <div className={styles.container}>
            <Typography component="h1" variant="h4">
                TaskList Project
            </Typography>
            <Button variant="outlined" onClick={handleOnClick} >New Task</Button>
        </div>
    )
}

export default Header