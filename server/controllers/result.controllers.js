const Base64 = require('js-base64').Base64
const sha1 = require('sha1')
const Pay = require('../model/pay.model')
require('dotenv').config()
module.exports = (req, res) => {
  const { signature, data } = req.body
  const sign = Base64.encode(
    sha1(process.env.liqprivate_key + data + process.env.liqprivate_key)
  )
  if (signature !== sign) {
    const datas = JSON.parse(Base64.decode(data))
    const candidat = JSON.parse(Base64.decode(datas.dae))
    console.log(candidat.amount)
    const pay = new Pay({
      amount: datas.amount,
      payment_id: datas.payment_id,
      status: datas.status,
      order_id: datas.order_id,
      UAH: candidat.UAH,
      vite: candidat.vite,
      card: candidat.card,
      memo: candidat.memo,
      firstName: candidat.firstName,
      lastName: candidat.lastName,
      email: candidat.email
    })
    pay.save()
  }
  return res.json('OK')
}
