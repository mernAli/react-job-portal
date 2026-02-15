import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { ThemeProvider } from "./context/ThemeContext";
import JobDetails from "./pages/JobDetails";

// Candidate pages
import BrowseJobs from "./pages/candidate/BrowseJobs";
import MyApplications from "./pages/candidate/MyApplications";
import Profile from "./pages/candidate/Profile";

// Employer pages
import PostJob from "./pages/employer/PostJob";
import MyJobs from "./pages/employer/MyJobs";
import Applications from "./pages/employer/Applications";

function App() {
  return (
    <ThemeProvider>
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

              {/* Protected Routes - Both roles share same structure */}
              <Route
                path="/app"
                element={
                  <PrivateRoute>
                    <AppLayout />
                  </PrivateRoute>
                }
              >
                {/* Common pages for both roles */}
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="network" element={<Network />} />
                <Route path="notifications" element={<Notification />} />
                <Route path="profile" element={<Profile />} />

                {/* Candidate specific */}
                <Route path="browse-jobs" element={<BrowseJobs />} />
                <Route path="my-applications" element={<MyApplications />} />

                {/* Employer specific */}
                <Route path="post-job" element={<PostJob />} />
                <Route path="my-jobs" element={<MyJobs />} />
                <Route path="applications" element={<Applications />} />

                {/* UI Demo */}
                <Route path="ui-demo" element={<UIDemo />} />

                <Route path="jobs/:jobId" element={<JobDetails />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
