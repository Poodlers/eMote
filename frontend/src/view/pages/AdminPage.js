import { Button, Grid, Typography } from '@mui/material';
import React, {  useState } from 'react';
import { RepositoryInjector } from '../../repository/RepositoryInjector';
import PopupEditing from '../widgets/PopupEditing'
import { DownloadState } from '../../models/DownloadState';

function AdminPage() {
   const repository = new RepositoryInjector().injectRepository();
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
    <Grid paddingX={10} container  direction="column" justifyContent="center"  >
    {
        user === null ||
        user.role !== 3 ? 
        notAdminMessage
        :
        <>
          <PopupEditing />
          <Button variant="contained" onClick={downloadFile}>Download</Button>
          <Typography variant="h5" align="center" color="primary" sx={{marginTop: '20px'}}>
            {downloadState === DownloadState.STARTED ? 'Downloading...' : 
            downloadState === DownloadState.FINISHED ? 'Download finished!' :
            downloadState === DownloadState.ERROR ? 'Error downloading file. Check your internet connectivity' : ''}
          </Typography>

        </> 

    }

    </Grid>
  );
}

export default AdminPage;
