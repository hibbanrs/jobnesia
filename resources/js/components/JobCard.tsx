import React from 'react';

// Mendefinisikan tipe data untuk props yang akan diterima komponen ini
interface JobCardProps {
  logoBgColor: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  salary: string;
  profilePicture?: string | null;
}

// Komponen kecil untuk ikon, agar lebih rapi
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

// Komponen JobCard menerima 'props' dan menampilkannya
const JobCard: React.FC<JobCardProps> = (props) => {
  return (
    <div className="job-card">
      <div className="job-header">
        <div className="company-logo" style={{ backgroundColor: props.logoBgColor }}>
          {props.profilePicture ? (
            <img src={`/storage/${props.profilePicture}`} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          ) : null}
        </div>
        <div>
          <div className="job-title">{props.title}</div>
          <div className="company-name">{props.company}</div>
          <div className="job-location">
            <LocationIcon />
            {props.location}
          </div>
        </div>
      </div>
      <div className="job-tags">
        {props.tags.map(tag => (
          <span key={tag} className="job-tag">{tag}</span>
        ))}
      </div>
      <div className="job-salary">{props.salary}</div>
    </div>
  );
};

export default JobCard;