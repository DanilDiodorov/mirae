import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { COLORS } from "../config"
import { ButtonStyle, InputStyle } from "../GlobalStyles"
import { useState } from "react"
import { auth, db } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import Icon1 from 'react-native-vector-icons/AntDesign'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { collection, getDocs, query, where } from "firebase/firestore"


export const Login= ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const buttonHandle = () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                let currentUser
                const q = query(collection(db, 'users'), where('uid', '==', userCredential.user.uid))
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    const username = doc.data().username
                    currentUser = {
                        uid: userCredential.user.uid,
                        email,
                        username
                    }
                    AsyncStorage.setItem('currentUser', JSON.stringify(currentUser))
                    setError('')
                })
            })
            .catch((e) => {
                setError('Неверный E-mail или пароль')
                console.log(e)
                setLoading(false)
            })
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
                }}>Вход</Text>
                {error ? (
                    <View style={{
                        backgroundColor: COLORS.COLOR_RED,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 5,
                        marginVertical: 10,
                        borderRadius: 5
                    }}>
                        <Text style={{
                            color: "white"
                        }}>Неверный E-mail или пароль</Text>
                    </View>
                ) : (
                    <View></View>
                )}
                <View>
                    <TextInput 
                    style={InputStyle} 
                    placeholderTextColor="grey" 
                    placeholder="Введите E-mail"
                    onChangeText = {text => setEmail(text)}
                    />
                    <TextInput 
                    style={InputStyle} 
                    placeholderTextColor="grey" 
                    placeholder="Введите пароль"
                    onChangeText = {text => setPassword(text)}
                    secureTextEntry
                    />
                    <TouchableOpacity 
                        style={ButtonStyle}
                        onPress={() => buttonHandle()}
                        disabled={loading ? true : false}
                        >
                        <Text style={{color: "white"}}>Войти</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={{
                        marginTop: 10
                    }}>
                        <Text style={{
                            color: "white",
                            textDecorationLine: "underline"
                        }}
                        onPress={() => {navigation.navigate('Signin')}}
                        >Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}