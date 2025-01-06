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

    <div>

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

{/* <Link to={"/login"}>Login</Link> */}

{cart.map((cartItem) => {
          return (
            <div key={cartItem.cartId}>
              {cartItem.name}
              {cartItem.price} $ {cartItem.quantity}
              <button
                onClick={() => {
                  removeItems(cartItem.cartId);
                }}
                className="border-black border-2"
              >
                Remove the Item
              </button>
            </div>
          );
        })}

      <header>
        <span>Total Items In Cart {cart.length}</span>
        <span>Price ${totalPrice} </span>
      </header>

     <div>
       
     {products.map((product) => {
        return (
          <>
            <div>
               <div key={product.id}>
                  <Link to={`/products/${product.id}`}>
                      details page{product.id} logging product id
                    </Link>
                    <img src={product.image} alt="" />
                      <div >           
                          <div >
                              <div> ${product.price}</div>
                              <div> {product.name}</div>
                            </div>

                              <div className="space-x-2">
                                    <button onClick={() => {incrementToCart(product)}}
                                        className="border-2 p-2 border-red-500">Add to cart</button>

                                      <button onClick={() => {decrementCart(product.id)}} 
                                          className="border-2 p-2 border-red-500">Remove to cart</button>
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