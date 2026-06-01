import React, { useState, useEffect } from 'react';
import Navbar, { type Session } from '../components/Navbar';
import Footer from '../components/Footer';

const FAQS = [
  { cat: 'Enrollment', q: 'How do I enroll in a course at MJ Dance Academy?', a: 'Enrollment is simple! Create a free account on our website, browse available courses, and click "Enroll Now" on your desired class. Our team will confirm your spot within 24 hours. You can also walk into our studio at Anna Salai, Chennai any weekday between 9am–7pm.' },
  { cat: 'Enrollment', q: 'Is there an age limit to join MJ Dance Academy?', a: 'We welcome students of all ages! Our youngest students start at age 4 (with parent consent), and our oldest current student is 67 years old. We have age-specific batches for children (4–12), teenagers (13–17), adults (18+), and seniors (55+).' },
  { cat: 'Enrollment', q: 'Do I need prior dance experience to join?', a: 'Absolutely not! We have beginner batches for every dance style. Most students join with zero experience. Our instructors are trained to start from the very basics and progress at a pace that suits each student.' },
  { cat: 'Enrollment', q: 'Can I try a class before committing to enrollment?', a: 'Yes! Every new student gets one FREE trial class for any dance style of their choice. Simply register on our website and select the "Trial Class" option. No payment required for the trial.' },
  { cat: 'Classes & Schedule', q: 'What are your class timings?', a: 'We offer flexible scheduling with morning batches (7am–11am), afternoon batches (12pm–4pm), and evening batches (5pm–9pm), Monday through Saturday. Sunday is reserved for special workshops and performances.' },
  { cat: 'Classes & Schedule', q: 'How long is each class session?', a: 'Regular classes are 60–90 minutes depending on the style and level. Intensive workshops run for 3–4 hours. Performance preparation sessions may extend to 5 hours.' },
  { cat: 'Classes & Schedule', q: 'How many students are in each batch?', a: 'We keep batches small and focused — typically 8–15 students per batch. This ensures every student gets personalized attention from the instructor. Weekend batches may have up to 20 students.' },
  { cat: 'Classes & Schedule', q: 'Can I attend multiple dance styles simultaneously?', a: 'Yes! Many of our students are enrolled in 2–3 styles concurrently. We help you build a schedule that balances all your classes. Cross-enrollment discounts are also available.' },
  { cat: 'Fees & Payments', q: 'What are the monthly fees?', a: 'Fees range from ₹2,200/month (Bollywood Fusion) to ₹3,800/month (Kathak). Annual subscriptions offer 15% discount. All fees include access to studio facilities, costume loan for performances, and access to our digital learning portal.' },
  { cat: 'Fees & Payments', q: 'Is there a registration or admission fee?', a: 'There is a one-time registration fee of ₹500 for new students. This covers your student ID card, welcome kit (bag + handbook), and access to our mobile app. Students who enroll in annual plans get this fee waived.' },
  { cat: 'Fees & Payments', q: 'What payment methods do you accept?', a: 'We accept UPI (GPay, PhonePe, Paytm), all major credit/debit cards, net banking, and cash at the studio. EMI options are available for annual plans through our banking partners.' },
  { cat: 'Fees & Payments', q: 'What is your refund policy?', a: 'Students may withdraw within 7 days of enrollment for a full refund. Withdrawals between 7–30 days receive a 50% refund. After 30 days, fees are non-refundable but can be transferred to a future batch. Medical emergencies are handled case-by-case.' },
  { cat: 'Instructors', q: 'What qualifications do your instructors have?', a: 'All MJ instructors hold certifications from recognized dance bodies (NRDC, Gandharva Mahavidyalaya, or equivalent). They have a minimum of 5 years of performance experience and complete our internal pedagogy training program before teaching.' },
  { cat: 'Instructors', q: 'Can I request a specific instructor?', a: 'You can indicate instructor preferences during enrollment. We accommodate requests based on batch availability. If your preferred instructor\'s batch is full, you can join the waitlist.' },
  { cat: 'Facilities', q: 'What facilities does MJ Dance Academy have?', a: 'Our 12,000 sq ft campus includes 3 air-conditioned dance studios with sprung wooden floors, a performance stage, changing rooms with lockers, a viewing gallery for parents, a café/lounge, and a digital library. Parking is available for 50 vehicles.' },
  { cat: 'Facilities', q: 'Are the studios air-conditioned?', a: 'Yes, all three studios are fully air-conditioned and maintained at an optimal temperature of 21–23°C for comfortable movement. Studios are sanitized after each session.' },
  { cat: 'Online Classes', q: 'Do you offer online dance classes?', a: 'Yes! We offer live online classes via our platform for all dance styles. Online students get access to recorded class replays for 30 days, digital music resources, and monthly 1-on-1 feedback sessions with instructors.' },
  { cat: 'Online Classes', q: 'Are online classes as effective as in-person classes?', a: 'Online classes are excellent for building theoretical knowledge, practicing routines, and staying consistent when you can\'t physically attend. For performance training and technique correction, we recommend supplementing with in-person sessions when possible.' },
  { cat: 'Performances', q: 'Will my child get opportunities to perform on stage?', a: 'Absolutely! We host an Annual Showcase (400+ audience), participate in 3–4 competitions per year, and perform at cultural festivals. Every enrolled student performs at least once per year. All costumes and stage logistics are handled by the academy.' },
  { cat: 'Performances', q: 'Are there extra charges for performances and events?', a: 'Regular annual showcase performances are included in tuition. Competition entries, special event costumes, and outstation performances may have nominal additional fees which are communicated well in advance.' },
];

