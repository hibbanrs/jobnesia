import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ApplyJobPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const jobId = params.get('job_id') || '';

  const [form, setForm] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    education: '',
    major: '',
    graduationYear: '',
    company: '',
    position: '',
    workYear: '',
    cv: null as File | null,
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!user || user.user_type !== 'job-seeker') {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', margin: '80px 0', color: '#888' }}>
          Hanya akun pencari kerja yang dapat mengakses halaman ini.
        </div>
        <Footer />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, cv: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('job_id', jobId);
      formData.append('first_name', form.firstName);
      formData.append('last_name', form.lastName);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('address', form.address);
      formData.append('education', form.education);
      formData.append('major', form.major);
      formData.append('graduation_year', form.graduationYear);
      formData.append('company', form.company);
      formData.append('position', form.position);
      formData.append('work_year', form.workYear);
      if (form.cv) formData.append('cv', form.cv);

      const res = await fetch('/api/apply-job', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Gagal mengirim lamaran');
      } else {
        setSuccess('Lamaran berhasil dikirim!');
        setError('');
      }
    } catch {
      setError('Terjadi kesalahan server.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <Navbar />
      <section style={{ padding: '48px 0 40px 0' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: 16 }}>
          <div style={{
            background: '#fff', borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
            padding: 32, border: '1.5px solid #e0e7ef'
          }}>
            <h2 style={{ fontWeight: 600, fontSize: 22, color: '#2563eb', marginBottom: 18 }}>
              Formulir Lamaran Kerja
            </h2>
            {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Informasi Pribadi */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 500, marginBottom: 6 }}>Informasi Pribadi</div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <label>Nama Depan</label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>Nama Belakang</label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} />
                  </div>
                </div>
              </div>
              {/* Informasi Kontak */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 500, marginBottom: 6 }}>Informasi Kontak</div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <label>Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>No. Telepon</label>
                    <input type="text" name="phone" value={form.phone} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} />
                  </div>
                </div>
                <div style={{ marginTop: 10 }}>
                  <label>Alamat</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} />
                </div>
              </div>
              {/* Pendidikan Terakhir */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 500, marginBottom: 6 }}>Riwayat Pendidikan Terakhir</div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 2 }}>
                    <label>Nama Institusi</label>
                    <input type="text" name="education" value={form.education} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <label>Jurusan</label>
                    <input type="text" name="major" value={form.major} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>Tahun Lulus</label>
                    <input type="text" name="graduationYear" value={form.graduationYear} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} />
                  </div>
                </div>
              </div>
              {/* Pengalaman Kerja */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 500, marginBottom: 6 }}>Pengalaman Kerja (Opsional)</div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 2 }}>
                    <label>Nama Perusahaan</label>
                    <input type="text" name="company" value={form.company} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <label>Posisi</label>
                    <input type="text" name="position" value={form.position} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>Tahun</label>
                    <input type="text" name="workYear" value={form.workYear} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} />
                  </div>
                </div>
              </div>
              {/* Upload CV */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 500, marginBottom: 6 }}>Upload CV (PDF)</div>
                <input type="file" accept="application/pdf" onChange={handleFileChange} required style={{ marginTop: 4 }} />
                {form.cv && (
                  <div style={{ marginTop: 6, color: '#2563eb', fontSize: 14 }}>
                    File: {form.cv.name}
                  </div>
                )}
              </div>
              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <button type="submit" style={{
                  background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8,
                  padding: '10px 28px', fontWeight: 500, fontSize: '1rem', cursor: 'pointer'
                }}>
                  Kirim Lamaran
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ApplyJobPage;
