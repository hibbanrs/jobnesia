import React from 'react';

// SVG icon components
const FacebookIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"></path></svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.007-.857 3.17 0 2.188 1.115 4.117 2.823 5.247a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"></path></svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395c-.98.98-1.263 2.092-1.322 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.612.059 1.281.342 2.393 1.322 3.373.981.981 2.093 1.264 3.374 1.323C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.342 3.374-1.323.98-.98 1.263-2.092 1.322-3.373.059-1.28.072-1.689.072-7.612 0-5.923-.013-6.332-.072-7.612-.059-1.281-.342-2.393-1.322-3.373-.981-.981-2.093-1.264-3.374-1.323C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
);

const Footer = () => {
  return (
    <footer className="footer-2024">
      <div className="footer-2024-container">
        <div className="footer-2024-col footer-2024-brand">
          <div className="footer-2024-logo">
            <span className="footer-2024-logotext">Jobnesia</span>
          </div>
          <div className="footer-2024-desc">
            Platform terpercaya untuk mencari dan memasang lowongan kerja di Indonesia. Menghubungkan talenta terbaik dengan perusahaan impian.
          </div>
          <div className="footer-2024-social">
            <a href="#"><FacebookIcon /></a>
            <a href="#"><TwitterIcon /></a>
            <a href="#"><InstagramIcon /></a>
            <a href="#"><LinkedInIcon /></a>
          </div>
        </div>
        <div className="footer-2024-col">
          <div className="footer-2024-title">Menu Utama</div>
          <ul>
            <li><a href="#">Beranda</a></li>
            <li><a href="#">Cari Lowongan</a></li>
            <li><a href="#">Pasang Lowongan</a></li>
            <li><a href="#">Komunitas</a></li>
            <li><a href="#">Tentang Kami</a></li>
          </ul>
        </div>
        <div className="footer-2024-col">
          <div className="footer-2024-title">Kategori Populer</div>
          <ul>
            <li><a href="#">IT &amp; Technology</a></li>
            <li><a href="#">Marketing</a></li>
            <li><a href="#">Finance</a></li>
            <li><a href="#">Human Resources</a></li>
            <li><a href="#">Design</a></li>
          </ul>
        </div>
        <div className="footer-2024-col">
          <div className="footer-2024-title">Kontak</div>
          <ul className="footer-2024-contact">
            <li>
              <span role="img" aria-label="location">📍</span> Surabaya, Indonesia
            </li>
            <li>
              <span role="img" aria-label="phone">📞</span> +62 857 7577 7677
            </li>
            <li>
              <span role="img" aria-label="email">✉️</span> info@jobnesia.com
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-2024-bottom">
        <hr />
        <p>&copy; 2025 Jobnesia. Semua hak cipta dilindungi. Dibuat dengan Laravel &amp; React.</p>
      </div>
    </footer>
  );
};

export default Footer;