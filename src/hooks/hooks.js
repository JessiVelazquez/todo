import { useState } from 'react';

const useHook = (action) => {

  const [values, setValues] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    action(values);
  }

  const handleInputChange = e => {
    setValues(values =>({ ...values, [e.target.name]: e.target.value }));
  };

  return [
    handleSubmit,
    handleInputChange,
    values,
  ]

}

export default useHook;