import styled, { keyframes } from 'styled-components';

interface UploadAreaProps {
  isSuccess?: boolean;
}

interface TabProps {
  active?: boolean;
}

interface ControlButtonProps {
  color?: 'primary' | 'danger' | 'success';
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const PageContainer = styled.div`
  padding: 2rem;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
`;

export const UploadArea = styled.div<UploadAreaProps>`
  background-color: ${({ theme }) => theme.card};
  border: 2px dashed ${({ theme, isSuccess }) => 
    isSuccess ? theme.primary : theme.border};
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
`;

export const FileInput = styled.input`
  display: none;
`;

export const UploadButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => {
      const color = theme.primary;
      return color === '#3b82f6' 
        ? '#2563eb' // darken for blue
        : theme.mode === 'dark' 
          ? '#7c3aed' // darken for purple in dark mode
          : '#4f46e5'; // darken for indigo in light mode
    }};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ProcessButton = styled(UploadButton)`
  min-width: 180px;
  justify-content: center;
`;

export const FileDetails = styled.div`
  width: 100%;
  
  .file-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    
    svg {
      color: ${({ theme }) => theme.primary};
      flex-shrink: 0;
    }
    
    span {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    }

    small {
      color: ${({ theme }) => theme.secondary};
      margin-left: 0.5rem;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

export const ControlButton = styled.button<ControlButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  background-color: ${({ theme, color }) => {
    if (color === 'danger') return theme.mode === 'dark' ? '#ef4444' : '#f87171';
    if (color === 'success') return theme.mode === 'dark' ? '#10b981' : '#22c55e';
    return theme.primary; // Default primary
  }};
  
  color: white;
  
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .spinner {
    animation: ${spin} 1s linear infinite;
  }
`;

export const ValidationMessage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(254, 226, 226, 0.8)'};
  border-radius: 4px;
  margin: 1rem 0;
  
  svg {
    color: ${({ theme }) => theme.mode === 'dark' ? '#ef4444' : '#dc2626'};
    margin-top: 0.25rem;
    flex-shrink: 0;
  }
  
  strong {
    display: block;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.mode === 'dark' ? '#ef4444' : '#dc2626'};
  }
  
  ul {
    margin: 0;
    padding-left: 1.25rem;
    
    li {
      margin-bottom: 0.25rem;
    }
  }
`;

export const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  margin-top: 0.5rem;
  
  svg {
    color: ${({ theme }) => theme.primary};
    
    &.spinner {
      animation: ${spin} 1s linear infinite;
    }
  }
`;

export const PreviewContainer = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 1.5rem 0;
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => 
    theme.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)'};
`;

export const Tab = styled.button<TabProps>`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme, active }) => active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? '600' : '400'};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ theme, active }) => 
      active ? theme.primary : 'transparent'};
    transition: background-color 0.2s;
  }
  
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.primary};
  }
`;

export const TabContent = styled.div`
  padding: 1.5rem;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
  
  th {
    background-color: ${({ theme }) => 
      theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
    };
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
  
  tbody tr:hover {
    background-color: ${({ theme }) => 
      theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
    };
  }
`;

export const NoDataMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.secondary};
  font-style: italic;
`; 