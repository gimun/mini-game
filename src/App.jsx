// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserManager from './pages/UserManager.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserManager />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;