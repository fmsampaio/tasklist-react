import { Button, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import styles from './TaskForm.module.css'

function TaskForm( {handleSubmit, btnText, taskData, toggleForm} ) {

    const [task, setTask] = useState(taskData || {})
    const [categories, setCategories] = useState([])
    const [description, setDescription] = useState(task.description ? task.description : '')
    const [selectedCategory, setSelectedCategory] = useState(task.category ? task.category.id : '')
    const [selectedDate, setSelectedDate] = useState(task.due_date ? task.due_date : Date.now())

    useEffect( () => {
        fetch('http://localhost:5000/categories', {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        task.completed = false
        if(!task.due_date) {
            task.due_date = Date.now().toString()
        }

        handleSubmit(task)
    }

    function handleOnChange(e) {
        setDescription(e.target.value)
        setTask(
            {
                ...task,
                description : e.target.value
            }
        )
        
    }

    function handleSelectOnChange(e) {
        setSelectedCategory(e.target.value)
        setTask(
            {
                ...task,
                category : e.target.value
            }
        )
    }

    function handleDateOnChange(date) {
        setSelectedDate(date.toString());
        setTask(
            {
                ...task,
                due_date : date.toString()
            }
        )
          
    }

    return (
        <div className={styles.container}>
            <Typography sx={{marginBottom : "0.5em"}} component="h2" variant="h5">
                Task:
            </Typography>
            <form onSubmit={submit}>
                <TextField 
                    label="Task description" 
                    sx={{width : "100%", marginBottom : "0.5em"}} 
                    value={description ? description : ""} 
                    onChange={handleOnChange}
                />
                <InputLabel id="select-category">Category</InputLabel>
                <Select 
                    sx={{width : "300px", marginBottom : "1em"}} 
                    onChange={handleSelectOnChange} 
                    value={selectedCategory} 
                    labelId="select-category" 
                    id="select-category" 
                    label="Category"
                >
                    {categories.map( (cat) => (
                        <MenuItem value={cat.id} key={cat.id}>{cat.name}</MenuItem>        
                    ))}
                </Select>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Basic example"
                        value={selectedDate}
                        inputFormat="dd/MM/yyyy"
                        onChange={handleDateOnChange}
                        renderInput={(params) => <TextField {...params} />}
                        
                    />
                </LocalizationProvider>
                <div className={styles.actions_container}>
                    <Button variant="contained" type="submit" sx={{marginTop : "1em", width: "70px"}} >
                        {btnText}
                    </Button>
                    <Button variant="container" color="secondary" sx={{marginTop : "1em", width: "100px"}} onClick={toggleForm} >
                        Cancelar
                    </Button>
                </div>
            </form>
            
        </div>
    )
}

export default TaskForm