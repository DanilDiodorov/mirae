import { configureStore } from "@reduxjs/toolkit"
import currentRoomReducer from './slices/currentRoomSlice'
import currentUserReducer from './slices/currentUserSlice'
import roomsReducer from './slices/roomsSlice'

export const store = configureStore({
    reducer: {
        rooms: roomsReducer,
        currentRoom: currentRoomReducer,
        currentUser: currentUserReducer
    }
})