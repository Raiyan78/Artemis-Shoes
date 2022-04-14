import {
    PRODUCT_LIST_REQUEST, 
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

    PRODUCT_EDIT_REQ,
    PRODUCT_EDIT_SUC,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_RESET,
} from '../constants/productConstants'
import axios from 'axios'

export const listProducts = () => async(dispatch) =>{
    try {
        dispatch({type : PRODUCT_LIST_REQUEST})

        const {data} =  await axios.get('/api/products/')

        dispatch({
                type: PRODUCT_LIST_SUCCESS, 
                payload: data
            })
    } catch (error) {
       dispatch({type: PRODUCT_LIST_FAIL, 
                payload: error.response && error.response.data.message 
                            ?error.response.data.message : error.message}) 
    }
}

export const listProduct = (id) => async(dispatch) =>{
    try {
        dispatch({type : PRODUCT_REQUEST})

        const {data} =  await axios.get(`/api/products/${id}`)

        dispatch({  type: PRODUCT_SUCCESS,
                    payload: data
                })
    } catch (error) {
       dispatch({
            type: PRODUCT_FAIL, 
            payload: error.response && error.response.data.message 
                ?error.response.data.message 
                    : error.message
                }) 
    }
}

export const deleteProduct = (id) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: PRODUCT_DELETE_REQ
        })
        //GET THE TOKEN FOR AUTH
        const {
            userLogin: {userDetail},
        } = getState()

        const config = {headers : {'Content-type' : 'application/json',
                                    Authorization: `Bearer ${userDetail.token}`
                                },
                        
                        }

        const {data} = await axios.delete(`/api/products/delete/${id}/`,
                            config
                            )
        dispatch({
            type: PRODUCT_DELETE_SUC,
            payload : data
        })

    } catch (error) {
        dispatch({type: PRODUCT_DELETE_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}

export const createProduct = () => async(dispatch, getState)=>{
    try {
        dispatch({
            type: PRODUCT_CREATE_REQ
        })
        //GET THE TOKEN FOR AUTH
        const {
            userLogin: {userDetail},
        } = getState()

        const config = {headers : {'Content-type' : 'application/json',
                                    Authorization: `Bearer ${userDetail.token}`
                                },
                        
                        }

        const {data} = await axios.post(`/api/products/addproduct/`,
                            {},
                            config
                            )
        dispatch({
            type: PRODUCT_CREATE_SUC,
            payload : data
        })

    } catch (error) {
        dispatch({type: PRODUCT_CREATE_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}

export const editProduct = (product) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: PRODUCT_EDIT_REQ
        })
        //GET THE TOKEN FOR AUTH
        const {
            userLogin: {userDetail},
        } = getState()

        const config = {headers : {'Content-type' : 'application/json',
                                    Authorization: `Bearer ${userDetail.token}`
                                },
                        
                        }

        const {data} = await axios.put(`/api/products/edit/${product._id}/`,
                            product,
                            config
                            )
        dispatch({
            type: PRODUCT_EDIT_SUC,
            payload : data
        })

        dispatch({
            type : PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({type: PRODUCT_EDIT_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}

