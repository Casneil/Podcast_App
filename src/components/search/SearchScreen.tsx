import React from "react";
import { TextInput, StyleSheet, FlatList } from "react-native";
import { Box, Text } from "react-native-design-utility"
import { useLazyQuery } from "@apollo/react-hooks";
import FeatherIcon from "react-native-vector-icons/Feather";

import { theme } from "../../constants/theme";
import { SearchQueryVariables, SearchQuery, SearchQuery_search } from "../../types/graphql";
import searchQuery from "../../graphql/query/searchQuery";
import SearchEmpty from "../../components/search/SearchEmpty"
import SearchTile from "../../components/search/SearchTile"
import SearchLoading from "../../components/search/SearchLoading"


const SearchScreen = () => {
    const [term, setTerm] = React.useState<string>("");

    const [search, { data, loading, error }]
        = useLazyQuery<SearchQuery, SearchQueryVariables>(searchQuery);

    const onSearch = async () => {
        try {
            await search({ variables: { term } })
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Box f={1} bg="white">
            <Box h={50} w="100%" px="sm" my="sm">
                <Box
                    dir="row"
                    align="center"
                    h={40}
                    radius={10}
                    bg="greyLightest"
                    px="sm">
                    <Box mr={6}>
                        <FeatherIcon name="search" size={20} color={theme.color.greyDark} />
                    </Box>
                    <TextInput
                        style={styles.input} selectionColor={theme.color.blueLightest} placeholder="Search Podcasts.." onChangeText={setTerm} autoCorrect={false} onSubmitEditing={onSearch} value={term} />
                </Box>
            </Box>
            {error ? (<Box f={1} center>
                <Text color="red">{error.message}</Text>
            </Box>) : (<FlatList<SearchQuery_search>
                keyboardShouldPersistTaps="never"
                ListHeaderComponent={<>{loading && <SearchLoading />}</>}
                ListEmptyComponent={<>{!loading && <SearchEmpty />}</>}
                contentContainerStyle={styles.listContentContainer} data={data?.search ?? []} renderItem={({ item }) => (
                    <SearchTile item={item} />
                )} keyExtractor={item => String(item.feedUrl)} />)}
        </Box>
    )
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        fontSize: theme.text.size.md
    },
    listContentContainer: {
        paddingBottom: 90
    }
})

export default SearchScreen;
