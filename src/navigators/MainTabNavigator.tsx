import React from "react";
import {createBottomTabNavigator,  BottomTabBar,} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import FeatherIcon from 'react-native-vector-icons/Feather';

import EpisodeDetailsScreen from '../components/episodeDetails/EpisodeDetailsScreen';
import LibraryScreen from "../components/library/LibraryScreen";
import ListenNowScreen from "../components/listenNow/ListenNowScreen";
import SearchScreen from "../components/search/SearchScreen";
import MiniPlayer from '../components/miniPlayer/MiniPlayer';
import PodcastDetailsScreen from "../components/podcastDetails/PodcastDetailsScreen";
import {theme} from "../constants/theme";

const MainTab = createBottomTabNavigator();

const LibraryStack = createStackNavigator();
const ListenNowStack = createStackNavigator();
const SearchStack = createStackNavigator();

const ICONE_SIZE = 22;

const LibraryStackNavigator = () => {
    return (
        <LibraryStack.Navigator screenOptions={{
            headerTintColor: theme.color.greenLight
        }}>
            <LibraryStack.Screen name="Library" component={LibraryScreen}/>
        </LibraryStack.Navigator>
    )
};

const ListenNowStackNavigator = () => {
    return (
        <ListenNowStack.Navigator screenOptions={{
            headerTintColor: theme.color.greenLight
        }}>
            <ListenNowStack.Screen options={{
                title: "Listen"
            }} name="Listen" component={ListenNowScreen}/>
        </ListenNowStack.Navigator>
    )
};


const SearchStackNavigator = () => {
    return (
        <SearchStack.Navigator screenOptions={{
            headerTintColor: theme.color.greenLight,
            headerBackTitle: "Back"
        }}>
            <SearchStack.Screen name="Search" component={SearchScreen}/>
            <SearchStack.Screen
                name="Podcast Details"
                component={PodcastDetailsScreen}
                options={{headerTitle: ""}}
            />
            <SearchStack.Screen
                name="Episode Details"
                component={EpisodeDetailsScreen}
                options={{headerTitle: ""}}
            />
        </SearchStack.Navigator>
    )
};

const MainTabNavigator = () => {
    return (
        <MainTab.Navigator
            tabBar={(props: any) => (
                <>
                    <MiniPlayer />
                    <BottomTabBar {...props} />
                </>
            )}
            tabBarOptions={{
            activeTintColor: theme.color.greenLight
        }}>
            <MainTab.Screen options={{
                title: "Listen",
                // @ts-ignore
                tabBarIcon: ({color}) => <FeatherIcon name="headphones" size={ICONE_SIZE} color={color}/>
            }} name="Listen" component={ListenNowStackNavigator}/>

            <MainTab.Screen options={{
                // @ts-ignore
                tabBarIcon: ({color}) => <FeatherIcon name="inbox" size={ICONE_SIZE} color={color}/>
            }} name="Library" component={LibraryStackNavigator}/>

            <MainTab.Screen options={{
                // @ts-ignore
                tabBarIcon: ({color}) => <FeatherIcon name="search" size={ICONE_SIZE} color={color}/>
            }} name="Search" component={SearchStackNavigator}/>
        </MainTab.Navigator>
    )
};

export default MainTabNavigator;
