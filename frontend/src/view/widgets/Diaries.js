import DiaryCard from './DiaryCard'
import { Grid } from '@mui/material'

function Diaries() {
    
const diariesList = [
    {
        diary: 'Refeições',
        blocked: true
    },
    {
        diary: 'Emoções',
        blocked: true
    }
]
    return (
        <>
        <Grid container spacing={2}>
            {diariesList.map(function(data, index) {
                return (
                    <Grid item xs={6}  key= {index}>
                        <DiaryCard
                            name = {data.diary}
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

export default Diaries;