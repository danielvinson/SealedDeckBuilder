import React from 'react';
import Pool from './Pool'

import './SealedDeckBuilder.css'

var SealedDeckBuilder = React.createClass({
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">SealedDeckBuilder</a>
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Home <span className="sr-only">(current)</span></a></li>
              </ul>
            </div>
          </div>
        </nav>
        <Pool set="KTK" />
      </div>
    );
  }
});

export default SealedDeckBuilder;
