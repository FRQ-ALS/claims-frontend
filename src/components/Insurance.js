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
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import {green} from '@mui/material/colors';
import Alert from '@mui/material/Alert';
import { Collapse } from '@mui/material';


const theme = createTheme();
export default function Insurance() {
  let navigate = useNavigate();
  const [insurances, setInsurances] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')

  var jwt = localStorage.getItem('jwt')

  React.useEffect (() => {
    
    var userID = localStorage.getItem('userID')
    
    

        fetch('api/v1/insurance/getInsurance/'+userID,  {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json",
            "Authorization":"Bearer "+jwt+""
        },
          }).then((response) => response.json())
          .then(data => setInsurances(data));
    }, [])


    const handleClaimSubmit = (event, insuranceID, vehicleID) => {

        var userID = localStorage.getItem('userID')

        var body = {userID, insuranceID, vehicleID}


        fetch('api/v1/insurance/makeclaim/',  {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-Type": "application/json",
          "Authorization":"Bearer "+jwt+""},
            body: JSON.stringify(body)
          }).then((response) => response.json())
          .then((responseJson) => {
            setAlertOpen(true)
            setAlertText("You are entitled to £"+responseJson.claimAmount+" in claim compensation")
          });
        
    }


  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='insurances'>
      { insurances.map(insurance => {
            return(
                <Paper sx={{
                    position:'relative',
                    top:10,
                    width:355,
                    height:200,
                    marginTop:3,
                    backgroundColor: green[400],
                    borderRadius:6
                  }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                fontWeight:'bold',
                                fontSize:24,
                                color:"white"
                                }}>Insurance number: {insurance.insuranceID}
                                </Typography>
                        </Grid>


                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                fontWeight:'bold',
                                fontSize:24,
                                color:"white"
                                }}>{insurance.regNumber}
                                </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                fontWeight:'bold',
                                fontSize:24,
                                color:"white"
                                }}>{insurance.insuranceExpiry}
                                </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" 
                                onClick={event => handleClaimSubmit(event, insurance.insuranceID, 
                                    insurance.vehicleID)}
                                sx={{
                                backgroundColor:'white',
                                width: 150,
                                height:40,
                                marginTop:8,
                                color: green[900],
                                fontWeight:'bold',
                                borderRadius:4
                            }}>MAKE A CLAIM</Button>
                        </Grid>

                        <Grid item xs ={12}>
                            <Collapse in={alertOpen}>
                                <Alert severity="success">
                                    <strong>{alertText}</strong>
                                </Alert>

                            </Collapse>
                         </Grid>
                    

                    </Grid>
                  </Paper>
            )
        })}
        </div> 

    </ThemeProvider>
    </React.Fragment>
  );
}