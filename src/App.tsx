import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Impressum from "./pages/Impressum";

const Anketa = lazy(() => import("./pages/Anketa"));
const Success = lazy(() => import("./pages/Success"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <LanguageProvider>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-background text-foreground text-sm p-4">
                Загрузка… / Loading…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/anketa" element={<Anketa />} />
              <Route path="/success" element={<Success />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
