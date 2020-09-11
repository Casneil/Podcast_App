/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/react-hooks';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Box, Text} from 'react-native-design-utility';

import {SearchStackRouteParamList} from '../../navigators/types';
import {theme} from '../../constants/theme';
import {FeedQuery, FeedQueryVariables} from '../../types/graphql';
import feedQuery from '../../graphql/query/feedQuery';
import {getWeekDay, humanDuration} from '../../lib/dateTimeHelper';
import {usePlayerContext} from '../../context/playerContext';

type NavigationParams = RouteProp<SearchStackRouteParamList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
  const {data: podcastData} = useRoute<NavigationParams>().params ?? {};
  const {data, loading} = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {
      feedUrl: podcastData.feedUrl,
    },
  });
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
                  <Image
                    style={styles.image}
                    source={{uri: podcastData.thumbnail}}
                  />
                </Box>
              )}
              <Box f={1}>
                <Text size="large" bold>
                  {podcastData.podcastName}
                </Text>
                <Text size="xs" color="gray">
                  {podcastData.artist}
                </Text>
                <Text size="xs" color="green">
                  Subscribe
                </Text>
              </Box>
            </Box>
            <Box px="sm" mb="md" dir="row" align="center">
              <Box mr={10}>
                <TouchableOpacity
                  onPress={() => {
                    const el = data?.feed[0];
                    if (!el) {
                      return;
                    }
                    playerContext.play({
                      title: el.title,
                      artwork: el.image ?? podcastData.thumbnail,
                      id: el.linkUrl,
                      url: el.linkUrl,
                      artist: podcastData.artist,
                    });
                  }}>
                  <FeatherIcon
                    name="play"
                    size={28}
                    color={theme.color.greenLight}
                  />
                </TouchableOpacity>
              </Box>
              <Box f={1}>
                <Text bold>Play</Text>
                <Text size="sm">{data?.feed[0].title}</Text>
              </Box>
            </Box>
            <Box px="md" mb="md">
              <Text size="lg" bold>
                Episode
              </Text>
            </Box>
            {loading && (
              <Box h={200} center>
                <ActivityIndicator
                  size="large"
                  color={theme.color.greenLighter}
                />
              </Box>
            )}
          </>
        }
        data={data?.feed}
        ItemSeparatorComponent={() => (
          <Box w="100%" px="sm" my="sm">
            <Box style={{height: StyleSheet.hairlineWidth}} bg="greyLighter" />
          </Box>
        )}
        keyExtractor={(item) => item.linkUrl}
        renderItem={({item}) => (
          <Box px="sm">
            <Text size="sm" color="green">
              {getWeekDay(new Date(item.pubDate)).toUpperCase()}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Episode Details', {
                  episode: item,
                  podcast: podcastData,
                })
              }>
              <Text bold>{item.title}</Text>
            </TouchableOpacity>
            <Text size="sm" color="gray" numberOfLines={2}>
              {item.summary}
            </Text>
            <Text size="sm" color="gray" bold>
              {humanDuration(item.duration)}
            </Text>
          </Box>
        )}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default PodcastDetailsScreen;
