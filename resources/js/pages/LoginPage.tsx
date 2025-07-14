import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Briefcase, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login gagal');
      } else {
        // Simpan user ke localStorage agar Navbar bisa membaca
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/'; // redirect ke home
      }
    } catch {
      setError('Terjadi kesalahan server.');
    }
    setLoading(false);
  };

  return (
    <div className="login-bg">
      <Navbar />
      <section className="login-section">
        <div className="login-container">
          {/* Logo */}
          <div className="login-logo">
            <div className="login-logoicon">
              <Briefcase className="login-logoicon-svg" />
            </div>
            <span className="login-logotext">Jobnesia</span>
          </div>
          <p className="login-desc">Masuk ke akun Anda</p>

          <div className="login-card">
            <div className="login-card-header">
              <div className="login-card-title">Selamat Datang Kembali</div>
              <div className="login-card-subtitle">Masuk untuk melanjutkan pencarian karir Anda</div>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="login-label">Email</label>
                <div className="login-input-icon">
                  <Mail className="login-input-svg" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="login-label">Password</label>
                <div className="login-input-icon">
                  <Lock className="login-input-svg" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password Anda"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="login-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye className="login-eye-icon" /> : <EyeOff className="login-eye-icon" />}
                  </button>
                </div>
              </div>
              {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
              <div className="login-form-row">
                <label className="login-checkbox">
                  <input type="checkbox" />
                  <span>Ingat saya</span>
                </label>
                <a href="#" className="login-link">Lupa password?</a>
              </div>
              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>
            <div className="login-register">
              Belum punya akun?{' '}
              <Link to="/register" className="login-link-bold">
                Daftar sekarang
              </Link>
            </div>
          </div>
          <div className="login-terms">
            Dengan masuk, Anda menyetujui <a href="#" className="login-link">Syarat & Ketentuan</a> dan <a href="#" className="login-link">Kebijakan Privasi</a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LoginPage;
