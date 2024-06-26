import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from '../screens/LoginForm'
import SignupForm from '../screens/SignupForm'
import Home from '../screens/Home'

const RouterConfig = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginForm/>}/>
            <Route path='/signup' element={<SignupForm/>}/>
            <Route path='/home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default RouterConfig
