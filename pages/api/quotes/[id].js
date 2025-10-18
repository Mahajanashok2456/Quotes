import { getIronSession } from 'iron-session'
import { ObjectId } from 'mongodb'
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

async function quoteByIdRoute(req, res) {
  const session = await getIronSession(req, res, ironOptions)
  const { id } = req.query

  // Validate ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      error: 'Invalid quote ID'
    })
  }

  try {
    const client = await clientPromise
    const db = client.db()

    switch (req.method) {
      case 'PUT':
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

        // Update quote
        const updateData = {
          text: text.trim(),
          author: author.trim(),
          fontFamily: fontFamily || 'Montserrat',
          color: color || '#ffffff',
          updatedAt: new Date()
        }

        const result = await db.collection('quotes').updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        )

        if (result.matchedCount === 0) {
          return res.status(404).json({
            error: 'Quote not found'
          })
        }

        return res.status(200).json({
          success: true,
          data: { ...updateData, _id: id }
        })

      case 'DELETE':
        // Check if admin is authenticated
        if (!session.admin) {
          return res.status(401).json({
            error: 'Unauthorized. Admin access required.'
          })
        }

        const deleteResult = await db.collection('quotes').deleteOne({
          _id: new ObjectId(id)
        })

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({
            error: 'Quote not found'
          })
        }

        return res.status(200).json({
          success: true,
          message: 'Quote deleted successfully'
        })

      default:
        res.setHeader('Allow', ['PUT', 'DELETE'])
        return res.status(405).json({
          error: `Method ${req.method} not allowed`
        })
    }

  } catch (error) {
    console.error('Quote by ID API error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}

export default quoteByIdRoute