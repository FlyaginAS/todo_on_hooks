import React, {  useState } from 'react';

import './search-panel.css';

const SearchPanel=(props)=> {
  const [state,setState]=useState({term:'',});
  // state = {
  //   term: ''
  // };
  

  const onTermChange = (e) => {
    const {onSearchChange = () => {}} = props;
    setState({
      term: e.target.value
    });

    onSearchChange(e.target.value);
  };

 
    return (
      
      <input type="text"
             className="form-control search-input"
             placeholder="type to search"
             value={state.term}
             onChange={ onTermChange } />
    );
  
};

export default SearchPanel;

// export default class SearchPanel extends Component {

//   state = {
//     term: ''
//   };

//   onTermChange = (e) => {
//     const {onSearchChange = () => {}} = this.props;
//     this.setState({
//       term: e.target.value
//     });

//     onSearchChange(e.target.value);
//   };

//   render() {
//     return (
//       <input type="text"
//              className="form-control search-input"
//              placeholder="type to search"
//              value={this.state.term}
//              onChange={ this.onTermChange } />
//     );
//   };
// }
