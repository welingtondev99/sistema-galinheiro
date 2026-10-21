import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import ButtonLogin from '../components/ButtonLogin'
import supabase from "../lib/conectionSupabase";
import InputPassword from '../components/InputPassword'
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './dashboard/ProtectedRoute';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mensagem, setMensagem] = useState('')
    const navigate = useNavigate()


    function handleLogin(e){
        e.preventDefault()
    } 

    async function login() {
      const {data, error} = await supabase.auth.signInWithPassword(
        {
          email: email,
          password: password
        }
      )
      if (error) {
        console.error(error.message);
        setMensagem("E-mail ou senha incorretos.");
        return;
      }
      navigate('/primeiro-acesso')
    }

    const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const isFormValid = 
        password.length > 5 &&
        regex.test(email) == true
        

  return (
    <main className="min-h-screen bg-(--color-background) flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4">
        <div className="flex gap-4 items-center">
            <img src="/galinha.png" alt="" className="w-12"/>
            <h1 className="text-3xl text-(--color-primary) font-extrabold">Bem-vindo!</h1>
        </div>
        <p className="text-(--color-text-muted)">  Bem-vindo de volta! Entre na sua conta para continuar</p>
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
            <button className='flex justify-between mt-4'>
                <label htmlFor="password" className='text-(--color-text-muted)'>Senha:</label>
                <Link to="/recuperar-senha" className='text-(--color-primary)'>esqueceu a senha?</Link>
            </button>
            

            <InputPassword 
              name={'passwordLogin'} 
              placeholder={"Digite sua senha"}
              id={'password'}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            {
              <p className='text-red-500 mt-3'>{mensagem}</p>
            }
           
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
              click={login}
            /> 
            <p className='text-(--color-text-muted) mt-2'>Ainda não tem conta?</p>
            <Link className='text-(--color-primary) border-b-2 size-fit mt-2' to="/register">Criar Conta</Link>
        </form>
      </div>
    </main>

  )
}

export default Login