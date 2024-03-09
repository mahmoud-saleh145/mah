import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext();


export default function CartContextProvider(props) {



    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartId, setCartId] = useState('')


    const [loader, setLoader] = useState(false)


    let headers = {
        token: localStorage.getItem('userToken')
    }


    function addProductToCart(id) {
        setLoader(true)
        return axios.post('https://route-ecommerce.onrender.com/api/v1/cart',
            {
                productId: id
            },
            {
                headers
            }
        )
            .then(response => response)
            .catch(err => err)
    }




    function removeCartProduct(id) {
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
            {
                headers
            })
            .then((response) => response)
            .catch((err) => err)
    }


    function updateProductQuantity(id, count) {
        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`, {
            count,
        }, {
            headers
        }).then((response) => response).catch((err) => err)
    }


    function clearCart() {
        return axios.delete('https://route-ecommerce.onrender.com/api/v1/cart', { headers })
            .then((response) => response)
            .catch((err) => err)

    }



    function payment(shippingAddress) {
        return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            shippingAddress: shippingAddress

        },
            { headers })
            .then((response) => response).catch((err) => err)

    }

    async function displayInitialValue() {
        const { data } = await getLoggedCart()
        setNumOfCartItems(data?.numOfCartItems)
        setCartId(data?.data._id)
    }

    function getLoggedCart() {
        return axios.get('https://route-ecommerce.onrender.com/api/v1/cart', {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }






    useEffect(() => {
        displayInitialValue()
    }, [])

    return (

        <CartContext.Provider value={{ addProductToCart, getLoggedCart, removeCartProduct, updateProductQuantity, setNumOfCartItems, numOfCartItems, payment, clearCart }}>{props.children}</CartContext.Provider>
    )


}



