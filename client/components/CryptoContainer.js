import React, {Component} from 'react'
import {connect} from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {classes} from 'istanbul-lib-coverage'
import images from './../../Utils/CoinIcons'

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
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <p>Logo</p>
                </TableCell>
                <TableCell align="right">
                  <p>Symbol</p>
                </TableCell>
                <TableCell align="right">
                  <p>Name</p>
                </TableCell>
                <TableCell align="right">
                  <p>Price</p>
                </TableCell>
                <TableCell align="right">
                  <p>24h percent change</p>
                </TableCell>
                <TableCell align="right">
                  <p>7d percent change</p>
                </TableCell>
                <TableCell align="right">
                  <p>Market cap</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {crypto.payload.map((coin, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img className="coinImg" src={images[coin.symbol]} />
                  </TableCell>
                  <TableCell className="coinSymbol" align="right">
                    <p>{coin.symbol}</p>
                  </TableCell>
                  <TableCell className="coinName" align="right">
                    <p>{coin.name}</p>
                  </TableCell>
                  <TableCell align="right">
                    {coin.quote.USD.percent_change_24h < 0 ? (
                      <p className="priceMinus">
                        ${this.transformNumber(coin.quote.USD.price)}
                      </p>
                    ) : (
                      <p className="pricePlus">
                        ${this.transformNumber(coin.quote.USD.price)}
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {coin.quote.USD.percent_change_24h < 0 ? (
                      <p className="priceMinus">
                        24h: {coin.quote.USD.percent_change_24h.toFixed(2)}%
                      </p>
                    ) : (
                      <p className="pricePlus">
                        24h: {coin.quote.USD.percent_change_24h.toFixed(2)}%
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {coin.quote.USD.percent_change_7d < 0 ? (
                      <p className="priceMinus">
                        7d: {coin.quote.USD.percent_change_7d.toFixed(2)}%
                      </p>
                    ) : (
                      <p className="pricePlus">
                        7d: {coin.quote.USD.percent_change_7d.toFixed(2)}%
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <p>{this.transformNumber(coin.quote.USD.market_cap)}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  crypto: state.crypto
})

export const CryptoContainer = connect(mapStateToProps)(Crypto)
