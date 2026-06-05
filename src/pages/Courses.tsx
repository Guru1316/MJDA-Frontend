import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar, { type Session } from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard, { type Course } from '../components/CourseCard';
import { getAllCourses } from '../services/api';

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  
  // Data State
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const storedSession = sessionStorage.getItem('mj_session');
      if (storedSession) setSession(JSON.parse(storedSession));

      try {
        const data = await getAllCourses();
        if(data) setAllCourses(data);
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
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
        {loading ? (
          <div className="text-center py-20 text-white/50 italic text-lg">Loading courses...</div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <CourseCard 
                key={course._id} 
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