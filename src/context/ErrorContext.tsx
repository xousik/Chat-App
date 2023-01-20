import React, { createContext, useContext, useState, useCallback } from 'react';

interface IChildren {
  children: JSX.Element;
}

const ErrorContext = createContext({});

export const ErrorContextProvider = ({ children }: IChildren) => {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => setError(null), 7000);
  }, []);

  return <ErrorContext.Provider value={{ error, handleError }}>{children}</ErrorContext.Provider>;
};

export const useErrorContext = () => useContext(ErrorContext);
