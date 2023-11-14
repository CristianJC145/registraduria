import { useState } from 'react';

interface ErrorAlertState {
  message: string;
  validationErrors: any[];
}

const useErrorAlertStore = () => {
  const [state, setState] = useState<ErrorAlertState>({
    message: '',
    validationErrors: [],
  });

  const setMessage = (message: string, validationErrors: any[] = []) => {
    setState({
      message,
      validationErrors,
    });
  };

  const clearMessage = () => {
    setState({
      message: '',
      validationErrors: [],
    });
  };

  return {
    state,
    methods: {
      setMessage,
      clearMessage,
    },
  };
};

export default useErrorAlertStore;