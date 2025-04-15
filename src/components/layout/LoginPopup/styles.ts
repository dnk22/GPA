import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001; // Ensure it's above sidebar
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0;
    align-items: flex-end; // Slide up from bottom on mobile
  }
`;

export const PopupContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px 16px 0 0;
    max-width: none;
    margin: 0;
    animation: slideUp 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
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
  border-radius: 8px;
  padding: 0 1rem;
  
  svg {
    color: ${({ theme }) => theme.secondary};
    margin-right: 0.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 0 0.75rem;
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}20;
  }
`;

export const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.75rem 0;
  color: ${({ theme }) => theme.text};
  outline: none;
  font-size: 1rem;
  width: 100%;
  
  &::placeholder {
    color: ${({ theme }) => theme.secondary};
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0;
    font-size: 16px; // Prevent zoom on iOS
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary}dd;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 16px;
  }
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.9375rem;
  }
`;