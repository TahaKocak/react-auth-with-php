import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";

// Routes
import Navbar from './components/Navbar'
import Homepage from './routes/Homepage'
import Login from './routes/Login'
import Register from './routes/Register'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

