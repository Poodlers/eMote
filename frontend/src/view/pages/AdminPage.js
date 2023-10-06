import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';
import React, {  useState } from 'react';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import PopupEditing from '../widgets/PopupEditing'
import { DownloadState } from '../../models/DownloadState';
import LogoutButton from '../widgets/LogoutButton';

function AdminPage() {
  const repository = RepositorySingleton.getInstance().injectRepository();
   const notAdminMessage = <Typography variant="h5" align="center" color="primary" sx={{marginTop: '20px'}}>
        This page is only accessible to admins.
        </Typography>;
  
  const user = JSON.parse(localStorage.getItem('user'));
  const [downloadState, setDownloadState] = useState(DownloadState.NOT_STARTED);

  const downloadFile = () => {
    setDownloadState(DownloadState.STARTED);
    return repository.downloadExcel().then((response) => {
        console.log(response);
        setDownloadState(DownloadState.FINISHED);
        
    }).catch((error) => {
        console.log(error);
        setDownloadState(DownloadState.ERROR);
        return false;
    });
  }

  return (
    <>
    
    {
        user === null ||
        user.role !== 3 ? 
        notAdminMessage
        :
        <>    

          <AppBar sx ={{boxShadow: 'none', top:0, height: 60 }} >
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Página de admnistrador
              </Typography>
              <LogoutButton/>
            </Toolbar>
          </AppBar>
          <Box sx={{mt:'60px', mb:'70px'}}>
            <Box sx ={{ p:3 }} textAlign='center'>
              <Button sx = {{justifyContent:'center'}} variant="contained" onClick={downloadFile}>Download Excel</Button>
            </Box>
            <Typography variant="h5" align="center" color="primary" sx={{marginTop: '20px'}}>
              {downloadState === DownloadState.STARTED ? 'Downloading...' : 
              downloadState === DownloadState.FINISHED ? 'Download finished!' :
              downloadState === DownloadState.ERROR ? 'Error downloading file. Check your internet connectivity' : ''}
            </Typography>
            <PopupEditing />

          </Box>
        </> 

    }
    </>

    
  );
}

export default AdminPage;
