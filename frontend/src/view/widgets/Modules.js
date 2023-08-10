import ModuleCard from './ModuleCard'
import { Grid } from '@mui/material'

const Modules = (props) => {
    
const modules = {
    Psicoeducação: false, 
    Mindfulness: true,
    RegulaçãoEmocional: true,
    Tolerância: true
}
    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <ModuleCard
                    name = 'Psicoeducação'
                    blocked = {modules.Psicoeducação}
                    index = {1}
                />
            </Grid>
            <Grid item xs={6}>
                <ModuleCard
                    name = 'Mindfulness'
                    blocked = {modules.Mindfulness}
                    index = {2}/>
            </Grid>
            <Grid item xs={6}>
                <ModuleCard
                name = 'Regulação Emocional'
                blocked = {modules.RegulaçãoEmocional}
                index = {3}
                />
            </Grid>
            <Grid item xs={6}>
                <ModuleCard
                    name = 'Tolerância a estados emocionais dolorosos'
                    blocked = {modules.Tolerância}
                    index = {4}/>
            </Grid>
        </Grid>
        
        </>
    )
}

export default Modules;