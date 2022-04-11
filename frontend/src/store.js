// redux

import { createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//reducer import
import { productListReducer, productDetailReducer } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'

import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailReducer, 
    userEditReducer,  } from './reducers/userReducers'

import { orderCreateReducer, orderDetailReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    productList : productListReducer,
    productDetail : productDetailReducer,
    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails : userDetailReducer,
    userEditProfile : userEditReducer,
    orderCreate : orderCreateReducer,
    orderDetail : orderDetailReducer,
    
})

const cartItemInStorage = localStorage.getItem('cartProducts') ?
    JSON.parse(localStorage.getItem('cartProducts')) : []

const userDetailInStorage = localStorage.getItem('userDetail') ?
    JSON.parse(localStorage.getItem('userDetail')) : null

const shippingAddressInStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodInStorage = localStorage.getItem('paymentMethod') ?
    JSON.parse(localStorage.getItem('paymentMethod')) : null


const middleWare = [thunk]

const initialState = {
    cart: {cartItem : cartItemInStorage, shippingAddress: shippingAddressInStorage, paymentMethod: paymentMethodInStorage},
    userLogin: {userDetail : userDetailInStorage},
}


const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store
