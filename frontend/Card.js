import React, { PropTypes, PureComponent } from 'react'

import './Card.css'

export default class Card extends PureComponent {
  static propTypes = {
    card: PropTypes.object,
  }

  render() {
    const { imageUrl, name } = this.props.card
    return (
      <div className="card">
        <img src={imageUrl} alt={name} className="card__image" />
      </div>
    )
  }
}
