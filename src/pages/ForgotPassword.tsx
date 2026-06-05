import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset, verifyResetOtp, submitNewPassword } from '../services/api'; // <--- Import API

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  // --- State Management ---
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // --- Countdown Timer Effect ---
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // --- Handlers ---
  const handleSendOTP = async () => {
    setError(null);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setIsLoading(true);
    try {
      // 1. Call real backend API to send OTP
      await requestPasswordReset(email);
      
      setCurrentStep(2);
      setCountdown(60); // Start 60s countdown
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const verifyOTP = async () => {
    setError(null);
    const code = otp.join('');
    
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setIsLoading(true);
    try {
      // 2. Call real backend API to verify OTP
      await verifyResetOtp({ email, otp: code });
      setCurrentStep(3);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Invalid or expired code.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async () => {
    setError(null);
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const code = otp.join('');
      // 3. Call real backend API to set new password
      await submitNewPassword({ email, otp: code, newPassword });
      setCurrentStep(4);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setError(null);
    setOtp(['', '', '', '', '', '']);
    otpRefs.current[0]?.focus();
    
    try {
      await requestPasswordReset(email);
      setCountdown(60);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-(--dark) text-white">
      <div className="noise z-0"></div>

      {/* --- BACK TO HOME BUTTON --- */}
      <button 
        onClick={() => navigate('/login')}
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-white/50 hover:text-(--gold) transition-colors bg-transparent border-none cursor-pointer z-50 text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Login
      </button>

      {/* Background Orb */}
      <div className="absolute rounded-full filter blur-[100px] pointer-events-none w-100 h-100 -top-24 -right-24 bg-[rgba(201,168,76,.07)] z-0"></div>

      <div className="w-full max-w-md relative z-10 fade-up">
        
        <div className="text-center mb-8 flex justify-center">
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
            <span className="font-playfair font-bold text-2xl tracking-wide text-transparent bg-clip-text bg-linear-to-r from-[#C9A84C] via-white to-[#C9A84C] bg-size-[200%_auto] transition-all duration-1000 ease-out group-hover:bg-position-[-100%_center]">
              MJ Dance Academy
            </span>
          </button>
        </div>

        {/* --- STEP 1: EMAIL --- */}
        {currentStep === 1 && (
          <div className="card rounded-2xl p-8 bg-[rgba(28,28,40,.85)] border border-[rgba(201,168,76,.15)] backdrop-blur-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[rgba(201,168,76,.1)] border border-[rgba(201,168,76,.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-(--gold)">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                </svg>
              </div>
              <h2 className="playfair text-3xl font-bold text-white mb-2">Forgot Password?</h2>
              <p className="text-white/50 text-sm leading-relaxed">No worries! Enter your registered email and we'll send a reset code.</p>
            </div>
            
            {error && <div className="mb-4 p-3 rounded-lg text-sm bg-red-400/10 border border-red-400/30 text-red-400">{error}</div>}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  placeholder="your@email.com" 
                  className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30"
                />
              </div>
              <button onClick={handleSendOTP} disabled={isLoading} className="btn-gold w-full py-3 rounded-xl text-sm border-none disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? 'Sending...' : 'Send Reset Code →'}
              </button>
              <button onClick={() => navigate('/login')} className="block w-full text-center text-sm text-white/50 hover:text-white transition-colors bg-transparent border-none cursor-pointer mt-4">
                ← Back to Sign In
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 2: OTP --- */}
        {currentStep === 2 && (
          <div className="card rounded-2xl p-8 bg-[rgba(28,28,40,.85)] border border-[rgba(201,168,76,.15)] backdrop-blur-xl fade-up">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[rgba(201,168,76,.1)] border border-[rgba(201,168,76,.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-(--gold)">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                </svg>
              </div>
              <h2 className="playfair text-3xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-white/50 text-sm">We sent a 6-digit code to <span className="text-(--gold)">{email}</span></p>
            </div>
            
            {error && <div className="mb-4 p-3 rounded-lg text-sm bg-red-400/10 border border-red-400/30 text-red-400">{error}</div>}
            
            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, idx) => (
                <input 
                  key={idx}
                  ref={(el) => {
                    otpRefs.current[idx] = el;
                  }}
                  type="text" 
                  maxLength={1} 
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="w-13 h-13 text-center text-xl font-bold bg-white/5 border border-[rgba(201,168,76,.2)] text-white rounded-xl focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.1)] transition-all"
                />
              ))}
            </div>
            <button onClick={verifyOTP} disabled={isLoading} className="btn-gold w-full py-3 rounded-xl text-sm mb-4 border-none disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? 'Verifying...' : 'Verify Code →'}
            </button>
            <p className="text-center text-sm text-white/50">
              Didn't receive?{' '}
              {countdown > 0 ? (
                <span className="text-white/30 ml-1">Wait {countdown}s</span>
              ) : (
                <button onClick={resendOTP} className="text-(--gold) bg-transparent border-none cursor-pointer font-inherit p-0 ml-1 hover:underline">Resend code</button>
              )}
            </p>
          </div>
        )}

        {/* --- STEP 3: NEW PASSWORD --- */}
        {currentStep === 3 && (
          <div className="card rounded-2xl p-8 bg-[rgba(28,28,40,.85)] border border-[rgba(201,168,76,.15)] backdrop-blur-xl fade-up">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-green-400/10 border border-green-400/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-green-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 className="playfair text-3xl font-bold text-white mb-2">Set New Password</h2>
              <p className="text-white/50 text-sm">Choose a strong password for your account</p>
            </div>
            
            {error && <div className="mb-4 p-3 rounded-lg text-sm bg-red-400/10 border border-red-400/30 text-red-400">{error}</div>}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => { setNewPassword(e.target.value); setError(null); }}
                  placeholder="Min. 8 characters" 
                  className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(null); }}
                  placeholder="Re-enter password" 
                  className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30"
                />
              </div>
              <button onClick={resetPassword} disabled={isLoading} className="btn-gold w-full py-3 rounded-xl text-sm border-none mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? 'Updating...' : 'Reset Password ✓'}
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 4: SUCCESS --- */}
        {currentStep === 4 && (
          <div className="card rounded-2xl p-8 bg-[rgba(28,28,40,.85)] border border-[rgba(201,168,76,.15)] backdrop-blur-xl text-center fade-up">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-linear-to-br from-[#C9A84C] to-[#F0D080]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="playfair text-3xl font-bold text-white mb-3">Password Reset!</h2>
            <p className="text-white/50 mb-8">Your password has been reset successfully. You can now sign in with your new password.</p>
            <button onClick={() => navigate('/login')} className="btn-gold block w-full py-3 rounded-xl text-sm text-center border-none cursor-pointer">
              Go to Sign In →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;