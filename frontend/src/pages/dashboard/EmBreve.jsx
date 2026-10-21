import { Link } from 'react-router-dom'

const EmBreve = () => (
  <main className='m-4 flex flex-col gap-4'>
    <h1 className='text-4xl font-bold uppercase'>Em construção</h1>
    <p className='text-sm'>Esta página ainda está sendo feita.</p>
    <Link to='/dashboard' className='underline'>Voltar ao painel</Link>
  </main>
)

export default EmBreve