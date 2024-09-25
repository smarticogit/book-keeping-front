import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
        <Toaster
          toastOptions={{
            classNames: {
              error: "bg-red-200 text-red-700",
              info: "bg-blue-200 text-blue-700",
              warning: "bg-amber-200 text-amber-700",
              success: "bg-green-200 text-green-700",
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
