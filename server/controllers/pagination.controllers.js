const ticket = require('../model/ticket.model')
module.exports = async (req, res) => {
  const { id, page } = req.params
  const perPage = 20
  try {
    await ticket
      .find({ id_catalog: id })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .then((tickets) => {
        ticket.count().then((count) => {
          return res.json({ tickets, pages: count })
        })
      })
  } catch (e) {
    return res.json(e)
  }
}
