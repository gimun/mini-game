// src/App.jsx
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import UpdatePage from './pages/UpdatePage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout/>}></Route>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/admin/*" element={<AdminPage />} />
                    <Route path="/update" element={<UpdatePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;