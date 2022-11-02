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
import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import Alert from '@mui/material/Alert';
import { Collapse } from '@mui/material';


const theme = createTheme();

export default function SignUp() {


  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [errorText, setText] = useState('')

  function handleError(status) {
    setOpen(status)
  }

  function changeErrorText(text) {
    setText(text)
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retype, setRetype] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');


  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleRetype = (e) => {
    setRetype(e.target.value)
  }
  const handleDay = (e) => {
    setDay(e.target.value)
  }

  const handleMonth = (e) => {
    setMonth(e.target.value)
  }

  const handleYear = (e) => {
    setYear(e.target.value)
  }

  function checkPasword(pass1, pass2) {
    if(pass1 != pass2){
        setOpen(true)
        setText("Your passwords do not match")
        return false;
    }

    if(pass1.length < 8) {
        setOpen(true)
        setText("Your password must be at least 8 characters long")
        return false;
    }

    return true;
 }


  const handleSubmit = (event) => {
    handleError(false)
    event.preventDefault();

    if(checkPasword(password, retype)) {
        var signup = {email, password}
  
        fetch('account/register',  {
          credentials: 'include',
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(signup)
        }).then(response => {
            console.log(response)
            if (response.ok) {
                setOpen(true)
                setText("Your account has been created")
                setTimeout(()=>
                navigate("/login")
                ,2000);
            }

            if(response.statusText =='Bad Request') {
                setOpen(true)
                setText("Email already taken, please use another email!")
            }
      });
    }
 
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required = {true}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required ={true}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required ={true}
                  fullWidth
                  name="retype-password"
                  label="Retype Password"
                  type="password"
                  id="retype-password"
                  autoComplete="new-password"
                  onChange={handleRetype}
                />
              </Grid>
              <Grid item xs ={12}>
                <Collapse in={open}>
              <Alert severity="error">

                 <strong>{errorText}</strong>
              </Alert>
              </Collapse>
              </Grid>
              <Grid item xs ={12}>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item onClick={() => navigate("/")}>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}