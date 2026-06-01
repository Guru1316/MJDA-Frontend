import React, { useState, useEffect } from 'react';
import Navbar, { type Session } from '../components/Navbar';
import Footer from '../components/Footer';

const Terms: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const storedSession = sessionStorage.getItem('mj_session');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedSession) setSession(JSON.parse(storedSession));
  }, []);

  return (
    <>
      <div className="noise z-0"></div>
      <Navbar activePage="terms" session={session} />

      {/* --- HERO --- */}
      <section className="pt-32 pb-12 px-6 text-center bg-linear-to-b from-[#12121A] to-[#0A0A0F]">
        <div className="max-w-2xl mx-auto">
          <div className="tag inline-block mb-4">Legal</div>
          <h1 className="playfair text-5xl font-bold mb-4">Terms & <span className="text-(--gold) italic">Conditions</span></h1>
          <p className="text-white/50 text-sm">Last updated: January 1, 2025 · Effective: January 1, 2025</p>
        </div>
      </section>

      {/* --- CONTENT --- */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-white/65 text-sm md:text-base leading-relaxed">
          
          <div className="bg-[rgba(201,168,76,.05)] border border-[rgba(201,168,76,.15)] border-l-4 border-l-(--gold) rounded-lg p-5 mb-10 text-white">
            <strong className="text-(--gold) block mb-2">Agreement Summary</strong>
            <p>By using MJ Dance Academy's website, platform, and services, you agree to these Terms and Conditions. Please read them carefully before creating an account or enrolling in classes.</p>
          </div>

          <div className="mb-10">
            <h2 className="playfair text-2xl font-bold text-(--gold) mb-4 pb-2 border-b border-[rgba(201,168,76,.15)]">1. Acceptance of Terms</h2>
            <p className="mb-3">By accessing or using the MJ Dance Academy website, mobile application, or any of our services (collectively, the "Platform"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Platform.</p>
            <p>These Terms apply to all users, including students, parents/guardians, instructors, administrators, and visitors. MJ Dance Academy reserves the right to update or modify these Terms at any time without prior notice. Your continued use of the Platform after any changes constitutes acceptance of the new Terms.</p>
          </div>

          <div className="mb-10">
            <h2 className="playfair text-2xl font-bold text-(--gold) mb-4 pb-2 border-b border-[rgba(201,168,76,.15)]">2. Account Registration and Responsibility</h2>
            <p className="mb-3"><strong className="text-white">2.1 Account Creation:</strong> To access certain features (e.g., enrolling in classes, tracking progress), you must create an account. You agree to provide accurate, current, and complete information during registration and to update it promptly if changes occur.</p>
            <p className="mb-3"><strong className="text-white">2.2 Account Security:</strong> You are solely responsible for maintaining the confidentiality of your password and for all activities that occur under your account. Notify us immediately at security@mjdance.com if you suspect unauthorized access.</p>
            <p className="mb-3"><strong className="text-white">2.3 Age Requirements:</strong> Users under 13 must have a parent or guardian create and manage their account. Users under 18 should review these Terms with a parent or guardian.</p>
            <p><strong className="text-white">2.4 Account Termination:</strong> MJ Dance Academy reserves the right to suspend or terminate accounts that violate these Terms, including providing false information, harassing others, or abusing our Platform.</p>
          </div>

          <div className="mb-10">
            <h2 className="playfair text-2xl font-bold text-(--gold) mb-4 pb-2 border-b border-[rgba(201,168,76,.15)]">3. Course Enrollments and Payments</h2>
            <p className="mb-3"><strong className="text-white">3.1 Enrollment Process:</strong> Enrollments are confirmed only after payment is successfully processed. You will receive a confirmation email with class details and schedule.</p>
            <p className="mb-3"><strong className="text-white">3.2 Fees and Payments:</strong> All fees are listed in Indian Rupees (INR) and include applicable taxes. We accept payments via UPI, credit/debit cards, net banking, and cash at our studio. EMI options are available for annual plans.</p>
            <p className="mb-2"><strong className="text-white">3.3 Refund and Cancellation Policy:</strong></p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Withdrawal within 7 days of enrollment: 100% refund</li>
              <li>Withdrawal between 7–30 days: 50% refund</li>
              <li>After 30 days: Non-refundable (credits may be issued for medical emergencies)</li>
              <li>Refunds are processed within 14 business days to the original payment method</li>
            </ul>
            <p className="mb-3"><strong className="text-white">3.4 Class Rescheduling:</strong> You may reschedule a class with at least 24 hours notice. Late cancellations or no-shows will be counted as attended.</p>
            <p><strong className="text-white">3.5 Batch Changes:</strong> Students may request a batch change once per enrollment period, subject to availability. Fees differences will be adjusted accordingly.</p>
          </div>

          <div className="mb-10">
            <h2 className="playfair text-2xl font-bold text-(--gold) mb-4 pb-2 border-b border-[rgba(201,168,76,.15)]">4. Code of Conduct</h2>
            <p className="mb-3">MJ Dance Academy is committed to providing a safe, respectful, and inclusive environment for all. By using our Platform and attending our classes, you agree to:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Treat all instructors, staff, and fellow students with respect and courtesy</li>
              <li>Refrain from any form of harassment, discrimination, bullying, or inappropriate behavior</li>
              <li>Follow studio safety guidelines and instructor directions during classes</li>
              <li>Not record or photograph classes without explicit permission from instructors and fellow students</li>
              <li>Avoid disruptive behavior that interferes with the learning experience of others</li>
            </ul>
            <p>Violations of the Code of Conduct may result in immediate suspension or termination of your account without refund, at the sole discretion of MJ Dance Academy management.</p>
          </div>

          <div className="mb-10">
            <h2 className="playfair text-2xl font-bold text-(--gold) mb-4 pb-2 border-b border-[rgba(201,168,76,.15)]">5. Health and Safety Disclaimer</h2>
            <p className="mb-2"><strong className="text-white">Physical Activity Warning:</strong> Dance classes involve physical exertion that may pose risks of injury. By enrolling in any class, you acknowledge that:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>You are physically capable of participating in the chosen dance style</li>
              <li>You will inform the instructor of any medical conditions, injuries, or limitations before class</li>
              <li>You participate at your own risk and will not hold MJ Dance Academy liable for injuries sustained during classes</li>
              <li>You are responsible for using proper form and technique to minimize injury risk</li>
            </ul>
            <p><strong className="text-white">Medical Clearance:</strong> If you have any pre-existing medical conditions (heart conditions, back problems, joint issues, pregnancy, recent surgery, etc.), we strongly recommend consulting a physician before participating in any dance classes.</p>
          </div>

          <div className="mb-10">
            <h2 className="playfair text-2xl font-bold text-(--gold) mb-4 pb-2 border-b border-[rgba(201,168,76,.15)]">6. Intellectual Property</h2>
            <p className="mb-3"><strong className="text-white">6.1 Our Content:</strong> All content on the MJ Dance Academy Platform, including but not limited to text, graphics, logos, images, videos, course materials, choreography, and software, is the property of MJ Dance Academy or our licensors and is protected by Indian and international copyright laws.</p>
            <p className="mb-3"><strong className="text-white">6.2 Limited License:</strong> We grant you a non-exclusive, non-transferable, revocable license to access and use our Platform for personal, non-commercial purposes only.</p>
            <p className="mb-3"><strong className="text-white">6.3 Prohibited Uses:</strong> You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any content from our Platform without our express written permission.</p>
            <p><strong className="text-white">6.4 User Content:</strong> By posting or sharing content (e.g., performance videos, comments) on our Platform, you grant MJ Dance Academy a worldwide, royalty-free license to use, display, and promote that content in connection with our services.</p>
          </div>

          <div className="mb-10">
            <h2 className="playfair text-2xl font-bold text-(--gold) mb-4 pb-2 border-b border-[rgba(201,168,76,.15)]">7. Limitation of Liability</h2>
            <p className="mb-3">To the maximum extent permitted by law, MJ Dance Academy and its owners, instructors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Your use or inability to use our Platform</li>
              <li>Any conduct or content of any third party on our Platform</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              <li>Injuries sustained during dance classes or related activities</li>
            </ul>
            <p>Our total liability to you for any claims arising out of or relating to these Terms or your use of our Platform shall not exceed the amount you paid to us in the past twelve months.</p>
          </div>

          <div className="mb-10">
            <h2 className="playfair text-2xl font-bold text-(--gold) mb-4 pb-2 border-b border-[rgba(201,168,76,.15)]">8. Indemnification</h2>
            <p className="mb-3">You agree to indemnify, defend, and hold harmless MJ Dance Academy, its affiliates, instructors, and employees from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your violation of these Terms</li>
              <li>Your use of our Platform or participation in classes</li>
              <li>Your violation of any third-party rights, including intellectual property or privacy rights</li>
              <li>Any injury or damage caused by your actions during classes or events</li>
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="playfair text-2xl font-bold text-(--gold) mb-4 pb-2 border-b border-[rgba(201,168,76,.15)]">9. Miscellaneous</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Jurisdiction lies exclusively in the courts of Chennai, Tamil Nadu.</li>
              <li><strong className="text-white">Entire Agreement:</strong> These Terms constitute the entire agreement between you and MJ Dance Academy regarding your use of the Platform.</li>
              <li><strong className="text-white">Severability:</strong> If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.</li>
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="playfair text-2xl font-bold text-(--gold) mb-4 pb-2 border-b border-[rgba(201,168,76,.15)]">10. Contact Us</h2>
            <div className="bg-[rgba(201,168,76,.05)] border border-[rgba(201,168,76,.15)] border-l-4 border-l-(--gold) rounded-lg p-5 text-white">
              <strong className="text-(--gold) block mb-2">Questions About These Terms?</strong>
              <p className="mb-3">If you have any questions, concerns, or requests regarding these Terms and Conditions, please contact us at:</p>
              <p><strong>MJ Dance Academy</strong><br/>123 Anna Salai, T. Nagar<br/>Chennai – 600017, Tamil Nadu<br/>📧 legal@mjdance.com<br/>📞 +91 98765 43210</p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Terms;