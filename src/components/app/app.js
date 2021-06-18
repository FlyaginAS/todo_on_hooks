import React, { useState } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

const App = () => {
  const [state, setState] = useState({
    maxId: 100,
    items: [
      { id: 1, label: 'Drink Coffee', important: false, done: false },
      { id: 2, label: 'Learn React', important: true, done: false },
      {
        id: 3,
        label: 'Make Awesome App',
        important: false,
        done: false,
      },
    ],
    filter: 'all',
    search: '',
  });

  const onItemAdded = (label) => {
    setState((state) => {
      const item = createItem(label);
      return {
        ...state,
        items: [...state.items, item],
      };
    });
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value };
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  };

  const onToggleDone = (id) => {
    setState((state) => {
      const items = toggleProperty(state.items, id, 'done');
      return {
        ...state,
        items,
      };
    });
  };

  const onToggleImportant = (id) => {
    setState((state) => {
      const items = toggleProperty(state.items, id, 'important');
      return { ...state, items };
    });
  };

  const onDelete = (id) => {
    setState((state) => {
      const idx = state.items.findIndex((item) => item.id === id);
      const items = [
        ...state.items.slice(0, idx),
        ...state.items.slice(idx + 1),
      ];
      return { ...state, items };
    });
  };

  const onFilterChange = (filter) => {
    setState((state) => {
      return {
        ...state,
        filter,
      };
    });
  };

  const onSearchChange = (search) => {
    setState((state) => {
      return {
        ...state,
        search,
      };
    });
  };

  const createItem = (label) => {
    return {
      id: App.maxId++,
      label,
      important: false,
      done: false,
    };
  };

  const filterItems = (items, filter) => {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => !item.done);
    } else if (filter === 'done') {
      return items.filter((item) => item.done);
    }
  };

  const searchItems = (items, search) => {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return (
        item.label.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    });
  };

  const { items, filter, search } = state;
  console.log(items);
  const doneCount = items.filter((item) => item.done).length;
  const toDoCount = items.length - doneCount;
  const visibleItems = searchItems(
    filterItems(items, filter),
    search
  );

  return (
    <div className="todo-app">
      <AppHeader toDo={toDoCount} done={doneCount} />

      <div className="search-panel d-flex">
        <SearchPanel onSearchChange={onSearchChange} />

        <ItemStatusFilter
          filter={filter}
          onFilterChange={onFilterChange}
        />
      </div>

      <TodoList
        items={visibleItems}
        onToggleImportant={onToggleImportant}
        onToggleDone={onToggleDone}
        onDelete={onDelete}
      />

      <ItemAddForm onItemAdded={onItemAdded} />
    </div>
  );
};
App.maxId = 100;

export default App;
