import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, MessageSquare, Heart, Share2, Calendar, MapPin, TrendingUp } from 'lucide-react';

const posts = [
  {
    id: 1,
    author: 'Ahmad Rizki',
    role: 'Senior Frontend Developer',
    avatar: '👨‍💻',
    time: '2 jam yang lalu',
    content: 'Tips untuk acing technical interview sebagai Frontend Developer: 1) Kuasai fundamental JavaScript, 2) Pahami React/Vue lifecycle, 3) Practice coding challenges, 4) Siapkan portfolio yang solid.',
    likes: 45,
    comments: 12,
    tags: ['Interview', 'Frontend', 'Tips']
  },
  {
    id: 2,
    author: 'Sari Indah',
    role: 'UI/UX Designer',
    avatar: '👩‍🎨',
    time: '4 jam yang lalu',
    content: 'Selamat pagi komunitas! Baru saja selesai redesign aplikasi mobile banking. Proses research dan user testing sangat penting untuk menghasilkan design yang user-friendly. Ada yang punya pengalaman serupa?',
    likes: 32,
    comments: 8,
    tags: ['Design', 'UX', 'Mobile']
  },
  {
    id: 3,
    author: 'Budi Santoso',
    role: 'Full Stack Developer',
    avatar: '👨‍💼',
    time: '1 hari yang lalu',
    content: 'Laravel 10 sudah release! Fitur-fitur baru yang menarik untuk dicoba. Ada yang sudah upgrade project ke versi terbaru?',
    likes: 28,
    comments: 15,
    tags: ['Laravel', 'Backend', 'Update']
  }
];

const events = [
  {
    id: 1,
    title: 'Tech Talk: AI in Web Development',
    date: '15 Jun 2024',
    time: '19:00 WIB',
    location: 'Jakarta',
    attendees: 125,
    type: 'Online'
  },
  {
    id: 2,
    title: 'Laravel Meetup Jakarta',
    date: '22 Jun 2024',
    time: '14:00 WIB',
    location: 'Jakarta',
    attendees: 85,
    type: 'Offline'
  },
  {
    id: 3,
    title: 'Design Thinking Workshop',
    date: '28 Jun 2024',
    time: '10:00 WIB',
    location: 'Bandung',
    attendees: 45,
    type: 'Hybrid'
  }
];

const groups = [
  { name: 'Frontend Developer Indonesia', members: '12.5K', category: 'Development' },
  { name: 'Laravel Indonesia', members: '8.2K', category: 'Backend' },
  { name: 'UI/UX Designer Community', members: '6.8K', category: 'Design' },
  { name: 'DevOps Indonesia', members: '4.1K', category: 'Infrastructure' },
  { name: 'React Indonesia', members: '9.3K', category: 'Frontend' }
];

interface Comment {
  id: number;
  user: { first_name: string; last_name: string; profile_picture?: string; user_type: string };
  content: string;
  created_at: string;
}

const CommunityPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    fetch('/api/community-comments')
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!user) {
      setError('Anda harus login untuk berkomentar.');
      return;
    }
    if (!newComment.trim()) {
      setError('Komentar tidak boleh kosong.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/community-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          content: newComment,
          user_id: user.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Gagal mengirim komentar');
      } else {
        setComments([data, ...comments]);
        setNewComment('');
      }
    } catch {
      setError('Terjadi kesalahan server.');
    }
    setLoading(false);
  };

  return (
    <div className="community-bg">
      <Navbar />
      <section className="community-section">
        <div className="community-container">
          <div className="community-header">
            <h1>Komunitas Jobnesia</h1>
            <p>Diskusi, tanya jawab, dan berbagi pengalaman seputar dunia kerja</p>
          </div>
          <div className="community-content">
            <div className="community-main">
              {/* Form komentar */}
              <div className="community-card">
                <form onSubmit={handleSubmit}>
                  <div className="community-createpost-row">
                    <div className="community-avatar">
                      {user?.profile_picture ? (
                        <img src={`/storage/${user.profile_picture}`} alt="avatar" style={{ width: 44, height: 44, borderRadius: '50%' }} />
                      ) : (
                        <span>{user?.first_name ? user.first_name.charAt(0).toUpperCase() : 'U'}</span>
                      )}
                    </div>
                    <textarea
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      placeholder={user ? "Tulis pendapat atau pertanyaan Anda..." : "Login untuk berkomentar"}
                      style={{ flex: 1, borderRadius: 8, border: '1.5px solid #dbeafe', padding: 10, fontSize: 16, minHeight: 44 }}
                      disabled={!user || loading}
                    />
                    <button type="submit" className="community-create-btn" disabled={!user || loading}>
                      Kirim
                    </button>
                  </div>
                  {error && <div style={{ color: 'red', marginTop: 4 }}>{error}</div>}
                </form>
              </div>
              {/* Daftar komentar */}
              {comments.map(comment => (
                <div key={comment.id} className="community-card">
                  <div className="community-post-header">
                    <div className="community-avatar">
                      {comment.user?.profile_picture ? (
                        <img src={`/storage/${comment.user.profile_picture}`} alt="avatar" style={{ width: 44, height: 44, borderRadius: '50%' }} />
                      ) : (
                        <span>{comment.user?.first_name ? comment.user.first_name.charAt(0).toUpperCase() : 'U'}</span>
                      )}
                    </div>
                    <div>
                      <div className="community-author">
                        {comment.user?.first_name} {comment.user?.last_name}
                        <span style={{ color: '#3498db', fontSize: 13, marginLeft: 8 }}>
                          {comment.user?.user_type === 'employer' ? 'Perusahaan/HR' : 'Pencari Kerja'}
                        </span>
                      </div>
                      <div className="community-time" style={{ fontSize: 13 }}>
                        {new Date(comment.created_at).toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                  <div className="community-post-content">{comment.content}</div>
                </div>
              ))}
            </div>
            {/* Sidebar dummy tetap */}
            <aside className="community-sidebar">
              {/* Events */}
              <div className="community-card">
                <div className="community-sidebar-title">
                  <Calendar className="community-sidebar-icon" />
                  Event Mendatang
                </div>
                <div className="community-sidebar-list">
                  {events.map((event) => (
                    <div key={event.id} className="community-event">
                      <div className="community-event-title">{event.title}</div>
                      <div className="community-event-info">
                        <Calendar className="community-event-icon" />
                        {event.date} • {event.time}
                      </div>
                      <div className="community-event-info">
                        <MapPin className="community-event-icon" />
                        {event.location} • {event.type}
                      </div>
                      <div className="community-event-info">
                        <Users className="community-event-icon" />
                        {event.attendees} peserta
                      </div>
                      <button className="community-event-btn">Daftar</button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Groups */}
              <div className="community-card">
                <div className="community-sidebar-title">
                  <Users className="community-sidebar-icon" />
                  Grup Populer
                </div>
                <div className="community-sidebar-list">
                  {groups.map((group, idx) => (
                    <div key={idx} className="community-group">
                      <div>
                        <div className="community-group-name">{group.name}</div>
                        <div className="community-group-members">{group.members} anggota</div>
                      </div>
                      <button className="community-group-btn">Join</button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Trending */}
              <div className="community-card">
                <div className="community-sidebar-title">
                  <TrendingUp className="community-sidebar-icon" />
                  Trending
                </div>
                <div className="community-sidebar-list">
                  <div className="community-trending">
                    <div className="community-trending-name">#ReactJS</div>
                    <div className="community-trending-count">1.2K diskusi</div>
                  </div>
                  <div className="community-trending">
                    <div className="community-trending-name">#RemoteWork</div>
                    <div className="community-trending-count">892 diskusi</div>
                  </div>
                  <div className="community-trending">
                    <div className="community-trending-name">#Laravel</div>
                    <div className="community-trending-count">756 diskusi</div>
                  </div>
                  <div className="community-trending">
                    <div className="community-trending-name">#AIandML</div>
                    <div className="community-trending-count">634 diskusi</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CommunityPage;
