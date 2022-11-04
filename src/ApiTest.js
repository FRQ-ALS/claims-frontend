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

export default function ApiTest() {

    const jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ing0TWpHTHQ4Q0dnSDRDU2NpdHRLZWZqZHc2cyIsImtpZCI6Ing0TWpHTHQ4Q0dnSDRDU2NpdHRLZWZqZHc2cyJ9.eyJhdWQiOiJtaWNyb3NvZnQ6aWRlbnRpdHlzZXJ2ZXI6MTUwOTA5M2MtYmVmZS00MDgyLTgwYmUtOTBiNDljYmFkOGVlIiwiaXNzIjoiaHR0cDovL2Nvbm5lY3QtcWEuamxyc3NvLmNvbS9hZGZzL3NlcnZpY2VzL3RydXN0IiwiaWF0IjoxNjY3NDc2NzA4LCJuYmYiOjE2Njc0NzY3MDgsImV4cCI6MTY2NzQ4MDMwOCwidXNlcm5hbWUiOiJOVlJTXzMiLCJ1bmlxdWVfbmFtZSI6Ik5WUlNfMyIsImdpdmVuX25hbWUiOiJOUlZTIiwiZmFtaWx5X25hbWUiOiJUaHJlZSIsImVtYWlsIjoidGhvbWFzLmhhd2tpbnNAY2FwZ2VtaW5pLmNvbSIsImFwcHR5cGUiOiJDb25maWRlbnRpYWwiLCJhcHBpZCI6IjE1MDkwOTNjLWJlZmUtNDA4Mi04MGJlLTkwYjQ5Y2JhZDhlZSIsImF1dGhtZXRob2QiOiJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YWM6Y2xhc3Nlczp1bnNwZWNpZmllZCIsImF1dGhfdGltZSI6IjIwMjItMTEtMDNUMTE6NTg6MjguNDQwWiIsInZlciI6IjEuMCIsInNjcCI6Im9wZW5pZCJ9.okmCT7CzX89eOkadppe_CeORZERPPRlIZkE091xNrEEZum5mGfitYTbLzIeEfeOAwbTzDaEkSkESNFFdQ7joYGWtmRgNHMCIc10_faZCvxqRo950545TgHSVy1ndAEnqQXkSK6KwffluJoJp0XnVd2JmGbfwnk_YTu6VO_NojkNGYmdLzbC1VTRntK3wWYwYL6fP_tOxCuhkgypZjXeGjEylyWwCu--tUeGG5ZuqmNQaQU_rsXa-oLH5S2wfDaRvb1uyZ0FcyLLGe51pR-XsCFkiv_23QfBkHT7-IA2K0X0SgWHeufYEgiLCDFNAb4tFyBPPITE_8PeXA77l_zeIjw"
    const auth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ing0TWpHTHQ4Q0dnSDRDU2NpdHRLZWZqZHc2cyIsImtpZCI6Ing0TWpHTHQ4Q0dnSDRDU2NpdHRLZWZqZHc2cyJ9.eyJhdWQiOiJtaWNyb3NvZnQ6aWRlbnRpdHlzZXJ2ZXI6MTUwOTA5M2MtYmVmZS00MDgyLTgwYmUtOTBiNDljYmFkOGVlIiwiaXNzIjoiaHR0cDovL2Nvbm5lY3QtcWEuamxyc3NvLmNvbS9hZGZzL3NlcnZpY2VzL3RydXN0IiwiaWF0IjoxNjY3NDc2NzA4LCJuYmYiOjE2Njc0NzY3MDgsImV4cCI6MTY2NzQ4MDMwOCwidXNlcm5hbWUiOiJOVlJTXzMiLCJ1bmlxdWVfbmFtZSI6Ik5WUlNfMyIsImdpdmVuX25hbWUiOiJOUlZTIiwiZmFtaWx5X25hbWUiOiJUaHJlZSIsImVtYWlsIjoidGhvbWFzLmhhd2tpbnNAY2FwZ2VtaW5pLmNvbSIsImFwcHR5cGUiOiJDb25maWRlbnRpYWwiLCJhcHBpZCI6IjE1MDkwOTNjLWJlZmUtNDA4Mi04MGJlLTkwYjQ5Y2JhZDhlZSIsImF1dGhtZXRob2QiOiJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YWM6Y2xhc3Nlczp1bnNwZWNpZmllZCIsImF1dGhfdGltZSI6IjIwMjItMTEtMDNUMTE6NTg6MjguNDQwWiIsInZlciI6IjEuMCIsInNjcCI6Im9wZW5pZCJ9.okmCT7CzX89eOkadppe_CeORZERPPRlIZkE091xNrEEZum5mGfitYTbLzIeEfeOAwbTzDaEkSkESNFFdQ7joYGWtmRgNHMCIc10_faZCvxqRo950545TgHSVy1ndAEnqQXkSK6KwffluJoJp0XnVd2JmGbfwnk_YTu6VO_NojkNGYmdLzbC1VTRntK3wWYwYL6fP_tOxCuhkgypZjXeGjEylyWwCu--tUeGG5ZuqmNQaQU_rsXa-oLH5S2wfDaRvb1uyZ0FcyLLGe51pR-XsCFkiv_23QfBkHT7-IA2K0X0SgWHeufYEgiLCDFNAb4tFyBPPITE_8PeXA77l_zeIjw"

const handleSubmit = (e) => {
  e.preventDefault();

  fetch('https://nvrs-ui-dev.jlr-apps.com/nvrs-registration/v2/registration/getRole',  {
    mode: 'no-cors',
    credentials: 'include',
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "x-jwt-assertion":jwt,
        "Authorization":auth,
    }
  }).then((response) => response.json())
  .catch((response) => console.log(response))

  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Button variant="contained" onClick={handleSubmit}>TEST</Button>
        
      </Container>
    </ThemeProvider>
  );
}

