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

        USER_PROFILE_VIEW_BY_ID_REQ,
        USER_PROFILE_VIEW_BY_ID_SUC,
        USER_PROFILE_VIEW_BY_ID_FAIL,

        USER_UPDATE_REQ,
        USER_UPDATE_SUC,
        USER_UPDATE_FAIL,
        USER_UPDATE_RESET


    
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

export const userListReducer = (state = { users : [] }, action) => {
    switch(action.type){
        case USER_LIST_REQ:
            return {loading: true}
        case USER_LIST_SUC:
            return {loading: false, users: action.payload}
        case USER_LIST_FAIL:
            return {loading: false, error: action.payload}
        case USER_LIST_RESET:
            return {users:[]}
        default:
            return state
    }

}

export const userDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case USER_DELETE_REQ:
            return {loading: true}
        case USER_DELETE_SUC:
            return {loading: false, success: true}
        case USER_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }

}

export const userViewById = (state = {}, action) => {
    switch(action.type){
        case USER_PROFILE_VIEW_BY_ID_REQ:
            return {loading: true, ...state}
        case USER_PROFILE_VIEW_BY_ID_SUC:
            return {loading: false, state : action.payload}
        case USER_PROFILE_VIEW_BY_ID_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const userUpdateReducer = (state = { user : {} }, action) => {
    switch(action.type){
        case USER_UPDATE_REQ:
            return {loading: true}
        case USER_UPDATE_SUC:
            return {loading: false, success: true}
        case USER_DELETE_FAIL:
            return {loading: false, error: action.payload}
        case USER_UPDATE_RESET:
            return { user:  { } }
        default:
            return state
    }

}
