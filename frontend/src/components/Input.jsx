import React from 'react'

const Input = ({placeholder, name, id, value, onChange, type}) => {

  return (
    <div className="justify-between items-center mt-2 w-full rounded-lg border border-(--color-border) px-4 py-3 outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-green-100 w-full">
        <input
            className="focus:outline-none"
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
            required
            
        />
    </div>
  )
}


export default Input