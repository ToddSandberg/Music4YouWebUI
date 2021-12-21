import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App';
import InfoPage from './InfoPage';

const Routing = () => {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="/info" element={<InfoPage />}/>
            </Routes>
        </Router>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Routing />
    </React.StrictMode>,
    document.getElementById('root')
);