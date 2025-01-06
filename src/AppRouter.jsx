// import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/home';
import userStore from './store/user'
import Register from './pages/register'
import Profile from './pages/profile'
import Login from './pages/login'
import { useEffect } from 'react'
import Layout from './layout/layout'
import Product from './pages/product'
import Cart from './pages/cart';
import Shipping from './pages/shipping';
import Checkout from './pages/checkout';




 const ProtectedRoute = (props) => {


   const {user} = userStore();
   const navigate = useNavigate();
   
   useEffect(() => {
     if(!user) {
      navigate("/login");
     }
   },[user, navigate]);

  return <div>{props.children}</div>;

  //  if (!user) {
  //   redirect("/login")
  //  }


}

const AppRouter = () => {

  return(
    <Routes>
     <Route path='/' element={<Layout />}>

       <Route index element= {<Home />} />
       <Route path="/products/:productId" element={<Product />} />
       <Route path='/register' element={<Register />} />
       <Route path='/login' element={<Login />} />
      
        
       <Route path="/profile"
       element = {
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
       } />

      <Route path='shipping' 
       element ={
        <ProtectedRoute>
          <Shipping />
        </ProtectedRoute>
       }/>

     <Route path='/checkout' 
       element ={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
       }/>

      <Route path="/cart"
          element = {
            <ProtectedRoute>
             <Cart />
            </ProtectedRoute>
          } />
      </Route>
   </Routes>
  )
}


export default AppRouter
