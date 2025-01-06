// import React from 'react'

import { useForm } from "react-hook-form"
import { axiosInstance } from "../client/api";
import userStore from "../store/user";
import { useNavigate } from "react-router-dom";
import vine from "@vinejs/vine";
import { vineResolver } from "@hookform/resolvers/vine";


const schema = vine.compile(
  vine.object({
    email: vine.string().email().minLength(1),
    password: vine.string().minLength(1)
  })
);



const Login = () => {

 const { register, getValues, handleSubmit, formState } = useForm({
  resolver: vineResolver(schema),
 });
 const {login, logout, user} = userStore();  
 const navigate = useNavigate();
 const onSubmit = async () => {
   try {
     const {email, password} = getValues();

     const response = await axiosInstance.post("/auth/login", {
       email,
       password,
     });
     console.log("logging")
     console.log(response.data)
     login(response.data.user, response.data.token);
     navigate("/")
   } catch (error){
        console.log("error", error)
   } 
 }
 console.log(formState.errors)
  return (
    <div>
    {user && <button onClick={logout}> Logout</button>}
     <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} />
        <input {...register("password")} />
        <input type="submit" />
     </form>
    </div>
  )
}

export default Login
