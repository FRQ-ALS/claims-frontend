import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { Collapse } from '@mui/material';
import Paper from '@mui/material/Paper';
import blue from "@material-ui/core/colors/blue";






const theme = createTheme();

export default function Dashboard() {
  
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [errorText, setText] = useState('')

  const [vin, setVin] = useState('')
  const [insuranceNo, setInsurance] = useState('')

  const [actualVin, setActualVin] = useState('')
  const [actualInsurance, setActualInsurance] = useState('')

  const [claim, setClaim] = useState('')
  const [claimOpen, setClaimOpen] = useState(false)

  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')

  const handleVIN = (e) => {
    setVin(e.target.value)
  }

  const handleInsuranceNo = (e) => {
    setInsurance(e.target.value)
  }

const handleSubmit = (e) => {

  setClaimOpen(false)
  setOpen(false)
  e.preventDefault();
  var submit = {vin, insuranceNo};

  fetch('/claims/make',  {
    credentials: 'include',
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(submit)
  }).then((response) => response.json())
    .then((responseJson) => {
    if(responseJson.claimId == 0 || responseJson.make==null) {
        setText("Invalid VIN or insurance number, please try again!")
        setOpen(true)
    } else {
        setActualVin(responseJson.vin)
        setActualInsurance(responseJson.insuranceNo)
        setClaim(responseJson.claimAmount)
        setMake(responseJson.make)
        setModel(responseJson.model)
        setYear(responseJson.year)
        setClaimOpen(true)
    }
  })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box>
<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={handleVIN}
              margin="normal"
              required
              fullWidth
              id="VIN"
              label="Enter VIN"
              name="VIN"
              autoComplete="VIN"
              autoFocus
            />
            <TextField
              onChange={handleInsuranceNo}
              margin="normal"
              required
              fullWidth
              name="insurance"
              label="Enter Insurance Number"
              type="insurance"
              id="insurance"
              autoComplete="insurance"
            />
            <Grid item xs ={12}>
                <Collapse in={open}>
              <Alert severity="error">
                 <strong>{errorText}</strong>
              </Alert>
              </Collapse>
              </Grid>

              <Grid item xs ={12}>
                <Collapse in={claimOpen}>
              <Alert severity="info" sx={{length:400}}>
                <strong>Your VIN number: {actualVin}</strong><br/>
                <strong>Your insurance number: {actualInsurance}</strong><br/>
                <strong>Car make: {make}</strong><br/>
                <strong>Car model: {model}</strong><br/>
                <strong>Car year: {year}</strong><br/>  
                <br></br>
                <strong>You are entitled to £{claim} in compensation</strong>
                
              </Alert>
              </Collapse>
              </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                MAKE CLAIM
            </Button>
          </Box>
            
            
        </Box>
      </Container>
    </ThemeProvider>
  );
}
