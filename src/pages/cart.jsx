
import useStore from "../store/index"
import { Link } from "react-router-dom";
 const Cart = () => {
   const {cart, getTotalPrice, removeItems} = useStore()

   const totalPrice = getTotalPrice();

  return (
    <div className="bg-gray-200 shadow-lg pb-7">
       <div className="w-[1440px] m-[0px_auto] space-y-4">
          <div className="font-medium p-[20px_0px] space-y-4"> Cart: <span className="pl-2 text-orange-500 text-lg font-semibold"> ${totalPrice}</span></div>
            <div>
                    {cart.map((cartItem) => {
                    return(
                        <>
                              <div key={cartItem.cartId} className="flex justify-around items-center capitalize font-semibold m-5 p-4 bg-gray-400">
                              <div><img src={cartItem.image} alt="" width={100} className="rounded"/></div>
                              <div>Fruit Name: <span className="pl-2 text-orange-700 text-lg">{cartItem.name}</span></div>
                              <div>Price: <span className="pl-2 text-orange-700 text-lg">{cartItem.price}</span></div>
                              <div>Quantity: <span className="pl-2 text-orange-700 text-lg">${cartItem.quantity}</span></div>
                                  <div>  
                                      <button onClick={() => {
                                          removeItems(cartItem.cartId);
                                          }}
                                          className="bg-orange-500 p-[8px_25px] text-white" 
                                          >
                                          Remove The Items
                                        </button>
                                  </div> 
                            </div>
                        </>  
                        )
                  })}
             </div>          
               <div className="pt-5">
               <Link to={"/shipping"} className="font-semibold bg-orange-500 text-white p-[10px_30px]"> Shipping</Link>    
               </div>
            </div>
          </div>
  )
}
export default Cart




