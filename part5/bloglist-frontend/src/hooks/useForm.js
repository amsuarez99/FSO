import { useState } from 'react'
export const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues)
  const reset = () => setFormData(initialValues)
  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }
  return [formData, handleChange, reset]
}
