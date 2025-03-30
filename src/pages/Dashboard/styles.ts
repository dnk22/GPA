import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 2rem;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
`;

export const SearchBar = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  max-width: 600px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px 0 0 4px;
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.mode === 'dark' ? '#2d3748' : 'white'};
  color: ${({ theme }) => theme.text};
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const SearchButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => {
      const color = theme.primary;
      return color === '#3b82f6' 
        ? '#2563eb' // darken for blue
        : theme.mode === 'dark' 
          ? '#7c3aed' // darken for purple in dark mode
          : '#4f46e5'; // darken for indigo in light mode
    }};
  }
`;

export const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
  margin-bottom: 1.5rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
  
  th {
    background-color: ${({ theme }) => 
      theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
    };
    font-weight: 600;
  }
  
  tbody tr:hover {
    background-color: ${({ theme }) => 
      theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
    };
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  
  span {
    color: ${({ theme }) => theme.text};
  }
`;

export const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.mode === 'dark' ? '#2d3748' : '#f3f4f6'};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.mode === 'dark' ? '#4a5568' : '#e5e7eb'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 