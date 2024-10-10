import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layouts";
import { Dashboard } from "./pages/dashboard";
import { Statements } from "./pages/statements";
import { Reports } from "./pages/reports";
import { OCR } from "./pages/ocr";
import ClientPage from "./pages/clients";
import CreateClient from "./pages/create-client";
import CreateStatement from "./pages/create-statement";
import DetailsClient from "./pages/details-client";

import UpdateClient from "./pages/update-client";
import { EditStatement } from "./pages/edit-statement";
import { DetaislStatements } from "./pages/details-statements";
import { EditAccountActivities } from "./pages/edit-account-activities";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/clients-create" element={<CreateClient />} />
        <Route path="/clients-update/:clientId" element={<UpdateClient />} />
        <Route path="/clients-details/:clientId" element={<DetailsClient />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/statements" element={<Statements />} />
        <Route
          path="/statements-edit/:statementId"
          element={<EditStatement />}
        />
        <Route
          path="/statements-details/:statementId"
          element={<DetaislStatements />}
        />

        <Route
          path="/statements-create/:clientId"
          element={<CreateStatement />}
        />
        <Route
          path="/account-activities-edit/:statementId"
          element={<EditAccountActivities />}
        />
        <Route path="/ocr" element={<OCR />} />
      </Route>
    </Routes>
  );
}
