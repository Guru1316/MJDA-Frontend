import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar, { type Session } from '../components/Navbar';
import Footer from '../components/Footer';
import { createEnquiry } from '../services/api';

const CONTACT_INFO = [
  { icon: '📍', title: 'Visit Us', lines: ['123 Anna Salai', 'T. Nagar, Chennai – 600017', 'Tamil Nadu, India'] },
  { icon: '📞', title: 'Call Us', lines: ['+91 98765 43210', '+91 44 2345 6789', 'Mon–Sat: 9AM–8PM'] },
  { icon: '✉️', title: 'Email Us', lines: ['hello@mjdance.com', 'admissions@mjdance.com', 'Reply within 4 hours'] },
  { icon: '💬', title: 'WhatsApp', lines: ['+91 98765 43210', 'Chat anytime', 'Quick response guaranteed'] },
];

const STUDIO_HOURS = [
  ['Monday – Friday', '7:00 AM – 9:00 PM'],
  ['Saturday', '7:00 AM – 8:00 PM'],
  ['Sunday', 'Workshops only'],
  ['Public Holidays', 'By appointment'],
];

const SOCIAL_LINKS = [
  { name: 'Instagram', handle: '@mjdanceacademy', icon: '📸', color: '#e1306c' },
  { name: 'YouTube', handle: 'MJ Dance Academy', icon: '▶️', color: '#ff0000' },
  { name: 'Facebook', handle: 'MJ Dance Academy', icon: '👍', color: '#1877f2' },
  { name: 'Twitter', handle: '@mjdancechennai', icon: '🐦', color: '#1da1f2' },
];

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const storedSession = sessionStorage.getItem('mj_session');
    if (storedSession) {
      const parsed = JSON.parse(storedSession);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSession(parsed);
      
      const nameParts = (parsed.name || '').split(' ');
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: parsed.email || ''
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    
    try {
      await createEnquiry({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        newsletter: formData.newsletter
      });
      
      setShowSuccess(true);
      setFormData(prev => ({ ...prev, message: '', subject: '' }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error.message || 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLocked = !session;

  return (
    <>
      <div className="noise z-0"></div>
      
      <Navbar activePage="contact" session={session} />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 px-6 text-center bg-linear-to-b from-[#12121A] to-[#0A0A0F]">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block mb-4 fade-up bg-[rgba(201,168,76,.1)] text-(--gold) px-3 py-1 rounded-full text-xs font-bold border border-[rgba(201,168,76,.2)]">Get In Touch</div>
          <h1 className="playfair text-5xl font-bold mb-4 fade-up opacity-0" style={{ animationDelay: '.1s' }}>
            We'd Love to <span className="text-(--gold) italic">Hear From You</span>
          </h1>
          <p className="text-white/55 text-base fade-up opacity-0" style={{ animationDelay: '.2s' }}>
            Whether you have a question, want to enroll, or just want to say hi — our door is always open.
          </p>
        </div>
      </section>

      {/* --- INFO GRID --- */}
      <section className="pt-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTACT_INFO.map((c, idx) => (
            <div key={idx} className="flex flex-col text-center p-5 bg-[rgba(28,28,40,.5)] border border-white/5 rounded-2xl transition-all duration-300 hover:border-[rgba(201,168,76,.25)] hover:bg-[rgba(201,168,76,.04)]">
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="font-bold mb-2 text-(--gold)">{c.title}</h3>
              {c.lines.map((l, i) => (
                <p key={i} className={`text-sm ${i === 2 ? 'text-white/30 text-xs mt-1' : 'text-white/60'}`}>{l}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <section className="py-16 px-6 mb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Contact Form */}
          <div>
            <h2 className="playfair text-3xl font-bold mb-2">Send Us a <span className="text-(--gold)">Message</span></h2>
            <p className="text-white/50 mb-8 text-sm">Fill out the form and we'll get back to you within a few hours.</p>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-400/10 border border-red-400/25 text-red-400 text-sm font-semibold">
                {errorMsg}
              </div>
            )}

            {showSuccess ? (
              <div className="p-6 rounded-xl bg-green-400/10 border border-green-400/25 text-green-400 text-center fade-up">
                <div className="text-4xl mb-2">✅</div>
                <strong className="text-lg">Message Sent!</strong>
                <p className="text-sm opacity-80 mt-2">Thanks for reaching out! We'll reply within a few hours.</p>
                <button onClick={() => setShowSuccess(false)} className="mt-4 text-white/50 text-xs bg-transparent border border-white/20 px-3 py-1.5 rounded hover:text-white cursor-pointer">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/50 mb-1.5">First Name *</label>
                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} disabled={isLocked} readOnly={!isLocked} placeholder="Michael" className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30 disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-white/5 read-only:focus:border-[rgba(201,168,76,.2)]" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-1.5">Last Name *</label>
                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} disabled={isLocked} readOnly={!isLocked} placeholder="Jackson" className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30 disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-white/5 read-only:focus:border-[rgba(201,168,76,.2)]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1.5">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} disabled={isLocked} readOnly={!isLocked} placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30 disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-white/5 read-only:focus:border-[rgba(201,168,76,.2)]" />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1.5">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={isLocked} placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30 disabled:opacity-50 disabled:cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1.5">Subject *</label>
                  <select name="subject" required value={formData.subject} onChange={handleChange} disabled={isLocked} className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all [&>option]:bg-[#1C1C28] disabled:opacity-50 disabled:cursor-not-allowed">
                    <option value="">Select a topic</option>
                    <option value="Enrollment Inquiry">Enrollment Inquiry</option>
                    <option value="Course Information">Course Information</option>
                    <option value="Fee & Payment">Fee & Payment</option>
                    <option value="Schedule Information">Schedule Information</option>
                    <option value="Performance/Events">Performance/Events</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1.5">Message *</label>
                  <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} disabled={isLocked} placeholder="Tell us how we can help you..." className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30 disabled:opacity-50 disabled:cursor-not-allowed resize-y"></textarea>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} disabled={isLocked} id="cnewsletter" className="w-4 h-4 cursor-pointer disabled:cursor-not-allowed" style={{ accentColor: 'var(--gold)' }} />
                  <label htmlFor="cnewsletter" className="text-sm text-white/50 cursor-pointer">Subscribe to our newsletter for events & updates</label>
                </div>
                
                {isLocked ? (
                  <button type="button" onClick={() => navigate('/login')} className="w-full py-3 rounded-xl text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20 mt-2 cursor-pointer">
                    🔒 Login to Send Message
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-3 rounded-xl text-sm mt-2 border-none disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending...' : 'Send Message →'}
                  </button>
                )}
              </form>
            )}
          </div>

          {/* Right: Map & Additional Info */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Find Us on the Map</h3>
              <div className="w-full h-75 rounded-2xl bg-[rgba(28,28,40,.6)] border border-[rgba(201,168,76,.15)] flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <div className="text-5xl mb-3">🗺️</div>
                  <p className="text-white/50 text-sm">123 Anna Salai, T. Nagar</p>
                  <p className="text-white/40 text-xs">Chennai – 600017</p>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-block mt-4 px-6 py-2 bg-linear-to-br from-[#C9A84C] to-[#F0D080] text-[#0A0A0F] font-semibold rounded-lg no-underline text-xs transition-transform hover:-translate-y-0.5">
                    Open in Google Maps ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(28,28,40,.8)] border border-[rgba(201,168,76,.15)] rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="font-bold text-lg mb-5 text-(--gold)">🕐 Studio Hours</h3>
              <div className="flex flex-col gap-3">
                {STUDIO_HOURS.map(([day, time], idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="text-sm text-white/70">{day}</span>
                    <span className="text-sm font-semibold text-(--gold)">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[rgba(28,28,40,.8)] border border-[rgba(201,168,76,.15)] rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="font-bold text-lg mb-5">Follow Us</h3>
              <div className="flex gap-3 flex-wrap">
                {SOCIAL_LINKS.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs cursor-pointer transition-all duration-300" onMouseEnter={(e) => e.currentTarget.style.borderColor = s.color} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'}>
                    <span>{s.icon}</span>
                    <span className="text-white/70">{s.handle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;