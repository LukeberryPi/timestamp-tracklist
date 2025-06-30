import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HomePage } from "./pages/Home.tsx";
import { UploadPage } from "./pages/Upload.tsx";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";
import { FileProvider } from "./context/FileContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-center" richColors />
    <FileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </BrowserRouter>
    </FileProvider>
  </StrictMode>,
);
