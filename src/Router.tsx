import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layouts";
import { Dashboard } from "./pages/dashboard";
import { Statements } from "./pages/statements";
import { Reports } from "./pages/reports";
import ClientForm from "./pages/client-form";
import { OCR } from "./pages/ocr";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/clients" element={<ClientForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/statements" element={<Statements />} />
        <Route path="/ocr" element={<OCR />} />
      </Route>
    </Routes>
  );
}
