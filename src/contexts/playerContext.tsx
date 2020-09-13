import React, {useEffect} from 'react';
import RNTrackPlayer, {
    Track,
    State as TrackPlayerState,
    STATE_PLAYING,
    STATE_PAUSED,
    STATE_STOPPED,
} from 'react-native-track-player';

interface PlayerContextType {
    isPlaying: boolean;
    isPaused: boolean;
    isStopped: boolean;
    isEmpty: boolean;
    currentTrack: Track | null;
    play: (track: Track) => void;
    pause: () => void;
    seekTo: (value?: number) => void;
    goTo: (amount: number) => void;
}

export const playerContext = React.createContext<PlayerContextType>({
    isPlaying: false,
    isPaused: false,
    isStopped: false,
    isEmpty: true,
    currentTrack: null,
    play: () => null,
    pause: () => null,
    seekTo: () => null,
    goTo: () => null
});

export const PlayerContextProvider: React.FC = (props) => {
    const [playerState, setPlayerState] = React.useState<null | TrackPlayerState>(
        null,
    );
    const [currentTrack, setCurrentTrack] = React.useState<null | Track>(null);

    useEffect(() => {
        const listener = RNTrackPlayer.addEventListener(
            'playback-state',
            ({state}: {state: TrackPlayerState}) => {
                setPlayerState(state);
            },
        );

        return () => {
            listener.remove();
        };
    }, []);

    const goTo = async (amount: number) => {
        await await RNTrackPlayer.seekTo(amount);
    };

    const play = async (track: Track) => {
        if (!track) {
            if (currentTrack) {
                await RNTrackPlayer.play();
            }
            return;
        }
        if (currentTrack && track.id !== currentTrack.id) {
            await RNTrackPlayer.reset();
        }
        await RNTrackPlayer.add([track]);
        setCurrentTrack(track);
        await RNTrackPlayer.play();
    };

    const pause = async () => {
        await RNTrackPlayer.pause();
    };

    const seekTo = async (value = 30) => {
        const position = await RNTrackPlayer.getPosition();
        await RNTrackPlayer.seekTo(position + value);
    };

    const value: PlayerContextType = {
        isPlaying: playerState === STATE_PLAYING,
        isPaused: playerState === STATE_PAUSED,
        isStopped: playerState === STATE_STOPPED,
        isEmpty: playerState === null,
        currentTrack,
        pause,
        play,
        seekTo,
        goTo
    };
    return (
        <playerContext.Provider value={value}>
            {props.children}
        </playerContext.Provider>
    );
};

export const usePlayerContext = () => React.useContext(playerContext);
