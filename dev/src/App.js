import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './layout/AppRoutes';
import { Navbar } from './layout/shared/component/C-NavBar/navbar';
import './App.css';
import { LoginScreen } from './layout/pages/m0-login-pages/loginpage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login } from './store/slices/userSlice';

function App() {
  const [user, setUser] = useState()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);


  useEffect(() => {
    const handleGetCache = async() => {
      const u = localStorage.getItem('User')
      if(u){
        await setUser(u)
        dispatch(login(user))
      }
    }

    handleGetCache()

  }, [])



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
              <div className="titleApp"></div>
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
