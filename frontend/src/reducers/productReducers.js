//A function that takes an action of what we want to do to our state, ex. load data basically manipulates state
import {PRODUCT_LIST_REQUEST, 
        PRODUCT_LIST_SUCCESS, 
        PRODUCT_LIST_FAIL,
        PRODUCT_REQUEST, 
        PRODUCT_SUCCESS, 
        PRODUCT_FAIL,
        PRODUCT_DELETE_REQ, 
        PRODUCT_DELETE_SUC, 
        PRODUCT_DELETE_FAIL,

        PRODUCT_CREATE_REQ,
        PRODUCT_CREATE_SUC,
        PRODUCT_CREATE_FAIL,
        PRODUCT_CREATE_RESET,

        PRODUCT_EDIT_REQ,
        PRODUCT_EDIT_SUC,
        PRODUCT_EDIT_FAIL,
        PRODUCT_EDIT_RESET,


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

export const productDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQ:
            return {loading: true}
        case PRODUCT_DELETE_SUC:
            return {loading: false, success: true}
        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }

}

export const productCreateReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQ:
            return {loading: true}
        case PRODUCT_CREATE_SUC:
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_RESET:
            return { }
        default:
            return state
    }

}

export const productEditReducer = (state ={}, action) => {
    switch(action.type){
        case PRODUCT_EDIT_REQ:
            return {loading: true}
        case PRODUCT_EDIT_SUC:
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_EDIT_RESET:
            return { product : {}}
        default:
            return state
    }
}