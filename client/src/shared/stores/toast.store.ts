import React, { useState } from 'react';

const initialState = {
  message: '',
  type: 'success',
};

const useToastStore = () => {
  const [state, setState] = useState(initialState);

  const show = (message: string, type = 'success') => {
    setState((prevState) => ({
      ...prevState,
      message,
      type,
    }));
  };

  const hide = () => {
    setState(initialState);
  };

  return {
    state,
    methods: {
      show,
      hide,
    },
  };
};

export default useToastStore;