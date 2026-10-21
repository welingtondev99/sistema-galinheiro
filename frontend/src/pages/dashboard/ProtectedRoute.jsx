import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import supabase from '../../lib/conectionSupabase'



const ProtectedRoute = () => {

  const [carregando, setCarregando] = useState(true)
  const [sessao, setSessao] = useState(null)

  useEffect(() => {
    // Pergunta ao Supabase se já existe sessão ao abrir a página
    supabase.auth.getSession().then(({ data }) => {
        console.log('sessão:', data.session)
      setSessao(data.session)
      setCarregando(false)
    })

    // Reage a login/logout/expiração enquanto a página está aberta
    const { data: listener } = supabase.auth.onAuthStateChange((_evento, novaSessao) => {
      setSessao(novaSessao)
    })

    // Limpeza: para de escutar quando o componente sai da tela
    return () => listener.subscription.unsubscribe()
  }, [])

  if (carregando) return <p>Carregando...</p>
  if (!sessao) return <Navigate to="/" replace />

  return <Outlet />
}


export default ProtectedRoute