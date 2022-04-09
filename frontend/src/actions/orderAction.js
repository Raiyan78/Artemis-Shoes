import { 
    ORDER_CREATE_REQ,
    ORDER_CREATE_SUC,
    ORDER_CREATE_FAIL,

} from '../constants/orderConstants'

import { CART_RESET } from '../constants/cartConstants'

import axios from 'axios'

export const createOrder = (order) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQ
        })

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