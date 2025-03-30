import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.background};
  transition: all 0.2s ease-in-out;
`; 