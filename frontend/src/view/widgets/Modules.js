import React from 'react';
import { useEffect, useState } from 'react';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import ModuleCard from './ModuleCard'
import { Grid, Typography } from '@mui/material'
import { ComponentState } from '../../models/ComponentState';

function Modules(props) {
    const modulesList = props.modulesList;
   
    return (
        <>
            
            <Grid container spacing={2}>
                
                {modulesList.map(function(data, index) {
                    console.log(data);
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