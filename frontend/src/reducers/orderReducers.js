import { 
    ORDER_CREATE_REQ,
    ORDER_CREATE_SUC,
    ORDER_CREATE_FAIL,
    ORDER_RESET,

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