import { createContext, useContext, useState } from "react";

export const AccountsContext = createContext();

export const useAccounts = () => useContext(AccountsContext);

export const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState({
    Checking: 1000,
    Savings: 5000,
  });

  const deposit = (account, amount) => {
    setAccounts((prevAccounts) => ({
      ...prevAccounts,
      [account]: prevAccounts[account] + amount,
    }));
  };

  const withdraw = (account, amount) => {
    setAccounts((prevAccounts) => ({
      ...prevAccounts,
      [account]: prevAccounts[account] - amount,
    }));
  };

  const transfer = (fromAccount, toAccount, amount) => {
    setAccounts((prevAccounts) => ({
      ...prevAccounts,
      [fromAccount]: prevAccounts[fromAccount] - amount,
      [toAccount]: prevAccounts[toAccount] + amount,
    }));
  };

  return <AccountsContext.Provider value={{ accounts, deposit, withdraw, transfer }}>{children}</AccountsContext.Provider>;
};
