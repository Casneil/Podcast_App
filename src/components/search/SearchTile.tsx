/* eslint-disable prettier/prettier */
import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SearchQuery_search} from '../../types/graphql';

const SearchTile: React.FC<{item: SearchQuery_search}> = ({item}) => {
  const navigation = useNavigation();
  return (
    <Box h={90} dir="row" align="center" px="sm">
      <Box h={70} w={70} radius={10} mr={10} bg="greenLight">
        {item.thumbnail && (
          <Image source={{uri: item.thumbnail}} style={styles.image} />
        )}
      </Box>
      <Box f={1}>
        <Text numberOfLines={1} bold>
          {item.podcastName}
        </Text>
        <Text size="xs" color="gray">
          {item.artist}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Podcast Details', {
              screen: 'Podcast Details',
              params: {data: item},
            })
          }>
          <Text size="xs" color="greenLight">
            {item.episodesCount} Episodes
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 10,
  },
});

export default SearchTile;
