import { Link } from 'react-router-dom'
import Indicador from '../../components/Indicador.jsx'
import Card from '../../components/Card.jsx'
import BotaoLink from '../../components/BotaoLink.jsx'
import { Navigate } from 'react-router-dom'
import useTemLote from '../../hooks/useTemLote'

import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

// ============================================================
// DADOS DE TESTE: depois trocar pelos dados do Supabase
// ============================================================
const granja = { nome: 'Fazendinha', cidade: 'Brasília' }

const lote = {
  nome: 'Lote 01',
  raca: 'Novo Gen Tinted',
  quantidadeInicial: 800,
  dataNascimento: '2026-05-10',
}

const registros = [
  { data: '2026-10-07', ovos: 598, mortas: 1, racaoKg: 92 },
  { data: '2026-10-08', ovos: 604, mortas: 0, racaoKg: 93 },
  { data: '2026-10-09', ovos: 611, mortas: 0, racaoKg: 94 },
  { data: '2026-10-10', ovos: 620, mortas: 2, racaoKg: 94 },
  { data: '2026-10-11', ovos: 627, mortas: 0, racaoKg: 95 },
  { data: '2026-10-12', ovos: 633, mortas: 0, racaoKg: 95 },
  { data: '2026-10-13', ovos: 641, mortas: 1, racaoKg: 96 },
  { data: '2026-10-14', ovos: 646, mortas: 0, racaoKg: 96 },
  { data: '2026-10-15', ovos: 652, mortas: 0, racaoKg: 96 },
  { data: '2026-10-16', ovos: 655, mortas: 1, racaoKg: 97 },
  { data: '2026-10-17', ovos: 663, mortas: 0, racaoKg: 97 },
  { data: '2026-10-18', ovos: 668, mortas: 0, racaoKg: 97 },
  { data: '2026-10-19', ovos: 671, mortas: 0, racaoKg: 98 },
  { data: '2026-10-20', ovos: 677, mortas: 1, racaoKg: 98 },
]

const ovosEmEstoque = 3900
const racaoEmEstoqueKg = 1150
const financeiroMes = { receita: 18450, despesa: 11230 }
// ============================================================

// Valores calculados a partir dos dados básicos
const totalMortas = registros.reduce((s, r) => s + r.mortas, 0)
const avesVivas = lote.quantidadeInicial - totalMortas
const hoje = registros[registros.length - 1]
const ontem = registros[registros.length - 2]
const taxaPostura = (hoje.ovos / avesVivas) * 100
const mortalidade = (totalMortas / lote.quantidadeInicial) * 100
const viabilidade = 100 - mortalidade
const idadeSemanas = Math.floor(
  (new Date(hoje.data) - new Date(lote.dataNascimento)) / (1000 * 60 * 60 * 24 * 7)
)

const consumoMedioKg = registros.reduce((s, r) => s + r.racaoKg, 0) / registros.length
const diasDeRacao = Math.floor(racaoEmEstoqueKg / consumoMedioKg)
const corRacao = diasDeRacao < 7 ? 'bg-red-600' : diasDeRacao < 15 ? 'bg-amber-500' : 'bg-green-600'
const caixasDeOvos = Math.floor(ovosEmEstoque / 360) // caixa com 30 dúzias

const saldo = financeiroMes.receita - financeiroMes.despesa

const dados = registros.map((r) => ({
  ...r,
  dia: `${r.data.slice(8)}/${r.data.slice(5, 7)}`,
}))

const numero = (n) => n.toLocaleString('pt-BR')
const dinheiro = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

// Páginas que ainda precisam existir (ver rotas no main.jsx)
const atalhos = [
  { to: '/registro-diario', titulo: 'Registro diário', texto: 'Ovos, mortes e ração de hoje' },
  { to: '/estoque-ovos', titulo: 'Estoque de ovos', texto: 'Entradas, saídas e caixas' },
  { to: '/financeiro', titulo: 'Financeiro', texto: 'Vendas, despesas e saldo' },
  { to: '/racao', titulo: 'Ração', texto: 'Estoque e compras' },
  { to: '/lotes', titulo: 'Lotes', texto: 'Todos os lotes da granja' },
  { to: '/saude', titulo: 'Saúde', texto: 'Vacinas e medicações' },
]

// -----------------------------------------------------------------------

