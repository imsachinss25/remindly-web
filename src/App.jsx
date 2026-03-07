import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./routes/PublicRoutes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute>
            <Login />
          </PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />

          <Route path="/profile" element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
    </>
  );
}

export default App;