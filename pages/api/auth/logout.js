import { getIronSession } from 'iron-session'

const ironOptions = {
  cookieName: 'admin_session',
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

async function logoutRoute(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Destroy the session
    const session = await getIronSession(req, res, ironOptions)
    session.destroy()

    res.status(200).json({
      message: 'Logout successful'
    })

  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}

export default logoutRoute