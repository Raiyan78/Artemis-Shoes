import { 
    ORDER_CREATE_REQ,
    ORDER_CREATE_SUC,
    ORDER_CREATE_FAIL,
    ORDER_DETAIL_REQ,
    ORDER_DETAIL_SUC,
    ORDER_DETAIL_FAIL,

    ORDER_LIST_USER_REQ,
    ORDER_LIST_USER_SUC,
    ORDER_LIST_USER_FAIL,
    ORDER_LIST_USER_RESET,

    ORDER_LIST_SUC,
    ORDER_LIST_REQ,
    ORDER_LIST_FAIL,

    ORDER_PAY_SUC,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQ,
    ORDER_PAY_RESET,

    ORDER_DELIVERY_SUC,
    ORDER_DELIVERY_FAIL,
    ORDER_DELIVERY_REQ,
    ORDER_DELIVERY_RESET,

} from '../constants/orderConstants'

import { CART_RESET } from '../constants/cartConstants'

import axios from 'axios'

export const createOrder = (order) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQ
        })

        //Get the token
        const {
            userLogin: {userDetail},
        } = getState()

        const config = 
            {
                headers : {
                    'Content-type' : 'application/json',
                    Authorization: `Bearer ${userDetail.token}`
                },        
            }

        const {data} = await axios.post(
                `/api/orders/add/`,
                order,
                config
            )
        dispatch({
            type: ORDER_CREATE_SUC,
            payload : data
        })

        dispatch({
            type: CART_RESET,
            payload : data
        })

        localStorage.removeItem('cartProducts')



    }catch(error){
        dispatch({type: ORDER_CREATE_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}

//view order by id{key}
export const viewOrder = (key) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_DETAIL_REQ
        })

        //Get the token
        const {
            userLogin: {userDetail},
        } = getState()

        const config = 
            {
                headers : {
                    'Content-type' : 'application/json',
                    Authorization : `Bearer ${userDetail.token}`
                },        
            }

        const {data} = await axios.get(
                `/api/orders/${key}/`,
                config
            )
        dispatch({
            type: ORDER_DETAIL_SUC,
            payload : data
        })
        console.log('order detail dispatched')

    }catch(error){
        dispatch({type: ORDER_DETAIL_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}

//view order by per user
export const viewMyOrderList = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_LIST_USER_REQ
        })

        //Get the token
        const {
            userLogin: {userDetail},
        } = getState()

        const config = 
            {
                headers : {
                    'Content-type' : 'application/json',
                    Authorization : `Bearer ${userDetail.token}`
                },        
            }

        const {data} = await axios.get(
                `/api/orders/myorders/`,
                config
            )
        dispatch({
            type: ORDER_LIST_USER_SUC,
            payload : data
        })

    }catch(error){
        dispatch({type: ORDER_LIST_USER_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}


//view all orders by admin
export const viewOrders = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_LIST_REQ
        })

        //Get the token
        const {
            userLogin: {userDetail},
        } = getState()

        const config = 
            {
                headers : {
                    'Content-type' : 'application/json',
                    Authorization : `Bearer ${userDetail.token}`
                },        
            }

        const {data} = await axios.get(
                `/api/orders/`,
                config
            )
        dispatch({
            type: ORDER_LIST_SUC,
            payload : data
        })

    }catch(error){
        dispatch({type: ORDER_LIST_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}

export const setPaid = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_PAY_REQ
        })

        //Get the token
        const {
            userLogin: {userDetail},
        } = getState()

        const config = 
            {
                headers : {
                    'Content-type' : 'application/json',
                    Authorization : `Bearer ${userDetail.token}`
                },        
            }

        const {data} = await axios.post(
                `/api/orders/paid/${id}`,
                {},
                config
            )
        dispatch({
            type: ORDER_PAY_SUC,
            payload : data
        })

    }catch(error){
        dispatch({type: ORDER_PAY_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}

export const setDelivered = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_DELIVERY_REQ
        })

        //Get the token
        const {
            userLogin: {userDetail},
        } = getState()

        const config = 
            {
                headers : {
                    'Content-type' : 'application/json',
                    Authorization : `Bearer ${userDetail.token}`
                },        
            }

        const {data} = await axios.post(
                `/api/orders/delivered/${id}`,
                {},
                config
            )
        dispatch({
            type: ORDER_DELIVERY_SUC,
            payload : data
        })

    }catch(error){
        dispatch({type: ORDER_DELIVERY_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}