const Dashboard = () => {
  const { carregando, temLote } = useTemLote()
  if (carregando) return <p>Carregando...</p>
  if (!temLote) return <Navigate to="/primeiro-acesso" replace />
  
  return (
    <main className='m-4 flex flex-col gap-6'>
      {/* Lote em destaque */}
      <section className='flex flex-col md:flex-row md:items-end md:justify-between gap-6 bg-(--color-primary) text-white rounded-md p-6'>
        <div className='flex flex-col gap-3'>
          <span className='text-sm opacity-80'>{granja.nome} · {granja.cidade}</span>
          <h1 className='text-4xl font-bold uppercase'>{lote.nome}</h1>
          <p className='text-sm opacity-90'>{lote.raca}</p>
          <div className='flex flex-wrap gap-x-8 gap-y-2 mt-2'>
            <div><strong className='text-2xl'>{idadeSemanas}</strong> <span className='text-sm opacity-80'>semanas</span></div>
            <div><strong className='text-2xl'>{numero(avesVivas)}</strong> <span className='text-sm opacity-80'>aves vivas</span></div>
            <div><strong className='text-2xl'>{taxaPostura.toFixed(1)}%</strong> <span className='text-sm opacity-80'>postura hoje</span></div>
          </div>
        </div>
        <Link to='/registro-diario' className='rounded-lg bg-white text-(--color-primary) px-5 py-3 font-bold text-center'>
          Registrar hoje
        </Link>
      </section>

      {/* Atalhos para as outras páginas */}
      <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
        {atalhos.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className='flex flex-col gap-1 bg-white p-3 border border-gray-300 rounded-md hover:border-(--color-primary)'
          >
            <strong className='text-sm'>{a.titulo}</strong>
            <span className='text-xs text-(--color-text-muted)'>{a.texto}</span>
          </Link>
        ))}
      </section>

      {/* Indicadores */}
      <section className='grid grid-cols-2 lg:grid-cols-5 gap-4'>
        
        <Indicador rotulo='Ovos hoje' valor={numero(hoje.ovos)} detalhe={`${numero(ontem.ovos)} ontem`} destaque />
        <Indicador rotulo='Ovos em estoque' valor={numero(ovosEmEstoque)} detalhe={`cerca de ${caixasDeOvos} caixas`} />
        <Indicador rotulo='Taxa de postura' valor={`${taxaPostura.toFixed(1)}%`} detalhe='ovos ÷ aves vivas' />
        <Indicador rotulo='Viabilidade' valor={`${viabilidade.toFixed(1)}%`} detalhe='aves vivas do lote' />
        <Indicador rotulo='Mortalidade' valor={`${mortalidade.toFixed(1)}%`} detalhe={`${totalMortas} aves em 14 dias`} />
      </section>

      {/* Ração e financeiro */}
      <section className='flex flex-col lg:flex-row gap-4'>
        <Card titulo='Ração' className='lg:w-1/2'>
          <div className='flex items-end justify-between'>
            <div>
              <strong className='text-4xl font-bold'>{diasDeRacao}</strong>
              <span className='ml-2 text-sm text-(--color-text-muted)'>dias de ração restantes</span>
            </div>
            <span className='text-sm text-(--color-text-muted)'>{numero(racaoEmEstoqueKg)} kg em estoque</span>
          </div>
          <div className='h-3 w-full rounded-full bg-gray-200 overflow-hidden'>
            <div className={`h-full ${corRacao}`} style={{ width: `${Math.min((diasDeRacao / 30) * 100, 100)}%` }} />
          </div>
          <p className='text-xs text-(--color-text-muted)'>
            Consumo médio de {consumoMedioKg.toFixed(0)} kg por dia (últimos 14 dias).
          </p>
          <div className='flex gap-2 mt-2'>
            <BotaoLink to='/racao'>Ver estoque</BotaoLink>
            <BotaoLink to='/racao/compra'>Registrar compra</BotaoLink>
          </div>
        </Card>

        <Card titulo='Financeiro do mês' className='lg:w-1/2'>
          <div className='grid grid-cols-3 gap-2'>
            <div className='flex flex-col'>
              <span className='text-sm text-(--color-text-muted)'>Receita</span>
              <strong className='text-xl'>{dinheiro(financeiroMes.receita)}</strong>
            </div>
            <div className='flex flex-col'>
              <span className='text-sm text-(--color-text-muted)'>Despesas</span>
              <strong className='text-xl'>{dinheiro(financeiroMes.despesa)}</strong>
            </div>
            <div className='flex flex-col'>
              <span className='text-sm text-(--color-text-muted)'>Saldo</span>
              <strong className={`text-xl ${saldo >= 0 ? 'text-green-700' : 'text-red-600'}`}>{dinheiro(saldo)}</strong>
            </div>
          </div>
          <div className='flex flex-wrap gap-2 mt-auto pt-2'>
            <BotaoLink to='/financeiro/venda' principal>Registrar venda</BotaoLink>
            <BotaoLink to='/financeiro/despesa'>Registrar despesa</BotaoLink>
            <BotaoLink to='/financeiro'>Ver financeiro</BotaoLink>
          </div>
        </Card>
      </section>

      {/* Gráficos */}
      <section className='flex flex-col lg:flex-row gap-4'>
        <Card titulo='Produção de ovos (14 dias)' className='lg:w-2/3'>
          <div className='h-64 w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={dados}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                <XAxis dataKey='dia' tick={{ fontSize: 12 }} />
                <YAxis domain={['dataMin - 20', 'dataMax + 20']} tick={{ fontSize: 12 }} width={40} />
                <Tooltip />
                <Line type='monotone' dataKey='ovos' name='Ovos' stroke='var(--color-primary)' strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card titulo='Aves mortas por dia' className='lg:w-1/3'>
          <div className='h-64 w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={dados}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                <XAxis dataKey='dia' tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} width={30} />
                <Tooltip />
                <Bar dataKey='mortas' name='Mortas' fill='#b45309' radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* Tabela de lotes */}
      <Card titulo='Seus lotes'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left'>
            <thead className='text-(--color-text-muted) border-b border-gray-300'>
              <tr>
                <th className='py-2 pr-4 font-normal'>Lote</th>
                <th className='py-2 pr-4 font-normal'>Raça</th>
                <th className='py-2 pr-4 font-normal'>Idade</th>
                <th className='py-2 pr-4 font-normal'>Aves vivas</th>
                <th className='py-2 font-normal'>Situação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='py-2 pr-4 font-bold'>{lote.nome}</td>
                <td className='py-2 pr-4'>{lote.raca}</td>
                <td className='py-2 pr-4'>{idadeSemanas} semanas</td>
                <td className='py-2 pr-4'>{numero(avesVivas)}</td>
                <td className='py-2'>Ativo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  )
}

export default Dashboard