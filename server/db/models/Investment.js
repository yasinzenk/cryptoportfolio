const Sequelize = require('sequelize')
const db = require('../db')

const Investment = db.define('investment', {
  purchasePrice: {
    type: Sequelize.DECIMAL()
  },
  amount: {
    type: Sequelize.DECIMAL()
  },
  initialAsset: {
    type: Sequelize.DECIMAL()
  },
  currentValue: {
    type: Sequelize.DECIMAL()
  },
  percentage: {
    type: Sequelize.DECIMAL()
  },
  coin: {
    type: Sequelize.STRING
  }
})

module.exports = Investment
