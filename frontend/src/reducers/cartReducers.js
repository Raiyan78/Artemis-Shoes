import { 
    CART_ADD_PRODUCT, 
    CART_REMOVE_PRODUCT, 
    CART_SHIPPING_ADDRESS,
    CART_PAYMENT_METHOD,
    CART_RESET,
    
} from '../constants/cartConstants'

export const cartReducers = (state = { cartItem:[], shippingAddress : {} }, action) => {
    switch(action.type){
        
        case CART_ADD_PRODUCT:
            const item = action.payload
            const existsItem = state.cartItem.find(x => x.product === item.product)
        
            if(existsItem){
                return{
                    ...state,
                    cartItem: state.cartItem.map(
                            x => x.product === existsItem.product ? item : x
                        )
                }
            }else{
                return{
                    ...state,
                    cartItem:[...state.cartItem, item]
                }
            }
        case CART_REMOVE_PRODUCT:
            return {
                ...state,
                cartItem: state.cartItem.filter(x => x.product !== action.payload) //filter the product out of payload array
            }
        
        case CART_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload,
            }
        case CART_PAYMENT_METHOD:
            return{
               ...state,
               paymentMethod: action.payload 
            }
        case CART_RESET :
            return{
                ...state,
                cartItem: []
            }
        default:
                return state

    }
} 