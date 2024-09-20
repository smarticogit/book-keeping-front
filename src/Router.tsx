import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/home/home";
import { Layout } from "./components/layouts";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}
