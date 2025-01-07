
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

     <div className="p-[20px_0px_20px_0px] bg-gray-400">
        <form onSubmit={handleSubmit(onSubmit)} className="space-x-4">
                <input {...register("city")} className="border-2 border-orange-500" />
                <input {...register("state")} className="border-2 border-orange-500 m-0" />
                <input {...register("country")} className="border-2 border-orange-500"/>
                 <button type="submit" className="bg-orange-500 p-[4px_25px] text-white font-medium">Submit</button>
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




