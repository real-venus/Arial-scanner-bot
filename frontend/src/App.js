import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import checkAuth from './app/auth';
import initializeApp from './app/init';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))


// Initializing different libraries
initializeApp()


// Check for login and initialize axios
const token = checkAuth()


function App() {

  useEffect(() => {
    themeChange(true)
  }, [])


  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/app/welcome"} replace />}/>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/app/*" element={<Layout />} />
          {/* <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/login"} replace />}/> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
