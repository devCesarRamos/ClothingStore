import React, { useState, createContext, ReactNode } from 'react';

// Define the structure of the SidebarContext
interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

// Create the SidebarContext with default values
export const SidebarContext = createContext<SidebarContextProps>({
  isOpen: false,
  setIsOpen: () => {},
  handleClose: () => {},
});

// Define props for the SidebarProvider component
interface SidebarProviderProps {
  children: ReactNode;
}

// SidebarProvider component definition
const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  // State for managing the sidebar open/closed state
  const [isOpen, setIsOpen] = useState(false);

  // Function to close the sidebar
  const handleClose = () => {
    setIsOpen(false);
  };

  // Context value containing the sidebar state and functions
  const contextValue: SidebarContextProps = {
    isOpen,
    setIsOpen,
    handleClose,
  };

  // Provide the context value to its children
  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;