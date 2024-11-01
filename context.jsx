import { useContext, useState, createContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [search, setSearch] = useState(null);

  return (
    <AppContext.Provider value={{ search, setSearch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
