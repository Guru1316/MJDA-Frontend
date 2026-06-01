import React, { useState, useEffect } from 'react';
import Navbar, { type Session } from '../components/Navbar';
import Footer from '../components/Footer';

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'collect', label: 'Information We Collect' },
  { id: 'use', label: 'How We Use Your Data' },
  { id: 'share', label: 'Information Sharing' },
  { id: 'security', label: 'Data Security' },
  { id: 'cookies', label: 'Cookies Policy' },
  { id: 'children', label: 'Children\'s Privacy' },
  { id: 'rights', label: 'Your Rights' },
  { id: 'contact', label: 'Contact Us' },
];

const Privacy: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const storedSession = sessionStorage.getItem('mj_session');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedSession) setSession(JSON.parse(storedSession));

    // Intersection Observer for highlighting TOC dynamically
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -80% 0px' });

    TOC.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="noise z-0"></div>
      <Navbar activePage="privacy" session={session} />

      {/* --- HERO --- */}
      <section className="pt-32 pb-12 px-6 text-center bg-linear-to-b from-[#12121A] to-[#0A0A0F]">
        <div className="max-w-2xl mx-auto">
          <div className="tag inline-block mb-4">Legal</div>
          <h1 className="playfair text-5xl font-bold mb-4">Privacy <span className="text-(--gold) italic">Policy</span></h1>
          <p className="text-white/50 text-sm">Last updated: January 1, 2025 · Effective: January 1, 2025</p>
        </div>
      </section>

      {/* --- CONTENT --- */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 items-start">
          
          {/* Table of Contents */}
          <div className="hidden lg:block sticky top-24">
            <div className="bg-[rgba(28,28,40,.7)] border border-[rgba(201,168,76,.12)] rounded-2xl p-6">
              <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">Contents</div>
              <nav className="flex flex-col gap-1">
                {TOC.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer border-none bg-transparent ${activeSection === item.id ? 'bg-[rgba(201,168,76,.08)] text-(--gold)' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-white/65 text-sm md:text-base leading-relaxed">
            <div className="bg-[rgba(201,168,76,.05)] border border-[rgba(201,168,76,.15)] border-l-4 border-l-(--gold) rounded-lg p-5 mb-10 text-white">
              <strong className="text-(--gold) block mb-2">Privacy Summary</strong>
              <p>MJ Dance Academy takes your privacy seriously. We collect only the data needed to provide our services, never sell your personal information to third parties, and give you full control over your data. This policy explains everything in plain language.</p>
            </div>

            <div id="overview" className="mb-12 scroll-mt-24">
              <h2 className="playfair text-2xl font-bold text-(--gold) mb-5 pb-3 border-b border-[rgba(201,168,76,.15)]">1. Overview</h2>
              <p className="mb-3">Welcome to MJ Dance Academy ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Platform").</p>
              <p className="mb-3">By using our Platform, you agree to the collection and use of information in accordance with this policy. If you disagree with any part, please discontinue use of our services.</p>
              <p>This policy applies to all users including students, parents/guardians, instructors, and administrators who interact with MJ Dance Academy's services.</p>
            </div>

            <div id="collect" className="mb-12 scroll-mt-24">
              <h2 className="playfair text-2xl font-bold text-(--gold) mb-5 pb-3 border-b border-[rgba(201,168,76,.15)]">2. Information We Collect</h2>
              <p className="text-white font-semibold mb-2">2.1 Information You Provide Directly</p>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                <li>Account registration details: name, email address, phone number, date of birth, gender</li>
                <li>Profile information: profile photo, dance experience, preferred styles</li>
                <li>Payment information: billing address, payment method details (processed securely via Razorpay)</li>
                <li>Communications: messages sent through our contact forms or support channels</li>
                <li>Survey responses and feedback you voluntarily provide</li>
              </ul>
              
              <p className="text-white font-semibold mb-2">2.2 Information Collected Automatically</p>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                <li>Usage data: pages visited, features used, time spent on Platform</li>
                <li>Device information: IP address, browser type, operating system, device identifiers</li>
                <li>Location data: general geographic location based on IP address</li>
                <li>Cookies and similar tracking technologies (see Section 6)</li>
              </ul>

              <p className="text-white font-semibold mb-2">2.3 Information from Third Parties</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Social login data when you use Google or Facebook to sign in</li>
                <li>Payment confirmation from our payment processors</li>
              </ul>
            </div>

            <div id="use" className="mb-12 scroll-mt-24">
              <h2 className="playfair text-2xl font-bold text-(--gold) mb-5 pb-3 border-b border-[rgba(201,168,76,.15)]">3. How We Use Your Data</h2>
              <p className="mb-3">We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-white">Service Delivery:</strong> Processing enrollments, managing class schedules, tracking attendance</li>
                <li><strong className="text-white">Account Management:</strong> Creating and maintaining your student/instructor profile</li>
                <li><strong className="text-white">Communications:</strong> Sending class reminders, schedule changes, event notifications, and newsletters</li>
                <li><strong className="text-white">Payments:</strong> Processing fees, issuing receipts, managing refunds</li>
                <li><strong className="text-white">Performance Tracking:</strong> Monitoring student progress, attendance records, and achievements</li>
                <li><strong className="text-white">Safety:</strong> Verifying identities, preventing fraud, ensuring platform security</li>
                <li><strong className="text-white">Legal Compliance:</strong> Meeting applicable legal and regulatory requirements</li>
                <li><strong className="text-white">Improvement:</strong> Analyzing usage patterns to improve our services and curriculum</li>
              </ul>
            </div>

            <div id="share" className="mb-12 scroll-mt-24">
              <h2 className="playfair text-2xl font-bold text-(--gold) mb-5 pb-3 border-b border-[rgba(201,168,76,.15)]">4. Information Sharing</h2>
              <p className="mb-3">We do not sell your personal information. We share data only in these limited circumstances:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-white">Service Providers:</strong> Trusted vendors who help operate our Platform (e.g., Razorpay for payments, AWS for hosting). They are bound by strict confidentiality obligations.</li>
                <li><strong className="text-white">Instructors:</strong> Your instructor will have access to your name, attendance records, and progress notes — not your payment information.</li>
                <li><strong className="text-white">Legal Requirements:</strong> When required by law, court order, or government authority.</li>
                <li><strong className="text-white">Business Transfers:</strong> In connection with a merger or acquisition, with appropriate data protection in place.</li>
                <li><strong className="text-white">With Your Consent:</strong> Any other sharing requires your explicit permission.</li>
              </ul>
            </div>

            <div id="security" className="mb-12 scroll-mt-24">
              <h2 className="playfair text-2xl font-bold text-(--gold) mb-5 pb-3 border-b border-[rgba(201,168,76,.15)]">5. Data Security</h2>
              <p className="mb-3">We implement industry-standard security measures to protect your data:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>All data transmitted is encrypted using TLS 1.3 (HTTPS)</li>
                <li>Passwords are hashed using bcrypt with salt</li>
                <li>Payment data is processed by PCI-DSS compliant processors</li>
                <li>Regular security audits and penetration testing</li>
                <li>Strict access controls — employees access only what they need</li>
                <li>Automated breach detection and 72-hour notification policy</li>
              </ul>
              <p>No method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
            </div>

            <div id="cookies" className="mb-12 scroll-mt-24">
              <h2 className="playfair text-2xl font-bold text-(--gold) mb-5 pb-3 border-b border-[rgba(201,168,76,.15)]">6. Cookies Policy</h2>
              <p className="mb-3">We use cookies and similar technologies to improve your experience. Types we use:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><strong className="text-white">Essential Cookies:</strong> Required for basic Platform functionality. Cannot be disabled.</li>
                <li><strong className="text-white">Functional Cookies:</strong> Remember your preferences (language, display settings). Can be disabled.</li>
                <li><strong className="text-white">Analytics Cookies:</strong> Understand how you use our Platform via Google Analytics. Can be disabled.</li>
              </ul>
              <p>You can control cookies through your browser settings. Disabling non-essential cookies won't significantly affect your experience.</p>
            </div>

            <div id="children" className="mb-12 scroll-mt-24">
              <h2 className="playfair text-2xl font-bold text-(--gold) mb-5 pb-3 border-b border-[rgba(201,168,76,.15)]">7. Children's Privacy</h2>
              <p className="mb-3">We offer services for children as young as 4 years old, with specific protections in place:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Children under 13 require a parent/guardian account and explicit parental consent</li>
                <li>We collect only the minimum information necessary for service delivery</li>
                <li>Children's data is never used for marketing or shared with advertisers</li>
                <li>Parents may view, update, or delete their child's data at any time</li>
                <li>Photos and videos of children are only shared with explicit written parental consent</li>
              </ul>
            </div>

            <div id="rights" className="mb-12 scroll-mt-24">
              <h2 className="playfair text-2xl font-bold text-(--gold) mb-5 pb-3 border-b border-[rgba(201,168,76,.15)]">8. Your Rights</h2>
              <p className="mb-3">Under applicable data protection laws, you have the right to:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><strong className="text-white">Access:</strong> Request a copy of all personal data we hold about you</li>
                <li><strong className="text-white">Correction:</strong> Update inaccurate or incomplete information</li>
                <li><strong className="text-white">Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong className="text-white">Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong className="text-white">Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong className="text-white">Restriction:</strong> Request we limit how we process your data in certain circumstances</li>
              </ul>
              <p>To exercise any of these rights, email us at <a href="mailto:privacy@mjdance.com" className="text-(--gold) no-underline">privacy@mjdance.com</a> or use the settings in your account dashboard.</p>
            </div>

            <div id="contact" className="mb-6 scroll-mt-24">
              <h2 className="playfair text-2xl font-bold text-(--gold) mb-5 pb-3 border-b border-[rgba(201,168,76,.15)]">9. Contact Us</h2>
              <p className="mb-4">If you have questions about this Privacy Policy or our data practices, contact our Data Protection Officer:</p>
              <div className="bg-[rgba(201,168,76,.05)] border border-[rgba(201,168,76,.15)] border-l-4 border-l-(--gold) rounded-lg p-5 mb-4 text-white">
                <strong className="text-(--gold) block mb-2">Data Protection Officer</strong>
                <p>MJ Dance Academy<br/>123 Anna Salai, T. Nagar<br/>Chennai – 600017, Tamil Nadu<br/>📧 privacy@mjdance.com<br/>📞 +91 98765 43210</p>
              </div>
              <p>We respond to all privacy inquiries within 30 days.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Privacy;