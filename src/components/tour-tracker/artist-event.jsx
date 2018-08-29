import React, { PropTypes } from 'react';

const ArtistEvent = (props) => {
  const onClick = (event) => {
    event.preventDefault();
    return props.onClick({ 
      lat: props.venueLat, 
      lng: props.venueLng,
    });
  };
//setState to run mapPin function
  return (
    <div className="artist-event">
      <p>
        <a 
          href="#"
          onClick={ onClick }
        >
          { props.displayName }
        </a>
      </p>
      <p>
        { props.venueName }
      </p>
      <p>
        { props.city }
      </p>
    </div>
  );
};

ArtistEvent.defaultProps = {
  displayName: '',
  onClick: () => {},
  // save this for later
};

ArtistEvent.propTypes = {
  id: PropTypes.number,
  displayName: PropTypes.string,
  city: PropTypes.string,
  venueName: PropTypes.string,
  venueLat: PropTypes.number,
  venueLng: PropTypes.number,
  onClick: PropTypes.func,
};

export default ArtistEvent;