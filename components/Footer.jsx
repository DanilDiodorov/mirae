import { TouchableOpacity, View } from "react-native"
import { COLORS } from "../config"
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/FontAwesome'

export const Footer = ({navigation}) => {
    return (
        <View style={{
            height: 90,
            width: "100%",
            backgroundColor: COLORS.COLOR_SECOND,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
        }}>
            <TouchableOpacity onPress={() => {navigation.navigate('Main')}}>
                <Icon1 name="android-messages" size={30} color={COLORS.COLOR_BLUE} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon2 name="add-circle" size={50} color={COLORS.COLOR_BLUE} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Profile')}}>
                <Icon3 name="user" size={30} color={COLORS.COLOR_BLUE} />
            </TouchableOpacity>
        </View>
    )
}