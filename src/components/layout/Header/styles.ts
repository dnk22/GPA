import styled from 'styled-components';

export const HeaderContainer = styled.header`
  height: 64px;
  background-color: ${({ theme }) => theme.header};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: all 0.2s ease-in-out;
`;

export const HeaderTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const ThemeToggle = styled.div`
  width: 56px;
  height: 28px;
  background-color: ${({ theme }) => theme.mode === 'dark' ? '#5c6bc0' : '#e0e0e0'};
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.mode === 'dark' ? '0 0 5px rgba(92, 107, 192, 0.3)' : '0 0 5px rgba(0, 0, 0, 0.1)'};

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ToggleThumb = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.mode === 'dark' ? 'calc(100% - 24px)' : '4px'};
  top: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 2;
  
  svg {
    width: 12px;
    height: 12px;
    color: ${({ theme }) => theme.mode === 'dark' ? '#5c6bc0' : '#ff9800'};
  }
`; 