import React, { Component } from 'react';
import qs from 'qs'
import Pool from './Pool'

import './SealedDeckBuilder.css'

export default class SealedDeckBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poolId: null,
      boosters: ['KTK', 'KTK', 'KTK', 'KTK', 'KTK', 'KTK'],
    }
  }

  componentWillMount() {
    const params = qs.parse(window.location.search.substr(1))
    if (params.pool) {
      this.setState({
        poolId: params.pool,
      })
    }
    if (params.boosters) {
      this.setState({
        boosters: params.boosters.split(','),
      })
    }
  }

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
        <Pool id={this.state.poolId} boosters={this.state.boosters} />
      </div>
    )
  }
}
