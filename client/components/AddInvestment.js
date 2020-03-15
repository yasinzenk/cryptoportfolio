import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addInvestment} from './../store/cryptoReducer'

export class Investment extends Component {
  constructor() {
    super()
    this.state = {
      coin: 'BTC'
    }
    this.handleChangeCoin = this.handleChangeCoin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeCoin(evt) {
    this.setState({
      coin: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const coin = this.state.coin
    const purchasePrice = evt.target.purchasePrice.value
    const amount = evt.target.amount.value
    this.props.addInvestment(coin, purchasePrice, amount)
    evt.target.purchasePrice.value = ''
    evt.target.amount.value = ''
  }
  render() {
    const cryptoArr = this.props.crypto.payload
    return (
      <div>
        <h1>New Investment</h1>
        <form className="submitForm" onSubmit={this.handleSubmit}>
          <select onChange={this.handleChangeCoin} value={this.state.coin}>
            {cryptoArr.map(element => (
              <option value={element.symbol}>{element.symbol}</option>
            ))}
          </select>
          <div>
            <label htmlFor="purchasePrice">
              <p>Purchase Price (USD)</p>
            </label>
            <input name="purchasePrice" required type="text" />
          </div>
          <div>
            <label htmlFor="amount">
              <p>Amount ({this.state.coin})</p>
            </label>
            <input name="amount" required type="text" />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  crypto: state.crypto
})

const mapDispatchToProps = dispatch => {
  return {
    addInvestment: (coin, purchasePrice, amount) =>
      dispatch(addInvestment(coin, purchasePrice, amount))
  }
}

export const AddInvestment = connect(mapStateToProps, mapDispatchToProps)(
  Investment
)
