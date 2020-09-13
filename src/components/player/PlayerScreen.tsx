import React from "react";
import {Dimensions, StyleSheet, Image, TouchableOpacity} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Box, Text } from "react-native-design-utility";
import {SafeAreaView} from "react-native-safe-area-context";

import {usePlayerContext} from "../../contexts/playerContext";
import { theme } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import {makeHitSlop} from "../../constants/metrix";
import {ProgressSlider} from "./ProgressSlider";

const {width} = Dimensions.get('window');

const PlayerScreen = () =>{
    const playerContext = usePlayerContext();
    const navigation = useNavigation();

    const track = playerContext.currentTrack;
    if(!track) return null;

    return (
        <SafeAreaView style={styles.safeArea}>
            <Box f={1} bg="white" pt="md" >
                <Box px="md" mb="md" dir="row" align="center" justify="between">
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        hitSlop={makeHitSlop(20)}>
                        <FeatherIcon name="chevron-down" size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Queue")}
                        hitSlop={makeHitSlop(20)}>
                        <FeatherIcon name="list" size={40} />
                    </TouchableOpacity>
                </Box>
                <Box center mb="md">
                    <Image source={{uri: track.artwork}} style={styles.image} />
                </Box>
                <Box center mb="md" px="md">
                    <Text bold center mb="sm">{track.title}</Text>
                    <Text color="grey" size="sm">{track.artist}</Text>
                </Box>
                <Box px="md" mb="sm">
                    <ProgressSlider />
                </Box>
                <Box dir="row" justify="center">
                    <Box>
                        <TouchableOpacity onPress={() => playerContext.seekTo(-10)}>
                            <FeatherIcon name="rewind" size={45} />
                        </TouchableOpacity>
                    </Box>
                    <Box mx={25}>
                        {playerContext.isPaused ? (
                            // @ts-ignore
                            <TouchableOpacity onPress={() => playerContext.play()}>
                                <FeatherIcon name="play" size={65} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={playerContext.pause}>
                                <FeatherIcon name="pause" size={65} />
                            </TouchableOpacity>
                        )}
                    </Box>
                    <Box>
                        <TouchableOpacity onPress={() => playerContext.seekTo()}>
                            <FeatherIcon name="fast-forward" size={45} />
                        </TouchableOpacity>
                    </Box>
                </Box>
            </Box>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white"
    },
    image: {
        width: width - theme.space.md * 2,
        height: width - theme.space.md * 2,
        borderRadius: 10,
    },
});

export default PlayerScreen;
