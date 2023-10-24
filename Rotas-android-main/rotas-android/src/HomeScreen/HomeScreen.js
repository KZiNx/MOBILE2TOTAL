import { View, Text, Button } from "react-native/types";

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                title="Go to User Data"
                onPress={() => navigation.navigate("UserData")}
            />
        </View>
    );
}

export default HomeScreen;