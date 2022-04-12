import { 
    ORDER_CREATE_REQ,
    ORDER_CREATE_SUC,
    ORDER_CREATE_FAIL,
    ORDER_RESET,
    ORDER_DETAIL_REQ,
    ORDER_DETAIL_SUC,
    ORDER_DETAIL_FAIL,

    ORDER_LIST_USER_REQ,
    ORDER_LIST_USER_SUC,
    ORDER_LIST_USER_FAIL,
    ORDER_LIST_USER_RESET,

} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
    switch(action.type){
        case ORDER_CREATE_REQ:
            return {loading: true}
        case ORDER_CREATE_SUC:
            return {loading: false, success: true, order: action.payload}
        case ORDER_CREATE_FAIL:
            return {loading: false, success: false, error: action.payload}
        case ORDER_RESET:
            return {}
        default:
            return state
    }

}
export const orderDetailReducer = (state = {loading: true, shippingAddress: {}, orderItems :[]}, action) => {
    switch(action.type){
        case ORDER_DETAIL_REQ:
            return { 
                ...state, 
                loading: true
            }
        case ORDER_DETAIL_SUC:
            return {
                loading: false, 
                order: action.payload
            }

        case ORDER_DETAIL_FAIL:
            return {
                loading: false, 
                error: action.payload
            }
        default:
            return state
    }
}

export const orderDetailByUserReducer = (state = {orders :[]}, action) => {
    switch(action.type){
        case ORDER_LIST_USER_REQ:
            return { 
                loading: true
            }
        case ORDER_LIST_USER_SUC:
            return {
                loading: false, 
                orders: action.payload
            }

        case ORDER_LIST_USER_FAIL:
            return {
                loading: false, 
                error: action.payload
            }
        case ORDER_LIST_USER_RESET:
            return{
                order:[]
            }
        default:
            return state
    }
}