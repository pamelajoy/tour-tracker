import React, { PropTypes } from 'react';

const Search = (props) => {
  const onChange = (event) => {
    const query = event.target.value;
    return props.onChange(query);
  };

  return (
    <div className="search">
      Search

      <input 
        type="text"
        onChange={ onChange }
        defaultValue={ props.query }
      />

      <button 
        className="btn btn-primary"
        onClick={ props.onSearch }
      >
        + Add New
      </button>
    </div>
  );
};

Search.defaultProps = {
  onChange: () => {},
  onSearch: () => {},
};

Search.propTypes = {
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  query: PropTypes.string,
};

export default Search;