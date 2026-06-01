import React, { useEffect, useState } from 'react';
import Navbar, { type Session } from '../components/Navbar'; // Adjust the import path if needed!
import Footer from '../components/Footer';

// --- Static Data ---
const VALUES = [
  { icon: '🎯', title: 'Our Mission', text: 'To make world-class dance education accessible to everyone in Chennai, fostering artistic expression, cultural pride, and physical wellness through movement.' },
  { icon: '🌟', title: 'Our Vision', text: 'To be India\'s leading dance academy — a hub where tradition meets innovation, and every student finds their unique voice through the language of dance.' },
  { icon: '💛', title: 'Our Values', text: 'Passion, Discipline, Inclusivity, and Community. We celebrate every student\'s journey regardless of age, background, or prior experience.' },
];

const TIMELINE = [
  { year: '2010', title: 'Academy Founded', text: 'MJ Dance Academy opens its doors with 12 students in a 500 sq ft studio on Anna Nagar.' },
  { year: '2013', title: 'First Annual Showcase', text: 'Our students perform at Music Academy — 400 attendees, standing ovations, and zero stage fright!' },
  { year: '2015', title: 'Expanded to 3 Studios', text: 'Growing demand led us to open Studio B and C, doubling our capacity to 200 concurrent students.' },
  { year: '2017', title: 'National Award', text: 'MJ Dance Academy wins "Best Dance School in South India" at the National Dance Excellence Awards.' },
  { year: '2019', title: 'Online Classes Launch', text: 'We go digital, offering hybrid classes that reach students across Tamil Nadu and beyond.' },
  { year: '2022', title: '500 Students Milestone', text: 'We celebrate 500 active enrollments with a spectacular 12-hour dance marathon performance.' },
  { year: '2024', title: 'Digital Academy System', text: 'Launch of MJ Dance Academy\'s full digital management system for seamless student experience.' },
];

const INSTRUCTORS = [
  { name: 'Meena Subramaniam', role: 'Bharatanatyam', exp: '12 yrs', emoji: '👸', awards: 'Kalaimamani Award 2018' },
  { name: 'Kiran Raj', role: 'Hip-Hop & Breaking', exp: '8 yrs', emoji: '🕺', awards: 'National Street Dance Champion' },
  { name: 'Priya Nair', role: 'Contemporary', exp: '10 yrs', emoji: '🌊', awards: 'Performed at Jaipur Lit Fest' },
  { name: 'Carlos Mendes', role: 'Salsa & Bachata', exp: '15 yrs', emoji: '💃', awards: 'International Salsa Pro' },
  { name: 'Ritu Verma', role: 'Kathak', exp: '14 yrs', emoji: '👑', awards: 'National Classical Excellence' },
  { name: 'Anjali Sharma', role: 'Bollywood Fusion', exp: '9 yrs', emoji: '🎵', awards: 'Choreographed 3 films' },
  { name: 'Arjun Pillai', role: 'Breaking & Popping', exp: '7 yrs', emoji: '🔥', awards: 'South India B-Boy Champion' },
  { name: 'Nivetha Kumar', role: 'Folk & Bharatanatyam', exp: '11 yrs', emoji: '🌺', awards: 'Tamil Isai Award 2021' },
];

