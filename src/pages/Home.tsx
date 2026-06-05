import React, { useEffect, useState } from 'react';
import Navbar, { type Session } from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllCourses, getMyApplications } from '../services/api';
import type { Course } from '../components/CourseCard';

interface CourseApp {
  _id: string;
  courseName: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const STATS = [
  { icon: '🎓', val: '500+', label: 'Students Enrolled', sub: 'Across all courses' },
  { icon: '🏆', val: '50+', label: 'Awards Won', sub: 'National & state level' },
  { icon: '🎭', val: '200+', label: 'Performances', sub: 'Annual shows & events' },
  { icon: '⭐', val: '4.9/5', label: 'Student Rating', sub: 'Based on 300+ reviews' },
];

const SCHEDULE = [
  { day: 'MON', time: '9:00 AM', name: 'Bharatanatyam Basics', instructor: 'Meena Subramaniam', studio: 'Studio A', spots: 5 },
  { day: 'TUE', time: '5:00 PM', name: 'Hip-Hop Level 1', instructor: 'Kiran Raj', studio: 'Studio B', spots: 3 },
  { day: 'WED', time: '6:30 PM', name: 'Contemporary Flow', instructor: 'Priya Nair', studio: 'Studio C', spots: 8 },
  { day: 'THU', time: '4:00 PM', name: 'Salsa Basics', instructor: 'Carlos M.', studio: 'Studio A', spots: 12 },
  { day: 'FRI', time: '7:00 PM', name: 'Bollywood Fusion', instructor: 'Anjali Sharma', studio: 'Studio B', spots: 0 },
  { day: 'SAT', time: '10:00 AM', name: 'Kathak Intensive', instructor: 'Ritu Verma', studio: 'Studio A', spots: 2 },
];

const TESTIMONIALS = [
  { name: 'Ananya Krishnan', role: 'Bharatanatyam – 2 years', text: 'MJ Dance Academy transformed my entire relationship with dance. The instructors are incredibly passionate and the facilities are world-class. Best decision of my life!', rating: 5, avatar: 'A' },
  { name: 'Rahul Mehta', role: 'Hip-Hop – 1 year', text: 'Joined as a complete beginner. Within 6 months I was performing on stage. The progressive curriculum and supportive community made all the difference.', rating: 5, avatar: 'R' },
  { name: 'Divya Ramesh', role: 'Contemporary – 8 months', text: 'The attention to individual progress is amazing. My instructor noticed my unique strengths and helped me build on them. Truly personalized training.', rating: 5, avatar: 'D' },
];

const Home: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [myApps, setMyApps] = useState<CourseApp[]>([]);

