import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./Router";
import "./styles/tailwind.css";

const queryConfig = {
  // staleTime: 5 * 60 * 1000,
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};
export default App;
