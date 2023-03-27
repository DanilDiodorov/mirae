import AsyncStorage from "@react-native-async-storage/async-storage"
import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        addRoom(state, action){
            let isExist = false
            state.map(s => {
                if (s.roomID === action.payload.roomID){
                    isExist = true
                }
            })
            if (isExist === false){
                let newRoom = {
                    roomID: action.payload.roomID,
                    friendUID: action.payload.friendUID,
                    friendUsername: action.payload.friendUsername,
                    messages: []
                }
                state = [
                    ...state,
                    newRoom
                ]
                AsyncStorage.setItem('rooms', JSON.stringify(state))
            }     
            return state
        },

        addMessage(state, action){
            state.map(room => {
                if (room.roomID === action.payload.roomID) {
                    room.messages.push({
                        messageID: action.payload.messageID,
                        roomID: action.payload.roomID,
                        senderID: action.payload.senderID,
                        senderUsername: action.payload.senderUsername,
                        sendTo: action.payload.sendTo,
                        text: action.payload.text,
                        time: action.payload.time,
                        status: 0
                    })
                }
            })
            console.log("message is Added")
            AsyncStorage.setItem('rooms', JSON.stringify(state))
            return state
        },

        changeStatus(state, action){
            state.map(room => {
                if (room.roomID === action.payload.roomID){
                    room.messages.map(message => {
                        if (message.messageID === action.payload.messageID){
                            message.status = action.payload.status
                        }
                    })
                }

            })
            AsyncStorage.setItem('rooms', JSON.stringify(state))

            return state
        },

        setRooms(state, action) {
            state = action.payload
            return state
        },

        deleteRooms(state) {
            state = []
            return state
        }
    }
})

export const {addRoom, setRooms, addMessage, deleteRooms, changeStatus} = roomsSlice.actions

export default roomsSlice.reducer