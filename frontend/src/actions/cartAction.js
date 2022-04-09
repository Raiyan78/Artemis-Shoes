import axios from 'axios'
import { 
    CART_ADD_PRODUCT, 
    CART_REMOVE_PRODUCT,
    CART_SHIPPING_ADDRESS,
    CART_PAYMENT_METHOD,
}   from '../constants/cartConstants'

export const addToCart = (id, quantity) => async(dispatch,getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_PRODUCT,
        payload : {
            product: data._id,
            name: data.name,
            price: data.price,
            image: data.image,
            quantity,
            countInStock: data.countInStock
        }
    })

    localStorage.setItem('cartProducts', JSON.stringify(getState().cart.cartItem))
}

export const removeFromCart = (id) => async(dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_PRODUCT,
        payload: id,
    })

    localStorage.setItem('cartProducts', JSON.stringify(getState().cart.cartItem))
}

export const setShippingAddress = (data) => async(dispatch, getState) => {
    dispatch({
        type: CART_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const setPaymentMethod = (data) => async(dispatch,getState) =>{
    dispatch({
        type: CART_PAYMENT_METHOD,
        payload: data, 
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

