import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Impor CSS utama Anda
import '../css/app.css';

// Impor komponen halaman utama
import HomePage from './pages/HomePage';
import PostJobPage from './pages/PostJobPage';
import PostJobFormPage from './pages/PostJobFormPage';
import SearchJobsPage from './pages/SearchJobsPage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage'; // Impor halaman login
import RegisterPage from './pages/RegisterPage'; // Impor halaman register
import CompanyPage from './pages/CompanyPage'; // Impor halaman untuk perusahaan
import ProfilePage from './pages/ProfilePage'; // Impor halaman profile
import ApplyJobPage from './pages/ApplyJobPage'; // Impor halaman apply job

// Cari div #app di "cangkang" Blade dan render aplikasi React di dalamnya
const rootElement = document.getElementById('app');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/post-job" element={<PostJobPage />} />
                    <Route path="/post-job/form" element={<PostJobFormPage />} />
                    <Route path="/jobs" element={<SearchJobsPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/login" element={<LoginPage />} /> {/* Tambahkan route untuk halaman login */}
                    <Route path="/register" element={<RegisterPage />} /> {/* Tambahkan route untuk halaman register */}
                    <Route path="/company" element={<CompanyPage />} /> {/* Tambahkan route untuk halaman perusahaan */}
                    <Route path="/profile" element={<ProfilePage />} /> {/* Tambahkan route untuk halaman profile */}
                    <Route path="/apply-job" element={<ApplyJobPage />} /> {/* Tambahkan route untuk halaman apply job */}
                    {/* Tambahkan route lain jika perlu */}
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}