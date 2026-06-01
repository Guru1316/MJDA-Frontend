import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Interfaces ---
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
}

interface Application {
  name: string;
  email: string;
  phone: string;
  courseName: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}

interface Enquiry {
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
  date: string;
}

interface Course {
  id: string;
  name: string;
  level: string;
  duration: string;
  price: string;
  color: string;
  emoji: string;
  desc: string;
}

const Admin: React.FC = () => {
  const navigate = useNavigate();

  // --- State ---
  const [activeTab, setActiveTab] = useState<'dashboard' | 'applications' | 'enquiries' | 'courses'>('dashboard');
  
  const [users, setUsers] = useState<User[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  // Course Form State
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [courseForm, setCourseForm] = useState<Course>({
    id: '', name: '', level: '', duration: '', price: '', color: '#C9A84C', emoji: '🩰', desc: ''
  });

  // --- Initialization & Auth Guard ---
  useEffect(() => {
    const sessionStr = sessionStorage.getItem('mj_session');
    if (!sessionStr) {
      alert('SECURE AREA: Administrator access required.');
      navigate('/login');
      return;
    }
    
    const session = JSON.parse(sessionStr);
    if (session.role !== 'admin') {
      alert('SECURE AREA: Administrator access required.');
      navigate('/');
      return;
    }

    // eslint-disable-next-line react-hooks/immutability
    loadData();
  }, [navigate]);

  const loadData = () => {
    setUsers(JSON.parse(localStorage.getItem('mj_users') || '[]'));
    setApps(JSON.parse(localStorage.getItem('mj_applications') || '[]'));
    setEnquiries(JSON.parse(localStorage.getItem('mj_contact_msgs') || '[]'));
    setCourses(JSON.parse(localStorage.getItem('mj_courses') || '[]'));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('mj_session');
    localStorage.removeItem('mj_remember');
    navigate('/login');
  };

  // --- Action Handlers ---
  const updateAppStatus = (index: number, status: 'Pending' | 'Approved' | 'Rejected') => {
    const newApps = [...apps];
    newApps[index].status = status;
    setApps(newApps);
    localStorage.setItem('mj_applications', JSON.stringify(newApps));
  };

  const markEnquiryReplied = (index: number) => {
    const newEnquiries = [...enquiries];
    newEnquiries[index].status = 'Replied';
    setEnquiries(newEnquiries);
    localStorage.setItem('mj_contact_msgs', JSON.stringify(newEnquiries));
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseForm(prev => ({ ...prev, [name]: value }));
  };

  const saveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourses = [...courses];
    
    if (editingIndex !== null) {
      newCourses[editingIndex] = courseForm;
    } else {
      newCourses.push({ ...courseForm, id: 'c_' + Date.now() });
    }

    setCourses(newCourses);
    localStorage.setItem('mj_courses', JSON.stringify(newCourses));
    setShowCourseForm(false);
    setEditingIndex(null);
  };

  const editCourse = (index: number) => {
    setCourseForm(courses[index]);
    setEditingIndex(index);
    setShowCourseForm(true);
  };

  const deleteCourse = (index: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const newCourses = [...courses];
      newCourses.splice(index, 1);
      setCourses(newCourses);
      localStorage.setItem('mj_courses', JSON.stringify(newCourses));
    }
  };

  const openNewCourseForm = () => {
    setCourseForm({ id: '', name: '', level: '', duration: '', price: '', color: '#C9A84C', emoji: '🩰', desc: '' });
    setEditingIndex(null);
    setShowCourseForm(true);
  };

  // --- Render Helpers ---
  const pendingApps = apps.filter(a => a.status === 'Pending').length;
  const newMsgs = enquiries.filter(e => e.status !== 'Replied').length;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-(--dark) text-white font-outfit">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-(--dark2) border-r border-[rgba(201,168,76,.15)] flex flex-col md:min-h-screen shrink-0">
        <div className="p-6 border-b border-[rgba(201,168,76,.1)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#C9A84C] to-[#F0D080] flex items-center justify-center font-bold text-black playfair">MJ</div>
            <div>
              <div className="font-bold text-sm tracking-wide">ADMIN PORTAL</div>
              <div className="text-xs text-white/40">MJ Dance Academy</div>
            </div>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col gap-2">
          <button onClick={() => setActiveTab('dashboard')} className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer border-none ${activeTab === 'dashboard' ? 'bg-[rgba(201,168,76,.15)] text-(--gold)' : 'text-white/60 bg-transparent hover:bg-white/5 hover:text-white'}`}>📊 Dashboard</button>
          <button onClick={() => setActiveTab('applications')} className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer border-none flex justify-between ${activeTab === 'applications' ? 'bg-[rgba(201,168,76,.15)] text-(--gold)' : 'text-white/60 bg-transparent hover:bg-white/5 hover:text-white'}`}>
            <span>📝 Applications</span>
            {pendingApps > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{pendingApps}</span>}
          </button>
          <button onClick={() => setActiveTab('enquiries')} className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer border-none flex justify-between ${activeTab === 'enquiries' ? 'bg-[rgba(201,168,76,.15)] text-(--gold)' : 'text-white/60 bg-transparent hover:bg-white/5 hover:text-white'}`}>
            <span>✉️ Enquiries</span>
            {newMsgs > 0 && <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">{newMsgs}</span>}
          </button>
          <button onClick={() => setActiveTab('courses')} className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer border-none ${activeTab === 'courses' ? 'bg-[rgba(201,168,76,.15)] text-(--gold)' : 'text-white/60 bg-transparent hover:bg-white/5 hover:text-white'}`}>🎭 Manage Courses</button>
        </div>
        <div className="p-4 border-t border-[rgba(201,168,76,.1)]">
          <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-red-400 bg-red-400/10 hover:bg-red-400/20 transition-all cursor-pointer border-none">🚪 Sign Out</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
          <h1 className="text-3xl font-bold playfair capitalize">{activeTab}</h1>
          <div className="text-sm text-white/40">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>

        {/* --- DASHBOARD TAB --- */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[rgba(28,28,40,.8)] border border-[rgba(201,168,76,.15)] rounded-2xl p-6">
              <div className="text-sm text-white/50 mb-1">Total Users</div>
              <div className="text-4xl font-bold text-(--gold)">{users.length}</div>
            </div>
            <div className="bg-[rgba(28,28,40,.8)] border border-[rgba(201,168,76,.15)] rounded-2xl p-6">
              <div className="text-sm text-white/50 mb-1">Pending Apps</div>
              <div className="text-4xl font-bold text-orange-400">{pendingApps}</div>
            </div>
            <div className="bg-[rgba(28,28,40,.8)] border border-[rgba(201,168,76,.15)] rounded-2xl p-6">
              <div className="text-sm text-white/50 mb-1">New Messages</div>
              <div className="text-4xl font-bold text-blue-400">{newMsgs}</div>
            </div>
            <div className="bg-[rgba(28,28,40,.8)] border border-[rgba(201,168,76,.15)] rounded-2xl p-6">
              <div className="text-sm text-white/50 mb-1">Active Courses</div>
              <div className="text-4xl font-bold text-green-400">{courses.length}</div>
            </div>
          </div>
        )}

        {/* --- APPLICATIONS TAB --- */}
        {activeTab === 'applications' && (
          <div className="bg-[rgba(28,28,40,.8)] border border-[rgba(201,168,76,.15)] rounded-2xl overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-sm text-white/50">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Student Info</th>
                  <th className="p-4 font-medium">Course</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {apps.map((app, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4 text-white/50 whitespace-nowrap">{new Date(app.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="font-semibold">{app.name}</div>
                      <div className="text-xs text-white/40">{app.email}</div>
                      <div className="text-xs text-white/40">{app.phone}</div>
                    </td>
                    <td className="p-4 font-medium text-(--gold)">{app.courseName}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'Approved' ? 'bg-green-400/10 text-green-400' :
                        app.status === 'Rejected' ? 'bg-red-400/10 text-red-400' :
                        'bg-orange-400/10 text-orange-400'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      {app.status === 'Pending' && (
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => updateAppStatus(idx, 'Approved')} className="bg-green-400/20 text-green-400 border border-green-400/30 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-400/30 cursor-pointer">Approve</button>
                          <button onClick={() => updateAppStatus(idx, 'Rejected')} className="bg-red-400/20 text-red-400 border border-red-400/30 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-400/30 cursor-pointer">Reject</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {apps.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-white/40">No applications found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* --- ENQUIRIES TAB --- */}
        {activeTab === 'enquiries' && (
          <div className="flex flex-col gap-4">
            {enquiries.map((enq, idx) => (
              <div key={idx} className={`bg-[rgba(28,28,40,.8)] border rounded-2xl p-5 ${enq.status === 'Replied' ? 'border-white/5 opacity-60' : 'border-(--gold)'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{enq.subject}</h3>
                    <div className="text-sm text-white/50">{enq.name} ({enq.email})</div>
                  </div>
                  <div className="text-xs text-white/40">{new Date(enq.date).toLocaleString()}</div>
                </div>
                <div className="text-sm text-white/80 bg-black/20 p-4 rounded-xl mb-4 whitespace-pre-wrap">{enq.message}</div>
                {enq.status !== 'Replied' ? (
                  <button onClick={() => markEnquiryReplied(idx)} className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-500/30 cursor-pointer transition-colors">Mark as Replied</button>
                ) : (
                  <span className="text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">✓ Replied</span>
                )}
              </div>
            ))}
            {enquiries.length === 0 && (
              <div className="text-center py-12 text-white/40 bg-[rgba(28,28,40,.8)] rounded-2xl">No messages yet.</div>
            )}
          </div>
        )}

        {/* --- COURSES TAB --- */}
        {activeTab === 'courses' && (
          <div>
            {!showCourseForm ? (
              <>
                <div className="flex justify-end mb-6">
                  <button onClick={openNewCourseForm} className="bg-linear-to-br from-[#C9A84C] to-[#F0D080] text-[#0A0A0F] font-bold px-5 py-2.5 rounded-xl text-sm border-none cursor-pointer hover:scale-105 transition-transform">+ Add New Course</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {courses.map((c, idx) => (
                    <div key={idx} className="bg-[rgba(28,28,40,.8)] border border-[rgba(201,168,76,.15)] rounded-2xl p-5 flex gap-5 items-center">
                      <div className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl shrink-0" style={{ background: `linear-gradient(135deg, ${c.color}33, ${c.color}11)` }}>
                        {c.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-lg">{c.name}</h3>
                          <span className="text-(--gold) font-bold">{c.price}</span>
                        </div>
                        <div className="text-xs text-white/50 mb-3">{c.level} • {c.duration}</div>
                        <div className="flex gap-2">
                          <button onClick={() => editCourse(idx)} className="text-xs border border-white/20 bg-transparent text-white px-3 py-1.5 rounded-lg cursor-pointer hover:bg-white/10">Edit</button>
                          <button onClick={() => deleteCourse(idx)} className="text-xs border border-red-400/30 text-red-400 bg-red-400/10 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-red-400/20">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-[rgba(28,28,40,.8)] border border-[rgba(201,168,76,.15)] rounded-2xl p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                  <h2 className="text-xl font-bold playfair text-(--gold)">{editingIndex !== null ? 'Edit Course' : 'Create New Course'}</h2>
                  <button onClick={() => setShowCourseForm(false)} className="text-sm text-white/40 bg-transparent border-none cursor-pointer hover:text-white">Cancel ✕</button>
                </div>
                <form onSubmit={saveCourse} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Course Name</label>
                      <input type="text" name="name" required value={courseForm.name} onChange={handleCourseChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-(--gold)" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Level</label>
                      <input type="text" name="level" required value={courseForm.level} onChange={handleCourseChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-(--gold)" placeholder="e.g. All Levels, Beginner" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Duration</label>
                      <input type="text" name="duration" required value={courseForm.duration} onChange={handleCourseChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-(--gold)" placeholder="e.g. 6 months" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Monthly Price</label>
                      <input type="text" name="price" required value={courseForm.price} onChange={handleCourseChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-(--gold)" placeholder="e.g. ₹3,500/mo" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Theme Color (Hex)</label>
                      <input type="text" name="color" required value={courseForm.color} onChange={handleCourseChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-(--gold)" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Emoji Icon</label>
                      <input type="text" name="emoji" required value={courseForm.emoji} onChange={handleCourseChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-(--gold)" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1">Description</label>
                    <textarea name="desc" required rows={3} value={courseForm.desc} onChange={handleCourseChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-(--gold) resize-y"></textarea>
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="bg-linear-to-br from-[#C9A84C] to-[#F0D080] text-[#0A0A0F] font-bold px-6 py-3 rounded-xl text-sm border-none w-full cursor-pointer hover:shadow-[0_10px_30px_rgba(201,168,76,.3)] transition-all">
                      {editingIndex !== null ? 'Save Changes ✓' : 'Publish Course 🚀'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;