import { handleMondaySchema } from '../../monday-api-core.js'

export async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const params = new URLSearchParams(event.queryStringParameters || {})
    return await handleMondaySchema(params)
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'server error',
      }),
    }
  }
}
