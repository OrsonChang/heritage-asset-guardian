
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AuthenticatedLayout from "./components/AuthenticatedLayout";
import Dashboard from "./pages/Dashboard";
import CustodialOrgList from "./pages/CustodialOrgList";
import Projects from "./pages/Projects";
import ProjectForm from "./pages/ProjectForm";
import RegistryList from "./pages/Registry/RegistryList";
import RegistryForm from "./pages/RegistryForm";
import HeritageAssetsPage from "./pages/HeritageAssetsPage";
import HeritageAssetBatchImport from "./pages/HeritageAssetBatchImport";

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
              <Route path="/registry" element={<RegistryList />} />
              <Route path="/registry/new" element={<RegistryForm />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/new" element={<ProjectForm />} />
              <Route path="/custodial-orgs" element={<CustodialOrgList />} />
              <Route path="/heritage-assets" element={<HeritageAssetsPage />} />
              <Route path="/heritage-assets/batch-import" element={<HeritageAssetBatchImport />} />
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
