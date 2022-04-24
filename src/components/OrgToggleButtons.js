import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react';
import styles from './OrgToggleButtons.module.css'

function OrgToggleButtons( {initOrg, handleCompletedOrg, handleStarredOrg, handleDateOrg} ) {

    const [org, setOrg] = useState(initOrg);

    const toggleButtons = [
        <ToggleButton value="completed" key="completed">
            Completed          
        </ToggleButton>,
        <ToggleButton value="starred" key="starred">
            Starred            
        </ToggleButton>,
        <ToggleButton value="date" key="date">
            Date            
        </ToggleButton>
    ]

    const handleChange = (e, org) => {
        setOrg(org)
        if(org === "completed" && handleCompletedOrg) {
            handleCompletedOrg()
        }
        else if(org === "starred" && handleStarredOrg) {
            handleStarredOrg()
        }
        else if(org === "date" && handleDateOrg) {
            handleDateOrg()
        }
    }   

    const control = {
        color : "primary",
        value : org,
        onChange : handleChange,
        exclusive : true
    }

    return (
        <div className={styles.filter_buttons}>
            <ToggleButtonGroup size="small" {...control} color="primary">
                {toggleButtons}
            </ToggleButtonGroup>
        </div>
    )
}

export default OrgToggleButtons