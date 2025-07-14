import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Briefcase, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    password: '',
    confirmPassword: '',
    terms: false,
    newsletter: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!form.terms) {
      setError('Anda harus menyetujui Syarat & Ketentuan.');
      setLoading(false);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Konfirmasi password tidak cocok.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          userType: form.userType,
          password: form.password,
          password_confirmation: form.confirmPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Registrasi gagal');
      } else {
        setSuccess('Registrasi berhasil! Silakan login.');
      }
    } catch (err) {
      setError('Terjadi kesalahan server.');
    }
    setLoading(false);
  };

  return (
    <div className="register-bg">
      <Navbar />
      <section className="register-section">
        <div className="register-container">
          {/* Logo */}
          <div className="register-logo">
            <div className="register-logoicon">
              <Briefcase className="register-logoicon-svg" />
            </div>
            <span className="register-logotext">Jobnesia</span>
          </div>
          <p className="register-desc">Buat akun baru Anda</p>

          <div className="register-card">
            <div className="register-card-header">
              <div className="register-card-title">Bergabung dengan Jobnesia</div>
              <div className="register-card-subtitle">Mulai perjalanan karir Anda bersama kami</div>
            </div>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-form-row">
                <div>
                  <label htmlFor="firstName" className="register-label">Nama Depan</label>
                  <div className="register-input-icon">
                    <User className="register-input-svg" />
                    <input id="firstName" name="firstName" placeholder="Ahmad" value={form.firstName} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="register-label">Nama Belakang</label>
                  <input id="lastName" name="lastName" placeholder="Rizki" value={form.lastName} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="register-label">Email</label>
                <div className="register-input-icon">
                  <Mail className="register-input-svg" />
                  <input id="email" name="email" type="email" placeholder="ahmad.rizki@email.com" value={form.email} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label htmlFor="userType" className="register-label">Daftar sebagai</label>
                <select id="userType" name="userType" value={form.userType} onChange={handleChange}>
                  <option value="">Pilih tipe akun</option>
                  <option value="job-seeker">Pencari Kerja</option>
                  <option value="employer">Perusahaan/HR</option>
                </select>
              </div>
              <div>
                <label htmlFor="password" className="register-label">Password</label>
                <div className="register-input-icon">
                  <Lock className="register-input-svg" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="register-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye className="register-eye-icon" /> : <EyeOff className="register-eye-icon" />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="register-label">Konfirmasi Password</label>
                <div className="register-input-icon">
                  <Lock className="register-input-svg" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ketik ulang password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="register-eye-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Eye className="register-eye-icon" /> : <EyeOff className="register-eye-icon" />}
                  </button>
                </div>
              </div>
              <div className="register-checkbox-row">
                <label className="register-checkbox">
                  <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
                  <span>
                    Saya menyetujui <a href="#" className="register-link">Syarat & Ketentuan</a> dan <a href="#" className="register-link">Kebijakan Privasi</a> Jobnesia
                  </span>
                </label>
              </div>
              <div className="register-checkbox-row">
                <label className="register-checkbox">
                  <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} />
                  <span>
                    Saya ingin menerima newsletter dan update lowongan kerja terbaru
                  </span>
                </label>
              </div>
              {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
              {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
              <button type="submit" className="register-submit-btn" disabled={loading}>
                {loading ? 'Mendaftar...' : 'Buat Akun'}
              </button>
            </form>
            <div className="register-login">
              Sudah punya akun?{' '}
              <Link to="/login" className="register-link-bold">
                Masuk di sini
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RegisterPage;