const CATEGORIES = ['All', 'Enrollment', 'Classes & Schedule', 'Fees & Payments', 'Instructors', 'Facilities', 'Online Classes', 'Performances'];

const Faq: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [currentCat, setCurrentCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedSession = sessionStorage.getItem('mj_session');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedSession) setSession(JSON.parse(storedSession));
  }, []);

  const filteredFaqs = FAQS.filter(f => {
    const catMatch = currentCat === 'All' || f.cat === currentCat;
    const searchMatch = !searchQuery || f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <>
      <div className="noise z-0"></div>
      <Navbar activePage="faq" session={session} />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 px-6 text-center bg-linear-to-b from-[#12121A] to-[#0A0A0F]">
        <div className="max-w-2xl mx-auto">
          <div className="tag inline-block mb-4 fade-up">Help Center</div>
          <h1 className="playfair text-5xl font-bold mb-4 fade-up opacity-0" style={{ animationDelay: '.1s' }}>
            Frequently Asked <span className="text-(--gold) italic">Questions</span>
          </h1>
          <p className="text-white/55 text-base mb-8 fade-up opacity-0" style={{ animationDelay: '.2s' }}>
            Find answers to the most common questions about MJ Dance Academy. Can't find what you need? <a href="/contact" className="text-(--gold) no-underline">Contact us directly.</a>
          </p>
          <div className="relative max-w-lg mx-auto fade-up opacity-0" style={{ animationDelay: '.3s' }}>
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold)" 
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="absolute left-3.5 top-3.5 w-5 h-5 text-white/30">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Categories */}
          <div className="flex gap-3 flex-wrap justify-center mb-12">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => setCurrentCat(cat)}
                className={`px-5 py-2 rounded-xl text-sm transition-colors cursor-pointer border ${currentCat === cat ? 'border-(--gold) text-(--gold) bg-[rgba(201,168,76,.08)]' : 'border-white/10 text-white/60 bg-transparent hover:border-(--gold) hover:text-(--gold) hover:bg-[rgba(201,168,76,.08)]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex flex-col gap-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((f, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={`rounded-2xl overflow-hidden bg-[rgba(28,28,40,.6)] border transition-all cursor-pointer ${isOpen ? 'border-[rgba(201,168,76,.4)] bg-[rgba(201,168,76,.06)]' : 'border-white/5 hover:border-[rgba(201,168,76,.25)]'}`} onClick={() => setOpenFaqIndex(isOpen ? null : idx)}>
                    <div className="flex items-center justify-between p-5 gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-full bg-[rgba(201,168,76,.1)] text-(--gold) whitespace-nowrap">{f.cat}</span>
                        <h3 className="font-semibold text-sm md:text-base leading-relaxed">{f.q}</h3>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`w-5 h-5 text-(--gold) shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-5 text-sm text-white/65 leading-relaxed border-t border-white/5 pt-4">
                        {f.a}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-white/50">No results found. <a href="/contact" className="text-(--gold) no-underline">Ask us directly →</a></p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- CONTACT CTA --- */}
      <section className="py-20 px-6 bg-[rgba(28,28,40,.3)]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">💬</div>
          <h2 className="playfair text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-white/50 mb-8">Our friendly team is here to help. Reach out anytime and we'll get back to you within a few hours.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/contact" className="btn-gold px-8 py-3 rounded-xl text-sm no-underline inline-block">Contact Us →</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[rgba(28,28,40,.6)] border border-white/5 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">📞</div>
              <div className="font-semibold mb-1">Call Us</div>
              <div className="text-sm text-white/40">+91 98765 43210</div>
              <div className="text-xs text-white/30 mt-1">Mon–Sat 9am–8pm</div>
            </div>
            <div className="bg-[rgba(28,28,40,.6)] border border-white/5 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">✉️</div>
              <div className="font-semibold mb-1">Email</div>
              <div className="text-sm text-white/40">hello@mjdance.com</div>
              <div className="text-xs text-white/30 mt-1">Reply within 4 hours</div>
            </div>
            <div className="bg-[rgba(28,28,40,.6)] border border-white/5 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">💬</div>
              <div className="font-semibold mb-1">WhatsApp</div>
              <div className="text-sm text-white/40">+91 98765 43210</div>
              <div className="text-xs text-white/30 mt-1">Chat anytime</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Faq;