import { useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonLogin from '../components/ButtonLogin'
import supabase from "../lib/conectionSupabase";
import NewPassword from './NewPassword';


const ResetPassword = () => {
    const [email, setEmail] = useState('')

    function handleLogin(e){
        e.preventDefault()
    } 

    const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const isFormValid = 
        regex.test(email) == true
    
        
    async function resetPassword() {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/redefinir-senha`
        })

        return window.location.href = '/'

    }
    

  return (
    <main className="min-h-screen bg-(--color-background) flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4">
        <div className="flex gap-4 items-center">
            <img src="/galinha.png" alt="" className="w-12"/>
            <h1 className="text-3xl text-(--color-primary) font-extrabold">Bem-vindo!</h1>
        </div>
        <p className="text-(--color-text-muted)">Digite seu email para recuperar a senha.</p>
        <form onSubmit={handleLogin} className='flex flex-col gap-1'>
            <label htmlFor="email" className="text-(--color-text-muted)">Email:</label>
            <input
                className="mt-2 w-full rounded-lg border border-(--color-border) px-4 py-3 outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-green-100"
                id="email"
                type="email"
                name="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
            />
           
            <ButtonLogin 
              name={'Entrar'} 
              color={
                isFormValid ? 
                'bg-(--color-primary)' :
                'bg-gray-400 disabled:opacity-50'
                }
              disabled={
                !isFormValid
              }
              click={resetPassword}
              
            /> 
            <p className='text-(--color-text-muted) mt-2'>Deseja fazer login?</p>
            <Link className='text-(--color-primary) border-b-2 size-fit mt-2' to="/">Entrar</Link>
        </form>
      </div>
    </main>

  )
}

export default ResetPassword