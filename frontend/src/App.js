import './App.css';
import React, { useEffect, useContext, useState } from 'react';
import { Routes, Route, useSearchParams, useLocation } from 'react-router-dom';
import Home from './components/Home';
import AuthContext from './context/AuthProvider';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Verify from './components/Verify';
import Login from './components/Login';
import ScrollToTop from './components/ScrollToTop';
import Support from './components/Support';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import CardProfile from './components/CardProfile';
import NotFound from './components/NotFound.jsx';


const App = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);
  const {logAsNum, setLogAsNum} = useContext(AuthContext);
  const [onShowErrorPage, setOnShow] = useState(false);
  var accessToken = searchParams.get("access");
  var token = searchParams.get("token");

  useEffect(() => {
    if (auth?.name !== undefined && auth.verified !== null) {
      window.localStorage.setItem("auth", JSON.stringify(auth));
      window.localStorage.setItem("logAsNum", logAsNum);
    }
  }
    , [auth]);

  useEffect(() => {
    setAuth(JSON.parse(window.localStorage.getItem("auth")));
    setLogAsNum(JSON.parse(window.localStorage.getItem("logAsNum")));
  }, [setAuth]);


  return (
    <div className="App">
      {!onShowErrorPage && <Navbar />}
      <ScrollToTop/>
      {!onShowErrorPage && <Support/>}
      <Routes>
        <Route path = "*" element = {<NotFound setOnShow = {setOnShow} />} />
        <Route path = {"/resetPassword"} element = {<ResetPassword token = {token}/>}/>
        <Route path = {"/forgotPassword"} element = {<ForgotPassword/>}/>
        <Route path="/home&authorized=true" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path={"/activate"} element={<Verify accessToken={accessToken} />} />
        <Route path ="/loginResetSuccess=true" element={<Login resetOK={location.state?.resetOK}/>}/>
        <Route path="/registered=true" element={<Login registered={location.state?.registered} />} />
         <Route path ="/login" element={<Login/>}/>
        <Route path="/login=true" element={<Login login={location.state?.login} />} />
        <Route path="/logout=true" element={<Login logout={location.state?.logout} />} />
        <Route path="/profile" element={<CardProfile />} />
      </Routes>
    </div>
  );
}
export default App;