import express from 'express'

import healthcheck from './actions/healthcheck'

const generalRoutes = express.Router()

generalRoutes.get('/healthcheck', async (_, res) => {
  const result = await healthcheck()
  res.json(result)
})

export default generalRoutes


