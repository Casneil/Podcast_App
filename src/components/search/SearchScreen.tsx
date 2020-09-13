import React from "react";
import {FlatList, StyleSheet, TextInput} from "react-native";
import {useLazyQuery} from '@apollo/react-hooks';
import {Box, Text} from "react-native-design-utility";
import FeatherIcon from 'react-native-vector-icons/Feather';

import {theme} from "../../constants/theme";
import searchQuery from "../../graphql/query/searchQuery";
import SearchEmpty from "./SearchEmpty";
import {SearchQuery, SearchQuery_search, SearchQueryVariables} from "../../types/graphql";
import SearchTile from "./SearchTile";
import SearchLoading from "./SearchLoading";

const SearchScreen = () => {
    const [term, setTerm] = React.useState<string>('');
    const [search, {data, loading, error}] = useLazyQuery<SearchQuery,
        SearchQueryVariables>(searchQuery);

    const onSearch = async () => {
        try {
            await search({variables: {term}});
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Box f={1} bg="white">
            <Box h={50} w="100%" px="sm" my="sm">
             <Box dir="row" align="center"
                  h={40} bg="greyLightest"
                  radius={10} px="sm">
                 <Box mr={1}>
                     <FeatherIcon name="search" size={20} color={theme.color.greyDark} />
                 </Box>
                 <TextInput style={styles.input}
                            placeholder="Search Podcast"
                            selectionColor={theme.color.greenLight}
                            onChangeText={setTerm}
                            autoCorrect={false}
                            onSubmitEditing={onSearch}
                            value={term}
                 />
             </Box>
            </Box>
            {error ? (
                <Box f={1} center>
                    <Text color="red">{error.message}</Text>
                </Box>
            ) : (
                <FlatList<SearchQuery_search>
                    keyboardShouldPersistTaps="never"
                    data={data?.search ?? []}
                    renderItem={({item}) => <SearchTile item={item}/>}
                    keyExtractor={item => String(item.feedUrl)}
                    contentContainerStyle={styles.listContentContainer}
                    ListEmptyComponent={<>{!loading && <SearchEmpty/>}</>}
                    ListHeaderComponent={
                        <>
                            {loading && <SearchLoading/>}
                        </>
                    }
                />
            )}
        </Box>
    )
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        flex: 1,
        backgroundColor: theme.color.greyLightest,
        borderRadius: 10,
        paddingHorizontal: theme.space.sm,
        fontSize: theme.text.size.md
    },
    list: {
        minHeight: "100%"
    },
    listContentContainer: {
        paddingBottom: 90
    }
});

export default SearchScreen;
