import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';

interface JobListProps {
    keyword: string;
    location: string;
}

const JobList: React.FC<JobListProps> = ({ keyword, location }) => {
    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/jobs')
            .then(res => res.json())
            .then(data => setJobs(data));
    }, []);

    const filteredJobs = jobs.filter(job =>
        (!keyword || job.title.toLowerCase().includes(keyword.toLowerCase())) &&
        (!location || job.location.toLowerCase().includes(location.toLowerCase()))
    );

    return (
        <section className="job-listings">
            {filteredJobs.length === 0 ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', padding: '40px 0' }}>
                    Tidak ada lowongan yang ditemukan.
                </div>
            ) : (
                filteredJobs.map((job) => (
                    <JobCard
                        key={job.id}
                        logoBgColor="#e6f4ff"
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        tags={[
                            job.jobType,
                            job.category,
                            job.experience,
                        ]}
                        salary={
                            job.salaryMin && job.salaryMax
                                ? `Rp ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}`
                                : '-'
                        }
                        profilePicture={job.profile_picture}
                    />
                ))
            )}
        </section>
    );
};

export default JobList;