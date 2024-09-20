import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layouts";
import { Clients } from "./pages/clients";
import { Dashboard } from "./pages/dashboard";
import { Statements } from "./pages/statements";
import { Reports } from "./pages/reports";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/clients" element={<Clients />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/statements" element={<Statements />} />
      </Route>
    </Routes>
  );
}
