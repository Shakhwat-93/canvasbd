import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { AuthProvider } from './lib/AuthContext';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Messages from './pages/admin/Messages';
import ServicesManager from './pages/admin/ServicesManager';
import Settings from './pages/admin/Settings';
import VideosManager from './pages/admin/VideosManager';
import TestimonialsManager from './pages/admin/TestimonialsManager';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />

        {/* Admin Dashboard */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="settings" element={<Settings />} />
          <Route path="videos" element={<VideosManager />} />
          <Route path="reviews" element={<TestimonialsManager />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
