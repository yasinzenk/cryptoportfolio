import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/crypto">
            <p className="colorNav">Cryptocurrencies</p>
          </Link>
          <Link to="/addInvestment">
            <p className="colorNav">Add an investment</p>
          </Link>
          <Link to="/allinvestments">
            <p className="colorNav">Investments</p>
          </Link>
          <a className="colorNav" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            <p className="colorNav">Login</p>
          </Link>
          <Link to="/signup">
            <p className="colorNav">Sign Up</p>
          </Link>
          <Link to="/crypto">
            <p className="colorNav">Cryptocurrencies</p>
          </Link>
          <Link to="/addInvestment">
            <p className="colorNav">Add an investment</p>
          </Link>
          <Link to="/allinvestments">
            <p className="colorNav">Investments</p>
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
