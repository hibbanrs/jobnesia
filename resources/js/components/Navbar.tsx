import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Fungsi untuk mengambil user dari localStorage
function getUser() {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

const Navbar = () => {
  const [user, setUser] = useState<{ first_name?: string; profile_picture?: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Bagian Logo/Brand */}
      <Link to="/" className="navbar-brand">
        Jobnesia
      </Link>

      {/* Bagian Menu Navigasi */}
      <div className="navbar-menu">
        <Link to="/post-job">Pasang lowongan kerja</Link>
        <Link to="/jobs">Cari lowongan kerja</Link>
        <Link to="/community">Komunitas</Link>
        <Link to="/company">Untuk Perusahaan</Link>
      </div>

      {/* Bagian Tombol Autentikasi & Avatar */}
      <div className="navbar-auth">
        {/* Tampilkan tombol "Masuk" dan "Untuk perusahaan" hanya jika user belum login */}
        {!user && (
          <>
            <Link to="/login" className="btn-masuk">
              Masuk
            </Link>
            <Link to="/company" className="btn-masuk btn-company">
              Untuk perusahaan
            </Link>
          </>
        )}

        {/* Tampilkan avatar dan nama depan user jika sudah login */}
        {user && (
          <div className="navbar-user">
            <Link to="/profile" className="navbar-avatar" style={{ textDecoration: 'none' }}>
              {user.profile_picture ? (
                <img src={user.profile_picture} alt="avatar" />
              ) : (
                <span className="navbar-avatar-fallback">
                  {user.first_name ? user.first_name.charAt(0).toUpperCase() : 'U'}
                </span>
              )}
            </Link>
            <div className="navbar-username">{user.first_name}</div>
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;