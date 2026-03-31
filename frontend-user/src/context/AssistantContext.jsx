import { createContext, useContext, useState } from "react";

const AssistantContext = createContext();

export const AssistantProvider = ({ children }) => {

  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantVisible, setAssistantVisible] = useState(false);
  const [message, setMessage] = useState("");

  const openAssistant = (msg) => {
    setAssistantVisible(true);   // ⭐ show icon/panel
    setMessage(msg);
    setAssistantOpen(true);
  };

  const closeAssistant = () => {
    setAssistantOpen(false);
  };

  const hideAssistant = () => {
    setAssistantVisible(false);  // ⭐ fully hide widget
    setAssistantOpen(false);
  };

  return (
    <AssistantContext.Provider
      value={{
        assistantOpen,
        assistantVisible,
        message,
        openAssistant,
        closeAssistant,
        hideAssistant
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => useContext(AssistantContext);
