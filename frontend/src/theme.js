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
    },
    components: {
        MuiDateCalendar: {
            styleOverrides: {
                root: {
                 
                    color: '#fff',
                    backgroundColor: '#067089'

                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    backgroundColor: '#fff',
                    borderColor: '#067089',
                    ":hover": {
                        borderColor: '#067089',
                        
                    },
                
            }
        },

    
}}  
});

export default myTheme;