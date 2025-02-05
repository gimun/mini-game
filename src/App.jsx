// src/App.jsx
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from './components/templates/AppLayout.jsx';
import AppLayoutHidden from './components/templates/AppLayoutHidden.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route path="/hidden" element={<AppLayoutHidden />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
