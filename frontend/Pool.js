import React, { PropTypes, Component } from 'react'
import axios from 'axios'
import sortBy from 'lodash.sortby'
import uniq from 'lodash.uniq'
import find from 'lodash.find'
import invariant from 'invariant'

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
    boosters: PropTypes.array.isRequired,
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
    const { id, boosters } = this.props
    invariant(
      boosters.length >= 1,
      'Must provide at least one set'
    )
    this.setState({ loading: true, error: null })
    if (id) {
      this.loadPool()
    } else {
      this.generatePool()
    }
  }

  generatePool() {
    const boosterPromises =
      this.props.boosters.map(set => axios.get(`https://api.magicthegathering.io/v1/sets/${set}/booster`))
    Promise.all(boosterPromises)
      .then((responses) => {
        const cards = responses.reduce((cardArr, response) => cardArr.concat(response.data.cards), [])
        this.setState({ cards, loading: false })
      })
      .catch((response) => this.setState({ loading: false, error: 'Failed to generate pool.' }))
  }

  loadPool() {
    axios.get(`/pool/${this.props.id}`)
      .then((response) => {
        const cardIds = JSON.parse(response.data.cards)
        const setPromises = uniq(this.props.boosters).map(set => axios.get(`/sets/${set.toUpperCase()}`))
        Promise.all(setPromises)
          .then((responses) => {
            const cardInfo = responses.reduce((cardArr, response) => cardArr.concat(response.data.cards), [])
            const cards = cardIds.map(id => find(cardInfo, ['multiverseid', id]))
            this.setState({ cards, loading: false })
          })
          .catch((response) => this.setState({ loading: false, error: 'Failed to load card information.' }))
      })
      .catch((response) => this.setState({ loading: false, error: 'Failed to load pool.' }))
  }

  onSave = () => {
    this.setState({ error: null })
    const cards = this.state.cards.map(card => card.multiverseid)
    axios.post('/pool/', { cards })
      .then((response) => {
        this.setState({ id: response.data.pool })
      })
      .catch((response) => this.setState({ error: 'Failed to save.' }))
  }

  render() {
    const { loading, id, cards, error } = this.state
    if (loading) {
      return <div className="pool--loading">Loading...</div>
    }
    const sortedCards = sortBy(cards, [(c) => RARITY_RANK[c.rarity], (c) => getColorRank(c.colors, c.type)])
    return (
      <div className="pool">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {id && <h2>Pool #{id}</h2>}
        {!id && <button className="btn btn-lg btn-primary pool__button" onClick={this.onSave}>
          Save Pool
        </button>}
        <div className="pool__cards">
          {sortedCards.map((card, i) =>
            <Card card={card} key={i} />
          )}
        </div>
      </div>
    )
  }
}

