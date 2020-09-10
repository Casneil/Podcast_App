/* eslint-disable prettier/prettier */
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';

import {usePlayerContext} from '../../context/playerContext';
import {theme} from '../../constants/theme';

const MiniPlayer = () => {
  const playerContext = usePlayerContext();

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return null;
  }
  return (
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
          {playerContext.isPaused && (
            <TouchableOpacity
              onPress={() => playerContext.play(playerContext.currentTrack!)}>
              <Icon name="play" size={30} />
            </TouchableOpacity>
          )}
          {playerContext.isPlaying && (
            <TouchableOpacity onPress={() => playerContext.pause()}>
              <Icon name="pause" size={30} />
            </TouchableOpacity>
          )}
          {playerContext.isStopped && (
            <TouchableOpacity onPress={() => null}>
              <Icon name="square" size={30} />
            </TouchableOpacity>
          )}
        </Box>
        <Box>
          <TouchableOpacity onPress={() => playerContext.seekTo()}>
            <Icon name="fast-forward" size={30} />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default MiniPlayer;
