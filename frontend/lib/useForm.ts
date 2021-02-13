import { useState } from 'react';

export default function useForm<T>(initial: T) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    setInputs(Object.fromEntries(Object.keys(inputs).map((key) => [key, ''])));
  }

  return { inputs, handleChange, resetForm, clearForm };
}
