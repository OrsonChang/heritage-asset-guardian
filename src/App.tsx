import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AuthenticatedLayout from "./components/AuthenticatedLayout";
import Dashboard from "./pages/Dashboard";
import CustodialOrgList from "./components/CustodialOrgList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/registry" element={<div className="p-6"><h1 className="text-2xl font-bold">備查管理 (Coming Soon)</h1></div>} />
              <Route path="/projects" element={<div className="p-6"><h1 className="text-2xl font-bold">專案管理 (Coming Soon)</h1></div>} />
              <Route path="/custodial-orgs" element={<CustodialOrgList />} />
              <Route path="/heritage-assets" element={<div className="p-6"><h1 className="text-2xl font-bold">文物管理 (Coming Soon)</h1></div>} />
              <Route path="/users" element={<div className="p-6"><h1 className="text-2xl font-bold">使用者管理 (Coming Soon)</h1></div>} />
              <Route path="/user-applications" element={<div className="p-6"><h1 className="text-2xl font-bold">帳號申請管理 (Coming Soon)</h1></div>} />
              <Route path="/system" element={<div className="p-6"><h1 className="text-2xl font-bold">系統管理 (Coming Soon)</h1></div>} />
              <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">統計報表 (Coming Soon)</h1></div>} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
