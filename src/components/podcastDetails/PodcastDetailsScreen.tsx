import React, {useContext} from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {Box, Text} from "react-native-design-utility";
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useQuery} from '@apollo/react-hooks';

import {DBContext} from "../../contexts/DBContext";
import feedQuery from '../../graphql/query/feedQuery';
import {FeedQuery, FeedQueryVariables} from '../../types/graphql';
import {SearchStackRouteParamList} from "../../navigators/types";
import {theme} from "../../constants/theme";
import {usePlayerContext} from '../../contexts/playerContext';
import {getWeekDay, humanDuration} from "../../lib/dateTimeHelper";
import {PodcastModel} from "../../models/PodcastModel";

type NavigationParams = RouteProp<SearchStackRouteParamList, "PodcastDetails">;

const PodcastDetailsScreen = () => {
    const {data: podcastData} = useRoute<NavigationParams>().params ?? {};
    const {data, loading} = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
        variables: {
            feedUrl: podcastData.feedUrl,
        },
    });
    const dbContext = useContext(DBContext);
    const playerContext = usePlayerContext();
    const navigation = useNavigation();

    return (
        <Box f={1} bg="white">
            <FlatList
                ListHeaderComponent={
                    <>
                        <Box dir="row" px="sm" mt="sm" mb="md">
                            {podcastData.thumbnail && (
                                <Box mr={10}>
                                    <Image source={{uri: podcastData.thumbnail}} style={styles.thumbnail} />
                                </Box>
                            )}
                            <Box f={1}>
                                <Text size="lg" bold>
                                    {podcastData.podcastName}
                                </Text>
                                <Text size="xs" color="grey">
                                    {podcastData.artist}
                                </Text>
                                <TouchableOpacity onPress={() => dbContext.subToPodcast(new PodcastModel({
                                    artist: podcastData.artist,
                                    episodesCount: podcastData.episodesCount,
                                    feedUrl: podcastData.feedUrl,
                                    name: podcastData.podcastName,
                                    thumbnail: podcastData.thumbnail,
                                }))}>
                                    <Text color="blueLight" size="xs">
                                        Subscribe
                                    </Text>
                                </TouchableOpacity>
                            </Box>
                        </Box>
                        <Box px="sm" mb="md" dir="row" align="center">
                            <Box mr={10}>
                              <TouchableOpacity
                                onPress={() => {
                                    const el = data?.feed[0];
                                    if(!el) return;
                                    playerContext.play({
                                        title: el.title,
                                        artwork: el.image?? podcastData.thumbnail,
                                        id: el.linkUrl,
                                        url: el.linkUrl,
                                        artist: podcastData.artist,
                                    })
                                }}>
                                  <FeatherIcon
                                      name="play"
                                      size={30}
                                      color={theme.color.greenLight}
                                  />
                              </TouchableOpacity>
                            </Box>
                            <Box f={1}>
                                <Text bold>Play</Text>
                                <Text size="sm">{data?.feed[0].title}</Text>
                            </Box>
                        </Box>

                        <Box px="sm" mb="md">
                            <Text bold size="lg">
                                Episodes
                            </Text>
                        </Box>
                        {loading && <Box h={200} center>
                            <ActivityIndicator size="large" color={theme.color.greenLight}/>
                        </Box>}
                    </>
                }
                data={data?.feed}
                ItemSeparatorComponent={() => (
                    <Box w="100%" px="sm" my="sm">
                        <Box style={{height: StyleSheet.hairlineWidth}} bg="greyLighter" />
                    </Box>
                )}
                renderItem={({item}) => (
                    <Box px="sm">
                        <Text size="xs" color="grey">
                            {getWeekDay(new Date(item.pubDate)).toUpperCase()}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Episode Details",
                            {episode: item, podcast: podcastData})}>
                            <Text bold>{item.title}</Text>
                        </TouchableOpacity>
                        <Text size="sm" color="grey" numberOfLines={2}>
                            {item.summary}
                        </Text>
                        <Text size="sm" color="grey">
                            {humanDuration(item.duration)}
                        </Text>
                    </Box>
                )}
                keyExtractor={(item) => item.linkUrl}
            />
        </Box>
    )
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    thumbnail: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
});

export default PodcastDetailsScreen;
