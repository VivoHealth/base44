import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import { Navigate } from 'react-router-dom';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import PatientLayout from '@/components/PatientLayout';
import DoctorLayout from '@/components/DoctorLayout';
import AdminLayout from '@/components/AdminLayout';
import PatientOverview from '@/pages/patient/Overview';
import AIAssistant from '@/pages/patient/AIAssistant';
import PatientHealthProfile from '@/pages/patient/HealthProfile';
import PatientMeasurements from '@/pages/patient/Measurements';
import PatientLabResults from '@/pages/patient/LabResults';
import PatientMedications from '@/pages/patient/Medications';
import PatientMarketplace from '@/pages/patient/Marketplace';
import PatientMessages from '@/pages/patient/Messages';
import PatientIntegrations from '@/pages/patient/Integrations';
import PatientSubscription from '@/pages/patient/Subscription';
import Placeholder from '@/pages/Placeholder';
import DoctorOverview from '@/pages/doctor/Overview';
import DoctorPatients from '@/pages/doctor/Patients';
import DoctorProfile from '@/pages/doctor/Profile';
import AdminOverview from '@/pages/admin/Overview';
import PmfDashboard from '@/pages/PmfDashboard';
import LandingEn from '@/pages/en/Landing';
import LoginEn from '@/pages/en/Login';
import RegisterEn from '@/pages/en/Register';
import PatientLayoutEn from '@/components/en/PatientLayout';
import DoctorLayoutEn from '@/components/en/DoctorLayout';
import AdminLayoutEn from '@/components/en/AdminLayout';
import PatientOverviewEn from '@/pages/en/patient/Overview';
import AIAssistantEn from '@/pages/en/patient/AIAssistant';
import PatientHealthProfileEn from '@/pages/en/patient/HealthProfile';
import PatientMeasurementsEn from '@/pages/en/patient/Measurements';
import PatientLabResultsEn from '@/pages/en/patient/LabResults';
import PatientMedicationsEn from '@/pages/en/patient/Medications';
import PatientMarketplaceEn from '@/pages/en/patient/Marketplace';
import PatientMessagesEn from '@/pages/en/patient/Messages';
import PatientIntegrationsEn from '@/pages/en/patient/Integrations';
import PatientSubscriptionEn from '@/pages/en/patient/Subscription';
import PlaceholderEn from '@/pages/en/Placeholder';
import DoctorOverviewEn from '@/pages/en/doctor/Overview';
import DoctorPatientsEn from '@/pages/en/doctor/Patients';
import AdminOverviewEn from '@/pages/en/admin/Overview';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically — but not if we're already on an auth page (prevents loop)
      const path = window.location.pathname;
      const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password', '/en/login', '/en/register', '/en/forgot-password', '/en/reset-password'].includes(path);
      if (!isAuthPage) {
        if (path.startsWith('/en')) {
          window.location.href = '/en/login?from_url=' + encodeURIComponent(window.location.href);
          return null;
        }
        navigateToLogin();
        return null;
      }
    }
  }

  // Render the main app
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Admin-only PMF dashboard */}
      <Route element={<AdminRoute />}>
        <Route path="/pmf" element={<PmfDashboard />} />
      </Route>

      {/* Protected patient routes */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<PatientLayout />}>
          <Route path="/pacientas" element={<PatientOverview />} />
          <Route path="/pacientas/ai" element={<AIAssistant />} />
          <Route path="/pacientas/profilis" element={<PatientHealthProfile />} />
          <Route path="/pacientas/matavimai" element={<PatientMeasurements />} />
          <Route path="/pacientas/laboratorija" element={<PatientLabResults />} />
          <Route path="/pacientas/dokumentai" element={<Placeholder title="Dokumentai" description="Įkelkite ir valdykite savo medicininius dokumentus" />} />
          <Route path="/pacientas/vaistai" element={<PatientMedications />} />
          <Route path="/pacientas/gydytojas" element={<PatientMarketplace />} />
          <Route path="/pacientas/zinutes" element={<PatientMessages />} />
          <Route path="/pacientas/prenumerata" element={<PatientSubscription />} />
          <Route path="/pacientas/integracijos" element={<PatientIntegrations />} />
          <Route path="/pacientas/nustatymai" element={<Placeholder title="Nustatymai" description="Privatumo centras ir paskyros nustatymai" />} />
        </Route>
      </Route>

      {/* Protected doctor routes */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<DoctorLayout />}>
          <Route path="/gydytojas" element={<DoctorOverview />} />
          <Route path="/gydytojas/pacientai" element={<DoctorPatients />} />
          <Route path="/gydytojas/perziuros" element={<Placeholder title="Peržiūros" description="Mėnesinės pacientų peržiūros ir darbo eiga" />} />
          <Route path="/gydytojas/ispėjimai" element={<Placeholder title="Įspėjimai" description="Pacientų įspėjimai ir aliarmai" />} />
          <Route path="/gydytojas/zinutes" element={<Placeholder title="Žinutės" description="Saugus susirašinėjimas su pacientais" />} />
          <Route path="/gydytojas/paskyros" element={<Placeholder title="Paskyros" description="Vaizdo konsultacijų tvarkaraštis" />} />
          <Route path="/gydytojas/planai" element={<Placeholder title="Planai" description="Priežiūros planai ir kainos" />} />
          <Route path="/gydytojas/pajamos" element={<Placeholder title="Pajamos" description="Mėnesio pajamos ir išmokos" />} />
          <Route path="/gydytojas/profilis" element={<DoctorProfile />} />
          <Route path="/gydytojas/nustatymai" element={<Placeholder title="Nustatymai" description="Paskyros nustatymai" />} />
        </Route>
      </Route>

      {/* Protected admin routes */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/gydytojai" element={<Placeholder title="Gydytojai" description="Gydytojų patvirtinimas ir valdymas" />} />
          <Route path="/admin/pacientai" element={<Placeholder title="Pacientai" description="Visi platformos pacientai" />} />
          <Route path="/admin/prenumeratos" element={<Placeholder title="Prenumeratos" description="Aktyvių prenumeratų valdymas" />} />
          <Route path="/admin/mokejimai" element={<Placeholder title="Mokėjimai" description="Mokėjimų istorija ir operacijos" />} />
          <Route path="/admin/saugumas" element={<Placeholder title="Saugumas" description="Saugumo pranešimai ir AI atsakymų peržiūra" />} />
          <Route path="/admin/integracijos" element={<Placeholder title="Integracijos" description="Sveikatos prietaisų integracijų konfigūracija" />} />
          <Route path="/admin/turinys" element={<Placeholder title="Turinys" description="Turinio ir pranešimų valdymas" />} />
          <Route path="/admin/nustatymai" element={<Placeholder title="Nustatymai" description="Platformos konfigūracija" />} />
        </Route>
      </Route>

      {/* English public routes */}
      <Route path="/en" element={<LandingEn />} />
      <Route path="/en/login" element={<LoginEn />} />
      <Route path="/en/register" element={<RegisterEn />} />
      <Route path="/en/forgot-password" element={<ForgotPassword />} />
      <Route path="/en/reset-password" element={<ResetPassword />} />

      {/* Protected English patient routes */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/en/login" replace />} />}>
        <Route element={<PatientLayoutEn />}>
          <Route path="/en/patient" element={<PatientOverviewEn />} />
          <Route path="/en/patient/ai" element={<AIAssistantEn />} />
          <Route path="/en/patient/profile" element={<PatientHealthProfileEn />} />
          <Route path="/en/patient/measurements" element={<PatientMeasurementsEn />} />
          <Route path="/en/patient/lab" element={<PatientLabResultsEn />} />
          <Route path="/en/patient/documents" element={<PlaceholderEn title="Documents" description="Upload and manage your medical documents" />} />
          <Route path="/en/patient/medications" element={<PatientMedicationsEn />} />
          <Route path="/en/patient/doctor" element={<PatientMarketplaceEn />} />
          <Route path="/en/patient/messages" element={<PatientMessagesEn />} />
          <Route path="/en/patient/subscription" element={<PatientSubscriptionEn />} />
          <Route path="/en/patient/integrations" element={<PatientIntegrationsEn />} />
          <Route path="/en/patient/settings" element={<PlaceholderEn title="Settings" description="Privacy center and account settings" />} />
        </Route>
      </Route>

      {/* Protected English doctor routes */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/en/login" replace />} />}>
        <Route element={<DoctorLayoutEn />}>
          <Route path="/en/doctor" element={<DoctorOverviewEn />} />
          <Route path="/en/doctor/patients" element={<DoctorPatientsEn />} />
          <Route path="/en/doctor/reviews" element={<PlaceholderEn title="Reviews" description="Monthly patient reviews and workflow" />} />
          <Route path="/en/doctor/alerts" element={<PlaceholderEn title="Alerts" description="Patient alerts and alarms" />} />
          <Route path="/en/doctor/messages" element={<PlaceholderEn title="Messages" description="Secure messaging with patients" />} />
          <Route path="/en/doctor/appointments" element={<PlaceholderEn title="Appointments" description="Video consultation schedule" />} />
          <Route path="/en/doctor/plans" element={<PlaceholderEn title="Plans" description="Care plans and pricing" />} />
          <Route path="/en/doctor/revenue" element={<PlaceholderEn title="Revenue" description="Monthly revenue and payouts" />} />
          <Route path="/en/doctor/profile" element={<PlaceholderEn title="Profile" description="Doctor professional profile" />} />
          <Route path="/en/doctor/settings" element={<PlaceholderEn title="Settings" description="Account settings" />} />
        </Route>
      </Route>

      {/* Protected English admin routes */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/en/login" replace />} />}>
        <Route element={<AdminLayoutEn />}>
          <Route path="/en/admin" element={<AdminOverviewEn />} />
          <Route path="/en/admin/doctors" element={<PlaceholderEn title="Doctors" description="Doctor approval and management" />} />
          <Route path="/en/admin/patients" element={<PlaceholderEn title="Patients" description="All platform patients" />} />
          <Route path="/en/admin/subscriptions" element={<PlaceholderEn title="Subscriptions" description="Active subscription management" />} />
          <Route path="/en/admin/payments" element={<PlaceholderEn title="Payments" description="Payment history and transactions" />} />
          <Route path="/en/admin/security" element={<PlaceholderEn title="Security" description="Security reports and AI response review" />} />
          <Route path="/en/admin/integrations" element={<PlaceholderEn title="Integrations" description="Health device integration configuration" />} />
          <Route path="/en/admin/content" element={<PlaceholderEn title="Content" description="Content and notification management" />} />
          <Route path="/en/admin/settings" element={<PlaceholderEn title="Settings" description="Platform configuration" />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App