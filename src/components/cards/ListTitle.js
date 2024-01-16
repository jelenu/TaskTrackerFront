import React, {useState } from 'react'

export const ListTitle = () => {
    const [focus, setFocus] = useState(false);

  return (
    <label className="border-blue-300">
      <input
        className={`font-bold ${focus ? 'bg-white ' : 'bg-transparent'}`}
        type="text"
        placeholder="Escribe aquí"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </label>
  )
}
