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

export const userLoginReducer = (state = { }, action) =>{
    switch(action.type){
        
        case USER_LOGIN_REQ:
            return {loading:true}

        
        case USER_LOGIN_SUC:
            return { loading: false, userDetail: action.payload}

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload}
        
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = { }, action) =>{
    switch(action.type){
        
        case USER_REGISTER_REQ:
            return {loading:true}
 
        case USER_REGISTER_SUC:
            return { loading: false, userDetail: action.payload}

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload}
            
        default:
            return state
    }
}

export const userDetailReducer = (state = { user : {} }, action) => {
    switch(action.type){
        case USER_PROFILE_REQ:
            return {...state, loading: true}
        case USER_PROFILE_SUC:
            return {loading: false, user: action.payload}
        case USER_PROFILE_FAIL:
            return {loading: false, error: action.payload}
        case USER_PROFILE_RESET:
            return {user:{}}
        default:
            return state
    }

}

export const userEditReducer = (state = {}, action) => {
    switch(action.type){
        case USER_PROFILE_CHANGE_REQ:
            return {loading: true}
        case USER_PROFILE_CHANGE_SUC:
            return {loading: false, success: true,  userDetail: action.payload}
        case USER_PROFILE_CHANGE_FAIL:
            return {loading: false, error: action.payload}
        case USER_PROFILE_CHANGE_RESET:
            return {}
        default:
            return state
    }

}