import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'


function EpisodesChart(props) {
    const episodesData = props.episodesData;

    const [userData,  ] = useState({
        labels: episodesData.map((data) => data.date),
        datasets: [{
            label:"Número de episódios",
            data: episodesData.map((data) => data.episodes),
            backgroundColor: 'rgba(7,112,136,255)'
        }]
    });

    return(
        <>  
            <Typography sx={{ fontWeight: 'bold', fontSize: 12, m: '0 auto', width:'70%', mt:'10px' }} 
            variant="h6" align='center' color="primary">
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