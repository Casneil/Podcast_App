import React from "react";
import { ActivityIndicator } from "react-native";

import { Box, Text } from "react-native-design-utility";
import { theme } from "../../constants/theme";

const SearchLoading = () => {
    return (
        <Box f={1} center h={300}><ActivityIndicator size="large" color={theme.color.greenLightest} /></Box>
    )
}

export default SearchLoading;