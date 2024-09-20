// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/templates/AppLayout.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
