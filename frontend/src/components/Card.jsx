const Card = ({ titulo, children, className = '' }) => (
  <div className={`flex flex-col gap-2 bg-white p-4 border border-gray-300 rounded-md ${className}`}>
    <h3 className='uppercase font-bold mb-2'>{titulo}</h3>
    {children}
  </div>
)

export default Card