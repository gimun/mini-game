// src/contexts/ThemeContext.jsx
import { createContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyle } from '../theme';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 초기 테마 설정 (localStorage 또는 시스템 설정 기준)
  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'true');
    } else {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mediaQuery.matches);
    }

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
      localStorage.setItem('isDarkMode', e.matches);
    };
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleChange);
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleChange);
    };
  }, []);

  // 테마 토글 함수
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('isDarkMode', newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// PropTypes 정의
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
