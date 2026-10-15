const ButtonLogin = ({name, disabled, color, click}) => {

  return (
    <button 
      onClick={click} 
      disabled={disabled} 
      className={`${color} text-white px-5 py-3 rounded-lg mt-4`} 
      type='submit'
      
    >
        {name}
    </button>
  )
}

export default ButtonLogin