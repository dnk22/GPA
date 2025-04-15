import styled from 'styled-components';

export const HeaderContainer = styled.header`
  height: 64px;
  background-color: ${({ theme }) => theme.header};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: all 0.2s ease-in-out;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HeaderTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
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
  
  @media (max-width: 768px) {
    width: 48px;
    height: 24px;
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
  
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
    left: ${({ theme }) => theme.mode === 'dark' ? 'calc(100% - 20px)' : '2px'};
    top: 3px;
  }
  
  svg {
    width: 12px;
    height: 12px;
    color: ${({ theme }) => theme.mode === 'dark' ? '#5c6bc0' : '#ff9800'};
    
    @media (max-width: 768px) {
      width: 10px;
      height: 10px;
    }
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    opacity: 0.8;
  }
`;