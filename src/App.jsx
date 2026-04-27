import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeContext";
import ToastProvider from "./ui/toast/ToastProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./ui/Loader";
import RoleRoute from "./route/RoleRoute";

// Lazy load pages
const Landing   = lazy(() => import("./pages/Landing"));
const Login     = lazy(() => import("./pages/Login"));
const Register  = lazy(() => import("./pages/Register"));
const Home      = lazy(() => import("./pages/Home"));
const Jobs      = lazy(() => import("./pages/Jobs"));
const Network   = lazy(() => import("./pages/Network"));
const Notification = lazy(() => import("./pages/Notification"));
const JobDetails   = lazy(() => import("./pages/JobDetails"));
const NotFound     = lazy(() => import("./pages/NotFound"));
const UIDemo       = lazy(() => import("./pages/UIDemo"));

// Candidate pages
const BrowseJobs        = lazy(() => import("./pages/candidate/BrowseJobs"));
const MyApplications    = lazy(() => import("./pages/candidate/MyApplications"));
const Profile           = lazy(() => import("./pages/candidate/Profile"));
const CandidateDashboard = lazy(() => import("./pages/candidate/CandidateDashboard"));
const CandidateAIInsights = lazy(() => import("./pages/candidate/AIInsights")); // ← NEW

// Employer pages
const PostJob            = lazy(() => import("./pages/employer/PostJob"));
const MyJobs             = lazy(() => import("./pages/employer/MyJobs"));
const Applications       = lazy(() => import("./pages/employer/Applications"));
const EmployerDashboard  = lazy(() => import("./pages/employer/EmployerDashboard"));
const EmployerAnalytics  = lazy(() => import("./pages/employer/EmployerAnalytics"));
const InterviewScheduler = lazy(() => import("./pages/employer/InterviewScheduler"));
const EmployerAIInsights = lazy(() => import("./pages/employer/AIInsights")); // ← NEW

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers     = lazy(() => import("./pages/admin/AdminUsers"));
const AdminJobs      = lazy(() => import("./pages/admin/AdminJobs"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));

const Unauthorized = lazy(() => import("./pages/Unauthorized"));

// Layouts (don't lazy load these)
import AppLayout    from "./layouts/AppLayout";
import AuthLayout   from "./layouts/AuthLayout";
import PrivateRoute from "./route/PrivateRoute";

// Payment pages
const EmployerPricing = lazy(() => import("./pages/employer/EmployerPricing"));
const CandidatePricing = lazy(() => import("./pages/candidate/CandidatePricing"));
const Checkout       = lazy(() => import("./pages/Checkout"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));

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
                    <Route path="/login"    element={<Login />} />
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
                    <Route index        element={<Home />} />
                    <Route path="home"  element={<Home />} />
                    <Route path="jobs"  element={<Jobs />} />
                    <Route path="jobs/:jobId" element={<JobDetails />} />
                    <Route path="network"       element={<Network />} />
                    <Route path="notifications" element={<Notification />} />
                    <Route path="profile"       element={<Profile />} />
                    <Route path="ui-demo"       element={<UIDemo />} />

                    {/* Candidate specific */}
                    <Route
                      path="browse-jobs"
                      element={
                        <RoleRoute allowedRoles={["admin", "candidate"]}>
                          <BrowseJobs />
                        </RoleRoute>
                      }
                    />
                    <Route
                      path="my-applications"
                      element={
                        <RoleRoute allowedRoles={["candidate", "admin"]}>
                          <MyApplications />
                        </RoleRoute>
                      }
                    />
                    {/* ── Candidate AI Insights ── NEW */}
                    <Route
                      path="candidate-ai-insights"
                      element={
                        <RoleRoute allowedRoles={["candidate", "admin"]}>
                          <CandidateAIInsights />
                        </RoleRoute>
                      }
                    />

                    {/* Employer specific */}
                    <Route
                      path="post-job"
                      element={
                        <RoleRoute allowedRoles={["employer", "admin"]}>
                          <PostJob />
                        </RoleRoute>
                      }
                    />
                    <Route
                      path="my-jobs"
                      element={
                        <RoleRoute allowedRoles={["employer", "admin"]}>
                          <MyJobs />
                        </RoleRoute>
                      }
                    />
                    <Route
                      path="applications"
                      element={
                        <RoleRoute allowedRoles={["employer", "admin"]}>
                          <Applications />
                        </RoleRoute>
                      }
                    />
                    <Route
                      path="employer-analytics"
                      element={
                        <RoleRoute allowedRoles={["employer", "admin"]}>
                          <EmployerAnalytics />
                        </RoleRoute>
                      }
                    />
                    <Route
                      path="interview-scheduler"
                      element={
                        <RoleRoute allowedRoles={["employer", "admin"]}>
                          <InterviewScheduler />
                        </RoleRoute>
                      }
                    />
                    {/* ── Employer AI Insights ── NEW */}
                    <Route
                      path="employer-ai-insights"
                      element={
                        <RoleRoute allowedRoles={["employer", "admin"]}>
                          <EmployerAIInsights />
                        </RoleRoute>
                      }
                    />

                    {/* Dashboard pages */}
                    <Route
                      path="employer-dashboard"
                      element={
                        <RoleRoute allowedRoles={["employer", "admin"]}>
                          <EmployerDashboard />
                        </RoleRoute>
                      }
                    />
                    <Route
                      path="candidate-dashboard"
                      element={
                        <RoleRoute allowedRoles={["candidate", "admin"]}>
                          <CandidateDashboard />
                        </RoleRoute>
                      }
                    />

                    {/* Admin only */}
                    <Route
                      path="admin-dashboard"
                      element={
                        <RoleRoute allowedRoles={["admin"]}>
                          <AdminDashboard />
                        </RoleRoute>
                      }
                    />
                    <Route
                      path="admin/users"
                      element={
                        <RoleRoute allowedRoles={["admin"]}>
                          <AdminUsers />
                        </RoleRoute>
                      }
                    />
                    <Route
                      path="admin/jobs"
                      element={
                        <RoleRoute allowedRoles={["admin"]}>
                          <AdminJobs />
                        </RoleRoute>
                      }
                    />
                    <Route
                      path="admin/analytics"
                      element={
                        <RoleRoute allowedRoles={["admin"]}>
                          <AdminAnalytics />
                        </RoleRoute>
                      }
                    />

                    {/* Payment pages */}
                    <Route
                      path="employer-pricing"
                      element={
                        <RoleRoute allowedRoles={["employer", "admin"]}>
                          <EmployerPricing />
                        </RoleRoute>
                      }
                    />
                    <Route
                      path="candidate-pricing"
                      element={
                        <RoleRoute allowedRoles={["candidate", "admin"]}>
                          <CandidatePricing />
                        </RoleRoute>
                      }
                    />
                    <Route path="checkout"        element={<Checkout />} />
                    <Route path="payment-success" element={<PaymentSuccess />} />
                  </Route>

                  {/* Unauthorized */}
                  <Route path="/unauthorized" element={<Unauthorized />} />
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