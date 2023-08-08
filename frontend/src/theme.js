import { createTheme, colors } from '@mui/material'

const myTheme = createTheme({
    palette: {
        common: {
            white: '#fff'
        },
        primary: {
            main: '#077088',
        },
        text: {
            primary: '#077088',
            secondary: '#83e0e4',
        }
    }
})

export default myTheme;