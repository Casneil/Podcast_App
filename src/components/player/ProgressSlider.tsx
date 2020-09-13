import React from "react";
import {ProgressComponent} from "react-native-track-player";
import Slider from '@react-native-community/slider';

import {theme} from "../../constants/theme";
import {Box, Text} from "react-native-design-utility";
import {playerContext} from "../../contexts/playerContext";

function buildTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const minutesString = String(minutes).padStart(2, "0");
    const SecondsString = String(seconds).padStart(2, "0");

    if(hours > 0){
        return `${hours}:${minutesString}:${SecondsString}`;
    }
    return `${minutesString}:${SecondsString}`;
}

export class ProgressSlider extends ProgressComponent {
    static contextType = playerContext;
    get totalTime(): string{
        return buildTime(this.state.duration - this.state.position);
    };

    get currentTime(): string {
        return buildTime(this.state.position)
    }
        render(){
            return (
                <>
                    <Slider
                        style={{width: "100%", height: 40}}
                        minimumValue={0}
                        maximumValue={this.state.duration}
                        minimumTrackTintColor={theme.color.greenLight}
                        maximumTrackTintColor={`${theme.color.greenLight} 30`}
                        onSlidingComplete={value => {
                            this.context.goTo(value);
                        }}
                        value={this.state.position}
                    />
                    <Box dir="row" align="center" justify="between">
                        <Text>{this.currentTime}</Text>
                        <Text>{this.totalTime}</Text>
                    </Box>
                </>
            )
        }
}

