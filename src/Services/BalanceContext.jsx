import React, { createContext, useState, useEffect } from "react";

const BalanceContext = createContext();

const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(10000);

  useEffect(() => {
    setBalance(10000);
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export { BalanceContext, BalanceProvider };
