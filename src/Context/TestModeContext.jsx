import { createContext, useState, useContext } from "react";

const TestModeContext = createContext();

// by default property of context --> children
export const TestModeContextProvider = ({ children }) => {
  const [testTime, setTestTime] = useState(15);
  // object to access value fromn anywhere
  const values = {
    testTime,
    setTestTime,
  };
  /*wrapped whole app inside provide ---> index.jsx*/
  return (
    <TestModeContext.Provider value={values}>
      {children}
    </TestModeContext.Provider>
  );
};

// custom hook to get accesss of the context
export const useTestMode = () => useContext(TestModeContext);
