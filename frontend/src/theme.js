import { createTheme } from '@mui/material'

const myTheme = createTheme({
    palette: {
        primary: {
            main: '#077088',
            contrastText: '#fff'
        },
        secondary: {
            main: '#f28db2',
            contrastText: '#fff'
        },
        warning : {
            main: '#83e1e5',
            contrastText: '#067089'

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