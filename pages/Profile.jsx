import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native"
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from "../config"
import { ButtonStyle, HeaderStyle } from "../GlobalStyles"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const Profile = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const currentUser = useSelector(state => state.currentUser)

    function signOutHandle() {
        AsyncStorage.removeItem('currentUser')
        signOut(auth)
    }

    useEffect(() => {
        setEmail(currentUser.email)
        setUsername(currentUser.username)
    }, [currentUser])

    return (
        <View style={{
            display: "flex",
            height: "100%",
            backgroundColor: COLORS.COLOR_FIRST
        }}>
            <View style={{
                ...HeaderStyle
            }}>
                <View style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%"
                }}>
                    <Text style={{
                        color: "white",
                        fontSize: 18
                    }}>Мой профиль</Text>
                </View>
            </View>
            <View style={{
                flexGrow: 1
            }}>
                <View style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Image source={require('../images/unknown.jpg')}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 100,
                        marginTop: 50
                    }} />
                    <TouchableOpacity>
                        <View style={{
                            top: -50,
                            left: 55,
                            backgroundColor: COLORS.COLOR_BLUE,
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 40
                        }} >
                            <Icon1 name="add-a-photo" size={25} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    paddingHorizontal: 30
                }}>
                    <View style={styles.textBlock}>
                        <Text style={styles.text1}>E-main</Text>
                        <Text style={styles.text2}>{email}</Text>
                    </View>
                    <View style={styles.textBlock}>
                        <Text style={styles.text1}>Имя пользователя</Text>
                        <Text style={styles.text2}>{username}</Text>
                    </View>
                    <TouchableOpacity style={{
                        ...ButtonStyle,
                        backgroundColor: COLORS.COLOR_RED,
                        marginTop: 50
                    }}
                    onPress={() => {signOutHandle()}}
                    >
                        <Text style={{
                            color: "white"
                        }}>Выйти</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text1: {
        color: "grey",
    },
    text2: {
        color: "white",
        fontSize: 18
    },
    textBlock: {
        marginTop: 20
    }
})