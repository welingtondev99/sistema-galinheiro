const Indicador = ({ rotulo, valor, detalhe, destaque }) => (
  <div className={`flex flex-col gap-1 p-4 border rounded-md ${destaque ? 'bg-amber-50 border-amber-300' : 'bg-white border-gray-300'}`}>
    <span className='text-sm text-(--color-text-muted)'>{rotulo}</span>
    <strong className='text-3xl font-bold'>{valor}</strong>
    <span className='text-xs text-(--color-text-muted)'>{detalhe}</span>
  </div>
)

export default Indicador