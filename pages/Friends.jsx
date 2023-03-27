import { View } from "react-native"
import { Header } from "../components/Header"
import { Conversions } from "../components/Conversations"
import { Footer } from "../components/Footer"


export const Friends = ({navigation}) => {
    return (
        <View style={{
            display: "flex",
            height: "100%"
        }}>
            <Header />
            <Conversions navigation={navigation}/>
            {/* <Footer navigation={navigation}/> */}
        </View>
    )
}