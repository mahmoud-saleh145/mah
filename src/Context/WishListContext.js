import axios from 'axios';
import { createContext } from 'react'

export const WishListContext = createContext();





export default function WishListContextProvider(props) {

    let headers = {
        token: localStorage.getItem('userToken')
    }


    function addProductToWishList(id) {
        return axios.post('https://route-ecommerce.onrender.com/api/v1/wishlist',
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



    function getLoggedWishList() {
        return axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist', {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }


    function removeWishListProduct(id) {
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,
            {
                headers
            })
            .then((response) => response)
            .catch((err) => err)
    }





    return (
        <WishListContext.Provider value={{ addProductToWishList, getLoggedWishList, removeWishListProduct }}>{props.children}</WishListContext.Provider>
    )

}
