import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    infoAcc: {},
    token: "" 
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        requestLogin: (state, { payload }) => {
        },
        loginSuccess: (state, { payload }) => {
            state.token = payload.accessToken
        },
        requestUpdatePhoneFid: (state, { payload }) => {

        },
        requestRegister: (state, {payload}) => {},
        registerSuccess : (state, {payload}) =>{

        },
        confirmUpdatePhoneFid: (state, { payload }) => { },
        requestUpdateEmailFid: (state, { payload }) => { },
        requestChangePassword: (state, { payload }) => { },
    }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer