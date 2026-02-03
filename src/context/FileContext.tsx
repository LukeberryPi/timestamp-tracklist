import React, { createContext, useContext, useState, type ReactNode } from "react";

interface FileContextState {
  file: File | null;
  text: string;
  setFile: (file: File | null) => void;
  setText: (text: string) => void;
}

const FileContext = createContext<FileContextState | undefined>(undefined);

interface FileProviderProps {
  children: ReactNode;
}

export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");

  return (
    <FileContext.Provider value={{ file, text, setFile, setText }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = (): FileContextState => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
