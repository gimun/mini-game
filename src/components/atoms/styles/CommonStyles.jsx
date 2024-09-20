// src/components/atoms/styles/CommonStyles.jsx
import styled from 'styled-components';
import { media } from './media.js'; // Adjust the import path if necessary

// Container styling with flex layout and margins
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box; /* Ensure padding and border are included in the width */
`;

// Wrapper for table to ensure full-width behavior
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto; /* Handle overflow if table is too wide */
`;

// Highlighted value with theme-based color
export const HighlightValue = styled.span`
  color: ${({ theme }) =>
    theme.colors.highlight}; // Define 'highlight' in theme
  font-weight: bold;
`;

// Table styling
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse; /* Prevent borders from overlapping */
`;

// Table header styling
export const TableHeader = styled.th`
  font-family: ${({ theme }) => theme.fonts.primary}; // Use theme font
  font-size: clamp(12px, 1.5vw, 16px); /* Responsive font size */
  cursor: pointer;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  flex: ${({ $flex }) => $flex || '1'};

  &:last-child {
    border-right: none; /* Remove right border for last column */
  }

  ${media.mobile`
    padding: 8px;
    font-size: clamp(12px, 1.5vw, 16px);
  `}
`;

// Table data cell styling
export const TableData = styled.td`
  font-family: ${({ theme }) => theme.fonts.primary}; // Use theme font
  font-size: clamp(12px, 1.5vw, 16px); /* Responsive font size */
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  text-align: ${({ $align }) => $align || 'left'};

  &:last-child {
    border-right: none; /* Remove right border for last column */
  }

  ${media.mobile`
    padding: 8px;
    font-size: clamp(12px, 1.5vw, 16px);
  `}
`;

// Row styling with hover effect considering theme
export const TableRow = styled.tr`
  background-color: ${({ theme }) => theme.colors.background};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.rowHover};
  }

  ${media.mobile`
    &:hover {
      background-color: ${({ theme }) => theme.colors.rowHover};
    }
  `}
`;

// Sort icon styling
export const SortIcon = styled.span`
  margin-left: 5px;
  font-size: ${({ $active }) => ($active ? '14px' : '10px')};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.sortActive : theme.colors.sortInactive};
  opacity: ${({ $active }) => ($active ? '1' : '0.5')};
  transition:
    font-size 0.3s,
    color 0.3s,
    opacity 0.3s;
`;

// Search container styling
export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  margin-right: 10px;
  flex-wrap: wrap; /* Allow wrapping on mobile */

  ${media.mobile`
    margin-bottom: 10px;
    margin-right: 0;
  `}
`;

// Info container styling with theme-based color
export const InfoContainer = styled.div`
  margin-left: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.infoText};

  ${media.mobile`
    margin-left: 5px;
    font-size: 12px;
  `}
`;

// Search input styling
export const SearchInput = styled.input`
  width: 40%; /* Adjust width */
  max-width: 250px; /* Limit maximum width */
  padding: 6px 8px; /* Reduce padding */
  border: 1px solid ${({ theme }) => theme.colors.border}; /* Use theme border color */
  border-radius: 4px; /* Rounded corners */
  font-size: clamp(12px, 2vw, 14px); /* Responsive font size */
  box-sizing: border-box; /* Include padding in width */

  /* Focus styles */
  &:focus {
    border-color: ${({ theme }) => theme.colors.focus};
    outline: none;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5); /* Optional: can also use theme colors */
  }

  ${media.mobile`
    width: 100%; /* Full width on mobile */
    font-size: 16px; /* Ensure font size is adequate */
    padding: 6px; /* Maintain padding */
  `}
`;
