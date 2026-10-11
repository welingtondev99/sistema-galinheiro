import eye from "../assets/eye.svg"
import eyeoff from "../assets/eye-off.svg"
import { useState } from 'react'



const InputPassword = ({placeholder, name, id, value, onChange}) => {
    const [showPassword, setShowPassword] = useState(false);

    function eyee(e){
        e.preventDefault()
        showPassword ? setShowPassword(false) : setShowPassword(true)
    }

  return (
    <div className="flex justify-between items-center mt-2 w-full rounded-lg border border-(--color-border) px-4 py-3 outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-green-100 w-full">
        <input
            className="focus:outline-none"
            id={id}
            type={showPassword ? "text" : "password"}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            
            required
            
        />
        <span>
            <a tabIndex={-1} onClick={eyee} href=""><img className='w-4' src={showPassword ? eye : eyeoff} alt="" /></a>
        </span>
    </div>
  )
}

export default InputPassword