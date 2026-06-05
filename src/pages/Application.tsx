import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar, { type Session } from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllCourses, createApplication } from '../services/api';

const Application: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedCourse = searchParams.get('course');

  // --- State Management ---
  const [session, setSession] = useState<Session | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courses, setCourses] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCourseLocked, setIsCourseLocked] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    courseName: '',
    experience: ''
  });

  // --- Initialization & Auth Guard ---
  useEffect(() => {
    const initialize = async () => {
      const storedSession = sessionStorage.getItem('mj_session');
      if (!storedSession) {
        navigate('/login');
        return;
      }
      
      const parsedSession = JSON.parse(storedSession);
      
      if (parsedSession.role === 'admin') {
        alert('Admins cannot apply for courses.');
        navigate('/');
        return;
      }

      setSession(parsedSession);
      setFormData(prev => ({
        ...prev,
        name: parsedSession.name || '',
        email: parsedSession.email || ''
      }));

      try {
        const data = await getAllCourses();
        if(data) setCourses(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        console.error("Failed to load courses");
      }

      if (requestedCourse) {
        setFormData(prev => ({ ...prev, courseName: requestedCourse }));
        setIsCourseLocked(true);
      }
    };
    
    initialize();
  }, [navigate, requestedCourse]);

  // --- Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await createApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: Number(formData.age),
        courseName: formData.courseName,
        experience: formData.experience
      });

      // Added "Redirecting..." to the message so the user knows what's happening
      setSuccessMsg('Application submitted! Awaiting Admin approval. Redirecting...');
      setFormData(prev => ({
        ...prev,
        phone: '',
        age: '',
        experience: ''
      }));

      // Auto-navigate back after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        navigate(-1);
      }, 3000);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error.message || 'Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) return <div className="min-h-screen bg-(--dark)"></div>;

  return (
    <>
      <div className="noise z-0"></div>
      <Navbar activePage="application" session={session} />

      <div className="min-h-screen pt-32 pb-16 px-6 bg-linear-to-b from-[#12121A] to-[#0A0A0F] relative z-10 flex items-start justify-center">
        <div className="w-full max-w-2xl">
          
          <button 
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-white/50 hover:text-(--gold) transition-colors bg-transparent border-none cursor-pointer text-sm font-medium fade-up"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>

          <div className="bg-[rgba(28,28,40,.8)] border border-[rgba(201,168,76,.15)] rounded-2xl p-8 backdrop-blur-xl fade-up">
            
            <div className="text-center mb-8">
              <h2 className="playfair text-4xl font-bold text-(--gold) mb-2">Course Application</h2>
              <p className="text-white/50">Fill out the form below to secure your spot.</p>
            </div>

            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-green-400/10 border border-green-400/25 text-green-400 text-center font-semibold">
                <div className="text-2xl mb-1">✅</div>
                {successMsg}
              </div>
            )}
            
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-400/10 border border-red-400/25 text-red-400 text-center font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Full Name</label>
                  <input 
                    type="text" name="name" value={formData.name} readOnly
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none placeholder-white/30 opacity-70 cursor-not-allowed" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Email Address</label>
                  <input 
                    type="email" name="email" value={formData.email} readOnly
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none placeholder-white/30 opacity-70 cursor-not-allowed" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Phone Number *</label>
                  <input 
                    type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" 
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Age *</label>
                  <input 
                    type="number" name="age" min="5" max="80" required value={formData.age} onChange={handleChange} placeholder="18" 
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Selected Course *</label>
                <select 
                  name="courseName" required value={formData.courseName} onChange={handleChange} disabled={isCourseLocked}
                  className={`w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all [&>option]:bg-[#1C1C28] ${isCourseLocked ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select a course...</option>
                  {courses.map(c => (
                    <option key={c._id} value={c.name}>{c.name}</option>
                  ))}
                </select>
                {isCourseLocked && (
                  <p className="text-xs text-white/40 mt-2 italic">Course locked based on your selection. Return to courses to change.</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Dance Experience (Optional)</label>
                <textarea 
                  name="experience" rows={3} value={formData.experience} onChange={handleChange} placeholder="Tell us about your background..." 
                  className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30 resize-y"
                ></textarea>
              </div>
              
              <button 
                type="submit" disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-sm font-bold border-none transition-all mt-4 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #F0D080)', color: '#0A0A0F' }}
              >
                {isSubmitting ? 'Processing...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Application;