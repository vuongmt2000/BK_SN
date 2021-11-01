import { takeLatest, call, put, select, take } from 'redux-saga/effects'
import { authActions } from '../reducers/authReducer'
import { navigate, replace } from '../navigator/NavigationService';
import Storage from '../utils/Storage';
const axios = require('axios')

export default [
    takeLatest(authActions.requestLogin.type, requestLogin),
    takeLatest(authActions.requestRegister.type, requestRegister)
]


function* requestLogin(action) {
    console.log(`action`, action)
    const { username, password } = action.payload
    try {
        const response = yield axios.post('https://severforappmess.herokuapp.com/api/auth/login', {
            username ,
            password
        });
        console.log(`response`, response)
        if (response.data?.success) {
            replace("HomeDrawer")
            Storage.setItem("token", response.data.accessToken)
            yield put(authActions.loginSuccess(response.data))
        }
    } catch (error) {
        
    }

}



function* requestRegister(action) {
    console.log(`action`, action)
    const { username, password } = action.payload
    try {
        console.log(`123`, 123)
        const response = yield axios.post('https://severforappmess.herokuapp.com/api/auth/register', {
            username ,
            password
        });
        console.log(`response`, response)
        if (response.data?.success) {
            alert("thanh cong")
            
        }
    } catch (error) {

    }

}