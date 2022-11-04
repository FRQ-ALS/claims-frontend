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


const theme = createTheme();
export default function Quotes() {
  let navigate = useNavigate();


  const [quotes, setQuoteData] = useState([])


  React.useEffect(() => {
    console.log(quotes)
    
    var userID = localStorage.getItem('userID')

        fetch('quotes/getQuotes/'+userID,  {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"
        },
          }).then((response) => response.json())
          .then(data => setQuoteData(data));
    
    }, [])


  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='quotes'>
      { quotes.map(quote => {
            return(
                <Paper sx={{
                    position:'relative',
                    top:10,
                    width:355,
                    height:200,
                    marginTop:3,
                    backgroundColor: red[400],
                    borderRadius:6
                  }}>
                    <Grid container spacing={0}>

                        <Grid item xs={12}>
                    <Typography
                    sx={{
                        fontWeight:'bold',
                        fontSize:28,
                        color:"white"
                    }}>£{quote.yearlyQuoteValue} one time payment </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{
                                fontWeight:'bold',
                                color:'white'
                            }}>or</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography sx={{
                                fontWeight:'bold',
                                color: red[300],
                                fontSize:20,
                                backgroundColor:'white'
                            }}>Twelve £{quote.monthlyQuoteValue} monthly payments</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography sx={{
                                fontWeight:'bold',
                                color:'white',
                                fontSize:28
                            }}>for {quote.regNumber}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" sx={{
                                backgroundColor:'white',
                                width: 80,
                                height:30,
                                marginTop:1,
                                color: red[900],
                                fontWeight:'bold'
                            }}>REJECT</Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button variant="contained" sx={{
                                backgroundColor:'white',
                                width: 80,
                                height:30,
                                marginTop:1,
                                color: "green",
                                fontWeight:'bold'
                            }}>ACCEPT</Button>
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