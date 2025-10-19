import bcrypt from 'bcryptjs'
import { getIronSession } from 'iron-session'
import clientPromise from '../../../lib/mongodb'
import Admin from '../../../lib/models/Admin'

const ironOptions = {
  cookieName: 'admin_session',
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

async function loginRoute(req, res) {
  const session = await getIronSession(req, res, ironOptions)
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required'
    })
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Find admin by email
    const admin = await db.collection('admins').findOne({ email: email.toLowerCase() })

    if (!admin) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, admin.password)

    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    // Create session
    session.admin = {
      id: admin._id,
      email: admin.email,
    }

    await session.save()

    // Remove password from response
    const { password: _, ...adminWithoutPassword } = admin

    res.status(200).json({
      message: 'Login successful',
      admin: adminWithoutPassword
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}

export default loginRoute