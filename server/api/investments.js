const router = require('express').Router()
const {Investment} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const investments = await Investment.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.json(investments)
  } catch (error) {
    next(error)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const investment = await Investment.findByPk(req.body.id)
    res.json(investment)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const investment = await Investment.create(req.body)
    investment.userId = req.user.id
    investment.initialAsset = investment.purchasePrice * investment.amount
    await investment.save()
    res.json(investment)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const investment = await Investment.findByPk(req.params.id)
    investment.destroy()
    await investment.save()
    res.json(investment)
  } catch (error) {
    next(error)
  }
})
