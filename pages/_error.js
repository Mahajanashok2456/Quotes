import React from 'react'

function Error({ statusCode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          {statusCode || 'Error'}
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          {statusCode === 404
            ? 'The page you are looking for could not be found.'
            : 'An unexpected error occurred.'}
        </p>
        <a
          href="/"
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Go back home
        </a>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error