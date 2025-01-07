// import { Description } from "@mui/icons-material";
// import react from "react";
// import axios from "axios";
import { useEffect, useState } from "react"
import useStore from "../store/index";
import { Link } from "react-router-dom";
import userStore from "../store/user";
import { axiosInstance } from "../client/api";




function Home() {
  // const [isLoading,setIsLoading]=useState(false)
  const [products,setProducts]=useState([]);
  const {cart, decrementCart, incrementToCart, removeItems, getTotalPrice} = useStore();
  const { logout, user } = userStore();


  const fetchData = async () => {
    try{
      const response = await axiosInstance.get("/products/list") 
      console.log(response)
      const productsData = [...response.data]
      setProducts(productsData)
    }
    catch(err){
         console.log(err)
    }
  }

  useEffect(() =>{
    fetchData()
  },[])
 

  // const totalPrice = cart.reduce((sum,element) => {
  //   return(sum += element.price * element.quantity)
  // },0);

const totalPrice = getTotalPrice()
  // function incrementCart(id,title,price) {
  //   const exstingcartItems = cart.find((cartItem) => cartItem.productId === productIdid);
  //   if(exstingcartItems) {
  //     const updatedCart = cart.map((cartItem) => {
  //       if(cartItem.productId === product.id) {
  //         return {
  //           ...cartItem,
  //           quantity: cartItem.quantity + 1,
  //         }
  //       }
  //       return cartItem;
  //     })
  //     setCart(updatedCart)
  //   }else {

  //     const cartItem = {
  //       cartId: "cart" + Math.random(),
  //       productId: id,
  //       name:title,
  //       price: price,
  //       quantity:1,

  //     };
  //     const updateCart = [...cart, cartItem];
  //     console.log(updateCart)
  //     setCart(updateCart);

  //   }

  // }

  return (

    <div className="max-w-[_1440px] m-[0px_auto]">

      {/* {cart.map((cartItem) => {
        return (
          <div key={cartItem.id} className="space-x-3">
            {cartItem.title}
            {cartItem.price} $ {cartItem.quantity}
            
            <button onClick={()=>{
              const filteredItem =cart.filter((item) => item.cartId !== cartItem.cartId)
              setCart(filteredItem)
            }
            }  className="border-black border-2">
              Remove the Item 
            </button>

          </div>
        );
      })} */}

           <div className="text-center p-[20px_0px] space-x-6 text-lg text-orange-500 font-semibold capitalize">
                  {user? (
                        <>
                          <button onClick={logout}>logout</button>
                          <Link to={"/profile"}>Profile</Link>
                          <Link to={"/cart"}>Cart</Link>
                        </>
                    ) 
                  : 
                  (
                      <>
                        <Link to={"/profile"}>Profile</Link>
                        <Link to={"/login"}>Login</Link>
                      </>
                  )}
           </div>
{/* <Link to={"/login"}>Login</Link> */}

{cart.map((cartItem) => {
          return (
            <div key={cartItem.cartId} className="flex justify-between items-center mb-8 p-6 bg-gray-200 shadow-lg text-black font-semibold capitalize">
               <div>Fruit Name: <span className="pl-2 text-orange-500">{cartItem.name}</span></div>
               <div>Price: <span className="pl-2 text-orange-500">{cartItem.price}</span></div>
               <div>Quantity: <span className="pl-2 text-orange-500"> {cartItem.quantity}</span></div>

               <div> 
                    <button
                      onClick={() => {
                        removeItems(cartItem.cartId);
                      }}
                      className="bg-orange-500 p-[8px_25px] text-white"
                    >
                      Remove the Item
                    </button>
               </div>

            </div>
          );
        })}

      <header className="pt-7 text-center space-x-4">
        <span className="text-black font-semibold capitalize">Total Items In Cart :<span className="text-orange-500 text-xl font-semibold capitalize pl-2">{cart.length}</span></span>
        <span className="text-black font-semibold capitalize">Price: <span className="text-orange-500 text-xl font-semibold capitalize pl-2">${totalPrice}</span></span>
      </header>

     <div  className="flex flex-wrap items-start justify-center gap-6 p-[20px_0px_0px_60px]">
       
     {products.map((product) => {
        return (
          <>
            <div className="shadow-md p-[20px_15px] bg-white hover:bg-gray-200 rounded-xl">
               <div key={product.name}>
                  <Link to={`/products/${product.id}`}>
                      {/* details page{product.name} logging product id */}
                      <img src={product.image} alt="" width={"350px"}/>
                    </Link>
                    
                      <div className="space-x-3">           
                          <div className="flex justify-between items-center flex-row-reverse p-[15px_20px]">
                              <div className="text-red-700 text-2xl font-semibold"> ${product.price}</div>
                              <div className="text-lg capitalize font-medium text-red-900"> {product.name}</div>
                            </div>

                              <div className="flex justify-around p-[10px_0px]">
                                    <button onClick={() => {incrementToCart(product)}}
                                        className="border-2 p-[6px_30px] bg-lime-600 text-white font-semibold rounded-md">Add</button>

                                      <button onClick={() => {decrementCart(product.id)}} 
                                          className="border-2 p-[6px_15px] bg-lime-600 text-white font-semibold rounded-md">Remove</button>
                              </div>              
                       </div>
                 </div>
              </div>
          </>       
        );
      })}
     </div>
     
    </div>
  )
}
export default Home