import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { SCREEN_NAME } from "./src/constansts/screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HistoryScreen from "./src/screens/HistoryScreen";
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={SCREEN_NAME.HOME_SCREEN}
          component={HomeScreen}
        ></Stack.Screen>
        <Stack.Screen
          name={SCREEN_NAME.HISTORY_SCREEN}
          component={HistoryScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
