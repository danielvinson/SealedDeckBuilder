import React, { PropTypes, Component } from 'react'
import axios from 'axios'
import sortBy from 'lodash.sortby'

import Card from './Card'

import './Pool.css'

const RARITY_RANK = {
  'Mythic Rare': 1,
  'Rare': 2,
  'Uncommon': 3,
  'Common': 4,
  'Basic Land': 5,
}

const COLOR_RANK = {
  'Multicolor': 0,
  'White': 1,
  'Blue': 2,
  'Black': 3,
  'Red': 4,
  'Green': 5,
  'Colorless': 6,
  'Land': 7,
}

function getColorRank(colors, type) {
  let color
  if (!colors) {
    if (type === 'Land') {
      color = 'Land'
    } else {
      color = 'Colorless'
    }
  } else if (colors.length > 1) {
    color = 'Multicolor'
  } else {
    color = colors[0]
  }
  return COLOR_RANK[color]
}

export default class Pool extends Component {
  static propTypes = {
    id: PropTypes.string,
    set: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      cards: [],
      loading: true,
      error: null,
    }
  }

  componentDidMount() {
    this.setState({ loading: true, error: null })
    const boosterPromises = []
    for (var i = 0; i < 6; i++) {
      boosterPromises.push(axios.get(`https://api.magicthegathering.io/v1/sets/${this.props.set}/booster`))
    }
    Promise.all(boosterPromises)
      .then((responses) => {
        const cards = responses.reduce((cardArr, response) => cardArr.concat(response.data.cards), [])
        this.setState({ cards, loading: false })
      })
      .catch((response) => this.setState({ loading: false, error: 'Failed to generate pool.' }))
  }

  onSave = () => {
    this.setState({ error: null })
    axios.post('/pool/', { cards: this.state.cards })
      .then((response) => {
        this.setState({ id: response.data.id })
      })
      .catch((response) => this.setState({ error: 'Failed to save.' }))
  }

  render() {
    const { loading, id, cards } = this.state
    if (loading) {
      return <div className="pool--loading">Loading...</div>
    }
    const sortedCards = sortBy(cards, [(c) => RARITY_RANK[c.rarity], (c) => getColorRank(c.colors, c.type)])
    return (
      <div className="pool">
        {id && <h2>Pool #{id}</h2>}
        <button className="btn btn-lg btn-primary pool__button" onClick={this.onSave}>
          Save Pool
        </button>
        <div className="pool__cards">
          {sortedCards.map((card, i) =>
            <Card card={card} key={i} />
          )}
        </div>
      </div>
    )
  }
}
