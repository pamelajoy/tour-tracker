import { SongKickAPI, SongKickQueryTypes } from '../configs/songkick.js';
import $ from 'jquery';

const Params = (query) => {
  const params = {
    apikey: SongKickAPI.KEY,
    query: query,
  };

  return $.param(params);
};

const getSearchQuery = (type, query) => {
  const params = Params(query);
  return `${SongKickAPI.URL}/search/${type}.json?${params}`;
};

export const querySongKickArtists = (query) => {
  return getSearchQuery(SongKickQueryTypes.ARTISTS, query);
};

const getArtistQuery = (type, id) => {
  const params = Params();
  return `${SongKickAPI.URL}/artists/${id}/${type}.json?${params}`;
};

export const querySongKickArtistEvent = (id) => {
  return getArtistQuery(SongKickQueryTypes.GIGOGRAPHY, id);
};