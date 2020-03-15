import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CoinCard} from './CoinCard'

export class Crypto extends Component {
  constructor() {
    super()
    this.transformNumber = this.transformNumber.bind(this)
  }

  transformNumber(number) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'USD'
    }).format(number)
  }

  render() {
    const {crypto} = this.props
    return (
      <div className="cryptoContainer">
        {crypto.payload.map((coin, index) => (
          <CoinCard
            key={index}
            coin_name={coin.name}
            symbol={coin.symbol}
            price_usd={this.transformNumber(coin.quote.USD.price)}
            percent_change_24h={coin.quote.USD.percent_change_24h.toFixed(2)}
            percent_change_7d={coin.quote.USD.percent_change_7d.toFixed(2)}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  crypto: state.crypto
})

export const CryptoContainer = connect(mapStateToProps)(Crypto)
