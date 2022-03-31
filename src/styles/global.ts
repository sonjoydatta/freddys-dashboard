import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/assets/fonts/IBMPlexSans-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/assets/fonts/IBMPlexSans-Bold.woff2') format('woff2');
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
	  background-color: #d8d8d8;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;

    &:focus {
      outline: none;
    }
  }

  a {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      text-decoration: none;
    }
  }

  input,
  textarea {
    background-color: ${({ theme }) => theme.colors['gray-100']};

    &:focus {
      outline: none;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors['gray-200']};
    }
  }

  img {
    border-style: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 600;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.dark};
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  h5 {
    font-size: 1.125rem;
  }

  h6 {
    font-size: 0.875rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;
