import React, { PropTypes } from 'react';

const History = (props) => {
  const renderHistory = (histories) => {
    if(history.length > 0) {
      return props.history.map((history, index) => {
        return (
          <li key={ index }>{ history.displayName }</li>
        );
      })
    } else {
      return false;
    }
  };

  return (
    <div className="history">
      <h1 className="h1">My List</h1>

      <ul className="history-list">
        { renderHistory(props.history) }
      </ul>
    </div>
  );
};

History.defaultProps = {
  history: [],
};

History.propTypes = {
  history: PropTypes.array,
};

export default History;