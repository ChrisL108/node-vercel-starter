const express = require('express')
const router = express.Router()

router.post('/', _postHandler)

/**
 * POST Handler
 * @param {request} req
 * @param {response} res
 */
async function _postHandler(req, res, next) {
  const { pathname } = parse(req.url)
  res.status(200)
  res.json({ result: 'POST success' })
}
