// src/App.jsx
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AppLayout from './components/templates/AppLayout.jsx';
import AppLayout2 from './components/templates/AppLayout2.jsx';

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
