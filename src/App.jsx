// src/App.jsx
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import AppLayout2 from './layout/AppLayout2';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout/>}></Route>
                <Route path="/test" element={<AppLayout2/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
