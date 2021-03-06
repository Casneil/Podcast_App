import React from "react";
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Box, Text} from "react-native-design-utility";
import {SafeAreaView} from "react-native-safe-area-context"
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import RNTrackPlayer from 'react-native-track-player';

import {theme} from '../../constants/theme';
import {makeHitSlop} from '../../constants/metrix';

const QueueScreen = () => {
    const [queue, setQueue] = React.useState<RNTrackPlayer.Track[]>([]);

    const navigation = useNavigation();

    const getQueue = async () => {
        const tracks = await RNTrackPlayer.getQueue();

        console.log('tracks', tracks);

        setQueue(tracks);
    };

    useFocusEffect(
        React.useCallback(() => {
            getQueue();
        }, []),
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Box px="md" dir="row" align="center" justify="between" mb="lg">
                <Box f={1}>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        hitSlop={makeHitSlop(20)}>
                        <Text>Done</Text>
                    </TouchableOpacity>
                </Box>
                <Box f={1} center>
                    <Text bold>Up Next</Text>
                </Box>
                <Box f={1} />
            </Box>

            <ScrollView>
                {queue.map((track) => (
                    <Box h={90} px="md" dir="row" key={track.id}>
                        <Box h={70} w={70} radius={10} bg="blue" mr={10}>
                            {track.artwork && (
                                <Image
                                    source={{uri: track.artwork}}
                                    style={{
                                        height: 70,
                                        width: 70,
                                        borderRadius: 10,
                                    }}
                                />
                            )}
                        </Box>
                        <Box f={1}>
                            <Text bold numberOfLines={1}>
                                {track.title}
                            </Text>
                            <Text size="sm" color="gray">
                                {track.artist}
                            </Text>
                        </Box>
                    </Box>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default QueueScreen;
