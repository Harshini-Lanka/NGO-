import DashboardLayout from "../../components/DashboardLayout";

import AdminOverview from "./AdminOverview";
import AdminEvents from "./AdminEvents";
import AdminRegistrations from "./AdminRegistrations";
// import AdminScanner from "./AdminScanner";

const AdminHome = ({
  user,
  logout,
  adminMenu,
  activeTab,
  setActiveTab,
  showToast,
}) => {

  return (
    <DashboardLayout
      user={user}
      logout={logout}
      menuItems={adminMenu}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >

      {activeTab === "dashboard" && <AdminOverview />}  

      {activeTab === "events" && <AdminEvents />}

      {activeTab === "registrations" && (
        <AdminRegistrations showToast={showToast} />
      )}
    </DashboardLayout>
  );

};

export default AdminHome;