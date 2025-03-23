import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes, } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Home/Cart/Cart'
import PlaceOrder from './Pages/Home/placeorder/placeorder'
import Footer from './Components/Footer/Footer'
import { useState } from 'react'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import { Context } from './Context/Context'
const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
