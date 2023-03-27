import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Friends } from "./Friends"
import { Profile } from "./Profile"
import { Add } from "./Add"
import { COLORS } from "../config"
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addMessage, addRoom, changeStatus, setRooms } from '../store/slices/roomsSlice'
import { setCurrentUser } from '../store/slices/currentUserSlice'
import { socket } from '../IOConnection'
import { auth } from '../firebase'
import { startBackgroundService } from '../backgroundActions'
import BackgroundService from 'react-native-background-actions';

const Tab = createBottomTabNavigator()

let tRooms

export const Main = () => {
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.rooms)

    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    const veryIntensiveTask = async (taskDataArguments) => {
        const { delay } = taskDataArguments;

        await new Promise( async (resolve) => {
            socket.on('addMessage', data => {
                if (data.sendTo === auth.currentUser.uid){
                    socket.emit('messageRecieved', data)
                    BackgroundService.updateNotification({taskTitle: data.senderUsername, taskDesc: data.text});
                    dispatch(addMessage(data))
                }                        
            })
            for (let i = 0; BackgroundService.isRunning(); i++) {

                tRooms.map(room => {
                    room.messages.map(message => {
                        if (message.status === 0 && message.senderID === auth.currentUser.uid){
                            socket.emit("addMessage", message)
                            console.log(message.text + " trying to add again")
                        }
                    })
                })
                await sleep(delay)
            }
        })
    }

    useEffect(() => {
        tRooms = rooms
    }, [rooms])

    useEffect(() => {
        AsyncStorage.getItem('rooms').then((data) => {
            if (data !== null && data !== undefined) {
                dispatch(setRooms(JSON.parse(data)))
            }
        })
        AsyncStorage.getItem('currentUser').then((data) => {
            if (data !== null && data !== undefined) {
                dispatch(setCurrentUser(JSON.parse(data)))
            }
        })
        socket.on('addRoom', data => {
            if (data.sendTo === auth.currentUser.uid){
                dispatch(addRoom(data))
            }
        })
        socket.on("messageOnServer", data => {
            if (data.senderID === auth.currentUser.uid){
                dispatch(changeStatus({
                    roomID: data.roomID,
                    messageID: data.messageID,
                    status: 1
                }))
            }
        })
        socket.on('messageRecieved', data => {
            if (data.senderID === auth.currentUser.uid)
                dispatch(changeStatus({
                    roomID: data.roomID,
                    messageID: data.messageID,
                    status: 2
                }))
        })
        socket.on('messageReaded', data => {
            if (data.senderID === auth.currentUser.uid)
                dispatch(changeStatus({
                    roomID: data.roomID,
                    messageID: data.messageID,
                    status: 3
                }))
        })
        startBackgroundService(veryIntensiveTask)
    }, [])

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let icon
                    let color = focused ? "white" : COLORS.COLOR_BLUE
                    if (route.name === 'Friends') {
                        icon = (<Icon1 name="android-messages" size={30} color={color} />)
                    } 
                    else if (route.name === 'Add') {
                        icon = (<Icon2 name="add-circle" size={50} color={color} />)
                    }
                    else if (route.name === 'Profile'){
                        icon = (<Icon3 name="user" size={30} color={color} />)
                    }
                    return icon
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarLabel: () => {return null},
                tabBarStyle: {
                    backgroundColor: COLORS.COLOR_SECOND,
                    height: 90,
                    borderTopWidth: 0
                }
            })}
        >
            <Tab.Screen name="Friends" component={Friends} options={{ headerShown: false }} />
            <Tab.Screen name="Add" component={Add} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}