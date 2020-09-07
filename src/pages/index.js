import React from 'react';
import Stage from '../components/Stage';

// Styles
import '../styles/App.scss';

class App extends React.Component {

  render () {

    const {location} = this.props;

    return (
      <div id="app">
        <Stage mode="audience" />
      </div>
    );
  }
}

export default App;