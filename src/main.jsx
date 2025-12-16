import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import { ToastContainer } from 'react-toastify';
import Router from './routes';
import AppProvider from './hooks';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './config/stripeConfig.js';
import { ThemeProvider } from 'styled-components';
import { standardTheme } from './styles/themes/standard';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={standardTheme}>
            <AppProvider>
                <Elements stripe={stripePromise}>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </Elements>
                <GlobalStyles />
                <ToastContainer autoClose={2000} theme="colored" />
            </AppProvider>
        </ThemeProvider>
    </StrictMode>,
);
