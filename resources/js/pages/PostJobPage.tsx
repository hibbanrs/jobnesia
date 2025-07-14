import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const packages = [
  {
    name: 'Basic',
    price: 'Rp 0',
    features: [
      '1 Lowongan aktif',
      'Tayang 7 hari',
      'Dashboard pelamar',
      'Notifikasi email',
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    price: 'Rp 199.000',
    features: [
      '5 Lowongan aktif',
      'Tayang 30 hari',
      'Dashboard pelamar',
      'Notifikasi email',
      'Highlight di halaman utama',
      'Statistik pelamar',
    ],
    highlight: true,
  },
  {
    name: 'Premium',
    price: 'Rp 499.000',
    features: [
      'Unlimited lowongan aktif',
      'Tayang 60 hari',
      'Dashboard pelamar',
      'Notifikasi email',
      'Highlight di halaman utama',
      'Statistik pelamar',
      'Promosi di media sosial',
      'Support prioritas',
    ],
    highlight: false,
  },
];

const PostJobPage = () => {
  const navigate = useNavigate();

  const handleChoose = () => {
    navigate('/post-job/form');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <section className="postjob-section">
        <div className="postjob-container">
          <h1 className="postjob-title">Pilih Paket Pasang Lowongan Kerja</h1>
          <p className="postjob-subtitle">
            Pilih paket yang sesuai kebutuhan perusahaan Anda dan dapatkan kandidat terbaik bersama Jobnesia.
          </p>
          <div className="postjob-pricing-list">
            {packages.map((pkg, idx) => (
              <div
                key={pkg.name}
                className={`postjob-card${pkg.highlight ? ' postjob-card-highlight' : ''}`}
              >
                <div className="postjob-card-header">
                  <span className="postjob-card-name">{pkg.name}</span>
                  <span className="postjob-card-price">{pkg.price}</span>
                </div>
                <ul className="postjob-card-features">
                  {pkg.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <button className="postjob-btn" onClick={handleChoose}>Pilih Paket</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PostJobPage;
