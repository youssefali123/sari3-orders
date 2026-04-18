// import { Toaster } from "./components/ui/toaster";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { fetchMenus } from "./store/menuSlice";
import { useAppDispatch } from "./hooks/useRedux";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMenus())
  }, [dispatch])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* <Sonner /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/market" element={<Index />} />
            <Route path="/restaurant" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
};

export default App;
