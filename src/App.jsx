// src/App.jsx
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layout/AppLayout.jsx';
import UserManager from './pages/UserManager.jsx';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<UserManager/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;