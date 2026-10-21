import { Link } from 'react-router-dom'

const BotaoLink = ({ to, children, principal }) => (
  <Link
    to={to}
    className={`rounded-lg px-4 py-2 text-sm font-bold text-center ${
      principal
        ? 'bg-(--color-primary) text-white'
        : 'border border-gray-300 hover:border-(--color-primary)'
    }`}
  >
    {children}
  </Link>
)

export default BotaoLink