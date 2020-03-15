import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addInvestment} from '../store/cryptoReducer'

export class Investment extends Component {
  render() {
    const cryptoArr = this.props.crypto.payload
    return (
      <div className="investmentContainer">
        <div className="currentValueContainer">p</div>
        <div className="initialAssetContainer">p</div>
        <div className="currentRate" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  crypto: state.crypto
})

const mapDispatchToProps = dispatch => {
  return {}
}

export const SingleInvestment = connect(mapStateToProps, mapDispatchToProps)(
  Investment
)
