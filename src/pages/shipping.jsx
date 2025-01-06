
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useStore from "../store/index"
import vine from "@vinejs/vine";
import { vineResolver } from "@hookform/resolvers/vine";
import { axiosInstance } from "../client/api";
import { useNavigate } from "react-router-dom";



// import { Form } from "react-router-dom";

const schema = vine.compile(
    vine.object({
      city: vine.string().maxLength(10),
      state: vine.string().maxLength(10),
      country: vine.string().maxLength(10),
    })
  );
   
 const Shipping = () => {
   const {cart, getTotalPrice, removeItems, updatedClientSecret} = useStore();
   const navigate = useNavigate();
   const totalPrice = getTotalPrice();
  
   const { register, handleSubmit,getValues} = useForm({
     resolver: vineResolver(schema),
   });   
   const onSubmit = async () => {
    try {
      const orderItems = cart.map((cartItem) =>{
        return {
          productId: cartItem.productId,
          price: cartItem.price,
          quantity: cartItem.quantity,
        };
      });
      console.log(`orderItems`, JSON.stringify(orderItems, null, 2))
        const { city, state, country } = getValues();
         const  deliveryAddress = city + state + country ;
        const response =  await axiosInstance.post("/orders", {
              deliveryAddress,
              totalPrice: getTotalPrice(),
              orderItems: [...orderItems]
         });
         console.log(response.data)
          updatedClientSecret(response.data.clientSecret)
           navigate("/checkout")
    } catch (error) {
        console.log("error in onSubmit", error);
        throw error;
    }     
   }

   

  return (
    <div>

     <div>
        <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("city")} />
                <input {...register("state")} />
                <input {...register("country")} />
                 <button type="submit">Submit</button>
        </form>
     </div>


        <div>

        cart ${totalPrice}
        {cart.map((cartItem) => {
            return(
            <div key={cartItem.cartId}>
                {cartItem.name} {cartItem.price} ${cartItem.quantity}
                <img src={cartItem.image} alt="" width={200}/>
                <button onClick={() => {
                    removeItems(cartItem.cartId);
                }}
                className="bg-slate-400 p-2" 
                >
                Remove The Items
                </button>
                </div>
            );
        })}
        </div>


      
    </div>
  )
}
export default Shipping




