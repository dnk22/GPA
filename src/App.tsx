import { MainLayout } from "@/components/layout/MainLayout/index";
import Dashboard from "@/pages/Dashboard";
import UploadGrades from "@/pages/UploadGrades";
import { GlobalStyle } from "@/utility/styles";
import { ThemeProvider } from "@/utility/contexts";
import { AuthProvider, useAuth } from "@/utility/contexts";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { FC, ReactNode, useEffect, useState } from "react";

// Protected Route Component
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { checkAuth } = useAuth();
  const location = useLocation();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status when component mounts
    const authStatus = checkAuth();
    setIsAuthenticated(authStatus);
    setIsAuthChecked(true);
  }, [checkAuth]);

  // While checking auth status, render nothing or a loading indicator
  if (!isAuthChecked) {
    return null; // Or a loading spinner
  }

  // After auth is checked, redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// App Routes Component
const AppRoutes = () => {
  // When the app loads, always redirect to dashboard first
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/upload-grades"
        element={
          <ProtectedRoute>
            <UploadGrades />
          </ProtectedRoute>
        }
      />
      {/* Default route - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <GlobalStyle />
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
