import { Button, Grid, Typography } from '@mui/material';
import React, {  useState } from 'react';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import PopupEditing from '../widgets/PopupEditing'
import { DownloadState } from '../../models/DownloadState';

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
    document.body.style = 'background: #fffefe',
    <Grid paddingX={10}  container  direction="column" justifyContent="center"  >
    {
        user === null ||
        user.role !== 3 ? 
        notAdminMessage
        :
        <>
          <Typography variant="h2" align="center" color="primary" sx={{marginTop: '20px'}}>
            Página de admnistrador
          </Typography>
          <Button sx = {{marginY : '20px'}} variant="contained" onClick={downloadFile}>Download Excel</Button>
          <Typography variant="h5" align="center" color="primary" sx={{marginTop: '20px'}}>
            {downloadState === DownloadState.STARTED ? 'Downloading...' : 
            downloadState === DownloadState.FINISHED ? 'Download finished!' :
            downloadState === DownloadState.ERROR ? 'Error downloading file. Check your internet connectivity' : ''}
          </Typography>
          <PopupEditing />
          

        </> 

    }

    </Grid>
  );
}

export default AdminPage;
