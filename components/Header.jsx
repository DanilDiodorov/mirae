import { Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLORS } from "../config"
import { HeaderStyle } from "../GlobalStyles"

export const Header = () => {
    return (
        <View style={{
            ...HeaderStyle
        }}>
            <TouchableOpacity onPress={() => {}}>
                <Icon name="search" size={25} color={COLORS.COLOR_BLUE} />
            </TouchableOpacity>
            <Text style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
            }}>MIRAE</Text>
            <Icon name="edit" size={25} color={COLORS.COLOR_BLUE} />
        </View>
    )
}