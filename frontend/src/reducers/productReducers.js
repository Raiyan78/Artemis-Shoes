//A function that takes an action of what we want to do to our state, ex. load data basically manipulates state
import {PRODUCT_LIST_REQUEST, 
        PRODUCT_LIST_SUCCESS, 
        PRODUCT_LIST_FAIL,
        PRODUCT_REQUEST, 
        PRODUCT_SUCCESS, 
        PRODUCT_FAIL 
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) =>{
    switch(action.type){
        //if products are laoding
        case PRODUCT_LIST_REQUEST:
            return {loading:true, products:[]}

        //successful request
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload}
        
        //bad data
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

// export const productListReducer = (state = { products: [] }, action) => {
//     switch (action.type) {
//         case PRODUCT_LIST_REQUEST:
//             return { loading: true, products: [] }

//         case PRODUCT_LIST_SUCCESS:
//             return {
//                 loading: false,
//                 products: action.payload.products,
//                 page: action.payload.page,
//                 pages: action.payload.pages
//             }

//         case PRODUCT_LIST_FAIL:
//             return { loading: false, error: action.payload }

//         default:
//             return state
//     }
// }

export const productDetailReducer = (state = { product: {reviews:[]}}, action) =>{
    switch(action.type){
        //if product is laoding
        case PRODUCT_REQUEST:
            return {loading:true, ...state}
        //successful request
        case PRODUCT_SUCCESS:
            return { loading: false, product: action.payload}
        //bad data
        case PRODUCT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
