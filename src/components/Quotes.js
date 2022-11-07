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
import { Collapse } from '@mui/material';
import {Accordion} from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Dialog} from '@mui/material';
import {DialogActions} from '@mui/material';
import {DialogContent} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';


const theme = createTheme();
export default function Quotes() {
  let navigate = useNavigate();
  


  const [quotes, setQuoteData] = useState([])
  const [dateString, setDate] = useState('')
  const [paymentType, setPaymentType] = useState('')
  const [submitOpen, setSubmitOpen] = useState(false)
  const [quoteID, setQuoteID] = useState('')


  const handleMonthly = (event, quoteID) => {
    setPaymentType("monthly")
    setQuoteID(quoteID)
    setSubmitOpen(true)

  }

  const handleAnnually = (event, quoteID) => {
    setQuoteID(quoteID)
    setPaymentType("annually")
    setSubmitOpen(true)
  }

  const handleSubmit = (e) => {

    var userID = localStorage.getItem("userID")

    var quoteResponse = {quoteID, userID, paymentType}

    fetch('/quotes/quoteResponse',  {
        credentials: 'include',
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(quoteResponse)
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.message)
      })

  }

  const handleSubmitClose = (e) => {
    setSubmitOpen(false)
  }


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

    }
    , [])


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
                        fontSize:24,
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

                        <Grid item xs={12}>
                            <Typography sx={{
                                fontWeight:'bold',
                                color:'white',
                                fontSize:15,
                            }}>Expires : {quote.quoteExpiry}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Button variant="contained" onClick={event => handleMonthly(event, quote.quoteID)} sx={{
                                backgroundColor:'white',
                                width: 150,
                                height:40,
                                marginTop:3,
                                color: red[900],
                                fontWeight:'bold',
                                borderRadius:4
                            }}>PAY MONTHLY</Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button variant="contained" onClick={event => handleAnnually(event, quote.quoteID)}sx={{
                                backgroundColor:'white',
                                width: 150,
                                height:40,
                                marginTop:3,
                                color: red[900],
                                fontWeight:'bold',
                                borderRadius:4
                            }}>PAY ANNUALLY</Button>
                        </Grid>

                    </Grid>
                  </Paper>
            )
        })}
        </div>

        <Dialog open={submitOpen} onClose={handleSubmitClose}>
                    <DialogTitle>Are you sure you want to pay {paymentType}?</DialogTitle>
                        <DialogActions>
                        <Button variant='contained' onClick={handleSubmitClose}>Cancel</Button>
                        <Button variant='contained'onClick={handleSubmit}>Submit</Button>
                        </DialogActions>
                  </Dialog>
    </ThemeProvider>
    </React.Fragment>
  );
}