import { Container } from "@mui/material"
import Header from "./layout/Header"

function MainPage() {

    function handleNewTaskButton() {
        //toggle new task form
        console.log("TODO toggle new task form")
    }

    return (
        <Container maxWidth="md">
            <Header handleNewTaskButton={handleNewTaskButton} />
        </Container>
    )
}

export default MainPage