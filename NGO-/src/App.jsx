import {
  Target,
  Eye,
  HeartHandshake
} from "lucide-react";


import jsPDF from "jspdf";
import QRCode from "qrcode";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Button from "./components/Button";
import Card from "./components/Card";
import Badge from "./components/Badge";
import Toast from "./components/Toast";
import AnimatedNumber from "./components/AnimatedNumber";
import DashboardLayout from "./components/DashboardLayout";
import {
  MOCK_EVENTS,
  MOCK_STATS,
  MOCK_CHART_DATA,
  MOCK_REGISTRATIONS
} from "./utils/mockData";




import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import AdminHome from "./pages/admin/adminHome";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminRegistrations from "./pages/admin/AdminRegistrations";
import VolunteerOverview from "./pages/volunteer/VolunteerOverview";
import VolunteerEvents from "./pages/volunteer/VolunteerEvents";
import EventRegistrationModal from "./pages/volunteer/EventRegistrationModal";
import VolunteerApplications from "./pages/volunteer/VolunteerApplications";
import VolunteerCertificates from "./pages/volunteer/VolunteerCertificates";

import {
  Heart, Users, Calendar, MapPin, CheckCircle, Clock, Search, Filter,
  Menu, X, Bell, LogOut, ChevronRight, Download, QrCode, Plus, Edit,
  Trash2, Shield, User, FileText, Settings, Award, ArrowRight, Activity,
  Mail, Phone, Info, LayoutDashboard, CheckSquare, Map, ClipboardList, DownloadCloud, Check
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';


const App = () => {
  const [currentView, setCurrentView] = useState('landing'); // landing, auth, volunteer, admin
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState(null);
  const [registeringEvent, setRegisteringEvent] = useState(null);


  useEffect(() => {

    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {

      const user = JSON.parse(savedUser);

      setUser(user);
      setCurrentView(user.role);
      setActiveTab("dashboard");

    }

  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const login = (user, token) => {

    console.log("LOGIN USER:", user);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    setCurrentView(user.role);
    setActiveTab("dashboard");

    showToast(`Welcome ${user.name}`);
  };
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setCurrentView("landing");

    showToast("Logged out successfully", "info");
  };

  const volunteerMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },

    { id: 'events', label: 'Browse Events', icon: Calendar },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'certificates', label: 'Certificates', icon: Award },
  ];

  const adminMenu = [
    { id: 'dashboard', label: 'Overview', icon: Activity },
    { id: 'events', label: 'Event Management', icon: Calendar },
    { id: 'registrations', label: 'Registrations', icon: ClipboardList },
    
    
    
  ];

  // Render logic based on view state
  let content;
  if (
    !user &&
    ["admin", "volunteer", "participant"].includes(currentView)
  ) {
    return (
      <AuthPage
        login={login}
        showToast={showToast}
      />
    );
  }
  switch (currentView) {
    case 'landing':
      content = <LandingPage navigate={setCurrentView} onRegisterClick={setRegisteringEvent} />;
      break;
    case 'auth':
      content = <AuthPage
        login={login}
        showToast={showToast}
      />;
      break;
    case "participant":
    case 'volunteer':
      content = (
        <DashboardLayout user={user} logout={logout} menuItems={volunteerMenu} activeTab={activeTab} setActiveTab={setActiveTab}>
          {activeTab === 'dashboard' && <VolunteerOverview navigateTab={setActiveTab} user={user} />}
          {activeTab === 'events' && <VolunteerEvents showToast={showToast} />}
          {activeTab === 'applications' && <VolunteerApplications />}
          {activeTab === 'certificates' && <VolunteerCertificates showToast={showToast} />}
          {(activeTab === 'profile') && (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <p>Profile Settings View (UI Mockup)</p>
            </div>
          )}
        </DashboardLayout>
      );
      break;
    case "admin":

      content = (
        <AdminHome
          user={user}
          logout={logout}
          adminMenu={adminMenu}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showToast={showToast}
        />
      );

      break;
    default:
      content = <LandingPage navigate={setCurrentView} onRegisterClick={setRegisteringEvent} />;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes bounceIn { 0% { transform: scale(0.8); opacity: 0; } 50% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
        
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; opacity: 0; }
        .animate-slide-in-right { animation: slideInRight 0.3s ease-out forwards; }
        .animate-bounce-in { animation: bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-scan { animation: scan 3s linear infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}} />
      {content}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
};

export default App;