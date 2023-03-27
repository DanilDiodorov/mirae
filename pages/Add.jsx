import { Image, Text, TouchableOpacity, View } from "react-native"
import { Header } from "../components/Header"
import { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { COLORS } from "../config"
import Icon2 from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from "react-redux"
import { addRoom } from "../store/slices/roomsSlice"
import randomstring from 'randomstring'
import { socket } from "../IOConnection"

export const Add = () => {
    const [users, setUsers] = useState([])
    const rooms = useSelector(state => state.rooms)
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        findUsers()
    }, [])

    const findUsers = async () => {
        const usersTemp = []
        const q = query(collection(db, 'users'), where("uid", "!=", auth.currentUser.uid))
        const data = await getDocs(q)
        data.forEach(a => {
            usersTemp.push({
                uid: a.data().uid,
                username: a.data().username
            })
        })
        setUsers(usersTemp)
    }

    const addFriend = (friendUID, friendUsername) => {
        const newRoom = {
            roomID: randomstring.generate(),
            friendUID,
            friendUsername
        }
        dispatch(addRoom(newRoom))
        newRoom.sendTo = friendUID
        newRoom.friendUID = currentUser.uid
        newRoom.friendUsername = currentUser.username
        socket.emit("addRoom", newRoom)
    }

    return (
        <View>
            <Header />
            <View>
            {users.map((user, index) => {
                let isFriend = false
                rooms.map(room => {
                    if (room.friendUID === user.uid)
                        isFriend = true
                })
                return (
                    <View key={index} style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center"
                    }}
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
                                    <Text style={{color: "white", fontSize: 18}}>{user.username}</Text>
                                </View>
                            </View>
                            <View style={{
                                display: "flex",
                                alignItems: "center",
                            }}>
                                {isFriend === false ? (
                                    <TouchableOpacity onPress={() => addFriend(user.uid, user.username)}>
                                        <Icon2 name="add-circle" size={30} color={COLORS.COLOR_BLUE} />
                                    </TouchableOpacity>
                                ): (<></>)}
                            </View>                    
                        </View>
                    </View>
                )
            })}
            </View>
        </View>
    )
}