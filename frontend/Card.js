import React, { PropTypes, PureComponent } from 'react'

import './Card.css'

export default class Card extends PureComponent {
  static propTypes = {
    card: PropTypes.object,
  }

  render() {
    const { imageUrl, name, multiverseid } = this.props.card
    const multiverseImage =
      `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${multiverseid}&type=card`
    return (
      <div className="card">
        <img src={imageUrl || multiverseImage} alt={name} className="card__image" />
      </div>
    )
  }
}
