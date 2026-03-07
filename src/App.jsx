import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"; // ADD THIS
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeContext";
import ToastProvider from "./ui/toast/ToastProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./ui/Loader";

// Lazy load pages
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Network = lazy(() => import("./pages/Network"));
const Notification = lazy(() => import("./pages/Notification"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UIDemo = lazy(() => import("./pages/UIDemo"))

// Candidate pages
const BrowseJobs = lazy(() => import("./pages/candidate/BrowseJobs"));
const MyApplications = lazy(() => import("./pages/candidate/MyApplications"));
const Profile = lazy(() => import("./pages/candidate/Profile"));
const CandidateDashboard = lazy(() => import("./pages/candidate/CandidateDashboard"));


// Employer pages
const PostJob = lazy(() => import("./pages/employer/PostJob"));
const MyJobs = lazy(() => import("./pages/employer/MyJobs"));
const Applications = lazy(() => import("./pages/employer/Applications"));
const EmployerDashboard = lazy(() => import("./pages/employer/EmployerDashboard"));


// Layouts (don't lazy load these)
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import PrivateRoute from "./route/PrivateRoute";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader size="lg" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <BrowserRouter>
            <AuthProvider>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Public */}
                  <Route path="/" element={<Landing />} />

                  {/* Auth pages */}
                  <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Route>

                  {/* Protected Routes */}
                  <Route
                    path="/app"
                    element={
                      <PrivateRoute>
                        <AppLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="jobs" element={<Jobs />} />
                    <Route path="jobs/:jobId" element={<JobDetails />} />
                    <Route path="network" element={<Network />} />
                    <Route path="notifications" element={<Notification />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="ui-demo" element={<UIDemo />} />

                    {/* Candidate specific */}
                    <Route path="browse-jobs" element={<BrowseJobs />} />
                    <Route path="my-applications" element={<MyApplications />} />

                    {/* Employer specific */}
                    <Route path="post-job" element={<PostJob />} />
                    <Route path="my-jobs" element={<MyJobs />} />
                    <Route path="applications" element={<Applications />} />

                    {/* Dashboard pages */}
                    <Route path="employer-dashboard" element={<EmployerDashboard />} />
                    <Route path="candidate-dashboard" element={<CandidateDashboard />} />

                  </Route>

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AuthProvider>
          </BrowserRouter>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;