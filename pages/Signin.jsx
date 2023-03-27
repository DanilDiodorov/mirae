import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { COLORS } from "../config"
import { ButtonStyle, InputStyle } from "../GlobalStyles"
import { useState } from "react"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const Signin= ({navigation}) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const buttonHandler = async () => {
        const auth = getAuth()
        if (password === password2) {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            await addDoc(collection(db, "users"), {
                uid: user.user.uid,
                email: user.user.email,
                username
            })
            currentUser = {
                uid: user.user.uid,
                email,
                username
            }
            AsyncStorage.setItem('currentUser', JSON.stringify(currentUser))
        }
    }

    return (
        <View style={{
            backgroundColor: COLORS.COLOR_FIRST,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <View style={{
                width: "70%"
            }}>
                <Text style={{
                    color: COLORS.COLOR_BLUE,
                    fontSize: 24
                }}>Регистрация</Text>
                <View>
                    <TextInput style={InputStyle} placeholderTextColor="grey" placeholder="Введите E-mail" onChangeText={text => {setEmail(text)}} />
                    <TextInput style={InputStyle} placeholderTextColor="grey" placeholder="Введите имя пользователя" onChangeText={text => {setUsername(text)}} />
                    <TextInput style={InputStyle} placeholderTextColor="grey" placeholder="Введите пароль" onChangeText={text => {setPassword(text)}}/>
                    <TextInput style={InputStyle} placeholderTextColor="grey" placeholder="Повторите пароль" onChangeText={text => {setPassword2(text)}}/>
                    <TouchableOpacity style={ButtonStyle} onPress={() => {buttonHandler()}}>
                        <Text style={{color: "white"}}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginTop: 10
                    }}>
                        <Text style={{
                            color: "white",
                            textDecorationLine: "underline"
                        }}
                        onPress={() => {navigation.navigate('Login')}}
                        >Войти</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}