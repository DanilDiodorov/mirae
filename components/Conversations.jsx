import { View, Text, TouchableOpacity, Image } from "react-native"
import { COLORS } from "../config"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrenRoom } from "../store/slices/currentRoomSlice"

export const Conversions = ({navigation}) => {
    const rooms = useSelector(state => state.rooms)
    const dispatch = useDispatch()

    function clickHandle(roomID, uid, username){
        dispatch(setCurrenRoom({
            roomID,
            uid,
            username
        }))
        navigation.navigate('Chat')
    }

    useEffect(() => {
    }, [rooms])

    return (
        <View style={{
            backgroundColor: COLORS.COLOR_FIRST,
            width: "100%",
            flexGrow: 1
        }}>
            {rooms.map((room, index) => {
                return (
                    <TouchableOpacity key={index} style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center"
                    }}
                    onPress={() => {clickHandle(room.roomID, room.friendUID, room.friendUsername)}}
                    >
                        <View style={{
                            borderColor: "#28313A",
                            borderBottomWidth: 1,
                            height: 80,
                            width: "90%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <View>
                                    <Image source={require('../images/unknown.jpg')}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 50
                                    }} />
                                </View>
                                <View style={{
                                    marginLeft: 15
                                }}>
                                    <Text style={{color: "white", fontSize: 18}}>{room.friendUsername}</Text>
                                    <Text style={{color: "white", fontSize: 12, marginTop: 3}}>{room.messages.length !== 0 ? room.messages[room.messages.length - 1].text : <></>}</Text>
                                </View>
                            </View>
                            <View style={{
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <Text style={{
                                    color: "white",
                                    fontSize: 12
                                }}>{room.messages.length !== 0 ? room.messages[room.messages.length - 1].time : <></>}</Text>
                                {/* <View style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: COLORS.COLOR_BLUE,
                                    borderRadius: 50,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 10
                                }}>
                                    <Text style={{
                                    color: "white",
                                    fontSize: 12
                                    }}>1</Text>
                                </View> */}
                            </View>
                            
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}