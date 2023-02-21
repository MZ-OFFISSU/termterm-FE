import { useState, useEffect } from "react";
import * as Font from "expo-font";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { Home, Login } from "@screens/index";

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const getFonts = async () => {
    await Font.loadAsync({
      SUIT: require("./assets/fonts/SUIT-Variable.ttf"),
    });
    setIsReady(true);
  };

  useEffect(() => {
    getFonts();
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
