async function resolveFormToken(shortOrToken) {
  if (shortOrToken.length > 20) return shortOrToken
  const res = await fetch(`https://wkf.ms/${shortOrToken}`, { redirect: 'follow' })
  const match = res.url.match(/\/forms\/([^/?]+)/)
  return match?.[1] || shortOrToken
}

function parseFormDataFromHtml(html) {
  const marker = 'window.form_data = '
  const start = html.indexOf(marker)
  if (start < 0) return null
  const jsonStart = start + marker.length
  const jsonEnd = html.indexOf('};', jsonStart)
  if (jsonEnd < 0) return null
  return JSON.parse(html.slice(jsonStart, jsonEnd + 1))
}

async function loadPublicFormConfig(shortOrToken) {
  const token = await resolveFormToken(shortOrToken)
  const pageUrl = `https://forms.monday.com/forms/${token}?r=euc1`
  const res = await fetch(pageUrl, {
    headers: { Accept: 'text/html', 'User-Agent': 'workshop-landing-dev-proxy' },
  })
  const html = await res.text()
  const formData = parseFormDataFromHtml(html)

  if (!formData) return null

  const columns = formData.included_columns || []
  const byType = (type) => columns.find((c) => c.type === type)?.id

  return {
    token: formData.token,
    region: formData.region || 'euc1',
    boardViewId: formData.board_view_id,
    map: {
      name: byType('name') || 'name',
      email: byType('email'),
      phone: byType('phone'),
    },
    questions: columns.map((c) => ({ id: c.id, type: c.type, title: c.title })),
  }
}

async function submitViaMondayApiToken({ fullName, email, phone }, config) {
  const apiToken = process.env.MONDAY_API_TOKEN
  const boardId = process.env.MONDAY_BOARD_ID
  if (!apiToken || !boardId) return null

  const columnValues = {}
  if (config.map.email) {
    columnValues[config.map.email] = { email, text: email }
  }
  if (config.map.phone) {
    columnValues[config.map.phone] = { phone, countryShortName: 'IL' }
  }

  const query = `
    mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
      create_item(
        board_id: $boardId,
        item_name: $itemName,
        column_values: $columnValues,
        create_labels_if_missing: true
      ) {
        id
      }
    }
  `

  const response = await fetch('https://api.monday.com/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiToken,
      'API-Version': '2024-10',
    },
    body: JSON.stringify({
      query,
      variables: {
        boardId,
        itemName: fullName,
        columnValues: JSON.stringify(columnValues),
      },
    }),
  })

  const body = await response.json()

  if (!response.ok || body.errors?.length) {
    throw new Error(body.errors?.[0]?.message || 'Monday API create_item failed')
  }

  return { source: 'monday_api', itemId: body.data.create_item.id }
}

async function submitViaPublicForm(payload, token, region) {
  const url = 'https://forms.monday.com/api/forms/create_submission'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: 'https://forms.monday.com',
      Referer: `https://forms.monday.com/forms/${token}?r=${region}`,
    },
    body: JSON.stringify(payload),
  })

  const text = await response.text()
  let body = null
  try {
    body = JSON.parse(text)
  } catch {
    body = { raw: text.slice(0, 300) }
  }

  return { response, body }
}

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

function answersFromPayload(payload, map) {
  if (Array.isArray(payload.answers) && payload.answers.length) {
    return payload.answers
  }

  const { fullName, email, phone } = payload
  const answers = [{ question_id: map.name, name: fullName?.trim() }]
  if (map.email && email) {
    answers.push({ question_id: map.email, email: email.trim() })
  }
  if (map.phone && phone) {
    const digits = String(phone).replace(/\D/g, '')
    answers.push({
      question_id: map.phone,
      phone: { phone: digits, country_short_name: 'IL' },
    })
  }
  return answers
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
            const short = url.searchParams.get('token') || '4uCYfL8'
            const config = await loadPublicFormConfig(short)
            if (!config) {
              res.statusCode = 502
              res.end(JSON.stringify({ error: 'Could not parse public form config' }))
              return
            }
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(config))
            return
          }

          if (req.method === 'POST' && url.pathname === '/api/monday/submit') {
            const body = await readBody(req)
            const short = body.form_token || '4uCYfL8'
            const config = await loadPublicFormConfig(short)
            if (!config?.map?.name) {
              res.statusCode = 502
              res.end(JSON.stringify({ error: 'Could not load form configuration' }))
              return
            }

            const contact = {
              fullName: body.fullName?.trim(),
              email: body.email?.trim(),
              phone: body.phone?.trim(),
            }
            if (!contact.fullName) {
              contact.fullName = body.answers?.find((a) => a.name)?.name || ''
            }
            if (!contact.email) {
              contact.email = body.answers?.find((a) => a.email)?.email || ''
            }
            if (!contact.phone) {
              contact.phone =
                body.answers?.find((a) => a.phone)?.phone?.phone || ''
            }

            const hasApiCredentials =
              process.env.MONDAY_API_TOKEN && process.env.MONDAY_BOARD_ID

            if (hasApiCredentials) {
              try {
                const apiResult = await submitViaMondayApiToken(contact, config)
                if (apiResult) {
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ ok: true, ...apiResult }))
                  return
                }
              } catch (apiError) {
                res.statusCode = 502
                res.end(
                  JSON.stringify({
                    error:
                      apiError instanceof Error
                        ? apiError.message
                        : 'Monday API submission failed',
                  }),
                )
                return
              }
            }

            const submissionPayload = {
              form_token: config.token,
              form_timezone_offset: body.form_timezone_offset ?? 0,
              answers: answersFromPayload(body, config.map),
            }

            const publicResult = await submitViaPublicForm(
              submissionPayload,
              config.token,
              config.region,
            )

            if (publicResult.response.ok) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true, source: 'public_form', ...publicResult.body }))
              return
            }

            res.statusCode = 502
            res.end(
              JSON.stringify({
                error:
                  'Monday public form API requires login from this server (401). Add MONDAY_API_TOKEN and MONDAY_BOARD_ID to .env for local dev.',
                publicStatus: publicResult.response.status,
                publicError: publicResult.body?.error,
              }),
            )
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
