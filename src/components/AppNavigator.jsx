import React from 'react'
import Home from "../views/Home";
import Profile from "../views/Profile";
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1e325c',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: [
                    {
                        display: "flex"
                    },
                    null
                ]
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ title: 'Home', headerShown: false }} />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{ title: 'My Profile', headerShown: false }} />
        </Tab.Navigator>
    );
}

export default AppNavigation;
