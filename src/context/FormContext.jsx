import { createContext, useContext, useState, useEffect } from 'react'

const FormContext = createContext()

export const FormProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('formData')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(data))
  }, [data])

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormData = () => useContext(FormContext)