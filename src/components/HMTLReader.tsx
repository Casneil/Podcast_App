import React from 'react';
import {Linking} from 'react-native';
import HTML from 'react-native-render-html';
import {theme} from '../constants/theme';

interface Props {
    html: string;
}

const HTMLReader = (props: Props) => {
    return (
        <HTML
            html={props.html}
            onLinkPress={(event, href) => {
                Linking.openURL(href);
            }}
            tagsStyles={{
                a: {color: theme.color.greenLight, fontWeight: 'bold'},
            }}
        />
    );
};

export default HTMLReader;