  useEffect(() => {
    const initializeHome = async () => {
      // 1. Fetch Session
      const storedSession = sessionStorage.getItem('mj_session');
      let isStudent = false;
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession);
        setSession(parsedSession);
        if (parsedSession.role !== 'admin') isStudent = true;
      }

      try {
        // 2. Fetch Courses from API
        const courseData = await getAllCourses();
        if (courseData) setCourses(courseData.slice(0, 3));

        // 3. Fetch Applications if user is logged in
        if (isStudent) {
          const appsData = await getMyApplications();
          if (appsData) setMyApps(appsData);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    initializeHome();
  }, []);

  const handleEnroll = (courseName: string) => {
    if (!session) {
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = '/login'; 
      return;
    }
    if (session.role === 'admin') {
      alert('Admins cannot apply for courses.');
      return;
    }
    // eslint-disable-next-line react-hooks/immutability
    window.location.href = `/application?course=${encodeURIComponent(courseName)}`;
  };

  const renderHeroCard = () => {
    if (session) {
      const approvedCourses = myApps.filter((a) => a.status === 'Approved');
      const pendingApps = myApps.filter((a) => a.status === 'Pending');

      return (
        <div className="card rounded-3xl p-6 bg-[rgba(28,28,40,.8)] border border-[rgba(201,168,76,.15)] backdrop-blur-md" style={{ transform: 'perspective(1000px) rotateY(-5deg) rotateX(3deg)', boxShadow: '0 40px 80px rgba(0,0,0,.5)' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs text-white/40">Welcome back,</div>
              <div className="font-semibold text-base">{session.name} 🎭</div>
            </div>
            <div className="bg-linear-to-br from-[#C9A84C] to-[#F0D080] px-4 py-1.5 rounded-full text-xs font-bold text-[#0A0A0F]">STUDENT</div>
          </div>

          {approvedCourses.length > 0 ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/60">{approvedCourses[0].courseName} Progress</span>
                  <span className="text-(--gold)">75%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5"><div className="bg-(--gold) h-1.5 rounded-full" style={{ width: '75%' }}></div></div>
              </div>
              <div className="bg-[rgba(201,168,76,.06)] border border-[rgba(201,168,76,.12)] rounded-xl p-3">
                <div className="text-xs text-white/40 mb-2">YOUR NEXT CLASS</div>
                <div className="font-semibold">{approvedCourses[0].courseName} Session</div>
                <div className="text-sm text-white/50 mt-1">Upcoming soon · Main Studio</div>
                <div className="flex gap-2 mt-3">
                  <div className="text-xs font-medium px-2 py-1 bg-white/5 rounded">Enrolled</div>
                  <div className="bg-green-400/10 text-green-400 border border-green-400/20 text-xs font-semibold px-3 py-1 rounded-full">Confirmed</div>
                </div>
              </div>
            </>
          ) : pendingApps.length > 0 ? (
            <div className="text-center py-8 text-white/60">
              <div className="text-4xl mb-2">⏳</div>
              <p className="font-semibold text-white">Application Pending</p>
              <p className="text-sm mt-1">We are reviewing your request.</p>
            </div>
          ) : (
            <div className="text-center py-6 text-white/60">
              <div className="text-4xl mb-3">𓀤</div>
              <p className="text-sm mb-4">You haven't enrolled in any courses yet.</p>
              <a href="/courses" className="btn-gold px-4 py-2 rounded-lg text-xs inline-block no-underline">Browse Courses</a>
            </div>
          )}
        </div>
      );
    }

    // Guest Card
    return (
      <div className="card rounded-3xl p-6 relative overflow-hidden bg-[rgba(28,28,40,.8)] border border-[rgba(201,168,76,.15)]" style={{ transform: 'perspective(1000px) rotateY(-5deg) rotateX(3deg)', boxShadow: '0 40px 80px rgba(0,0,0,.5)' }}>
        <div className="blur-[6px] opacity-40 pointer-events-none">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs text-white/40">Welcome to,</div>
              <div className="font-semibold text-base">Dashboard</div>
            </div>
            <div className="bg-linear-to-br from-[#C9A84C] to-[#F0D080] px-4 py-1.5 rounded-full text-xs font-bold text-[#0A0A0F]">PRO</div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-white/60">Hip-Hop Progress</span>
              <span className="text-(--gold)">80%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5"><div className="bg-(--gold) h-1.5 rounded-full" style={{ width: '80%' }}></div></div>
          </div>
          <div className="bg-[rgba(201,168,76,.06)] border border-[rgba(201,168,76,.12)] rounded-xl p-3">
            <div className="text-xs text-white/40 mb-2">NEXT CLASS</div>
            <div className="font-semibold">Masterclass</div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
          <div className="text-4xl mb-2">✨</div>
          <h3 className="font-bold text-lg mb-1">Unlock Your Dashboard</h3>
          <p className="text-sm text-white/70 mb-4 leading-relaxed">Track your progress, view schedules, and manage your courses.</p>
          <a href="/signup" className="btn-gold px-6 py-2 rounded-xl text-sm no-underline">Join Academy Now</a>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="noise"></div>
      <Navbar activePage="home" session={session} />

      {/* --- HERO SECTION --- */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-18">
        <div className="absolute top-[10%] left-[5%] w-75 h-75 rounded-full bg-[rgba(201,168,76,.04)] blur-[60px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-100 h-100 rounded-full bg-[rgba(108,78,247,.06)] blur-[80px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-[rgba(201,168,76,.05)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-225 rounded-full border border-[rgba(201,168,76,.03)]"></div>

        <div className="hero-grid max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-4 fade-up bg-[rgba(201,168,76,.1)] text-(--gold) px-3 py-1 rounded-full text-xs font-bold border border-[rgba(201,168,76,.2)]">🏆 Ranked #1 Dance Academy in Chennai</div>
            <h1 className="playfair fade-up text-[3.8rem] font-bold leading-[1.15] mb-6 opacity-0" style={{ animationDelay: '.1s' }}>
              Move With <br />
              <span className="text-(--gold) italic">Purpose.</span><br />
              Dance With <span className="text-(--gold) italic">Passion.</span>
            </h1>
            <p className="fade-up text-white/60 text-lg leading-relaxed mb-8 opacity-0" style={{ animationDelay: '.2s' }}>
              MJ Dance Academy is Chennai's premier dance school — offering world-class instruction in Bharatanatyam, Hip-Hop, Contemporary, Salsa, and 10+ more styles. Over 500 students. 20+ expert instructors. Your stage awaits.
            </p>
            <div className="flex gap-4 flex-wrap fade-up opacity-0" style={{ animationDelay: '.3s' }}>
              <a href={session ? '/about' : '/signup'} className="btn-gold px-8 py-3 rounded-xl text-sm no-underline inline-block">
                {session ? 'Explore More' : 'Enroll Now – Free'}
              </a>
            </div>
            <div className="flex gap-8 mt-10 fade-up opacity-0" style={{ animationDelay: '.4s' }}>
              <div>
                <div className="text-3xl font-bold text-(--gold)">500+</div>
                <div className="text-xs text-white/40">Active Students</div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div>
                <div className="text-3xl font-bold text-(--gold)">20+</div>
                <div className="text-xs text-white/40">Expert Instructors</div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div>
                <div className="text-3xl font-bold text-(--gold)">15+</div>
                <div className="text-xs text-white/40">Dance Styles</div>
              </div>
            </div>
          </div>
          <div className="relative">
            {renderHeroCard()}
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, idx) => (
            <div key={idx} className="bg-[rgba(28,28,40,.6)] border border-[rgba(255,255,255,.05)] rounded-2xl p-6 text-center transition-transform hover:-translate-y-1 hover:border-(--gold)">
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className="text-3xl font-bold text-(--gold)">{s.val}</div>
              <div className="font-semibold my-1">{s.label}</div>
              <div className="text-xs text-white/40">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- COURSES SECTION --- */}
      <section className="py-20 px-6 bg-[#1c1c28]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 bg-[rgba(201,168,76,.1)] text-(--gold) px-3 py-1 rounded-full text-xs font-bold border border-[rgba(201,168,76,.2)]">Our Courses</div>
            <h2 className="playfair text-4xl font-bold mb-4">Dance Styles We Teach</h2>
            <p className="text-white/50 max-w-2xl mx-auto">From classical Indian forms to modern urban styles — find your rhythm and master the art.</p>
          </div>
          
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div key={c._id} className="bg-[rgba(28,28,40,.6)] border border-white/5 rounded-2xl overflow-hidden hover:border-(--gold) transition-all hover:-translate-y-1">
                  <div className="h-40 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${c.color}22, ${c.color}11)` }}>
                    <span className="text-[5rem]">{c.emoji}</span>
                    <div className="absolute top-3 right-3 bg-black/40 px-3 py-1 rounded-full text-xs text-white backdrop-blur-md">{c.level}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{c.name}</h3>
                    <p className="text-sm text-white/50 mb-4 leading-relaxed min-h-15">{c.desc}</p>
                    <div className="flex justify-between text-xs text-white/40 mb-4">
                      <span>⏱ {c.duration}</span>
                      <span>👥 {c.students || 120} students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base text-(--gold)">{c.price}</span>
                      <button onClick={() => handleEnroll(c.name)} className="btn-gold px-4 py-2 rounded-lg text-xs border-none cursor-pointer">Enroll Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-10 text-white/40 italic">Loading courses...</div>
          )}

          <div className="text-center mt-14">
            <a href="/courses" className="btn-gold px-8 py-3 rounded-xl no-underline inline-block text-base font-bold">
              Explore More Courses →
            </a>
          </div>
        </div>
      </section>

      {/* --- SCHEDULE & TESTIMONIALS --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-block mb-3 bg-[rgba(201,168,76,.1)] text-(--gold) px-3 py-1 rounded-full text-xs font-bold border border-[rgba(201,168,76,.2)]">Weekly Schedule</div>
            <h2 className="playfair text-3xl font-bold mb-4">This Week's Classes</h2>
            <p className="text-white/50 mb-8">All classes held at our state-of-the-art studios. Book your spot before they fill up!</p>
            <div className="flex flex-col gap-3">
              {SCHEDULE.map((s, idx) => (
                <div key={idx} className="rounded-xl p-4 flex items-center gap-4 bg-[rgba(28,28,40,.6)] border border-white/5">
                  <div className="min-w-12 text-center">
                    <div className="text-[0.65rem] text-white/40 font-semibold">{s.day}</div>
                    <div className="text-sm font-bold text-(--gold)">{s.time}</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{s.name}</div>
                    <div className="text-xs text-white/40">{s.instructor} · {s.studio}</div>
                  </div>
                  <div>
                    {s.spots === 0 ? (
                      <span className="text-xs text-red-400 bg-red-400/10 px-3 py-1 rounded-full">Full</span>
                    ) : (
                      <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded-full">{s.spots} left</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="inline-block mb-3 bg-[rgba(201,168,76,.1)] text-(--gold) px-3 py-1 rounded-full text-xs font-bold border border-[rgba(201,168,76,.2)]">Testimonials</div>
            <h2 className="playfair text-3xl font-bold mb-4">What Our Students Say</h2>
            <div className="flex flex-col gap-4">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="rounded-2xl p-5 bg-[rgba(28,28,40,.6)] border border-white/5">
                  <div className="flex gap-1 mb-3 text-(--gold) text-sm">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#C9A84C] to-[#F0D080] flex items-center justify-center font-bold text-[#0A0A0F]">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-white/40">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6 bg-linear-to-br from-[#C9A84C14] to-[#6C4EF70D]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="playfair text-4xl font-bold mb-4">Ready to Start Your Dance Journey?</h2>
          <p className="text-white/50 mb-10 text-lg">Join MJ Dance Academy today. First class is on us. No experience needed.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href={session ? '/courses' : '/signup'} className="btn-gold px-8 py-3 rounded-xl text-sm no-underline inline-block">
              {session ? 'Apply For Courses →' : 'Start Free Today →'}
            </a>
            <a href="/contact" className="px-8 py-3 rounded-xl text-sm no-underline border border-[rgba(201,168,76,.3)] text-(--gold) inline-block transition-colors hover:bg-[rgba(201,168,76,.08)]">
              Talk to Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;