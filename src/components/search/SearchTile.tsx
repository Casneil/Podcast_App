import React from "react";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {Box, Text} from "react-native-design-utility";
import {SearchQuery_search} from "../../types/graphql";


const SearchTile: React.FC<{item: SearchQuery_search}> = ({item}) => {
    const navigation = useNavigation();

    return (
        <Box align="center" dir="row" h={90} px="sm">
            <Box h={70} w={70} bg="greenLight" radius={10} mr={10}>
                {item.thumbnail && <Image source={{uri: item.thumbnail}} style={styles.image}/>}
            </Box>
            <Box f={1}>
                <TouchableOpacity onPress={() => navigation.navigate("Podcast Details", {data: item})}>
                    <Text bold numberOfLines={1}>{item.podcastName}</Text>
                    <Text color="grey" size="xs">{item.artist}</Text>
                    <Text color="greenLight" size="xs"> {item.episodesCount} episodes</Text>
                </TouchableOpacity>
            </Box>
        </Box>
    )
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 10
    }
});

export default SearchTile;
