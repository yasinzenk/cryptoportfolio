import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {apiKey} from './../../Utils/Constants'

import {deleteInvestment} from './../store/cryptoReducer'

import {deleteInvestment, fetchCoinData} from './../store/cryptoReducer'

import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

class Investment extends Component {
  constructor() {
    super()
    this.state = {
      selectedCoin: {
        quote: {
          USD: {
            price: ''
          }
        }
      }
    }
    this.transformNumber = this.transformNumber.bind(this)
    this.deleteInvestment = this.deleteInvestment.bind(this)
  }

  transformNumber(number) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'USD'
    }).format(number)
  }

  deleteInvestment() {
    this.props.deleteInvestment(this.props.investment.id)
  }

  async componentDidMount() {
    await this.props.fetchCoinData()
    let coin = {}
    for (let i = 0; i < 20; i++) {
      if (this.props.payload[i].symbol === this.props.investment.coin) {
        coin = this.props.payload[i]
      }
    }
    this.setState({
      selectedCoin: coin
    })
  }
  deleteInvestment() {
    this.props.deleteInvestment(this.props.investment.id)
  }
  render() {
    const investment = this.props.investment
    const initialAsset = this.transformNumber(investment.initialAsset)
    const currentAsset = this.transformNumber(
      investment.amount * this.state.selectedCoin.quote.USD.price
    )
    const currentPrice = this.transformNumber(
      this.state.selectedCoin.quote.USD.price
    )
    const difference =
      investment.amount * this.state.selectedCoin.quote.USD.price -
      investment.initialAsset
    const currencyDiff = this.transformNumber(difference)
    return (
      <div>
        <div className="invest-line">
          <div className="nameOnTheCart">
            <h3>{investment.coin} Investment</h3>
          </div>
          <div className="WinOrLose">
            {difference < 0 ? (
              <div>
                <h1 className="priceMinus">{currencyDiff}</h1>
                <h4 className="priceMinus">Loss</h4>
              </div>
            ) : (
              <div>
                <h1 className="pricePlus">{currencyDiff}</h1>
                <p className="pricePlus">Gain</p>
              </div>
            )}
          </div>
          <div className="initialAsset">
            <p>Initial Asset</p>
            <h3>{initialAsset}</h3>
            <p className="comment">
              ({investment.amount} {investment.coin} for{' '}
              {investment.purchasePrice}$ each)
            </p>
          </div>
          <div className="valueAmount">
            <div className="currentAsset">
              <p>Current value</p>
              {investment.initialAsset > investment.amount * currentPrice ? (
                <h3>{currentAsset}</h3>
              ) : (
                <h3>{currentAsset}</h3>
              )}
            </div>
            <div className="currentPrice">
              <p> Current rate</p>
              <h3>
                {currentPrice} for each {investment.coin}
              </h3>
            </div>
            <div className="amount">
              <p>Amount</p>
              <h3>
                {investment.amount} {investment.coin}
              </h3>
            </div>
          </div>
          <Button
            variant="contained"
            color="secondary"
            className="deleteButton"
            startIcon={<DeleteIcon />}
            onClick={this.deleteInvestment}
          >
            Delete this investment
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    crypto: state.crypto,
    payload: state.crypto.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteInvestment: id => dispatch(deleteInvestment(id)),
    fetchCoinData: () => dispatch(fetchCoinData())
  }
}

export const InvestmentLine = connect(mapStateToProps, mapDispatchToProps)(
  Investment
)
