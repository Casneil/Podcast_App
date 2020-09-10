/* eslint-disable prettier/prettier */
import {SearchQuery_search} from '../types/graphql';

export type SearchStackRouteParamList = {
  Search: undefined;
  PodcastDetails: {
    data: SearchQuery_search;
  };
};