const About: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Fetch Session to pass to the Navbar
    const storedSession = sessionStorage.getItem('mj_session');
    if (storedSession) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSession(JSON.parse(storedSession));
    }
  }, []);

  return (
    <>
      <div className="noise"></div>

      {/* --- NAVBAR --- */}
      <Navbar activePage="about" session={session} />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 text-center bg-linear-to-b from-[#12121A] to-[#0A0A0F]">
        <div className="max-w-3xl mx-auto">
          <div className="tag inline-block mb-4 fade-up">Our Story</div>
          <h1 className="section-title fade-up mb-4 text-5xl md:text-6xl opacity-0" style={{ animationDelay: '.1s' }}>
            Dancing Since <span className="text-(--gold) italic">2010</span>
          </h1>
          <p className="fade-up text-white/60 text-lg leading-relaxed opacity-0" style={{ animationDelay: '.2s' }}>
            What started as a small studio with 12 students and a dream has grown into Chennai's most loved dance academy. MJ Dance Academy was founded on one belief: <strong className="text-white">dance changes lives.</strong>
          </p>
        </div>
      </section>

      {/* --- MISSION / VISION / VALUES --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((v, i) => (
            <div key={i} className="rounded-2xl p-8 text-center bg-[rgba(28,28,40,.5)] border border-white/5 transition-all duration-300 hover:border-[rgba(201,168,76,.25)] hover:bg-[rgba(201,168,76,.05)]">
              <div className="text-5xl mb-4">{v.icon}</div>
              <h3 className="playfair text-xl font-bold text-(--gold) mb-4">{v.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOUNDER'S NOTE --- */}
      <section className="py-20 px-6 bg-[#1c1c28]/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="w-full h-100 md:h-105 rounded-3xl bg-linear-to-br from-[rgba(201,168,76,.15)] to-[rgba(108,78,247,.1)] flex items-center justify-center text-[10rem] md:text-[12rem] overflow-hidden">
              🕺
            </div>
            <div className="card rounded-2xl p-5 absolute -bottom-6 -right-6 w-45 text-center shadow-2xl">
              <div className="text-3xl font-bold text-(--gold)">15+</div>
              <div className="text-xs text-white/50 mt-1">Years of Excellence</div>
            </div>
          </div>
          <div>
            <div className="tag inline-block mb-4">Founder's Note</div>
            <h2 className="section-title mb-6">
              Meet <span className="text-(--gold) font-sans font-bold tracking-wide">Joseph Jackson</span>
            </h2>
            <p className="text-white/65 leading-relaxed mb-6 text-sm md:text-base">
              Deeply inspired by the legendary Michael Jackson, Joseph spent his early years mastering urban choreography and the iconic moves of the King of Pop. After winning the National Street Dance Championship in 2005, he toured internationally before returning home with one mission: to build a dance school that captures that electrifying energy and nurtures the next generation.
            </p>
            <p className="text-white/65 leading-relaxed mb-8 text-sm md:text-base">
              "I believe every person is born a dancer. Some just need a safe, inspiring space to discover it. MJ Dance Academy is that space. We don't just teach steps — we build confidence, discipline, and joy."
            </p>
            <div className="bg-[rgba(201,168,76,.06)] border border-[rgba(201,168,76,.15)] border-l-4 border-l-(--gold) rounded-lg p-5">
              <p className="italic text-white/70 text-sm">"Dance is the hidden language of the soul. At MJ, we make sure every soul finds its rhythm."</p>
              <p className="mt-3 text-xs text-(--gold) font-semibold">— Joseph Jackson, Founder & Principal</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TIMELINE --- */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="tag inline-block mb-3">Our Journey</div>
            <h2 className="section-title">Milestones That <span className="text-(--gold)">Define Us</span></h2>
          </div>
          <div className="flex flex-col gap-6">
            {TIMELINE.map((t, i) => (
              <div key={i} className="relative pl-10">
                {/* Vertical Line Connector (hidden on last item) */}
                {i !== TIMELINE.length - 1 && (
                  <div className="absolute left-2.75 top-8 -bottom-6 w-px bg-[rgba(201,168,76,.2)]"></div>
                )}
                {/* Timeline Dot */}
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-linear-to-br from-[#C9A84C] to-[#F0D080] flex items-center justify-center text-[0.6rem] font-bold text-[#0A0A0F] z-10">
                  {t.year.slice(2)}
                </div>
                {/* Content Card */}
                <div className="card rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-(--gold) bg-[rgba(201,168,76,.1)] px-3 py-1 rounded-full">{t.year}</span>
                    <h3 className="font-bold">{t.title}</h3>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INSTRUCTORS --- */}
      <section className="py-20 px-6 bg-[#1c1c28]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="tag inline-block mb-3">The Team</div>
            <h2 className="section-title mb-4">Meet Our <span className="text-(--gold)">Master Instructors</span></h2>
            <p className="text-white/50 max-w-xl mx-auto">Every instructor at MJ is a certified professional with 5+ years of performance and teaching experience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTRUCTORS.map((instructor, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden bg-[rgba(28,28,40,.6)] border border-white/5 transition-all duration-400 hover:-translate-y-2 hover:border-[rgba(201,168,76,.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,.4)] cursor-pointer">
                <div className="h-35 flex items-center justify-center text-[4.5rem] bg-linear-to-br from-[rgba(201,168,76,.1)] to-[rgba(108,78,247,.08)]">
                  {instructor.emoji}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base mb-1">{instructor.name}</h3>
                  <div className="text-(--gold) text-sm font-semibold mb-2">{instructor.role}</div>
                  <div className="text-xs text-white/40 mb-2">🏅 {instructor.awards}</div>
                  <div className="text-xs text-white/30">Experience: {instructor.exp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6 text-center">
        <h2 className="section-title mb-4">Be Part of Our <span className="text-(--gold)">Story</span></h2>
        <p className="text-white/50 mb-8 max-w-xl mx-auto leading-relaxed">Your chapter begins when you take that first step onto the dance floor. We'll be with you every beat of the way.</p>
        <a href={session ? "/courses" : "/signup"} className="btn-gold px-8 py-3 rounded-xl text-sm no-underline inline-block">
          {session ? "Apply For Courses →" : "Start Your Journey →"}
        </a>
      </section>

      <Footer />
    </>
  );
};

export default About;