import { TextInput, TouchableOpacity, View } from "react-native"
import { COLORS } from "../config"
import Icon1 from 'react-native-vector-icons/Ionicons'
import { useState } from "react"
import { auth } from "../firebase"
import { useDispatch, useSelector } from "react-redux"
import { addMessage } from "../store/slices/roomsSlice"
import randomstring from 'randomstring'
import { socket } from "../IOConnection"

export const ChatFooter = () => {
    const [message, setMessage] = useState('')
    const {uid} = auth.currentUser
    const dispatch = useDispatch()
    const currentRoom = useSelector(state => state.currentRoom)
    const currentUser = useSelector(state => state.currentUser)

    const sendHandler = () => {
        let newMessage = {
            messageID: randomstring.generate(),
            roomID: currentRoom.roomID,
            sendTo: currentRoom.uid,
            senderID: uid,
            senderUsername: currentUser.username,
            text: message,
            time: '12:23 PM'
        }
        dispatch(addMessage(newMessage))
        socket.emit("addMessage", newMessage)
        setMessage('')
    }

    return (
        <View style={{
            width: "100%",
            backgroundColor: COLORS.COLOR_SECOND,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 30
        }}>
            <TextInput style={{
                flexGrow: 1,
                height: 40,
                backgroundColor: COLORS.COLOR_FIRST,
                borderRadius: 20,
                paddingHorizontal: 20,
                color: "white",
            }} 
            placeholder="Введите текст" 
            placeholderTextColor="grey"
            onChangeText={(text) => {setMessage(text)}}
            value={message}
            />
            <TouchableOpacity style={{
                marginLeft: 20
            }}
            onPress={() => {sendHandler()}}
            >
                <Icon1 name="send" size={25} color={COLORS.COLOR_BLUE} />
            </TouchableOpacity>
        </View>
    )
}