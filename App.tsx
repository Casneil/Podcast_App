import 'react-native-gesture-handler';
import React from "react";
import { ActivityIndicator } from "react-native";
import TrackPlayer from "react-native-track-player";
import { NavigationContainer } from '@react-navigation/native';
import { UtilityThemeProvider, Box } from "react-native-design-utility"
import { ApolloProvider } from '@apollo/react-hooks';


import { theme } from "./src/constants/theme"
import MainStackNavigator from "./src/navigators/MainStackNavigator";
import { client } from './src/graphql/client';
import { PlayerContextProvider } from './src/context/playerContext';



const App = () => {

  const [ready, setReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      console.log("Player set up");

      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD
        ],
        jumpInterval: 30
      })
      setReady(true);
    });

  }, []);
  return (
    <UtilityThemeProvider theme={theme}>
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
    </UtilityThemeProvider>
  )
}

export default App;


