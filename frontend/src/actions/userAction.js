import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQ, 
    USER_LOGIN_SUC, 
    USER_LOGOUT,
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQ, 
    USER_REGISTER_SUC,

    USER_PROFILE_FAIL,
    USER_PROFILE_SUC,
    USER_PROFILE_REQ,
    USER_PROFILE_RESET,

    USER_PROFILE_CHANGE_FAIL,
    USER_PROFILE_CHANGE_SUC,
    USER_PROFILE_CHANGE_REQ,
    USER_PROFILE_CHANGE_RESET,
    
    } from '../constants/userConstants'

import axios from 'axios'

export const login = (username, password) => async(dispatch)=>{
    try {
        dispatch({
            type: USER_LOGIN_REQ
        })

        const config = {headers : {'Content-type' : 'application/json'}} //config turns api data into 
                                                                        //json for axios to fetch

        const {data} = await axios.post('/api/users/login/', 
                            {'username': username, 'password': password},
                            config
                            )
        dispatch({
            type: USER_LOGIN_SUC,
            payload : data
        })

        localStorage.setItem('userDetail', JSON.stringify(data))

    } catch (error) {
        dispatch({type: USER_LOGIN_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
} 

export const logout = () => (dispatch) =>{
    localStorage.removeItem('userDetail')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_PROFILE_RESET})
}

export const register = (username, password, email) => async(dispatch)=>{
    try {
        dispatch({
            type: USER_REGISTER_REQ
        })

        const config = {headers : {'Content-type' : 'application/json'}}

        const {data} = await axios.post('/api/users/register/', 
                            {'username': username, 'password': password, 'email': email},
                            config
                            )
        dispatch({
            type: USER_REGISTER_SUC,
            payload : data
        })

        dispatch({
            type: USER_LOGIN_SUC,
            payload : data
        })

        localStorage.setItem('userDetail', JSON.stringify(data))

    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
} 

export const getUserDetail = (id) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: USER_PROFILE_REQ
        })

        const {
            userLogin: {userDetail},
        } = getState()

        const config = {headers : {'Content-type' : 'application/json',
                                         Authorization: `Bearer ${userDetail.token}`
                                     },
                        
                        }

        const {data} = await axios.get(`/api/users/${id}/`,
                            config
                            )
        dispatch({
            type: USER_PROFILE_SUC,
            payload : data
        })

    } catch (error) {
        dispatch({type: USER_PROFILE_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}

export const editProfile = (user) => async(dispatch, getState) => {
    try{
        dispatch({
            type: USER_PROFILE_CHANGE_REQ
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

        const {data} = await axios.put(
                `/api/users/profile/edit/`,
                user,
                config
            )
        dispatch({
            type: USER_PROFILE_CHANGE_SUC,
            payload : data
        })

        dispatch({
            type: USER_LOGIN_SUC,
            payload : data
        })

        localStorage.setItem('userDetail', JSON.stringify(data))

    }catch(error){
        dispatch({type: USER_PROFILE_CHANGE_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}