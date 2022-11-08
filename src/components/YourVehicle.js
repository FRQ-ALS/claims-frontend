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


const theme = createTheme();
export default function YourVehicle() {
  let navigate = useNavigate();

  const [carData, setCarData] = useState([])
  const [buttonText, setButtonText] = useState("GET A QUOTE")
  const [quoteData, setQuoteData] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [quoteAlertText, setQuoteAlertText] = useState('')
  const [quoteAlertOpen, setQuoteAlertOpen] = useState(false)

  var jwt = localStorage.getItem('jwt')


  function changeButtonText(insurance) {
    if(insurance) {
        setButtonText("MAKE A CLAIM")
    }
    
    if(!insurance) {
        setButtonText("GET A QUOTE")
    }
  }



  const handleGetQuote = (event, insurance) => {

    
    if(insurance==true) {
      console.log("true")
      setAlertOpen(true)
      setAlertText("Your car is already insured")
      return
    }

    var vehicleID = carData.vehicleID
    var userID = carData.userID

    var postBody = {vehicleID, userID}

    fetch('api/v1/quotes/get',  {
      credentials: 'include',
      method: 'POST',
      headers: {"Content-Type": "application/json",
      "Authorization":"Bearer "+jwt+""},
      body: JSON.stringify(postBody)
    }).then((response) => response.json())
    .then(data => setQuoteData(data))
    console.log(quoteData)

    setQuoteAlertOpen(true)
    setQuoteAlertText("Fetching quotes...") 
    
    setTimeout(()=> {
      setAlertOpen(false)
      refreshPage()

    }, 3000)



  }

  function refreshPage(){
    window.location.reload(false)
  }


  React.useEffect(() => {
    
    var userID = localStorage.getItem('userID')

        fetch('api/v1/vehicles/get/'+userID,  {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json",
            "Authorization":"Bearer "+jwt+""
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
        onClick={event=> handleGetQuote(event, carData.insured)}
        >{buttonText}</Button>


        </Box>
      </Paper>

   

            <Collapse in={quoteAlertOpen}>
                  <Alert sx={{
                    position:'inherit',
                    marginTop:4,
                    borderRadius:3
                             }}  
                    severity="info">
                        <strong>{quoteAlertText}</strong>
                   </Alert>

             </Collapse>
             <Collapse in={alertOpen}>
                  <Alert sx={{
                    position:'inherit',
                    marginTop:4,
                    borderRadius:3
                  }} severity="success">
                        <strong>{alertText}</strong>
                    </Alert>

             </Collapse>
    </ThemeProvider>
    </React.Fragment>
  );
}