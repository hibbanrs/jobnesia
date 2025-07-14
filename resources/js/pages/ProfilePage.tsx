import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const getUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const ProfilePage = () => {
  const [user] = useState(getUser());
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.user_type === 'employer') {
      setLoading(true);
      fetch(`/api/employer-applicants?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => setApplicants(data))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, []); // hanya dijalankan sekali saat mount

  if (!user) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', margin: '80px 0', color: '#888' }}>
          Anda belum login.
        </div>
        <Footer />
      </div>
    );
  }

  // --- Pencari Kerja ---
  if (user.user_type === 'job-seeker') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
        <Navbar />
        <section style={{ padding: '48px 0 40px 0' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', padding: 16 }}>
            <div style={{
              background: '#fff', borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
              padding: 32, marginBottom: 32, border: '1.5px solid #e0e7ef'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{
                  width: 70, height: 70, borderRadius: '50%', background: '#e6f4ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 600, color: '#2563eb'
                }}>
                  {user.profile_picture
                    ? <img src={user.profile_picture} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                    : (user.first_name ? user.first_name.charAt(0).toUpperCase() : 'U')}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 22, color: '#2563eb' }}>
                    {user.first_name} {user.last_name}
                  </div>
                  <div style={{ color: '#888', fontSize: 15 }}>{user.email}</div>
                  <div style={{ color: '#3498db', fontSize: 15, marginTop: 2 }}>Pencari Kerja</div>
                </div>
              </div>
              <hr style={{ margin: '24px 0', border: 'none', borderTop: '1.5px solid #e0e7ef' }} />
              <form>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div style={{ flex: 1 }}>
                    <label>Nama Depan</label>
                    <input type="text" value={user.first_name} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} readOnly />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>Nama Belakang</label>
                    <input type="text" value={user.last_name} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} readOnly />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label>Email</label>
                  <input type="email" value={user.email} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1.5px solid #dbeafe', marginTop: 4 }} readOnly />
                </div>
                {/* Tambahkan form edit profile jika ingin */}
                <button type="button" style={{
                  background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8,
                  padding: '10px 28px', fontWeight: 500, fontSize: '1rem', marginTop: 10, cursor: 'pointer'
                }}>Edit Profile</button>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // --- Perusahaan/HR ---
  if (user.user_type === 'employer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
        <Navbar />
        <section style={{ padding: '48px 0 40px 0' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
            <div style={{
              background: '#fff', borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
              padding: 32, marginBottom: 32, border: '1.5px solid #e0e7ef'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{
                  width: 70, height: 70, borderRadius: '50%', background: '#e6f4ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 600, color: '#2563eb'
                }}>
                  {user.profile_picture
                    ? <img src={`/storage/${user.profile_picture}`} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                    : (user.first_name ? user.first_name.charAt(0).toUpperCase() : 'U')}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 22, color: '#2563eb' }}>
                    {user.first_name} {user.last_name}
                  </div>
                  <div style={{ color: '#888', fontSize: 15 }}>{user.email}</div>
                  <div style={{ color: '#3498db', fontSize: 15, marginTop: 2 }}>Perusahaan / HR</div>
                </div>
              </div>
              <hr style={{ margin: '24px 0', border: 'none', borderTop: '1.5px solid #e0e7ef' }} />
              {/* Form edit profil bisa ditambahkan di sini */}
            </div>
            {/* Tabel pelamar */}
            <div style={{
              background: '#fff', borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
              padding: 32, border: '1.5px solid #e0e7ef'
            }}>
              <h2 style={{ fontWeight: 600, fontSize: 22, color: '#2563eb', marginBottom: 18 }}>
                Daftar Pelamar ke Lowongan Anda ({applicants.length})
              </h2>
              {loading ? (
                <div>Memuat data pelamar...</div>
              ) : applicants.length === 0 ? (
                <div style={{ color: '#888' }}>Belum ada pelamar.</div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
                    <thead>
                      <tr style={{ background: '#f0f6ff' }}>
                        <th style={{ padding: 8, border: '1px solid #e0e7ef' }}>Nama</th>
                        <th style={{ padding: 8, border: '1px solid #e0e7ef' }}>Email</th>
                        <th style={{ padding: 8, border: '1px solid #e0e7ef' }}>No. HP</th>
                        <th style={{ padding: 8, border: '1px solid #e0e7ef' }}>Lowongan</th>
                        <th style={{ padding: 8, border: '1px solid #e0e7ef' }}>Pendidikan</th>
                        <th style={{ padding: 8, border: '1px solid #e0e7ef' }}>Pengalaman</th>
                        <th style={{ padding: 8, border: '1px solid #e0e7ef' }}>CV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicants.map((app: any) => (
                        <tr key={app.id}>
                          <td style={{ padding: 8, border: '1px solid #e0e7ef' }}>
                            {app.first_name} {app.last_name}
                          </td>
                          <td style={{ padding: 8, border: '1px solid #e0e7ef' }}>{app.email}</td>
                          <td style={{ padding: 8, border: '1px solid #e0e7ef' }}>{app.phone}</td>
                          <td style={{ padding: 8, border: '1px solid #e0e7ef' }}>{app.job?.title}</td>
                          <td style={{ padding: 8, border: '1px solid #e0e7ef' }}>
                            {app.education} ({app.major}), {app.graduation_year}
                          </td>
                          <td style={{ padding: 8, border: '1px solid #e0e7ef' }}>
                            {app.company && app.position
                              ? `${app.company} - ${app.position} (${app.work_year})`
                              : '-'}
                          </td>
                          <td style={{ padding: 8, border: '1px solid #e0e7ef' }}>
                            {app.cv_path ? (
                              <a
                                href={`/storage/${app.cv_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#2563eb', textDecoration: 'underline' }}
                              >
                                Lihat CV
                              </a>
                            ) : (
                              '-'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return null;
};

export default ProfilePage;


