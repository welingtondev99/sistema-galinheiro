import { useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonLogin from '../components/ButtonLogin'
import supabase from "../lib/conectionSupabase";
import InputPassword from '../components/InputPassword'

const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [erro, setErro] = useState(false)
    const [mensagemPassword, setMensagemPassword] = useState('none')

    function handleLogin(e){
        e.preventDefault()
    } 

    const isFormValid = 
        password > 5 &&
        password === confirmPassword
    
        
    async function resetPassword() {
        const { data, error } = await supabase.auth.updateUser({
            password: password
        })
        console.log('nova senha: ' + password)
        if (error) {
          console.error("Erro na recuperação:", error);
          console.log("Mensagem:", error.message);
          console.log("Status:", error.status);
    
          setErro(true);
          setMensagem(error.message);
          return;
        }

    }
    

  return (
    <main className="min-h-screen bg-(--color-background) flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4">
        <div className="flex gap-4 items-center">
            <img src="/galinha.png" alt="" className="w-12"/>
            <h1 className="text-3xl text-(--color-primary) font-extrabold">Redefinir senha!</h1>
        </div>
        <p className="text-(--color-text-muted)">Digite sua nova senha.</p>
        <form onSubmit={handleLogin} className='flex flex-col gap-1'>
            <label htmlFor="password" className="text-(--color-text-muted)">Senha:</label>
            
            <InputPassword 
              name={'passwordLogin'} 
              placeholder={"Digite sua senha"}
              id={'password'}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <label htmlFor="password" className="text-(--color-text-muted)">Confirma senha:</label>

            <InputPassword 
              name={'ConfirmPassword'} 
              placeholder={"Confirme sua senha"}
              id={'ConfirmPassword'}
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />

            { <p className={`${erro ? 'block' : 'hidden'} mt-4 text-red-500 `}>A nova senha deve ser diferente da senha antiga.</p>}
           
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

export default NewPassword