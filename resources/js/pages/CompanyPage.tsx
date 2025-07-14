import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CompanyPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
    <Navbar />
    <section style={{ padding: '48px 0 40px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#2563eb', marginBottom: 10 }}>
          Untuk Perusahaan
        </h1>
        <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: 32 }}>
          Temukan talenta terbaik untuk perusahaan Anda dengan mudah dan cepat melalui Jobnesia.
        </p>
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
          padding: 32,
          marginBottom: 32,
          border: '1.5px solid #e0e7ef'
        }}>
          <h2 style={{ color: '#2563eb', fontWeight: 600, fontSize: '1.2rem', marginBottom: 12 }}>
            Fitur untuk Perusahaan
          </h2>
          <ul style={{ color: '#444', fontSize: '1.05rem', marginLeft: 18, marginBottom: 18 }}>
            <li>• Posting lowongan kerja gratis & berbayar</li>
            <li>• Dashboard pelamar & manajemen rekrutmen</li>
            <li>• Statistik & insight pelamar</li>
            <li>• Promosi lowongan di halaman utama</li>
            <li>• Support prioritas untuk perusahaan</li>
          </ul>
          <a href="/post-job" style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            borderRadius: 8,
            padding: '12px 28px',
            fontWeight: 500,
            fontSize: '1rem',
            textDecoration: 'none',
            marginTop: 10,
            transition: 'background 0.2s'
          }}>Pasang Lowongan Sekarang</a>
        </div>
        <div style={{
          background: '#e6f4ff',
          borderRadius: 12,
          padding: 24,
          color: '#2563eb',
          fontWeight: 500,
          fontSize: '1.08rem'
        }}>
          <span role="img" aria-label="info">💡</span> Ingin konsultasi rekrutmen atau promosi khusus? Hubungi tim kami di <a href="mailto:info@jobnesia.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>info@jobnesia.com</a>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default CompanyPage;
