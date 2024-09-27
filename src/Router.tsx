import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layouts";
import { Dashboard } from "./pages/dashboard";
import { Statements } from "./pages/statements";
import { Reports } from "./pages/reports";
import { OCR } from "./pages/ocr";
import ClientPage from "./pages/client";
import CreateClient from "./pages/create-client";
import CreateStatement from "./pages/create-statement";
import DetailsClient from "./pages/details-client";
import { StatementsDetails } from "./pages/details-statements";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/clients-create" element={<CreateClient />} />
        <Route path="/clients-details/:clientId" element={<DetailsClient />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/statements" element={<Statements />} />
        <Route
          path="/statements-details/:statementId"
          element={<StatementsDetails />}
        />
        <Route
          path="/statements-create/:clientId"
          element={<CreateStatement />}
        />
        <Route path="/ocr" element={<OCR />} />
      </Route>
    </Routes>
  );
}
