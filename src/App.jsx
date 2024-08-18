// src/App.jsx
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import AppLayout from './layout/AppLayout';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AppLayout/>}></Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
