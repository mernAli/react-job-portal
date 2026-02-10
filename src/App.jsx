import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Network from "./pages/Network";
import Notification from "./pages/Notification";
import AppLayout from "./layouts/AppLayout";
import PrivateRoute from "./route/PrivateRoute";
import AuthLayout from "./layouts/AuthLayout";
import ToastProvider from "./ui/toast/ToastProvider";
import UIDemo from "./pages/UIDemo";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />

            {/* Auth pages */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected */}
            <Route
              path="/app"
              element={
                <PrivateRoute>
                  <AppLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="network" element={<Network />} />
              <Route path="notifications" element={<Notification />} />
              <Route path="ui-demo" element={<UIDemo />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
