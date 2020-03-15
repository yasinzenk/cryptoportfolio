import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addInvestment} from '../store/cryptoReducer'
import {SingleInvestment} from './SingleInvestment'
import {InvestmentLine} from './InvestmentLine'
import {getInvestments} from './../store/cryptoReducer'

export class Investments extends Component {
  componentDidMount() {
    this.props.getInvestments()
  }
  render() {
    const cryptoArr = this.props.crypto.payload
    const investments = this.props.crypto.investments
    return (
      <div id="investments">
        {investments.length ? (
          <div>
            <ul>
              {investments.map(investment => (
                <InvestmentLine investment={investment} />
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h3>No investment for the moment</h3>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  crypto: state.crypto,
  investments: state.crypto.investments
})

const mapDispatchToProps = dispatch => {
  return {
    getInvestments: () => dispatch(getInvestments())
  }
}

export const AllInvestments = connect(mapStateToProps, mapDispatchToProps)(
  Investments
)
