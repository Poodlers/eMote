import { createTheme } from '@mui/material'

const myTheme = createTheme({
    palette: {
        primary: {
            main: '#077088',
            contrastText: '#fff'
        },
        secondary: {
            main: '#ec6fa7',
            contrastText: '#fff'
        },
        success: {
            main: '#ec6fa7'
        },
        info: {
            main: '#fff'
        },
        text: {
            primary: '#fff',
            secondary: '#75c1d7',
        }
    }
})

export default myTheme;