import { useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  const setStoredValue = (val) => {
    setValue(val)
    localStorage.setItem(key, JSON.stringify(val))
  }

  return [value, setStoredValue]
}