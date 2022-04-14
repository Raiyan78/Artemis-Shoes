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

    USER_LIST_REQ,
    USER_LIST_SUC,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQ,
    USER_DELETE_SUC,
    USER_DELETE_FAIL,

    USER_UPDATE_REQ,
    USER_UPDATE_SUC,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET

    
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
    dispatch({type: USER_LIST_RESET})
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

export const getUserList = () => async(dispatch, getState)=>{
    try {
        dispatch({
            type: USER_LIST_REQ
        })
        //GET THE TOKEN FOR AUTH
        const {
            userLogin: {userDetail},
        } = getState()

        const config = {headers : {'Content-type' : 'application/json',
                                         Authorization: `Bearer ${userDetail.token}`
                                     },
                        
                        }

        const {data} = await axios.get(`/api/users/`,
                            config
                            )
        dispatch({
            type: USER_LIST_SUC,
            payload : data
        })

    } catch (error) {
        dispatch({type: USER_LIST_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}

export const deleteUser = (id) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: USER_DELETE_REQ
        })
        //GET THE TOKEN FOR AUTH
        const {
            userLogin: {userDetail},
        } = getState()

        const config = {headers : {'Content-type' : 'application/json',
                                         Authorization: `Bearer ${userDetail.token}`
                                     },
                        
                        }

        const {data} = await axios.delete(`/api/users/delete/${id}`,
                            config
                            )
        dispatch({
            type: USER_DELETE_SUC,
            payload : data
        })

    } catch (error) {
        dispatch({type: USER_DELETE_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}


export const updateProfile = (user) => async(dispatch, getState) => {
    try{
        dispatch({
            type: USER_UPDATE_REQ
        })

        const {
            userLogin: {userDetail},
        } = getState()

        const config = 
            {
                headers : {
                    'Content-type' : 'application/json',
                    Authorization: `Bearer ${userDetail.token}`,
                        
                },        
            }

        const {data} = await axios.put(
                `/api/users/profile/edit/${user.id}`,
                user,
                config
            )
        dispatch({
            type: USER_UPDATE_SUC,
            payload : data
        })

        //localStorage.setItem('userDetail', JSON.stringify(data))

    }catch(error){
        dispatch({type: USER_UPDATE_FAIL, 
            payload: error.response && error.response.data.message 
                        ?error.response.data.message : error.message})
    }
}


