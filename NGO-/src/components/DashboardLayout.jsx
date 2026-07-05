import React, { useState } from "react";

import {
  Menu,
  X,
  Bell,
  LogOut,
} from "lucide-react";



const DashboardLayout = ({ user, logout, children, menuItems, activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8C42] to-[#4CAF50] flex items-center justify-center text-white font-bold text-xl">EK</div>
          <span className="text-xl font-bold text-gray-800">Ekk Kadam</span>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                ${activeTab === item.id
                  ? 'bg-orange-50 text-[#FF8C42]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-[#FF8C42]' : 'text-gray-400'} />
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium text-sm">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-600" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 capitalize hidden sm:block">
              {menuItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <button className="relative text-gray-500 hover:text-[#FF8C42] transition-colors">
              <Bell size={22} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 text-[#FF8C42] flex items-center justify-center font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full animate-fade-in">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="relative w-64 bg-white h-full flex flex-col animate-slide-in-right">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF8C42] flex items-center justify-center text-white font-bold">EK</div>
                <span className="font-bold text-gray-800">Ekk Kadam</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium
                    ${activeTab === item.id ? 'bg-orange-50 text-[#FF8C42]' : 'text-gray-600'}`}
                >
                  <item.icon size={20} /> {item.label}
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};


export default DashboardLayout;