import React, { useState } from 'react';
  import { Bar } from 'react-chartjs-2';
  import {Chart as ChartJS} from 'chart.js/auto';
import { Typography } from '@mui/material';

  const mockData = [
    {
        day: 'Dom.',
        episodes: 3
    },
    {
        day: 'Seg.',
        episodes: 0
    },
    {
        day: 'Ter.',
        episodes: 2
    },
    {
        day: 'Qua.',
        episodes: 0
    },
    {
        day: 'Qui.',
        episodes: 0
    },
    {
        day: 'Sex.',
        episodes: 1
    },
    {
        day: 'Sáb.',
        episodes: 0
    }

];

function EpisodesChart() {

    const [userData, setUserData] = useState({
        labels: mockData.map((data) => data.day),
        datasets: [{
            label:"Número de episódios",
            data: mockData.map((data) => data.episodes),
            backgroundColor: 'rgba(7,112,136,255)'
        }]
    })
    return(
        <>  
            <Typography sx={{ fontWeight: 'bold', fontSize: 12, m: '0 auto', width:'70%', mt:'10px' }} variant="h6" align='center' color="primary">
                Número de episódios de ingestão alimentar compulsiva nos últimos 7 dias
            </Typography>
            <Bar data={userData} options={{
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scale: {
                    ticks: {
                    precision: 0
                  }
                }
            }} />
        </>
        
    ) 
  }


  export default EpisodesChart;