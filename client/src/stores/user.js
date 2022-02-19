import {createSlice} from "@reduxjs/toolkit";

export const User = createSlice({
    name : 'User',
    initialState : {
        value: false
    },
    reducers: {
        set: (state,user) => {
            state.value = user.payload
        },
        unset: (state) => {
            state.value = null
        }
    }
})


export const { set,unset } = User.actions
export default User.reducer