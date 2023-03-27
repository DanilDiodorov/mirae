import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentRoomID: null,
    uid: null,
    username: null
}

const currentRoomSlice = createSlice({
    name: "currentRoom",
    initialState,
    reducers: {
        setCurrenRoom(state, action){
            state = {
                roomID: action.payload.roomID,
                uid: action.payload.uid,
                username: action.payload.username,
            }
            return state
        }
    }
})

export const {setCurrenRoom} = currentRoomSlice.actions

export default currentRoomSlice.reducer