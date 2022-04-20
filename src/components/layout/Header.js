import { Container, Typography } from "@mui/material";

import styles from './Header.module.css'

function Header() {
    return (
        <div className={styles.container}>
            <Typography component="h1" variant="h4">
                TaskList Project
            </Typography>
        </div>
    )
}

export default Header