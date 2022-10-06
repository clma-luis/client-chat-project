import React, { useState, FC, useCallback } from "react";




export const NotifficationContext =
  React.createContext({
    notiffication: null,
    addNotiffication: () => {},
    removeNotiffication: () => {},
  });

export const NotifficationProvider = ({
  children,
}) => {
  const [notiffication, setNotiffication] = useState(
    null
  );
  const removeNotiffication = async (option) => {
    if (!option) {
      setNotiffication(null);
    } else {
      await notiffication?.onClose();
      setNotiffication(null);
    }
  };

  const addNotiffication = (notiffication) => {
    setNotiffication(notiffication);
  };

  const contextValue = {
    notiffication,
    addNotiffication: useCallback(
      (notiffication) => addNotiffication(notiffication),
      []
    ),
    removeNotiffication: (option) => removeNotiffication(option),
  };

  return (
    <NotifficationContext.Provider value={contextValue}>
      {children}
    </NotifficationContext.Provider>
  );
};
