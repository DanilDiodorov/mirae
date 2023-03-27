import { Text, TouchableOpacity, View } from "react-native"
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Entypo'
import { COLORS } from "../config"
import { HeaderStyle } from "../GlobalStyles"
import { useSelector } from "react-redux"

export const ChatHeader = ({navigation}) => {
    const {username} = useSelector(state => state.currentRoom)

    return (
        <View style={{
            ...HeaderStyle
        }}>
            <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Icon1 name="arrow-back" size={30} color={COLORS.COLOR_BLUE} />
                </TouchableOpacity>
                <View style={{
                    marginLeft: 20
                }}>
                    <Text style={{
                        color: "white",
                        fontSize: 18,
                    }}>{username}</Text>
                    <Text style={{
                        color: "white",
                        fontSize: 12,
                    }}>Online</Text>
                </View>
                
            </View>
            <Icon2 name="dots-three-vertical" size={25} color={COLORS.COLOR_BLUE} />
        </View>
    )
}