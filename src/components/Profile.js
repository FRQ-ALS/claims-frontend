import * as React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Paper from  '@mui/material/Paper';
import { blue } from 'material-ui/colors';
import Typography from '@mui/material/Typography';
import carImage from './car-2901.png';
import carImage2 from './car-26-512.png'
import { useEffect } from 'react';
import { useState } from 'react';
import { Box } from '@material-ui/core';
import { Alert } from '@mui/material';
import {Collapse} from '@mui/material';
import {Grid} from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';


const theme = createTheme();
export default function Profile() {
  let navigate = useNavigate();

  const[userProfile, setUserProfile] = useState([])

  var jwt = localStorage.getItem('jwt')

  const handleGetQuote = (e) => {

    fetch('api/v1/quotes/get',  {
      credentials: 'include',
      method: 'POST',
      headers: {"Content-Type": "application/json",
      "Authorization":"Bearer "+jwt+""},
      body: JSON.stringify()
    })

  }

  function refreshPage(){
    window.location.reload(false)
  }


  React.useEffect(() => {
    
    var userID = localStorage.getItem('userID')

        fetch('api/v1/account/getProfile/'+userID,  {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json",
            "Authorization":"Bearer "+jwt+""
        },
          }).then((response)=> response.json())
          .then((responseJson) => {
            setUserProfile(responseJson)
          })
    
    },[])



  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <AssignmentIndIcon sx={{
            fontSize:150,
            color:blue[700]
        }}></AssignmentIndIcon>
        </Grid>
        <Grid ittem xs={12}>
            <Typography
                sx={{
                    fontSize:24,
                    fontWeight:'bold'
                }} 
            >{userProfile.fullName}</Typography>
        </Grid>

        <Grid ittem xs={12}>
            <Typography
                sx={{
                    fontSize:24,
                    fontWeight:'bold'
                }} 
            >{userProfile.age} years old</Typography>
        </Grid>

        <Grid ittem xs={12}>
            <Typography
                sx={{
                    fontSize:24,
                    fontWeight:'bold'
                }} 
            >{userProfile.regNumber}</Typography>
        </Grid>

        <Grid ittem xs={12}>
            <Typography
                sx={{
                    fontSize:24,
                    fontWeight:'bold'
                }} 
            >{userProfile.carYear} {userProfile.carMake}</Typography>
        </Grid>

      </Grid>

            

    
    </ThemeProvider>
    </React.Fragment>
  );
}