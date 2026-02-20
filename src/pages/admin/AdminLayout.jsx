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
            <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
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
        <div className="flex h-screen bg-[#0b0e14] text-slate-300 font-sans overflow-hidden">
            {/* Background ambient glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Sidebar */}
            <aside className="w-64 bg-[#131825]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
                {/* Brand */}
                <div className="h-24 flex items-center justify-center px-6 border-b border-white/5">
                    <div className="flex items-center justify-center w-full">
                        <img src="/images/br/logo.png" alt="Canvas Logo" className="h-[60px] scale-150 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-8 px-4 space-y-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group overflow-hidden ${isActive
                                    ? 'text-cyan-400 font-medium'
                                    : 'text-slate-400 hover:text-slate-100'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl pointer-events-none"></div>
                                    )}
                                    <div className="relative z-10 flex items-center gap-4 w-full">
                                        <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-transparent text-slate-500 group-hover:text-slate-300'}`}>
                                            <link.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                        </div>
                                        <span className="text-[15px] tracking-wide">{link.label}</span>
                                        {isActive && (
                                            <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                                        )}
                                    </div>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer / Logout */}
                <div className="p-4 border-t border-white/5">
                    <div className="bg-[#1a2133]/60 backdrop-blur-xl rounded-2xl p-4 border border-white/5 flex flex-col gap-4 shadow-inner">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                                <div className="w-full h-full rounded-full bg-[#131825] flex items-center justify-center">
                                    <span className="text-sm font-bold text-cyan-400">A</span>
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-semibold text-slate-200 truncate">{user.email}</p>
                                <p className="text-[11px] text-cyan-500/80 uppercase tracking-wider font-medium mt-0.5">Systems Admin</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-slate-800/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-white/5 hover:border-red-500/20 transition-all duration-300 text-sm font-medium group"
                        >
                            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Secure Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto relative z-10 custom-scrollbar">
                <Outlet />
            </main>
        </div>
    );
}
