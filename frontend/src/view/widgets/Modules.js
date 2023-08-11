import ModuleCard from './ModuleCard'
import { Grid } from '@mui/material'

function Modules() {

const modulesList = [
    {
        module: 'Psicoeducação',
        blocked: false
    },
    {
        module: 'Mindfulness',
        blocked: true
    },
    {
        module: 'Regulação Emocional',
        blocked: true
    },
    {
        module: 'Tolerância a estados emocionais dolorosos',
        blocked: true
    },
];
    return (
        <>
        <Grid container spacing={2}>
            {modulesList.map(function(data, index) {
                return (
                    <Grid item xs={6} key= {index}>
                        <ModuleCard
                            name = {data.module}
                            blocked = {data.blocked}
                            index = {index}
                        />
                    </Grid>
                )
            })}
        </Grid>
        </>
    )
}

export default Modules;