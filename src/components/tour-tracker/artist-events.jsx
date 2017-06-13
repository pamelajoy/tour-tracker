import React, { PropTypes } from 'react';
import ArtistEvent from './artist-event.jsx';

const ArtistEvents = (props) => {
  const onClick = ({ lat, lng }) => {
    return props.onClick({ lat, lng });
  };

  const renderArtistEvents = (artistEvents) => {
    if(artistEvents.length > 0) {
      return props.artistEvents.map((artistEvent, index) => {
        return (
          <li key={ index }>
            <ArtistEvent
              id={ artistEvent.id }
              displayName={ artistEvent.displayName }
              city={ artistEvent.location.city }
              venueName={ artistEvent.venue.displayName }
              venueLat={ artistEvent.location.lat }
              venueLng={ artistEvent.location.lng }
              onClick={ onClick }
            />
          </li>
        );
      })
    } else {
      return false;
    }
  };

  return (
    <div className="artist-events">
      <h1>Artist Events</h1>
      <ul className="artist-events-list">
        { renderArtistEvents(props.artistEvents) }
      </ul>
    </div>
  );
};

ArtistEvents.defaultProps = {
  artistEvents: [],
  onClick: () => {},
};

ArtistEvents.propTypes = {
  artistEvents: PropTypes.array,
  onClick: PropTypes.func,
};

export default ArtistEvents;