import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./pages/LoginPage.js";
import MapScreen from "./pages/MapScreen.js";
import EmailVerification from "./pages/EmailVerification.js";
import PasswordRequest from "./pages/PasswordRequest.js"
import ForgotPassword from "./pages/ForgotPassword.js";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginPage}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Email"
                    component={EmailVerification}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Request"
                    component={PasswordRequest}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Password"
                    component={ForgotPassword}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Map"
                    component={MapScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
