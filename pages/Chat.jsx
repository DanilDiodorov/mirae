import { Text, View } from "react-native"
import { ChatHeader } from "../components/ChatHeader"
import { ChatMessages } from "../components/ChatMessages"
import { ChatFooter } from "../components/ChatFooter"

export const Chat = ({navigation}) => {
    return (
        <View style={{
            display: "flex",
            height: "100%"
        }}>
            <ChatHeader navigation={navigation}/>
            <ChatMessages />
            <ChatFooter />
        </View>
    )
}