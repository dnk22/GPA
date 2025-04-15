import { createGlobalStyle, keyframes } from 'styled-components';
import { themeConfig } from './theme';

// Keyframes cho hiệu ứng lan tỏa
const rippleEffect = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    overflow-x: hidden;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.6s ease-in-out, color 0.6s ease-in-out;
    overflow-x: hidden;
    min-height: 100vh;
    position: relative;
  }

  #root {
    height: 100vh;
  }
  
  .theme-ripple-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 1000;
    overflow: hidden;
  }
  
  .theme-ripple {
    position: absolute;
    border-radius: 50%;
    transform-origin: center;
    animation: ${rippleEffect} 2s cubic-bezier(0.25, 0.46, 0.45, 1) forwards;
  }
  
  .light-ripple {
    background-color: ${themeConfig.light.background};
  }
  
  .dark-ripple {
    background-color: ${themeConfig.dark.background};
  }

  /* Mobile menu transitions */
  @media (max-width: 768px) {
    .sidebar-container {
      transition: transform 0.3s ease-in-out;
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
      z-index: 900;
    }

    .overlay.visible {
      opacity: 1;
      visibility: visible;
    }
  }

  /* Smooth scrolling */
  @media (prefers-reduced-motion: no-preference) {
    html {
      scroll-behavior: smooth;
    }
  }

  /* Better touch scrolling */
  @supports (-webkit-overflow-scrolling: touch) {
    body {
      -webkit-overflow-scrolling: touch;
    }
  }

  /* Prevent text size adjustment on orientation change */
  html {
    -webkit-text-size-adjust: 100%;
  }
`;