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
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import Alert from '@mui/material/Alert';
import { Collapse } from '@mui/material';
import { blue } from '@mui/material/colors';

const theme = createTheme();
export default function YourVehicle() {
  let navigate = useNavigate();

  const [registrationNumber, setReg] = useState('')
  const [vinNumber, setVIN] = useState('')
  const [mileage, setMileage] = useState('')
  const [estimatedValue, setEstimated] = useState('')
  const [errorText, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [alertSeverity, setSeverity] = useState('')

  const handleSubmit = (e) => {

    e.preventDefault()
    setOpen(false)

    
    var userID = localStorage.getItem('userID')

    var register = {userID, registrationNumber, vinNumber, mileage, estimatedValue}

    var jwt = localStorage.getItem('jwt')


    fetch('api/v1/vehicles/register',  {
      credentials: 'include',
      method: 'POST',
      headers: {"Content-Type": "application/json",
      "Authorization":"Bearer "+jwt+""},
      body: JSON.stringify(register)
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.actionPerformed==false) {
        setSeverity("error")
        setText(responseJson.message)
        setOpen(true)
      }
      if(responseJson.actionPerformed==true) {
        setSeverity("success")
        setText("Your car has been found! Transferring you to the dashboard...")
        setOpen(true)

        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      }
    })


    }
  
  const handleReg = (e) => {
    setReg(e.target.value)
  }

  const handleVIN = (e) => {
    setVIN(e.target.value)
  }

  const handleMileage = (e) => {
    setMileage(e.target.value)
  }

  const handleEstimated = (e) => {
    setEstimated(e.target.value)
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5" sx={{
            fontWeight: 'bold',
            color:blue[600]
          }}>
            Register your car...
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required = {true}
                  fullWidth
                  id="regNumber"
                  label="Registration Number"
                  name="regNumber"
                  autoComplete="regNumber"
                  onChange={handleReg}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required ={true}
                  fullWidth
                  name="vinNumber"
                  label="VIN NUMBER"
                  id="vinNumber"
                  autoComplete="vinNumber"
                  onChange={handleVIN}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required ={true}
                  fullWidth
                  name="mileage"
                  label="Mileage"
                  type="mileage"
                  id="mileage"
                  autoComplete="mileage"
                  onChange={handleMileage}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required ={true}
                  fullWidth
                  name="estimatedValue"
                  label="Estimated Value"
                  type="estimatedValue"
                  id="estimatedValue"
                  autoComplete="mileage"
                  onChange={handleEstimated}
                />
              </Grid>
              <Grid item xs ={12}>
                <Collapse in={open}>
              <Alert severity={alertSeverity}>
                 <strong>{errorText}</strong>
              </Alert>
              </Collapse>
              </Grid>
              <Grid item xs ={12}>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              REGISTER CAR
            </Button>
          </Box>
        </Box>
        </Container>
    </ThemeProvider>
  );
}
