import React from "react";
import {Keyboard, ScrollView, StyleSheet, TouchableOpacity} from "react-native";

interface Props {
    withScrollView?: boolean;
}
const KeyboardDismissView: React.FC<Props> = (props) => {
    if(props.withScrollView){
        return (
            <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={styles.container}>
                {props.children}
            </ScrollView>
        )
    }
    return (
        <TouchableOpacity activeOpacity={1} style={styles.container} onPress={Keyboard.dismiss}>
            {props.children}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
});
export default KeyboardDismissView;
