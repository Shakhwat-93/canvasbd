import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import {
    LayoutDashboard,
    MessageSquare,
    Settings as SettingsIcon,
    LogOut,
    Package,
    Search,
    Bell,
    Users,
    House,
    ShoppingBag,
    BarChart3,
    Layers,
    Tag,
    CreditCard,
    Truck,
    Video,
    Star,
    Menu,
    X
} from 'lucide-react';

export default function AdminLayout() {
    const { user, loading, signOut } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        if (!loading && !user) {
            navigate('/admin/login');
        }
    }, [user, loading, navigate]);

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-[#0c0c0e] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#b052ff]/20 border-t-[#b052ff] rounded-full animate-spin"></div>
            </div>
        );
    }

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    const mainMenuLinks = [
        { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
        { to: "/admin/services", icon: Package, label: "Services" },
        { to: "/admin/messages", icon: MessageSquare, label: "Inquiries" },
        { to: "/admin/videos", icon: Video, label: "Demo Videos" },
        { to: "/admin/reviews", icon: Star, label: "Reviews" },
        { to: "/admin/settings", icon: SettingsIcon, label: "Settings" }
    ];

    const systemLinks = [
        { to: "/admin/payments", icon: CreditCard, label: "Payments" },
        { to: "/admin/shipping", icon: Truck, label: "Shipping" }
    ];

    return (
        <div className="flex h-screen bg-[#0c0c0e] text-slate-300 font-sans overflow-hidden selection:bg-[#b052ff]/20">

            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-[#0c0c0e]/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                w-[260px] bg-[#16161a] border-r border-white/5 flex flex-col shrink-0
                fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Brand */}
                <div className="h-20 flex items-center justify-between px-8 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c068ff] to-[#ff5efb] flex items-center justify-center shadow-lg shadow-[#b052ff]/20">
                            <span className="text-white font-bold text-lg leading-none">C</span>
                        </div>
                        <span className="text-white font-serif font-bold text-xl tracking-tight hidden sm:block">CANVASBD</span>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        className="lg:hidden text-slate-400 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-8">
                    {/* Main Menu */}
                    <div className="mb-6">
                        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Main Menu</p>
                        <nav className="space-y-0.5">
                            {mainMenuLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    end={link.end}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                            ? 'bg-gradient-to-r from-[#2c1d38] to-transparent text-white'
                                            : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <link.icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[#e58fff]' : 'opacity-70'} />
                                            {link.label}
                                            {isActive && (
                                                <div className="absolute left-0 w-1 h-6 bg-gradient-to-b from-[#b052ff] to-[#ff5df5] rounded-r-md"></div>
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    {/* System */}
                    <div>
                        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">System</p>
                        <nav className="space-y-0.5">
                            {systemLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                            ? 'bg-gradient-to-r from-[#2c1d38] to-transparent text-white'
                                            : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <link.icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[#e58fff]' : 'opacity-70'} />
                                            {link.label}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-4 px-4 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full text-left text-sm font-medium"
                            >
                                <LogOut size={18} strokeWidth={2} className="opacity-70" />
                                Log Out
                            </button>
                        </nav>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 w-full min-w-0">
                {/* Topbar */}
                <header className="h-20 !flex !flex-row items-center justify-between lg:justify-end w-full px-4 md:px-8 bg-[#0c0c0e] border-b border-white/5 shrink-0">

                    {/* Mobile Menu Toggle Button */}
                    <button
                        className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    {/* Search Bar - hidden on mobile, takes available space up to max-w-md on desktop */}
                    <div className="relative w-full max-w-md hidden lg:block mr-auto">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-[#16161a] border border-white/5 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-[#b052ff]/50 focus:ring-1 focus:ring-[#b052ff]/50 transition-all placeholder:text-slate-600"
                        />
                    </div>

                    {/* Right side icons */}
                    <div className="!flex !flex-row items-center gap-6 shrink-0 ml-auto">
                        <button className="relative text-slate-400 hover:text-white transiion-colors">
                            <Bell size={20} strokeWidth={2} />
                            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0c0c0e]"></div>
                        </button>
                        <div className="w-9 h-9 rounded-lg bg-[#2563eb] text-white !flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
                            AU
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto custom-scrollbar pb-12">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
