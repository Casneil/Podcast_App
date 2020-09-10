/* eslint-disable prettier/prettier */
import React from 'react';

import {Box, Text} from 'react-native-design-utility';

const SearchEmpty = () => {
  return (
    <Box f={1} center>
      <Text color="gray">Podcast empty, please submit a search.</Text>
    </Box>
  );
};

export default SearchEmpty;
