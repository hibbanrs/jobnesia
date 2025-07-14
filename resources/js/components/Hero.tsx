import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, MapPin, Briefcase, TrendingUp } from 'lucide-react';

interface HeroProps {
  onSearch: (keyword: string, location: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, location);
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <h1>
            Temukan <span className="highlight">Karir Impian</span> Anda di Indonesia
          </h1>
          <p>
            Platform terpercaya untuk mencari dan memasang lowongan kerja. 
            Bergabunglah dengan ribuan profesional yang telah menemukan karir impian mereka.
          </p>
          <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-fields">
              <div className="search-input-icon">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Posisi atau kata kunci"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                />
              </div>
              <div className="search-input-icon">
                <MapPin className="search-icon" />
                <input
                  type="text"
                  placeholder="Lokasi"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </div>
              <button type="submit" className="search-btn">
                <Search className="search-btn-icon" />
                Cari Lowongan
              </button>
            </div>
          </form>
        </div>
        <div className="hero-right">
          <div className="hero-illustration">
            <div className="icon-bounce">
              <Briefcase className="icon-main" />
            </div>
            <div className="icon-bounce delay">
              <TrendingUp className="icon-main" />
            </div>
            <div className="hero-join-text">
              Bergabunglah dengan komunitas profesional terbesar di Indonesia
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
