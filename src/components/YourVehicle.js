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


const theme = createTheme();
export default function YourVehicle() {
  let navigate = useNavigate();

  const [carData, setCarData] = useState([])
  const [buttonText, setButtonText] = useState("GET A QUOTE")
  const [quoteData, setQuoteData] = useState([])


  function changeButtonText(insurance) {
    if(insurance) {
        setButtonText("MAKE A CLAIM")
    }
    
    if(!insurance) {
        setButtonText("GET A QUOTE")
    }
  }


  function makeClaim() {

  }

  function getQuote() {

    var vehicleID = carData.vehicleID
    var userID = carData.userID

    var postBody = {vehicleID, userID}

    fetch('quotes/get',  {
      credentials: 'include',
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(postBody)
    }).then((response) => response.json())
    .then(data => setQuoteData(data))

    console.log(quoteData)
  }


  React.useEffect(() => {
    
    var userID = localStorage.getItem('userID')

        fetch('vehicles/get/'+userID,  {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"
        },
          }).then((response) => response.json())
          .then(data => setCarData(data));
    
    }, [])



  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper sx={{
        position:'relative',
        top:10,
        width:355,
        height:200,
        backgroundColor: blue[700],
        borderRadius:6
      }}>
        <img src={carImage2} style={{
          position:'inherit',
          top:-30,
          maxHeight:'150px',
          maxWidth:'150px',
          aspectRatio:1,
          tintColor:"white"

        }}></img>

        <Box style={{
            position:'inherit',
            top:-80,
        }}>
        <Typography sx={{
            fontWeight:'bold',
            color:blue[700],
            backgroundColor:"white"
        }}>{carData.registrationNumber}</Typography>

         <Typography sx={{
            fontWeight:'bold',
            color:'white'
        }}>{carData.make}</Typography>

<Typography sx={{
            position:'inherit',
            fontWeight:'bold',
            color:blue[700],
            backgroundColor:"white"
        }}>{carData.fuelType}</Typography>


<Typography sx={{
            fontWeight:'bold',
            color:'white'
        }}>{carData.yearOfManufacture}</Typography>

        <Button variant='contained' style={{
            borderRadius:10,
            fontWeight:'bold',
            backgroundColor: blue[400]
        }}
        onClick={event=> {
            if(carData.isInsured){
                 makeClaim()
            }
            if(!carData.isInsured) {
                getQuote()
            }
        }}
        >{buttonText}</Button>
        </Box>


      </Paper>
      
    </ThemeProvider>
    </React.Fragment>
  );
}