// import React from 'react'

import { useForm } from "react-hook-form"
import { axiosInstance } from "../client/api";
import userStore from "../store/user";
import { useNavigate } from "react-router-dom";

const Register = () => {

 const { register, getValues, handleSubmit } = useForm();
 const {login, logout} = userStore();  
 const navigate = useNavigate()

 const onSubmit = async () => {
   try {
     const {email, password ,name} = getValues();

     const response = await axiosInstance.post("/user/create", {
       email,
       password,
       name,
       image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr0bSwA5qUB7ukMdtoDuzaE6JjyweyxbXiaA&s"
     });
     console.log("logging")
     console.log(response.data)
     login(response.data.user, response.data.token);
     navigate("/login")

   } catch (error){
        console.log("error", error)
   } 
 }

  return (
    <div>

    <button onClick={logout}>Logout</button>  
     <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} /> 
        <input {...register("email")} />
        <input {...register("password")} />
        <input type="submit" />
     </form>
    </div>
  )
}

export default Register
