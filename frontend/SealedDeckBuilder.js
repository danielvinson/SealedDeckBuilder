import React from 'react';
import Pool from './Pool'

var SealedDeckBuilder = React.createClass({
  render() {
    return (
      <div>
        <h1>Sample Pool</h1>
        <Pool set="KTK" />
      </div>
    );
  }
});

export default SealedDeckBuilder;
