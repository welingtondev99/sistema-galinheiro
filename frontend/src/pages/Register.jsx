import { Link } from "react-router-dom"
import ButtonLogin from "../components/ButtonLogin"
import InputPassword from "../components/InputPassword"
import { useState } from "react"
import supabase from "../lib/conectionSupabase"

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [checked, setChecked] = useState(false);
    const [sucess, setSucess] = useState('');
    const [erro, setErro] = useState(false)

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


    function register(e){
        e.preventDefault()
    }

    const isFormValid = 
        checked && 
        name.length > 0 &&
        regex.test(email) == true &&
        confirm.length > 5 && 
        confirmPassword.length > 5 && 
        confirm === confirmPassword

    const passwordsMatch = confirm === confirmPassword;
    const showPasswordError = confirmPassword.length > 0 && confirm.length > 0 && !passwordsMatch

    async function signUpNewUser() {
      console.log('click')
      const { data, error } = await supabase.auth.signUp({
          email: email,
          password: confirm,
          options:{
            data:{
                display_name: name,
                phone: confirm
            }
          }
      })
    if (error) {
        setErro(true);
        setSucess(
        error.message === 'User already registered'
            ? 'Este e-mail já está cadastrado.'
            : 'Erro ao criar a conta. Tente novamente.'
        );
        return;
    }

    setErro(false);
    setSucess('Cadastro criado com sucesso!');

    
    }

    
    

  return (
    <main className="min-h-screen bg-(--color-background) flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4">
        <div className="flex gap-4 items-center">
            <img src="/galinha.png" alt="" className="w-12"/>
            <h1 className="text-3xl text-(--color-primary) font-extrabold">Criar conta</h1>
        </div>
        
        <form onSubmit={register} className='flex flex-col gap-1'>
            <label htmlFor="name" className="text-(--color-text-muted)">Nome:</label>
            <input
                className="mt-2 w-full rounded-lg border border-(--color-border) px-4 py-3 outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-green-100"
                id="name"
                type="text"
                name="name"
                placeholder="nome completo"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
            />
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
            <label htmlFor="password" className='text-(--color-text-muted)'>Senha:</label>

            <InputPassword 
                value={confirmPassword} 
                onChange={(e)=>setConfirmPassword(e.target.value)} 
                id={'password'} 
                name={'password'} 
                placeholder={"Digite sua senha"}
            />

            <label htmlFor="password" className='text-(--color-text-muted)'>Confirmar Senha:</label>

            <InputPassword 
                value={confirm} 
                onChange={(e)=>setConfirm(e.target.value)} 
                id={'password'} 
                name={'password'} 
                placeholder={"Confirme sua senha"}
            /> 
            
            {showPasswordError && (
                <p className="text-red-500 text-sm mb-2 mt-2">Senhas diferentes</p>
            )}

            {/* diz que email ta cadastrado */}
            {
                <p className={`${erro ? 'text-red-500' : 'text-green-500'} mt-2 mb-2`}>{sucess}</p>
            }

            <div className="flex gap-2 items-baseline">
                <input 
                    value={checked} 
                    onChange={(e)=>setChecked(e.target.checked)} 
                    type="checkbox" 
                    name="" 
                    id="" 
                    className=" flex items-start" 
                />
                <span className="text-(--color-text-muted)">Li e concordo com os <a className="text-(--primary) font-medium" href="">Termos de Uso e PolÍtica de Privacidade</a></span>
            </div>

            <ButtonLogin 
                click={signUpNewUser} 
                disabled={!isFormValid} 
                name={'Enviar'} 
                color={!isFormValid ? 'bg-gray-400 disabled:opacity-50' : 'bg-(--color-primary)' }
            />

            <p className='text-(--color-text-muted) mt-2'>Já tem conta?</p>
            <Link className='text-(--color-primary) border-b-2 size-fit mt-2' to={"/"}>Entrar</Link>
        </form>
      </div>
    </main>
  )
}

export default Register