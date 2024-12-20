// import { Description } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react"



function Home() {
  const [isLoading,setIsLoading]=useState(false)
  const [products,setProducts]=useState([]);
  const [cart, setCart] = useState([]);

  const fetchData = async () => {
    try{
      const response = await axios("https://dummyjson.com/products")
      console.log(response)
      const productsData = [...response.data.products]
      setProducts(productsData)
    }
    catch(err){
         console.log(err)
    }
  }

  useEffect(() =>{
    fetchData()
  },[])
 

  const totalPrice = cart.reduce((sum,element) => {
    return(sum += element.price * element.quantity)
  },0);


  function incrementCart(id,title,price,quantity) {
    const exstingcartItems = cart.find((cartItem) => cartItem.productId === id)
    if(exstingcartItems) {
      const updatedCart = cart.map((cartItem) => {
        if(cartItem.productId === id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        }
        return cartItem;
      })
      setCart(updatedCart)
    }else {

      const cartItem = {
        cartId: "cart" + Math.random(),
        productId: id,
        name:title,
        price: price,
        quantity:1,

      };
      const updateCart = [...cart, cartItem];
      console.log(updateCart)
      setCart(updateCart);

    }

  }



  return (

    <div className="flex flex-col items-center justify-center pt-7">

      {cart.map((cartItem,index) => {
        return (
          <div key={index + cartItem.id} className="space-x-3">
            {cartItem.name}
            {cartItem.price} $ {cartItem.quantity}
            
            {/* <button onClick={()=>{
              const filteredItem =cart.filter((item) => item.cartId !== cartItem.cartId)
              setCart(filteredItem)
            }
            }  className="border-black border-2">
              Remove the Item 
            </button> */}

          </div>
        );
      })}

      <header>
        <span>Total Items In Cart {cart.length}</span>
        <span>Price ${totalPrice} </span>
      </header>

     <div className="flex flex-wrap justify-center items-center gap-4 pt-10">
     {products.map((product) => {
        console.log(product)
        return (

          <div className="bg-slate-400 p-7">
          <div key={product.name}  >
            <img src={product.thumbnail} alt=""/>
            <p className="flex items-center justify-center gap-5">
               <button onClick = {() => {
                   const updateCartItems = cart.map((cartItem) => {
                    if (cartItem.productId === product.id) {
                      return {
                        ...cartItem,
                        quantity: cartItem.quantity - 1,
                      };

                    }
                    return cartItem;
                   });
                    setCart(updateCartItems);
                 }}
              className="border-2 p-2 border-red-500 ">
                Decrement
               </button>



              {product.name}
              {product.price}
              {/* <button onClick={() => {

                const cartItem = {
                  cartId: "cart" + Math.random(),
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity:1

                };
                const updateCart = [...cart, cartItem];
                console.log(updateCart)
                setCart(updateCart);

              }} className="border-black border-2">
                add to cart
              </button> */}
          
             <button onClick={() => {incrementCart(product.id, product.title, product.price, product.quantity)}} className="border-2 p-2 border-red-500">Add to cart</button>
            </p>
          </div>

          </div>
        );
      })}
     </div>
     
    </div>
  )
}
export default Home