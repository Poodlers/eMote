import DiaryCard from './DiaryCard'
import { Grid } from '@mui/material'

const Diaries = (props) => {
    
const diaries = {
    Refeições: true, 
    Emoções: true,
}
    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <DiaryCard
                    name = 'Refeições'
                    blocked = {diaries.Refeições}
                />
            </Grid>
            <Grid item xs={6}>
                <DiaryCard
                    name = 'Emoções'
                    blocked = {diaries.Emoções}
                    />
            </Grid>

        </Grid>
        
        </>
    )
}

export default Diaries;