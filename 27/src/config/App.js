import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import Routes from './Routes';
import { WalletProvider } from './wallet';

export default function App() {
  return (
    <WalletProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </WalletProvider>
  );
}
