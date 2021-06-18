import React, { useState } from 'react';

import './item-add-form.css';

const ItemAddForm = (props) => {
  const [state, setState] = useState({ label: '' });

  const onLabelChange = (e) => {
    setState({
      label: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { label } = state;
    setState({ label: '' });
    const cb = props.onItemAdded || (() => {});
    cb(label);
  };

  return (
    <form className="bottom-panel d-flex" onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control new-todo-label"
        value={state.label}
        onChange={onLabelChange}
        placeholder="What needs to be done?"
      />

      <button type="submit" className="btn btn-outline-secondary">
        Add
      </button>
    </form>
  );
};

export default ItemAddForm;
