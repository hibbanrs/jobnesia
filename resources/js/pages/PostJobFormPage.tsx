import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { MapPin, DollarSign, Building, Clock, X } from 'lucide-react';

type JobForm = {
  title: string;
  company: string;
  location: string;
  jobType: string;
  category: string;
  experience: string;
  salaryMin: string;
  salaryMax: string;
  description: string;
  requirements: string;
  skills: string[];
  deadline: string;
  contact: string;
};

const PostJobFormPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [form, setForm] = useState<JobForm>({
    title: '',
    company: user?.first_name ? user.first_name + ' ' + user.last_name : '',
    location: '',
    jobType: '',
    category: '',
    experience: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: '',
    skills: [],
    deadline: '',
    contact: '',
  });
  const [currentSkill, setCurrentSkill] = useState('');
  const [preview, setPreview] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  if (!user || user.user_type !== 'employer') {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', margin: '80px 0', color: '#888' }}>
          Hanya akun Perusahaan/HR yang dapat mengakses halaman ini.
        </div>
        <Footer />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (currentSkill && !(form.skills as string[]).includes(currentSkill)) {
      setForm(prev => ({ ...prev, skills: [...(prev.skills as string[]), currentSkill] }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setForm(prev => ({
      ...prev,
      skills: (prev.skills as string[]).filter(skill => skill !== skillToRemove)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
        } else {
          formData.append(key, value);
        }
      });
      if (profilePicture) {
        formData.append('profile_picture', profilePicture);
      }
      formData.append('user_id', user.id);

      const res = await fetch('/api/jobs', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Gagal posting lowongan');
      } else {
        setSuccess('Lowongan berhasil diposting!');
        setForm({
          title: '',
          company: user.first_name + ' ' + user.last_name,
          location: '',
          jobType: '',
          category: '',
          experience: '',
          salaryMin: '',
          salaryMax: '',
          description: '',
          requirements: '',
          skills: [],
          deadline: '',
          contact: '',
        });
        setProfilePicture(null);
      }
    } catch {
      setError('Terjadi kesalahan server.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-white">
      <Navbar />
      <section className="postjobform-section">
        <div className="postjobform-container">
          <h1 className="postjobform-title">Pasang Lowongan Kerja</h1>
          <p className="postjobform-subtitle">
            Temukan kandidat terbaik untuk perusahaan Anda
          </p>
          {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
          <form className="postjobform-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-row">
              <div>
                <label htmlFor="title">Judul Lowongan *</label>
                <Input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Frontend Developer" />
              </div>
              <div>
                <label htmlFor="company">Nama Perusahaan *</label>
                <Input id="company" name="company" value={form.company} onChange={handleChange} placeholder="Nama Perusahaan" />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label htmlFor="location">Lokasi *</label>
                <div style={{ position: 'relative' }}>
                  <MapPin className="search-icon" style={{ left: 10, top: '50%', position: 'absolute', transform: 'translateY(-50%)' }} />
                  <Input id="location" name="location" value={form.location} onChange={handleChange} placeholder="Jakarta, Indonesia" style={{ paddingLeft: 38 }} />
                </div>
              </div>
              <div>
                <label htmlFor="jobType">Tipe Pekerjaan *</label>
                <select id="jobType" name="jobType" value={form.jobType} onChange={handleChange}>
                  <option value="">Pilih tipe pekerjaan</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div>
                <label htmlFor="category">Kategori *</label>
                <select id="category" name="category" value={form.category} onChange={handleChange}>
                  <option value="">Pilih kategori</option>
                  <option value="it">IT & Technology</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="hr">Human Resources</option>
                  <option value="design">Design</option>
                  <option value="sales">Sales</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label htmlFor="experience">Pengalaman *</label>
                <select id="experience" name="experience" value={form.experience} onChange={handleChange}>
                  <option value="">Pilih level pengalaman</option>
                  <option value="fresh-graduate">Fresh Graduate</option>
                  <option value="1-2">1-2 Tahun</option>
                  <option value="3-5">3-5 Tahun</option>
                  <option value="5+">5+ Tahun</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div>
                <label htmlFor="salaryMin">Gaji Minimum</label>
                <div style={{ position: 'relative' }}>
                  <DollarSign className="search-icon" style={{ left: 10, top: '50%', position: 'absolute', transform: 'translateY(-50%)' }} />
                  <Input id="salaryMin" name="salaryMin" value={form.salaryMin} onChange={handleChange} placeholder="8000000" style={{ paddingLeft: 38 }} />
                </div>
              </div>
              <div>
                <label htmlFor="salaryMax">Gaji Maksimum</label>
                <div style={{ position: 'relative' }}>
                  <DollarSign className="search-icon" style={{ left: 10, top: '50%', position: 'absolute', transform: 'translateY(-50%)' }} />
                  <Input id="salaryMax" name="salaryMax" value={form.salaryMax} onChange={handleChange} placeholder="12000000" style={{ paddingLeft: 38 }} />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="description">Deskripsi Pekerjaan *</label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Jelaskan tanggung jawab, persyaratan, dan benefit yang ditawarkan..."></textarea>
            </div>
            <div>
              <label htmlFor="requirements">Persyaratan *</label>
              <textarea id="requirements" name="requirements" value={form.requirements} onChange={handleChange} placeholder="Sebutkan kualifikasi dan persyaratan yang dibutuhkan..."></textarea>
            </div>
            <div>
              <label htmlFor="skills">Keahlian yang Dibutuhkan</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <Input
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="Tambahkan keahlian"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  Tambah
                </Button>
              </div>
              <div className="skills-list">
                {(form.skills as string[]).map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                    <X
                      className="remove-skill"
                      onClick={() => removeSkill(skill)}
                    />
                  </span>
                ))}
              </div>
            </div>
            <div className="form-row">
              <div>
                <label htmlFor="deadline">Batas Waktu Lamaran</label>
                <div style={{ position: 'relative' }}>
                  <Clock className="search-icon" style={{ left: 10, top: '50%', position: 'absolute', transform: 'translateY(-50%)' }} />
                  <Input id="deadline" name="deadline" type="date" value={form.deadline} onChange={handleChange} style={{ paddingLeft: 38 }} />
                </div>
              </div>
              <div>
                <label htmlFor="contact">Email Kontak *</label>
                <Input id="contact" name="contact" type="email" value={form.contact} onChange={handleChange} placeholder="hr@company.com" />
              </div>
            </div>
            <div>
              <label htmlFor="profile_picture">Logo/Profil Perusahaan</label>
              <input
                type="file"
                id="profile_picture"
                name="profile_picture"
                accept="image/*"
                onChange={handleFileChange}
              />
              {profilePicture && (
                <div style={{ marginTop: 8 }}>
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt="Preview"
                    style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                <Building className="search-btn-icon" style={{ marginRight: 6 }} />
                Posting Lowongan
              </button>
              <button type="button" className="btn-outline" onClick={() => setPreview(true)}>
                Preview
              </button>
            </div>
          </form>
          {/* Preview Modal */}
          {preview && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
            }}>
              <div style={{
                background: '#fff', borderRadius: 16, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: '0 2px 16px rgba(0,0,0,0.12)'
              }}>
                <h2 style={{ color: '#2563eb', fontWeight: 600, fontSize: '1.2rem', marginBottom: 12 }}>
                  Preview Lowongan
                </h2>
                <div><b>Judul:</b> {form.title}</div>
                <div><b>Perusahaan:</b> {form.company}</div>
                <div><b>Lokasi:</b> {form.location}</div>
                <div><b>Tipe:</b> {form.jobType}</div>
                <div><b>Kategori:</b> {form.category}</div>
                <div><b>Pengalaman:</b> {form.experience}</div>
                <div><b>Gaji:</b> {form.salaryMin} - {form.salaryMax}</div>
                <div><b>Deskripsi:</b> {form.description}</div>
                <div><b>Persyaratan:</b> {form.requirements}</div>
                <div><b>Keahlian:</b> {(form.skills as string[]).join(', ')}</div>
                <div><b>Batas Waktu:</b> {form.deadline}</div>
                <div><b>Kontak:</b> {form.contact}</div>
                <div style={{ marginTop: 18, textAlign: 'right' }}>
                  <Button type="button" variant="outline" onClick={() => setPreview(false)}>Tutup</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PostJobFormPage;
