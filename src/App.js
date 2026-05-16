import { useState } from 'react';
import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
import MainFooter from './layouts/main/MainFooter';
// components
import { AppAuthContext } from './auth/AppAuthContext';
import ThemeSettings from './components/settings';
import { ChartStyle } from './components/chart';
import { AuthProvider } from './auth/AppAuthContext'; // Change this import
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

// ----------------------------------------------------------------------

export default function App() {
  const [user, setUser] = useState ();

  return (
    // <AppAuthContext.Provider value={{user, setUser}}>
    // <MotionLazyContainer>
    //   <ThemeProvider>
    //   <ToastContainer autoClose={3000} />
    //     <ThemeSettings>
    //         <ProgressBarStyle />
    //         <ChartStyle />
    //         <ScrollToTop />
    //         <Router />
    //         <MainFooter />
    //     </ThemeSettings>
    //   </ThemeProvider>
    // </MotionLazyContainer>
    // </AppAuthContext.Provider>
     <AppAuthContext.Provider value={{user, setUser}}>
    <MotionLazyContainer>
      <ThemeProvider>
          <AuthProvider>
      <ToastContainer autoClose={3000} />
        <ThemeSettings>
            <ProgressBarStyle />
            <ChartStyle />
            <ScrollToTop />
            <Router />
            <MainFooter />
        </ThemeSettings>
          </AuthProvider>
      </ThemeProvider>
    </MotionLazyContainer>
    </AppAuthContext.Provider>
  );
}
