// import { title } from 'process';
import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { devtools, persist } from 'zustand/middleware'


const useStore =  create(
  devtools(
    persist((set, get) => ({
      cart: [],
      clientSecret: null,
      updatedClientSecret: (clientSecret) => {
        set({
          clientSecret
        })
      },
      counter: 0,
      setCart: (cartItem) => {
           const {cart} = get ();
           console.log(cart);
           set(cartItem);
      },
      decrementCart: (productId) => {
       const {cart} = get ();
       const updateCartItem = cart.map((cartItem) => {
           if (cartItem.productId === productId) {
               return {
                   ...cartItem,
                   quantity:  Math.max(cartItem.quantity - 1, 0),
               };
           }
           return cartItem;
       }) ;
       set({ cart: updateCartItem });
       console.log(updateCartItem)
      },
   
      incrementToCart: (product) => {
       const {cart} = get ()
       const exstingcartItems = cart.find(
           (cartItem) => cartItem.productId === product.id
       );
       if(exstingcartItems) {
           const updatedCart = cart.map((cartItem) => {
             if(cartItem.productId === product.id) {
               return {
                 ...cartItem,
                 quantity: cartItem.quantity + 1,
               }
             }
             return cartItem;
           })
           set({ cart: updatedCart }); 
         }else {
     
           const cartItem = {
             cartId: "cart" + nanoid(),
             productId: product.id,
             name: product.name,
             price: product.price,
             image:product.image,
             quantity:1,
     
           };
           const updatedCart = [...cart, cartItem];
           set({ cart: updatedCart });
     
         }
      },
      removeItems: (id) => {
       const { cart } = get();
       const FlilterItem = cart.filter((item) => item.cartId !== id);
       set({ cart: FlilterItem });
     },
   
     getTotalPrice: () => {
       const { cart } = get();
   
       const totalPrice = cart.reduce((sum,element) => {
         return(sum += element.price * element.quantity)
       },0);
        return totalPrice
     },
      
     getTotalCartItemsCount: () => {
      const { cart } = get();
  
      const totalPrice = cart.reduce((sum,element) => {
        return(sum += element.quantity)
      },0);
       return totalPrice
    },

   }),
   { name: 'cart' },
   ),
  ),
);

export default useStore
