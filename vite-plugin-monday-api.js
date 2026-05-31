import {
  handleMondaySchema,
  handleMondaySubmit,
} from './monday-api-core.js'

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

function sendNetlifyStyleResponse(res, { statusCode, headers, body }) {
  res.statusCode = statusCode
  for (const [key, value] of Object.entries(headers || {})) {
    res.setHeader(key, value)
  }
  res.end(body)
}

export function mondayApiPlugin() {
  return {
    name: 'monday-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/monday')) return next()

        const url = new URL(req.url, 'http://localhost')

        try {
          if (req.method === 'GET' && url.pathname === '/api/monday/schema') {
            const result = await handleMondaySchema(url.searchParams)
            sendNetlifyStyleResponse(res, result)
            return
          }

          if (req.method === 'POST' && url.pathname === '/api/monday/submit') {
            const body = await readBody(req)
            const result = await handleMondaySubmit(body)
            sendNetlifyStyleResponse(res, result)
            return
          }

          res.statusCode = 404
          res.end(JSON.stringify({ error: 'not found' }))
        } catch (error) {
          res.statusCode = 500
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : 'server error',
            }),
          )
        }
      })
    },
  }
}
