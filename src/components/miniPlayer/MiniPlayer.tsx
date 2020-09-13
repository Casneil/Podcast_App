import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {usePlayerContext} from '../../contexts/playerContext';
import {theme} from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';

const MiniPlayer = () => {
    const playerContext = usePlayerContext();
    const navigation = useNavigation();

    if (playerContext.isEmpty || !playerContext.currentTrack) {
        return null;
    }
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Player")}>
            <Box
                h={75}
                bg="white"
                px="md"
                style={{borderTopWidth: 1, borderTopColor: theme.color.greenLightest}}>
                <Box f={1} dir="row" align="center" justify="between">
                    <Box
                        h={50}
                        w={50}
                        bg="greenLight"
                        mr={10}
                        radius={10}
                        style={{overflow: 'hidden'}}>
                        <Image
                            source={{uri: playerContext.currentTrack.artwork}}
                            style={{flex: 1}}
                        />
                    </Box>
                    <Box f={1} mr={20}>
                        <Text numberOfLines={1}>{playerContext.currentTrack.title}</Text>
                    </Box>
                    <Box mr={10}>
                        {playerContext.isPaused ? (
                            // @ts-ignore
                            <TouchableOpacity onPress={() => playerContext.play()}>
                                <FeatherIcon name="play" size={30} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={playerContext.pause}>
                                <FeatherIcon name="pause" size={30} />
                            </TouchableOpacity>
                        )}
                    </Box>
                    <Box>
                        <TouchableOpacity onPress={() => playerContext.seekTo()}>
                            <FeatherIcon name="fast-forward" size={30} />
                        </TouchableOpacity>
                    </Box>
                </Box>
            </Box>
        </TouchableOpacity>
    );
};

export default MiniPlayer;
