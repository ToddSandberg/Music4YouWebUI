import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App';
import InfoPage from './InfoPage';
import ListConfiguration from './listConfigurations/ListConfiguration';

const Routing = () => {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="/info" element={<InfoPage />}/>
                <Route exact path="/listConfiguration" element={<ListConfiguration />}/>
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