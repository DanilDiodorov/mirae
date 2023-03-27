import { ScrollView, StyleSheet, Text, View } from "react-native"
import { COLORS } from "../config"
import { auth } from "../firebase"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import Icon from 'react-native-vector-icons/Ionicons'

export const ChatMessages = () => {
    const {uid} = auth.currentUser
    const [messages, setMessages] = useState([])
    const rooms = useSelector(state => state.rooms)
    const currentRoom = useSelector(state => state.currentRoom)
    const messageRef = useRef(null)
    const noMessageRef = useRef(null)

    useEffect(() => {
        rooms.map(room => {
            if (room.roomID === currentRoom.roomID) {
                setMessages(room.messages)
            }
        })
        if (messageRef.current !== null)
            messageRef.current.scrollTo({y: 999999})
    }, [rooms])

    return (
        <ScrollView style={{
            backgroundColor: COLORS.COLOR_FIRST,
            width: "100%",
            flexGrow: 1,
            display: "flex",
        }}
        ref={messageRef}
        >
            {messages.map((message, index) => {
                let name = "time-outline"
                let color = "white"
                if (message.status === 0){
                    name = "time-outline"
                }
                else if (message.status === 1) {
                    name = "checkmark"
                }
                else if (message.status === 2) {
                    name = "checkmark-done"
                }
                else if (message.status === 3){
                    name = "checkmark-done"
                    color = "green"
                }
                return (
                    <View style={message.senderID === uid ? styles.myMessage : styles.senderMessage} key={index}>
                        <Text style={{
                            color: "white",
                            fontSize: 16,
                            display: "flex"
                        }}
                        >{message.text}</Text>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            alignSelf: "flex-end",
                            alignItems: "center",
                        }}>
                            <Text style={{                             
                                color: "grey",
                                fontSize: 12,
                                marginTop: 5,
                            }}>{message.time}</Text>
                            {message.senderID === uid ? <Icon style={{marginLeft: 5, marginTop: 5}} name={name} color={color} size={13}></Icon> : <></>}                           
                        </View>                       
                    </View>
                )
            })}
        </ScrollView>
    )
}

const messageDefault = {
    width: "auto",
    maxWidth: "70%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 10,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginTop: 10
}

const styles = StyleSheet.create({
    senderMessage: {
        ...messageDefault,
        backgroundColor: COLORS.COLOR_SECOND,

    },
    myMessage: {
        ...messageDefault,
        backgroundColor: COLORS.COLOR_BLUE,
        alignSelf: "flex-end"
    }
})