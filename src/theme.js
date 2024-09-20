// src/theme.js
import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  colors: {
    background: '#ffffff',
    text: '#0f1035',
    primary: '#2e8b57',
    secondary: '#eab306',
    footerBackground: '#f8f9fa',
    footerText: '#6c757d',
    tabActive: 'rgba(234, 179, 8)',
    tabInactive: '#2e8b57',
    subTabActive: 'rgba(234, 179, 8)',
    subTabInactive: '#607d8b',
    highlight: 'rgba(177, 41, 41, 0.8)', // For HighlightValue
    border: '#ddd', // For table borders
    rowHover: '#f9f9f9', // For row hover effect
    sortActive: '#007bff', // For active sort icons
    sortInactive: '#aaa', // For inactive sort icons
    infoText: '#555', // For InfoContainer
    focus: '#007bff', // For focus border color in inputs
    titleText: '#607d8b', // For StyledTitle
    titleHover: '#455a64', // For StyledTitle hover
    iconColor: '#607d8b', // For CloseButton and StyledIcon
    iconHover: '#455a64', // For CloseButton and StyledIcon hover
    toggleIconColor: '#05486e', // For ToggleButton icons
    toggleIconHover: '#04608e', // For ToggleButton icons hover
    error: '#dc3545', // For ErrorMessage
    modalOverlay: 'rgba(0, 0, 0, 0.5)',
  },
  breakpoints: {
    mobile: '600px',
    tablet: '768px',
    desktop: '1024px',
  },
  spacing: {
    small: '2px',
    medium: '10px',
    large: '24px',
  },
  fonts: {
    primary: "'SUITE_Regular', sans-serif",
    secondary: "'Giants-Inline', sans-serif",
  },
};

export const darkTheme = {
  colors: {
    background: '#121212',
    text: '#ffffff',
    primary: '#2e8b57',
    secondary: '#eab306',
    footerBackground: '#1e1e1e',
    footerText: '#cccccc',
    tabActive: 'rgba(234, 179, 8)',
    tabInactive: '#ffffff',
    subTabActive: 'rgba(234, 179, 8)',
    subTabInactive: '#ffffff',
    highlight: 'rgba(255, 0, 0, 0.8)', // For HighlightValue in dark mode
    border: '#444', // Darker border color for dark mode
    rowHover: '#1e1e1e', // Darker hover color
    sortActive: '#1e90ff', // For active sort icons in dark mode
    sortInactive: '#777', // For inactive sort icons in dark mode
    infoText: '#bbbbbb', // For InfoContainer in dark mode
    focus: '#1e90ff', // For focus border color in inputs in dark mode
    titleText: '#a0a0a0', // For StyledTitle in dark mode
    titleHover: '#c0c0c0', // For StyledTitle hover in dark mode
    iconColor: '#ffffff', // For CloseButton and StyledIcon in dark mode
    iconHover: '#cccccc', // For CloseButton and StyledIcon hover in dark mode
    toggleIconColor: '#a0c4ff', // For ToggleButton icons in dark mode
    toggleIconHover: '#b0d4ff', // For ToggleButton icons hover in dark mode
    error: '#ff6b6b', // For ErrorMessage in dark mode
    modalOverlay: 'rgba(0, 0, 0, 0.7)',
  },
  breakpoints: {
    mobile: '600px',
    tablet: '768px',
    desktop: '1024px',
  },
  spacing: {
    small: '2px',
    medium: '10px',
    large: '24px',
  },
  fonts: {
    primary: "'SUITE_Regular', sans-serif",
    secondary: "'Giants-Inline', sans-serif",
  },
};

// 글로벌 스타일 정의
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
  
`;
