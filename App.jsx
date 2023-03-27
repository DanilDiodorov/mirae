import { Main } from './pages/Main'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Chat } from './pages/Chat'
import { useEffect, useState } from 'react'
import { Login } from './pages/Login'
import { Signin } from './pages/Signin'
import {useAuth} from './hooks/useAuth'
import { CardStyleInterpolators, createStackNavigator  } from '@react-navigation/stack'
import { COLORS } from './config'
import { Provider } from 'react-redux'
import { store } from './store'
import { auth } from './firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signOut } from 'firebase/auth'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.COLOR_FIRST
  },
}

const Stack = createStackNavigator ()

export default function App() {
    const [isLogged, setIsLogged] = useState(false)
    const currentUser = useAuth()
    useEffect(() => {
        if (auth.currentUser){
            setIsLogged(true)
        }
        else {
            setIsLogged(false)
        }
    }, [currentUser])

    return (
        <Provider store={store}>
            <NavigationContainer theme={MyTheme}>
                {isLogged ? (
                    <Stack.Navigator screenOptions={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}>
                        <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
                        <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator screenOptions={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }}>
                        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                        <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
                    </Stack.Navigator>
                )
                }
            </NavigationContainer>
        </Provider>  
    )
}

