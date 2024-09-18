// src/App.jsx
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AppLayout from './components/templates/AppLayout.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
