import React, { useContext, useEffect, useState } from 'react'
import './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';



export default function Cart() {

    const { getLoggedCart, removeCartProduct, updateProductQuantity, numOfCartItems, setNumOfCartItems, clearCart } = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [cartPrice, setCartPrice] = useState(0)




    const [isLoading, setLoader] = useState(false)




    async function removeProduct(id) {
        setLoader(true)
        const { data } = await removeCartProduct(id)
        setLoader(false)
        setProducts(data.data.products)
        setCartPrice(data.data.totalCartPrice)
        setNumOfCartItems(data.numOfCartItems)


    }




    async function updateCount(id, count) {
        setLoader(true)
        const { data } = await updateProductQuantity(id, count)
        setLoader(false)
        setProducts(data.data.products)
        setCartPrice(data.data.totalCartPrice)

    }


    async function getCart() {
        setLoader(true)
        let { data } = await getLoggedCart()
        setLoader(false)
        if (!data) {
            setProducts([])
            setCartPrice(0)
            setNumOfCartItems(0)
            setLoader(false)
        } else {

            setProducts(data.data.products)
            setCartPrice(data.data.totalCartPrice)
            setNumOfCartItems(data.numOfCartItems)
            setLoader(false)
        }
    }



    useEffect(() => {
        getCart()
    }, []);


    async function clear() {
        setLoader(true)
        const { data } = await clearCart()
        // console.log(data);
        if (data.message == "success") {
            setProducts([])
            setCartPrice(0)
            setNumOfCartItems(0)
            setLoader(false)
        }
    }




    return (<>

        {isLoading ? (
            <Loader />
        ) : (
            <div className="pt-4">
                <Helmet>
                    <title>Cart</title>
                </Helmet>
                <div className="container bg-light p-5 mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className='mb-4'>Cart Shop</h2>
                            <p className='fs-5 fw-semibold pt-2'>total price: <span className='text-main'>{cartPrice} </span> EGP</p>
                        </div>


                        <div className='text-end' >
                            <Link to={'/Checkout'} className='btn btn-primary mb-4 fs-5 py-2 text-white' > check out</Link>
                            <p className='fs-5 fw-semibold'>total number of items: <span className='text-main'>{numOfCartItems}</span></p>
                        </div>
                    </div>


                    {products.length === 0 ? <h4>your cart is empty</h4> :

                        products.map((product) =>
                        (
                            <div div className="row justify-content-between mt-4 border-bottom pb-3" key={product._id} >

                                <div className="col-md-2">
                                    <img src={product.product.imageCover} className='w-100'></img>
                                </div>
                                <div className="col-md-8 ">
                                    <h5>{product.product.title.split(' ').slice(0, 2).join(' ')}</h5>
                                    <p className='fw-semibold'>{product.price} EGP</p>
                                    <button type="button" className="btn btn-outline-light text-danger" onClick={() => removeProduct(product.product.id)}><i className="fa-solid fa-trash me-2"></i>Remove</button>
                                </div>
                                <div className="col-md-2">
                                    <div className='d-flex align-items-center  '>
                                        <button className='btn btn-outline-success' onClick={() => updateCount(product.product.id, product.count + 1)}>+</button>
                                        <span className=' mx-2'>{product.count}</span>
                                        <button className='btn btn-outline-success ' onClick={() => updateCount(product.product.id, product.count - 1)}
                                            disabled={product.count === 1 ? "disabled" : false} >-</button>
                                    </div>
                                </div>
                            </div>


                        ))}
                    {products.length > 0 ?

                        <div className="d-flex justify-content-center">
                            <button className='btn btn-outline-success mt-4' onClick={() => clear()}>clear your cart</button>
                        </div>
                        : ''}



                </div>
            </div >
        )}
    </>)
}
