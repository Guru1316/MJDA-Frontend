import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar, { type Session } from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard, { type Course } from '../components/CourseCard';

const DEFAULT_COURSES: Course[] = [
  { id: 'c1', emoji: '💃', name: 'Bharatanatyam', level: 'All Levels', duration: '6 months', students: 120, price: '₹3,500/mo', desc: 'Classical South Indian temple dance. Deeply expressive, spiritual, and technically demanding.', color: '#ff6b9d' },
  { id: 'c2', emoji: '🕺', name: 'Hip-Hop', level: 'Beginner–Advanced', duration: '3 months', students: 95, price: '₹2,800/mo', desc: 'Street dance culture meets rhythm. Freestyle, breaking, and choreography covered.', color: '#6c4ef7' },
  { id: 'c3', emoji: '🌊', name: 'Contemporary', level: 'Intermediate', duration: '4 months', students: 78, price: '₹3,200/mo', desc: 'Fluid, emotive movement blending ballet and modern techniques for storytelling.', color: '#22d3ee' },
  { id: 'c4', emoji: '🔥', name: 'Salsa & Bachata', level: 'Beginner–Intermediate', duration: '2 months', students: 110, price: '₹2,500/mo', desc: 'Partner dance with Latin flair. Perfect for events, weddings, and pure fun.', color: '#f97316' },
  { id: 'c5', emoji: '👑', name: 'Kathak', level: 'All Levels', duration: '8 months', students: 65, price: '₹3,800/mo', desc: 'North Indian classical dance with intricate footwork, spins, and expressive gestures.', color: '#C9A84C' },
  { id: 'c6', emoji: '🎵', name: 'Bollywood Fusion', level: 'Beginner', duration: '2 months', students: 145, price: '₹2,200/mo', desc: 'High-energy Bollywood with folk and contemporary fusion. Great for all ages.', color: '#4ade80' },
];

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  
  // Data State
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('default');

  useEffect(() => {
    // 1. Session Setup
    const storedSession = sessionStorage.getItem('mj_session');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedSession) setSession(JSON.parse(storedSession));

    // 2. Load Courses
    let loadedCourses = JSON.parse(localStorage.getItem('mj_courses') || '[]');
    if (!loadedCourses || loadedCourses.length === 0) {
      loadedCourses = DEFAULT_COURSES;
      localStorage.setItem('mj_courses', JSON.stringify(DEFAULT_COURSES));
    }
    setAllCourses(loadedCourses);
  }, []);

  // --- Handlers ---
  const handleApply = (courseName: string) => {
    if (!session) {
      navigate('/login');
      return;
    }
    if (session.role === 'admin') {
      alert('Admins cannot apply for courses.');
      return;
    }
    navigate(`/application?course=${encodeURIComponent(courseName)}`);
  };

  // --- Filtering Logic ---
  let filteredCourses = [...allCourses];

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredCourses = filteredCourses.filter(c => 
      c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    );
  }

  if (levelFilter !== 'all') {
    filteredCourses = filteredCourses.filter(c => 
      c.level.toLowerCase().includes(levelFilter.toLowerCase())
    );
  }

  if (sortFilter === 'name') {
    filteredCourses.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <>
      <div className="noise z-0"></div>
      <Navbar activePage="courses" session={session} />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 px-6 text-center bg-linear-to-b from-[#12121A] to-[#0A0A0F]">
        <div className="max-w-3xl mx-auto">
          <h1 className="playfair text-5xl font-bold mb-4 fade-up">
            Explore <span className="text-(--gold) italic">Our Courses</span>
          </h1>
          <p className="text-white/50 text-lg fade-up" style={{ animationDelay: '.1s' }}>
            Master the art of movement with our expert-led programs.
          </p>
        </div>
      </section>

      {/* --- FILTER BAR --- */}
      <section className="py-8 px-6 max-w-7xl mx-auto relative z-10">
        <div className="bg-[rgba(28,28,40,.6)] border border-[rgba(201,168,76,.12)] rounded-3xl p-6 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-white/50 mb-2">Search Courses</label>
              <input 
                type="text" 
                placeholder="Search dance styles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 rounded-xl outline-none focus:border-(--gold) transition-colors placeholder-white/30 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">Filter By Level</label>
              <select 
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 rounded-xl outline-none focus:border-(--gold) transition-colors text-sm [&>option]:bg-[#1C1C28]"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">Sort By</label>
              <select 
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 rounded-xl outline-none focus:border-(--gold) transition-colors text-sm [&>option]:bg-[#1C1C28]"
              >
                <option value="default">Default (Recommended)</option>
                <option value="name">Course Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* --- COURSE GRID --- */}
      <section className="pb-24 px-6 max-w-7xl mx-auto">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                index={idx} 
                onApply={handleApply} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-white/50">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg">No matching courses found. Try adjusting your filters.</p>
            <button 
              onClick={() => { setSearchQuery(''); setLevelFilter('all'); }} 
              className="mt-4 px-6 py-2 border border-(--gold) text-(--gold) rounded-lg hover:bg-[rgba(201,168,76,.1)] transition-colors cursor-pointer bg-transparent"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Courses;