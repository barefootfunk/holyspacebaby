import React from 'react';

export default class BabyColorPicker extends React.Component {
  render() {

    const colors = ['red','orange','yellow','lime','cyan','violet'];

    return (
      <div id="baby-color-picker" className="button-matrix">
        {colors.map(
          color => {
            return (<button className={color} style={{'--color':color}}></button>);
          }
        )}
      </div>
    )
  }
}