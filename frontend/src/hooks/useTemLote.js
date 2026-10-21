import { useEffect, useState } from 'react'
import supabase from '../lib/conectionSupabase'

export default function useTemLote() {
  const [carregando, setCarregando] = useState(true)
  const [temLote, setTemLote] = useState(false)

  useEffect(() => {
    supabase
      .from('lotes')
      .select('id', { count: 'exact', head: true }) // só conta, não traz os dados
      .then(({ count, error }) => {
        if (!error) setTemLote(count > 0)
        setCarregando(false)
      })
  }, [])

  return { carregando, temLote }
}