import React, { PropsWithChildren } from "react";
import { ScrollView, TouchableOpacity, StyleSheet, Keyboard } from "react-native";


interface Props {
    withScrollView: boolean;
}

const KeyboardDismissView: React.FC<Props> = (props: PropsWithChildren<Props>) => {
    if (props.withScrollView) {
        return (
            <ScrollView keyboardShouldPersistTaps="never">
                {props.children}
            </ScrollView>
        )
    }
    return (
        <TouchableOpacity style={style.container} activeOpacity={1} onPress={Keyboard.dismiss}>
            {props.children}
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default KeyboardDismissView;