import React, { useState } from 'react';

import './search-panel.css';

const SearchPanel = (props) => {
  const [state, setState] = useState({ term: '' });

  const onTermChange = (e) => {
    const { onSearchChange = () => {} } = props;
    setState({
      term: e.target.value,
    });

    onSearchChange(e.target.value);
  };

  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="type to search"
      value={state.term}
      onChange={onTermChange}
    />
  );
};

export default SearchPanel;
