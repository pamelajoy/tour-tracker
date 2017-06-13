import React, { PropTypes } from 'react';
import Artist from './artist.jsx';

const Artists = (props) => {
  const onClick = (id) => {
    return props.onClick(id);
  };

  const renderArtists = (artists) => {
    if(artists.length > 0) {
      return props.artists.map((artist, index) => {
        return (
          <li key={ index }>
            <Artist
              onClick={ onClick }
              displayName={ artist.displayName }
              id={ artist.id }
            />
          </li>
        );
      })
    } else {
      return false;
    }
  };

  return (
    <div className="artists">
      <h1>Artists</h1>
      <ul className="artists-list">
        { renderArtists(props.artists) }
      </ul>
    </div>
  );
};

Artists.defaultProps = {
  artists: [],
};

Artists.propTypes = {
  artists: PropTypes.array,
  onClick: () => {},
};

export default Artists;