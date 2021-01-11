import React from 'react';
import Stage from '../../components/Stage';

// Styles
import '../../styles/App.scss';

class App extends React.Component {

  render () {

    return (
      <div id="app">
        <Stage mode="participant" />
      </div>
    );
  }
}

export default App;