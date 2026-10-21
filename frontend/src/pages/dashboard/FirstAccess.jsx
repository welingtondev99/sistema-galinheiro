import { useState } from 'react'
import Input from '../../components/Input'
import ButtonLogin from '../../components/ButtonLogin'
import supabase from '../../lib/conectionSupabase'
import { useNavigate, Navigate } from 'react-router-dom'   // você já importou o useNavigate
import useTemLote from '../../hooks/useTemLote'




const FirstAccess = () => {
    const navigate = useNavigate()
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState('')

    const { carregando: verificando, temLote } = useTemLote()

    const [granja, setGranja] = useState('')
    const [cidade, setCidade] = useState('')
    const [lote, setLote] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [raca, setRaca] = useState('')
    const [data, setData] = useState('')
    

    const isFormValid =
        granja.trim().length > 0 &&
        lote.trim().length > 0 &&
        Number(quantidade) > 0 &&
        raca.trim().length > 0 &&
        data !== ''

async function enviar(e) {
  e.preventDefault()
  setCarregando(true)
  setErro('')

  // 1. Quem é o usuário logado?
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Cria a granja e pede de volta o id que o banco gerou
  const { data: granjaCriada, error: erroGranja } = await supabase
    .from('granjas')
    .insert({ user_id: user.id, nome: granja.trim(), cidade: cidade.trim() || null })
    .select('id')
    .single()

  if (erroGranja) {
    console.log(erroGranja)
    setErro('Não foi possível salvar a granja.')
    setCarregando(false)
    return
  }

  // 3. Cria o lote ligado a essa granja
  const { error: erroLote } = await supabase.from('lotes').insert({
    granja_id: granjaCriada.id,
    nome: lote.trim(),
    raca: raca.trim(),
    data_nascimento: data,
    quantidade_inicial: Number(quantidade),
  })

  if (erroLote) {
    console.log(erroLote)
    setErro('Não foi possível salvar o lote.')
    setCarregando(false)
    return
  }

  navigate('/dashboard')
}

    if (verificando) return <p>Carregando...</p>
    if (temLote) return <Navigate to="/dashboard" replace />

  return (
    <main className='m-4 flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
            <span className='text-amber-700'>Bem-vindo ao Galinha Viva</span>
            <h1 className='text-4xl font-bold uppercase'>Monte seu galinheiro</h1>
            <p className='text-sm'>Preencha os dados abaixo para o painel já abrir mostrando os números da sua granja — nada de exemplo.</p>
        </div>

        <div className='flex w-full flex-col gap-2'>
            <form className='w-full flex flex-col md:flex-col gap-4 '>
                <div className='flex flex-col md:flex-row  gap-4'>
                    <div className='md:w-1/2 flex flex-col gap-2 bg-white p-4 border border-gray-300 rounded-md'>
                        <h3 className='uppercase font-bold mb-2'>Sua granja</h3>
                        <label htmlFor="">Nome da granja:</label>
                        <Input
                            id={'granjas'}
                            name={'granjas'}
                            value={granja}
                            onChange={(e)=>setGranja(e.target.value)}
                            placeholder={'fazendinha'}
                        />
                        <label htmlFor="">Cidade:</label>
                        <Input
                            id={'cidade'}
                            name={'cidade'}
                            value={cidade}
                            onChange={(e)=>setCidade(e.target.value)}
                            placeholder={'opcional'}
                        />
                        
                    </div>

                    <div className='md:w-1/2 flex flex-col gap-2 bg-white p-4 border border-gray-300 rounded-md'>
                        <h3 className='uppercase font-bold mb-2'>Lotes das aves:</h3>
                        <label htmlFor="">Nome do lote:</label>
                        <Input
                            id={'lote'}
                            name={'lote'}
                            value={lote}
                            onChange={(e)=>setLote(e.target.value)}
                            placeholder={'lote 01'}
                        />
                        <label htmlFor="">Quantidade de aves:</label>
                        <Input
                            id={'quantidade'}
                            name={'quantidade'}
                            value={quantidade}
                            onChange={(e)=>setQuantidade(e.target.value)}
                            placeholder={'800'}
                            type={'number'}
                        />
                        
                        <label htmlFor="">Raça / linhagem:</label>
                        <select 
                            className='inline [&::-webkit-calendar-picker-indicator]:ml-auto text-(--color-text-muted)  mt-2 w-full rounded-lg border border-(--color-border) px-4 py-3 outline-none focus:border-(--color-primary) focus:ring-2 w-full'  
                            onChange={e=>setRaca(e.target.value)}
                            name="raca" 
                            id="raca">
                                <option value="diversas">Diversas</option>
                                <option value="NovoGenTinted">Novogen Tinted</option>
                                <option value="glc">GLC</option>
                                <option value="NovoGenBrown">Novogen Brow</option>
                        </select>
                        <label htmlFor="">Data de nascimento:</label>
                        <input className='inline [&::-webkit-calendar-picker-indicator]:ml-auto text-(--color-text-muted)  mt-2 w-full rounded-lg border border-(--color-border) px-4 py-3 outline-none focus:border-(--color-primary) focus:ring-2 w-full' 
                        type="date" 
                        name="date" 
                        id="data"
                        value={data}
                        onChange={e=>setData(e.target.value)}
                        min={'2026-05-01'} />
                        
                    </div>

                </div>
                

                <ButtonLogin

                    name={'Cadastrar lote'} 
                    color={
                        isFormValid ? 
                        'bg-(--color-primary)' :
                        'bg-gray-400 disabled:opacity-50' 
                        
                        }
                    disabled={
                        !isFormValid
                    }
                    click={enviar}
                        />
            </form>
        </div>
    </main>
  )
}

export default FirstAccess