import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  max-width: 600px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.mode === 'dark' ? '#2d3748' : 'white'};
  color: ${({ theme }) => theme.text};
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    border-radius: 4px;
    font-size: 1rem;
    padding: 0.875rem;
  }
`;

export const SearchButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  margin-left: 0.5rem;
  
  &:hover {
    background-color: ${({ theme }) => {
      const color = theme.primary;
      return color === '#3b82f6' 
        ? '#2563eb'
        : theme.mode === 'dark' 
          ? '#7c3aed'
          : '#4f46e5';
    }};
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

export const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    border-radius: 4px;
    margin: -0.5rem;
    width: calc(100% + 1rem);
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    
    @media (max-width: 768px) {
      padding: 0.75rem;
      font-size: 0.875rem;
      
      &:not(:first-child) {
        display: none;
      }
    }
  }
  
  th {
    background-color: ${({ theme }) => 
      theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
    };
    font-weight: 600;
    white-space: nowrap;
  }
  
  tbody tr:hover {
    background-color: ${({ theme }) => 
      theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
    };
  }
  
  @media (max-width: 768px) {
    td:first-child {
      font-weight: 500;
    }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.card};
  border-radius: 8px;
  text-align: center;

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.secondary};
    opacity: 0.5;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.secondary};
    max-width: 400px;
    margin: 0 auto;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    margin-bottom: 1rem;
    border: 3px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 50%;
    border-top-color: ${({ theme }) => theme.primary};
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    
    svg {
      width: 48px;
      height: 48px;
    }

    h3 {
      font-size: 1.125rem;
    }

    p {
      font-size: 0.875rem;
    }

    .loading-spinner {
      width: 32px;
      height: 32px;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    
    span {
      width: 100%;
      text-align: center;
      order: -1;
      margin-bottom: 0.5rem;
    }
  }
  
  span {
    color: ${({ theme }) => theme.text};
    font-size: 0.875rem;
  }
`;

export const PaginationButton = styled.button`
  padding: 0.625rem 1rem;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.mode === 'dark' ? '#4a5568' : '#f3f4f6'};
    border-color: ${({ theme }) => theme.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    min-width: unset;
    flex: 1;
    font-size: 0.875rem;
  }
`;