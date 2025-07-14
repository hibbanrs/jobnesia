import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Search, MapPin, Filter, Briefcase, Clock, DollarSign, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchJobsPage = () => {
	const [showFilters, setShowFilters] = useState(false);
	const [jobs, setJobs] = useState<any[]>([]);
	const [keyword, setKeyword] = useState('');
	const [location, setLocation] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
    fetch('/api/jobs')
        .then(res => res.json())
        .then(data => setJobs(data));
}, []);

	const filteredJobs = jobs.filter(job =>
		job.title.toLowerCase().includes(keyword.toLowerCase()) &&
		job.location.toLowerCase().includes(location.toLowerCase())
	);

	return (
		<div className="searchjobs-bg">
			<Navbar />
			<section className="searchjobs-section">
				<div className="searchjobs-container">
					<div className="searchjobs-header">
						<h1>Cari Lowongan Kerja</h1>
						<p>
							Temukan pekerjaan impian Anda dari ribuan lowongan tersedia
						</p>
					</div>
					{/* Search & Filter */}
					<div className="searchjobs-searchbox">
						<div className="searchjobs-searchrow">
							<div className="searchjobs-searchinput">
								<Search className="searchjobs-icon" />
								<input
									type="text"
									placeholder="Cari posisi, perusahaan, atau kata kunci..."
									style={{ paddingLeft: 36 }}
									value={keyword}
									onChange={e => setKeyword(e.target.value)}
								/>
							</div>
							<div className="searchjobs-searchinput">
								<MapPin className="searchjobs-icon" />
								<input
									type="text"
									placeholder="Lokasi"
									style={{ paddingLeft: 36 }}
									value={location}
									onChange={e => setLocation(e.target.value)}
								/>
							</div>
							<button className="searchjobs-btn" type="button">
								<Search className="searchjobs-btnicon" />
								Cari
							</button>
						</div>
						<div className="searchjobs-filterrow">
							<Button
								type="button"
								className="searchjobs-btn-outline"
								onClick={() => setShowFilters(!showFilters)}
							>
								<Filter className="searchjobs-btnicon" />
								Filter Lanjutan
							</Button>
							{showFilters && (
								<div className="searchjobs-advfilter">
									<select>
										<option value="">Tipe Pekerjaan</option>
										<option value="full-time">Full-time</option>
										<option value="part-time">Part-time</option>
										<option value="remote">Remote</option>
										<option value="contract">Contract</option>
									</select>
									<select>
										<option value="">Kategori</option>
										<option value="it">IT & Technology</option>
										<option value="marketing">Marketing</option>
										<option value="finance">Finance</option>
										<option value="design">Design</option>
									</select>
									<select>
										<option value="">Pengalaman</option>
										<option value="fresh">Fresh Graduate</option>
										<option value="1-2">1-2 Tahun</option>
										<option value="3-5">3-5 Tahun</option>
										<option value="5+">5+ Tahun</option>
									</select>
								</div>
							)}
						</div>
					</div>
					{/* Results */}
					<div className="searchjobs-content">
						<div className="searchjobs-list">
							<div className="searchjobs-list-header">
								<h2>{filteredJobs.length} Lowongan Ditemukan</h2>
								<select>
									<option>Urutkan berdasarkan</option>
									<option value="newest">Terbaru</option>
									<option value="salary-high">Gaji Tertinggi</option>
									<option value="salary-low">Gaji Terendah</option>
									<option value="relevance">Relevansi</option>
								</select>
							</div>
							{filteredJobs.map((job) => (
								<div key={job.id} className="searchjobs-jobcard">
									<div className="searchjobs-jobcard-header">
										<div>
											<h3>{job.title}</h3>
											<div className="searchjobs-company">
												{job.company}
											</div>
											<div className="searchjobs-location">
												<MapPin className="searchjobs-jobicon" />
												{job.location}
											</div>
										</div>
										<Button
											type="button"
											className="searchjobs-bookmarkbtn"
										>
											<Bookmark className="searchjobs-jobicon" />
										</Button>
									</div>
									<div className="searchjobs-description">
										{job.description}
									</div>
									<div className="searchjobs-tags">
										{job.category && <span className="searchjobs-tag">{job.category}</span>}
										{job.jobType && <span className="searchjobs-tag">{job.jobType}</span>}
										{job.experience && <span className="searchjobs-tag">{job.experience}</span>}
										{Array.isArray(job.skills) && job.skills.map((tag: string, idx: number) => (
											<span key={idx} className="searchjobs-tag">
												{tag}
											</span>
										))}
									</div>
									<div className="searchjobs-jobfooter">
										<div className="searchjobs-jobinfo">
											<span>
												<Briefcase className="searchjobs-jobicon" />{' '}
												{job.jobType}
											</span>
											<span>
												<DollarSign className="searchjobs-jobicon" />{' '}
												{job.salaryMin && job.salaryMax
													? `Rp ${job.salaryMin.toLocaleString()} - Rp ${job.salaryMax.toLocaleString()}`
													: '-'}
											</span>
											<span>
												<Clock className="searchjobs-jobicon" />{' '}
												{job.deadline || '-'}
											</span>
										</div>
										<Button className="searchjobs-applybtn" onClick={() => navigate(`/apply-job?job_id=${job.id}`)}>
											Lamar Sekarang
										</Button>
									</div>
								</div>
							))}
						</div>
						<aside className="searchjobs-sidebar">
							<div className="searchjobs-tips">
								<div className="searchjobs-tips-title">Tips Pencarian</div>
								<ul>
									<li>
										• Gunakan kata kunci yang spesifik untuk hasil yang lebih
										akurat
									</li>
									<li>• Coba variasi kata kunci yang berbeda</li>
									<li>
										• Gunakan filter untuk mempersempit hasil pencarian
									</li>
									<li>
										• Simpan lowongan yang menarik untuk ditinjau nanti
									</li>
								</ul>
							</div>
							<div className="searchjobs-tips">
								<div className="searchjobs-tips-title">Kategori Populer</div>
								<ul>
									<li>
										<button
											type="button"
											className="searchjobs-sidebarbtn"
										>
											IT &amp; Technology (245)
										</button>
									</li>
									<li>
										<button
											type="button"
											className="searchjobs-sidebarbtn"
										>
											Marketing (156)
										</button>
									</li>
									<li>
										<button
											type="button"
											className="searchjobs-sidebarbtn"
										>
											Design (89)
										</button>
									</li>
									<li>
										<button
											type="button"
											className="searchjobs-sidebarbtn"
										>
											Finance (134)
										</button>
									</li>
									<li>
										<button
											type="button"
											className="searchjobs-sidebarbtn"
										>
											Sales (98)
										</button>
									</li>
								</ul>
							</div>
						</aside>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default SearchJobsPage;




