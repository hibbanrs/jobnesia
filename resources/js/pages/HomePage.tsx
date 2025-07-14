import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import JobList from '../components/JobList';
import Footer from '../components/Footer';

const HomePage = () => {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = (k: string, l: string) => {
        setKeyword(k);
        setLocation(l);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero onSearch={handleSearch} />
            <JobList keyword={keyword} location={location} />
            <Footer />
        </div>
    );
};

export default HomePage;