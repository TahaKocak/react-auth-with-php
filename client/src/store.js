import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './stores/user'

export default configureStore({
    reducer : {
        User: UserReducer
    }
})
