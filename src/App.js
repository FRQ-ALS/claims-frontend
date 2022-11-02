import React, { Component }  from 'react';
// import SignUp from "./components/signup/SignUp";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Login from "./Login";  
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Appbar from './Appbar';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

const themeLight = createTheme({
  palette: {
    background: {
      default: "#1976d2",

    }
  },
});

function App() {
  return (
    <div className="App">
      <Router>
        <Appbar/>
        <ThemeProvider theme={themeLight}>
          <CssBaseline />
          <Routes>
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
