export default function QuoteTable({ quotes, onEdit, onDelete }) {
  const getFontFamilyClass = (fontFamily) => {
    switch (fontFamily) {
      case 'Playfair Display':
        return 'font-playfair'
      case 'Lora':
        return 'font-lora'
      case 'Montserrat':
      default:
        return 'font-montserrat'
    }
  }

  if (quotes.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
        <p className="text-gray-400 text-lg">No quotes found. Add your first quote to get started!</p>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Quote
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Font & Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {quotes.map((quote) => (
              <tr key={quote._id} className="hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p
                      className={`text-sm ${getFontFamilyClass(quote.fontFamily)}`}
                      style={{ color: quote.color || '#ffffff' }}
                    >
                      "{quote.text.length > 100 ? `${quote.text.substring(0, 100)}...` : quote.text}"
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p
                    className={`text-sm ${getFontFamilyClass(quote.fontFamily)}`}
                    style={{ color: quote.color || '#ffffff' }}
                  >
                    {quote.author}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-block w-3 h-3 rounded-full`}
                      style={{ backgroundColor: quote.color || '#ffffff' }}
                    ></span>
                    <span className="text-sm text-gray-300">{quote.fontFamily}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(quote.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(quote)}
                      className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(quote._id)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}