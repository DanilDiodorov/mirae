import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    uid: null,
    email: null,
    username: null
}

const currentUserSlice = createSlice({
    name: "currentRoom",
    initialState,
    reducers: {
        setCurrentUser(state, action){
            state = {
                uid: action.payload.uid,
                email: action.payload.email,
                username: action.payload.username,
            }
            return state
        },
        deleteCurrentUser(){
            state = initialState
            return state
        }
    }
})

export const {setCurrentUser} = currentUserSlice.actions

export default currentUserSlice.reducer