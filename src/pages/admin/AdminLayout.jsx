import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { LayoutDashboard, MessageSquare, Settings as SettingsIcon, LogOut, Package } from 'lucide-react';

export default function AdminLayout() {
    const { user, loading, signOut } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!loading && !user) {
            navigate('/admin/login');
        }
    }, [user, loading, navigate]);

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-[#111111] flex items-center justify-center">
                <div className="text-orange-500 animate-pulse">Loading Workspace...</div>
            </div>
        );
    }

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    const navLinks = [
        { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
        { to: "/admin/messages", icon: MessageSquare, label: "Messages" },
        { to: "/admin/services", icon: Package, label: "Services" },
        { to: "/admin/settings", icon: SettingsIcon, label: "Settings" }
    ];

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-gray-200 font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111111] border-r border-[#1f1f1f] flex flex-col">
                {/* Brand */}
                <div className="h-20 flex items-center px-6 border-b border-[#1f1f1f]">
                    <div className="flex items-center gap-3">
                        <img src="/images/br/logo.png" alt="Canvas Logo" className="h-[70px] scale-150 object-contain" />
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-4 space-y-1">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-[#1a1a1a] text-white font-medium shadow-sm border border-[#2a2a2a]'
                                    : 'text-gray-400 hover:text-white hover:bg-[#151515]'
                                }`
                            }
                        >
                            <link.icon size={18} className="opacity-80" />
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer / Logout */}
                <div className="p-4 border-t border-[#1f1f1f]">
                    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center">
                                <span className="text-xs font-bold text-white">A</span>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">{user.email}</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-[#222] hover:bg-red-500/10 text-gray-400 hover:text-red-500 border border-[#333] hover:border-red-500/20 transition-colors text-sm font-medium"
                        >
                            <LogOut size={16} />
                            Log Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <Outlet />
            </main>
        </div>
    );
}
