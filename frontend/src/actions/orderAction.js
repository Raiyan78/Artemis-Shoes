import { 
    ORDER_CREATE_REQ,
    ORDER_CREATE_SUC,
    ORDER_CREATE_FAIL,
    ORDER_DETAIL_REQ,
    ORDER_DETAIL_SUC,
    ORDER_DETAIL_FAIL,


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