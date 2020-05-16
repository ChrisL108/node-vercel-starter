const express = require('express')
const router = express.Router()
const { parse } = require('url')

router.get('/', _getHandler)
router.post('/', _postHandler)
router.post('/pdf', pdfHandler)

router.get('/test', (req, res, next) => {
  res.status(200)
  res.json({ep: '/test', params: req.params, query: req.query})
})

/**
 * GET Handler
 * @param {request} req
 * @param {response} res
 */
async function _getHandler(req, res, next) {
  const { pathname } = parse(req.url)
  res.status(200)
  res.json({ pathname, query: req.query, url: req.url})
}

/**
 * POST Handler
 * @param {request} req
 * @param {response} res
 */
async function _postHandler(req, res, next) {
  const { pathname } = parse(req.url)
  res.status(200)
  res.json({ result: 'POST success'})
}

/**
 * POST Handler
 * @param {request} req
 * @param {response} res
 */
async function pdfHandler(req, res, next) {
  const { pathname } = parse(req.url)
  res.status(200)
  res.json({ result: 'POST success'})
}

module.exports = router
