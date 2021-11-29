import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

import './App.css';
import { Claim } from './components/Claim';
import { Search } from './components/Search';

function App() {
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        backgroundColor: '#ea4630',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BrowserRouter>
        <CssBaseline />
        <Box
          maxWidth="60ch"
          width="calc(100% - 60px)"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Switch>
            <Route path="/" component={Search} />
            <Route path="/claim" component={Claim} />
          </Switch>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
