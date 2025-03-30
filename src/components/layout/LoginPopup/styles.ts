import styled from 'styled-components';

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  padding: 0 1rem;
  
  svg {
    color: ${({ theme }) => theme.secondary};
    margin-right: 0.5rem;
  }
`;

export const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.75rem 0;
  color: ${({ theme }) => theme.text};
  outline: none;
  
  &::placeholder {
    color: ${({ theme }) => theme.secondary};
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary}dd;
  }
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: -0.5rem;
`; 