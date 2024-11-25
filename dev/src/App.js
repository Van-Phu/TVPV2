import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './layout/AppRoutes';
import { Navbar } from './layout/shared/component/C-NavBar/navbar';
import './App.css';
import { LoginScreen } from './layout/pages/m0-login-pages/loginpage';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="container-app">
      <Router>
        {!isLoggedIn ? (
          <LoginScreen />
        ) : (
          <div className="layout-app">
            <div className="navbar-area">
              <Navbar />
            </div>
            <div className="rightContent">
              <div className="titleApp">This is title</div>
              <div className="route-area">
                <AppRoutes />
              </div>
            </div>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
