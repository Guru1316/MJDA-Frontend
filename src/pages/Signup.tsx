import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; // <-- Backend API import

const Signup: React.FC = () => {
  const navigate = useNavigate();
  
  // --- Get today's date to block future DOB selection ---
  const maxDate = new Date().toISOString().split('T')[0];

  // --- State Management (Persisted with SessionStorage) ---
  const [currentStep, setCurrentStep] = useState<1 | 2>(() => {
    const savedStep = sessionStorage.getItem('mj_signup_step');
    return savedStep ? JSON.parse(savedStep) : 1;
  });

  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem('mj_signup_data');
    return savedData ? JSON.parse(savedData) : {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    };
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // --- Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => {
      const newData = { ...prev, [name]: val };
      sessionStorage.setItem('mj_signup_data', JSON.stringify(newData));
      return newData;
    });
    setError(null);
  };

  const nextStep = () => {
    setError(null);
    const { firstName, lastName, email, dob } = formData;
    
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !dob) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    
    setCurrentStep(2);
    sessionStorage.setItem('mj_signup_step', JSON.stringify(2));
  };

  const prevStep = () => {
    setError(null);
    setCurrentStep(1);
    sessionStorage.setItem('mj_signup_step', JSON.stringify(1));
  };

  const calculateStrength = (pwd: string) => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };

  const handleSignup = async () => {
    setError(null);
    const { password, confirmPassword, agreeTerms, email, firstName, lastName, phone, dob, gender } = formData;

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms & Conditions.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the real backend API!
      const data = await registerUser({
        firstName, lastName, email, phone, dob, gender, password
      });
      
      const session = { 
        email: data.email, 
        name: data.name, 
        role: data.role, 
        token: data.token, // Store JWT token
        loggedIn: true 
      };
      
      sessionStorage.setItem('mj_session', JSON.stringify(session));
      
      // Clear temp storage
      sessionStorage.removeItem('mj_signup_step');
      sessionStorage.removeItem('mj_signup_data');
      
      setSuccess('Account created successfully! Redirecting...');
      
      setTimeout(() => {
        navigate('/', { replace: true }); 
      }, 1500);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pwdStrength = calculateStrength(formData.password);
  const colors = ['#ff6b6b', '#ffa94d', '#F0D080', '#4ade80'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const activeColor = pwdStrength > 0 ? colors[pwdStrength - 1] : 'rgba(255,255,255,.4)';
  const activeLabel = pwdStrength > 0 ? labels[pwdStrength - 1] : 'Password strength';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 relative overflow-hidden bg-(--dark)">
      
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-white/50 hover:text-(--gold) transition-colors bg-transparent border-none cursor-pointer z-20 text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>

      <div className="noise"></div>
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full bg-[#6c4ef7] blur-[100px] opacity-10 pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-80 h-80 rounded-full bg-(--gold) blur-[100px] opacity-10 pointer-events-none z-0"></div>

      <div className="w-full max-w-2xl relative z-10">
        
        <div className="text-center mb-8 fade-up flex justify-center">
          <button onClick={() => navigate('/login')} className="flex items-center gap-3 no-underline group bg-transparent border-none cursor-pointer">
            <div className="relative w-11 h-11 rounded-full p-0.5 bg-linear-to-br from-[#C9A84C] to-[#F0D080] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(201,168,76,.4)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img 
                  src="logo.png" 
                  alt="MJ Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="font-playfair font-bold text-2xl tracking-wide text-white transition-all duration-500 group-hover:text-[#F0D080] group-hover:drop-shadow-[0_0_12px_rgba(201,168,76,0.6)]">
              MJ Dance Academy
            </span>
          </button>
        </div>

        <div className="card rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="playfair text-3xl font-bold text-white mb-2">Create Your Account</h2>
            <p className="text-white/50">Join 500+ students already dancing with us</p>
          </div>

          <div className="flex items-center gap-2 mb-8 max-w-md mx-auto">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-400 ${currentStep > 1 ? 'bg-[rgba(201,168,76,.2)] text-(--gold) border border-(--gold)' : 'bg-linear-to-br from-[#C9A84C] to-[#F0D080] text-[#0A0A0F]'}`}>
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <div className={`flex-1 h-px transition-colors duration-400 ${currentStep > 1 ? 'bg-(--gold)' : 'bg-[rgba(201,168,76,.2)]'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-400 ${currentStep === 2 ? 'bg-linear-to-br from-[#C9A84C] to-[#F0D080] text-[#0A0A0F]' : 'bg-white/5 text-white/30 border border-white/10'}`}>
              2
            </div>
          </div>
          <div className="flex justify-between text-xs text-white/40 mb-8 -mt-5 max-w-md mx-auto">
            <span>Personal Info</span>
            <span>Security</span>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm bg-red-400/10 border border-red-400/30 text-red-400">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg text-sm bg-green-400/10 border border-green-400/30 text-green-400">
              {success}
            </div>
          )}

          {currentStep === 1 && (
            <div className="fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-white/60 mb-2">First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Michael" className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30" required />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Jackson" className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30" required />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30" required />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30" />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Date of Birth *</label>
                  <input type="date" name="dob" max={maxDate} value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all" style={{ colorScheme: 'dark' }} required />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all [&>option]:bg-[#1C1C28]">
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              <button onClick={nextStep} className="btn-gold w-full py-3 rounded-xl mt-6 text-sm tracking-wide border-none">Continue →</button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="fade-up">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Create Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      name="password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      placeholder="Min. 8 characters" 
                      className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all pr-12 placeholder-white/30" 
                    />
                    <button type="button" className="absolute right-3 top-3 text-white/40 hover:text-(--gold) transition-colors bg-transparent border-none cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div key={level} className="h-1 rounded-sm flex-1 transition-colors duration-400" style={{ background: level <= pwdStrength ? colors[pwdStrength - 1] : 'rgba(255,255,255,.1)' }}></div>
                    ))}
                  </div>
                  <div className="text-xs mt-1 transition-colors duration-300" style={{ color: activeColor }}>{activeLabel}</div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input 
                      type={showConfirm ? 'text' : 'password'} 
                      name="confirmPassword" 
                      value={formData.confirmPassword} 
                      onChange={handleChange} 
                      placeholder="Re-enter your password" 
                      className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all pr-12 placeholder-white/30" 
                    />
                    <button type="button" className="absolute right-3 top-3 text-white/40 hover:text-(--gold) transition-colors bg-transparent border-none cursor-pointer" onClick={() => setShowConfirm(!showConfirm)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mt-1 w-4 h-4 cursor-pointer" style={{ accentColor: 'var(--gold)' }} />
                  <span className="text-white/50 text-sm">I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-(--gold) bg-transparent border-none cursor-pointer p-0 font-inherit hover:underline no-underline">Terms & Conditions</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-(--gold) bg-transparent border-none cursor-pointer p-0 font-inherit hover:underline no-underline">Privacy Policy</a></span>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={prevStep} className="flex-1 py-3 rounded-xl text-sm border border-white/10 text-white/60 bg-transparent hover:bg-white/5 transition-colors cursor-pointer">← Back</button>
                <button onClick={handleSignup} disabled={isSubmitting} className="btn-gold flex-1 py-3 rounded-xl text-sm border-none disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Creating account...' : 'Create Account 🎉'}
                </button>
              </div>
            </div>
          )}

          <p className="text-center text-white/50 text-sm mt-6">Already have an account? <button onClick={() => navigate('/login')} className="text-(--gold) font-medium bg-transparent border-none cursor-pointer p-0 font-inherit hover:underline">Sign In</button></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;