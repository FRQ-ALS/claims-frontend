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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { Collapse } from '@mui/material';




const theme = createTheme();

export default function SignIn() {
  
  let navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [open, setOpen] = useState(false);
  const [errorText, setText] = useState('')

  function handleError(status) {
    setOpen(status)
  }

  function changeErrorText(text) {
    setText(text)
  }
  

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

 

  
const handleSubmit = (e) => {
  e.preventDefault();
  setOpen(false)
  const login = {email, password};

  fetch('/account/login',  {
    credentials: 'include',
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(login)
  }).then((response) => response.json())
  .then((responseJson) => {
    if(responseJson.userID== undefined) {
      setOpen(true)
      setText("Incorrect email or password, try again")
      return
    }
    localStorage.setItem('userID', responseJson.userID)
    if(responseJson.carRegistered==true) {
      navigate("/dashboard")
    }

    if(responseJson.carRegistered==false) {
      navigate("/registerCar")
    }
    
    
  })
};

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
          <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
            <LockOutlinedIcon style={{ color: 'white' }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={handleEmail}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handlePassword}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid item xs ={12}>
                <Collapse in={open}>
              <Alert severity="error">

                 <strong>{errorText}</strong>
              </Alert>
              </Collapse>
              </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid style={{justifyContent:'center'}} container>
              <Grid item onClick={() => navigate("/SignUp")}>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
