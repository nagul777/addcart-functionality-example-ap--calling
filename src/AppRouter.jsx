import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import About from './pages/about'
import Contact from './pages/contact'
import Home from './pages/home'
import Header from './components/header'

function Layout () {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}


const AppRouter = () => {
  return (
    <div>
      <Routes>
             <Route path='/' element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
            </Route>
      </Routes>
    </div>
  )
}

export default AppRouter
