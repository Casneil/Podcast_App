import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { ActivityIndicator } from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import { ApolloProvider } from '@apollo/react-hooks';
import TrackPlayer from 'react-native-track-player';

import {UtilityThemeProvider, Box } from "react-native-design-utility";
import {client} from "./src/graphql/client";
import { PlayerContextProvider } from './src/contexts/playerContext';
import {theme} from "./src/constants/theme";
import MainStackNavigator from "./src/navigators/MainStackNavigator";
import {DBProvider} from "./src/contexts/DBContext";

const App = () => {
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        TrackPlayer.setupPlayer().then(() => {

            TrackPlayer.updateOptions({
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_STOP,
                    TrackPlayer.CAPABILITY_JUMP_FORWARD,
                    TrackPlayer.CAPABILITY_JUMP_BACKWARD
                ],
                jumpInterval: 30
            });
            // The player is ready to be used
            setReady(true);
        });

    }, []);
    return (
        <UtilityThemeProvider theme={theme}>
          <DBProvider>
              <ApolloProvider client={client}>
                  {ready ? (
                      <PlayerContextProvider>
                          <NavigationContainer>
                              <MainStackNavigator />
                          </NavigationContainer>
                      </PlayerContextProvider>
                  ) : (
                      <Box f={1} center>
                          <ActivityIndicator />
                      </Box>
                  )}
              </ApolloProvider>
          </DBProvider>
        </UtilityThemeProvider>
    )
};

export default App;




