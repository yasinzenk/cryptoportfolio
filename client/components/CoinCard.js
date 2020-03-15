import React from 'react'
import images from './../../Utils/CoinIcons'

const Coin = ({
  symbol,
  coin_name,
  price_usd,
  percent_change_24h,
  percent_change_7d
}) => {
  return (
    <div className="coinContainer">
      <div id="upperRow">
        <img className="coinImg" src={images[symbol]} />
        <p className="coinSymbol">{symbol}</p>
        <p className="separator">|</p>
        <p className="coinName">{coin_name}</p>
        <p className="separator">|</p>
        {percent_change_24h < 0 ? (
          <p className="priceMinus">${price_usd}%</p>
        ) : (
          <p className="pricePlus">${price_usd}</p>
        )}
      </div>
      <div className="stats">
        {percent_change_24h < 0 ? (
          <p className="percentMinus">24h: {percent_change_24h}%</p>
        ) : (
          <p className="percentPlus">24h: {percent_change_24h}%</p>
        )}
        {percent_change_7d < 0 ? (
          <p className="percentMinus">7d: {percent_change_7d}%</p>
        ) : (
          <p className="percentPlus">7d: {percent_change_7d}%</p>
        )}
      </div>
    </div>
  )
}

export const CoinCard = Coin
