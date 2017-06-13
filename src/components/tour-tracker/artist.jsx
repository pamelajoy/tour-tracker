import React, { PropTypes } from 'react';

const Artist = (props) => {
  const onClick = (event) => {
    event.preventDefault();
    return props.onClick(props.id);
  };

  return (
    <div className="artist">
      <a 
        href="#"
        onClick={ onClick }
      >
        { props.displayName }
      </a>
    </div>
  );
};

Artist.defaultProps = {
  displayName: '',
  onClick: () => {},
};

Artist.propTypes = {
  displayName: PropTypes.string,
  id: PropTypes.number,
  onClick: PropTypes.func,
};

export default Artist;