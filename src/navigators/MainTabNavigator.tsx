import React from "react"
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"
import FeatherIcon from "react-native-vector-icons/Feather";

import ListenNowScreen from "../components/ListenNow/ListenNowScreen";
import SearchScreen from "../components/search/SearchScreen";
import LibraryScreen from "../components/library/LibraryScreen";
import PodcastDetailsScreen from "../components/podcastDetails/PodcastDetailsScreen";
import { theme } from "../constants/theme";
import MiniPlayer from "../components/miniPlayer/MiniPlayer";

const MainTab = createBottomTabNavigator();
const ListenNowStack = createStackNavigator();
const SearchStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const ICONE_SIZE = 22;

const ListenNowStackNavigator = () => {
    return (
        <ListenNowStack.Navigator>
            <ListenNowStack.Screen options={{
                title: "Listen Now"
            }} name="Listen Now" component={ListenNowScreen} />
        </ListenNowStack.Navigator>
    )
}
const SearchStackNavigator = () => {
    return (
        <SearchStack.Navigator screenOptions={{
            headerTintColor: theme.color.greenLightest,
            headerTitleStyle: {
                color: theme.color.black
            }
        }}
        >
            <SearchStack.Screen name="Search" component={SearchScreen} />
            <SearchStack.Screen name="Podcast Details" options={{ headerTitle: "" }} component={PodcastDetailsScreen} />
        </SearchStack.Navigator>
    )
}
const LibraryStackNavigator = () => {
    return (
        <LibraryStack.Navigator>
            <LibraryStack.Screen name="Library" component={LibraryScreen} />
        </LibraryStack.Navigator>
    )
}

const MainTabNavigator = () => {
    return (
        <MainTab.Navigator
            tabBar={(props) => (
                <>
                    <MiniPlayer />
                    <BottomTabBar {...props} />
                </>
            )}
            tabBarOptions={{
                activeTintColor: theme.color.greenLighter
            }}>
            <MainTab.Screen name="Listen Now" options={{
                title: "Listen Now",
                tabBarIcon: ({ color }) => <FeatherIcon name="headphones" size={ICONE_SIZE} color={color} />
            }} component={ListenNowStackNavigator} />
            <MainTab.Screen name="Library" component={LibraryStackNavigator} options={{
                tabBarIcon: ({ color }) => <FeatherIcon name="inbox" size={ICONE_SIZE} color={color} />
            }} />
            <MainTab.Screen name="Search" component={SearchStackNavigator} options={{
                tabBarIcon: ({ color }) => <FeatherIcon name="search" size={ICONE_SIZE} color={color} />
            }} />
        </MainTab.Navigator>
    )
}

export default MainTabNavigator;