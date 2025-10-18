import { getIronSession } from 'iron-session'
import clientPromise from '../../../lib/mongodb'

const ironOptions = {
  cookieName: 'admin_session',
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

async function quotesRoute(req, res) {
  const session = await getIronSession(req, res, ironOptions)
  try {
    const client = await clientPromise
    const db = client.db()

    switch (req.method) {
      case 'GET':
        // Fetch all quotes
        const quotes = await db.collection('quotes')
          .find({})
          .sort({ createdAt: -1 })
          .toArray()

        return res.status(200).json({
          success: true,
          data: quotes
        })

      case 'POST':
        // Check if admin is authenticated
        if (!session.admin) {
          return res.status(401).json({
            error: 'Unauthorized. Admin access required.'
          })
        }

        const { text, author, fontFamily, color } = req.body

        // Validate required fields
        if (!text || !author) {
          return res.status(400).json({
            error: 'Text and author are required'
          })
        }

        // Create new quote
        const newQuote = {
          text: text.trim(),
          author: author.trim(),
          fontFamily: fontFamily || 'Montserrat',
          color: color || '#ffffff',
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const result = await db.collection('quotes').insertOne(newQuote)

        return res.status(201).json({
          success: true,
          data: { ...newQuote, _id: result.insertedId }
        })

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).json({
          error: `Method ${req.method} not allowed`
        })
    }

  } catch (error) {
    console.error('Quotes API error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}

export default quotesRoute