import React from 'react';
import ModuleCard from './ModuleCard'
import { Grid } from '@mui/material'

function Modules(props) {
    const modulesList = props.modulesList;
   
    return (
        <>
            
            <Grid container spacing={2}>
                
                {modulesList.map(function(data, index) {
                    
                    return (
                        <Grid item xs={6} key={index}>
                            <ModuleCard
                                name = {data.moduloTitle}
                                blocked = {data.isBlocked}
                                index = {index}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        
    </>);
}

export default Modules;