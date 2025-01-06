import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { axiosInstance } from "../client/api";
import useStore from "../store";


  const Product = () => {
    const  {productId} = useParams();
    const [product, setProduct] = useState();
     const { incrementToCart } = useStore();
    const fetchProduct = async () => {
        try {
            const response = await axiosInstance.get(`/products/${productId}`);
            console.log(response.data);
            setProduct(response.data);
        } catch (error) {
            console.log("products not come" ,error)
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [ ]);
    console.log(`product`, JSON.stringify(product, null, 2));

    if (!product) {
        return <div>Loading</div>
    }

    return(
    <div>
       product
       <p>
        {product?.name}
       </p>

       <p> {product?.description}</p>
       <button
          onClick={() => {
            incrementToCart(product);
          }}
       >
         Add product to cart
       </button>
       <img src={product?.image} width={400} height={400} />
      {productId}
    </div>
    );
  };

  export default Product