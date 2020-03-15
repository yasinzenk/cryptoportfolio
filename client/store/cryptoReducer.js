import axios from 'axios'
import {apiKey} from './../../Utils/Constants'
import history from '../history'

const initialState = {
  isFetching: null,
  payload: [],
  hasError: false,
  errorMessage: null,
  investments: []
}

const FETCHING_COIN_DATA_SUCCESS = 'FETCHING_COIN_DATA_SUCCESS'
const GET_INVESTMENTS = 'GET_INVESTMENTS'
const ADD_INVESTMENT = 'ADD_INVESTMENT'

const FetchCoinData = payload => ({type: FETCHING_COIN_DATA_SUCCESS, payload})
const AddInvestment = investment => ({type: ADD_INVESTMENT, investment})
const GetInvestments = investments => ({type: GET_INVESTMENTS, investments})

export const fetchCoinData = () => async dispatch => {
  try {
    const {data} = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' +
        apiKey.key
    )
    const payload = []
    for (let i = 0; i < 20; i++) {
      payload.push(data.data[i])
    }
    dispatch(FetchCoinData(payload))
  } catch (error) {
    console.log(error)
  }
}

export const addInvestment = (
  coin,
  purchasePrice,
  amount
) => async dispatch => {
  try {
    const {data} = await axios.post('/api/investments', {
      coin,
      purchasePrice,
      amount
    })
    dispatch(AddInvestment(data))
    history.push('/allInvestments')
  } catch (error) {
    console.log(error)
  }
}

export const getInvestments = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/investments')
    dispatch(GetInvestments(data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteInvestment = id => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/investments/${id}`)
    dispatch(getInvestments)
    history.push('/allInvestments')
  } catch (error) {
    console.log(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_COIN_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        payload: action.payload,
        hasError: false,
        errorMessage: null
      })
    case GET_INVESTMENTS: {
      return {...state, investments: action.investments}
    }
    default:
      return state
  }
}
