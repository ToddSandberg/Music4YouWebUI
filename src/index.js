import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App';
import InfoPage from './InfoPage';
import ListConfiguration from './listConfigurations/ListConfiguration';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const useStyles = makeStyles((theme) => {
    root: {
      // some CSS that accesses the theme
    }
  });

const Routing = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<App />} />
                        <Route exact path="/list" element={<App />} />
                        <Route exact path="/info" element={<InfoPage />}/>
                        <Route exact path="/listConfiguration" element={<ListConfiguration />}/>
                    </Routes>
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Routing />
    </React.StrictMode>,
    document.getElementById('root')
);