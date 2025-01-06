
import useStore from "../store/index"
import { Link } from "react-router-dom";
 const Cart = () => {
   const {cart, getTotalPrice, removeItems} = useStore()

   const totalPrice = getTotalPrice();

  return (
    <div>
      cart ${totalPrice}
      {cart.map((cartItem) => {
        return(
          <div key={cartItem.cartId}>
               {cartItem.name} {cartItem.price} ${cartItem.quantity}
               <img src={cartItem.image} alt="" width={300}/>
            <button onClick={() => {
                removeItems(cartItem.cartId);
            }}
             className="bg-slate-400 p-2" 
            >
              Remove The Items
            </button>
            </div>
        )
      })}
      <Link to={"/shipping"}> Shipping</Link>

    </div>
  )
}
export default Cart




