import React, { createContext, useEffect, useState } from 'react';
import './App.css';

import { ThemeProvider } from '@mui/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Home, Layout } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  CssBaseline
} from '@mui/material';
import {
  createStyles, makeStyles
} from '@mui/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter_Regular'
  }
});

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      minHeight: '100vh',
      backgroundColor: 'black',
    }
  })
);

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
