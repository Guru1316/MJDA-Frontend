import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; // <-- Backend API import

const Login: React.FC = () => {
  const navigate = useNavigate();

  // --- State Management ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // // --- Auto-Login Check ---
  // useEffect(() => {
  //   const rem = localStorage.getItem('mj_remember');
  //   if (rem) {
  //     try {
  //       const r = JSON.parse(rem);
  //       if (r.role === 'admin') {
  //         localStorage.removeItem('mj_remember');
  //         sessionStorage.removeItem('mj_session');
  //       } else {
  //         sessionStorage.setItem('mj_session', JSON.stringify(r));
  //         navigate('/', { replace: true });
  //       }
  //     } catch (e) {
  //       console.error('Failed to parse remember me token', e);
  //     }
  //   }
  // }, [navigate]);

  // --- Handlers ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Call the real backend API!
      const data = await loginUser({ email, password });

      const session = { 
        email: data.email, 
        name: data.name, 
        role: data.role || 'student', 
        token: data.token, // Store JWT token
        loggedIn: true 
      };
      
      sessionStorage.setItem('mj_session', JSON.stringify(session));
      
      if (remember && data.role !== 'admin') {
        localStorage.setItem('mj_remember', JSON.stringify(session));
      }

      if (data.role === 'admin') {
        navigate('/admin', { replace: true }); 
      } else {
        navigate('/', { replace: true });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again or Sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-(--dark) text-white relative overflow-x-hidden">
      <div className="noise z-0"></div>

      {/* --- BACK TO HOME BUTTON --- */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-white/50 hover:text-(--gold) transition-colors bg-transparent border-none cursor-pointer z-50 text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>

      {/* Background Orbs */}
      <div className="absolute rounded-full filter blur-[80px] pointer-events-none w-96 h-96 -top-20 -left-20 opacity-10 bg-(--gold) z-0"></div>
      <div className="absolute rounded-full filter blur-[80px] pointer-events-none w-80 h-80 -bottom-12 -right-12 opacity-10 bg-[#6c4ef7] z-0"></div>

      {/* --- LEFT PANEL (Desktop) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center p-16 bg-linear-to-br from-[#0A0A0F] via-[#1C1C28] to-[#0A0A0F] z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-px h-64 opacity-20 bg-linear-to-b from-transparent via-(--gold) to-transparent"></div>
          <div className="absolute top-40 right-20 w-px h-48 opacity-20 bg-linear-to-b from-transparent via-(--gold) to-transparent"></div>
          <div className="absolute bottom-20 left-1/3 w-px h-56 opacity-20 bg-linear-to-b from-transparent via-(--gold) to-transparent"></div>
          
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-5 border border-(--gold)"></div>
          <div className="absolute top-1/3 right-1/3 w-40 h-40 rounded-full opacity-5 border border-(--gold)"></div>
        </div>

        <div className="text-center z-10 animate-[float_4s_ease-in-out_infinite]">
          <div className="relative w-28 h-28 rounded-full p-1 bg-linear-to-br from-[#C9A84C] to-[#F0D080] shadow-[0_0_60px_rgba(201,168,76,.3)] mx-auto mb-6">
            <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
              <img 
                src="logo.png" 
                alt="MJ Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="playfair text-5xl font-bold text-white mb-2">MJ Dance</h1>
          <h1 className="playfair text-5xl font-bold mb-4 text-(--gold)">Academy</h1>
          <p className="text-white/50 text-lg max-w-xs mx-auto leading-relaxed">Where Every Step Tells a Story. Begin Your Journey Today.</p>
        </div>

        <div className="mt-16 z-10 w-full max-w-sm">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-[rgba(201,168,76,.08)] border border-[rgba(201,168,76,.15)]">
              <div className="text-2xl font-bold text-(--gold)">500+</div>
              <div className="text-white/50 text-xs mt-1">Students</div>
            </div>
            <div className="p-4 rounded-xl bg-[rgba(201,168,76,.08)] border border-[rgba(201,168,76,.15)]">
              <div className="text-2xl font-bold text-(--gold)">20+</div>
              <div className="text-white/50 text-xs mt-1">Instructors</div>
            </div>
            <div className="p-4 rounded-xl bg-[rgba(201,168,76,.08)] border border-[rgba(201,168,76,.15)]">
              <div className="text-2xl font-bold text-(--gold)">15+</div>
              <div className="text-white/50 text-xs mt-1">Dance Styles</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT PANEL (Form) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 z-10">
        <div className="w-full max-w-md">
          
          <div className="lg:hidden text-center mb-8 fade-up">
            <div className="relative w-16 h-16 rounded-full p-0.5 bg-linear-to-br from-[#C9A84C] to-[#F0D080] mx-auto mb-3 shadow-[0_0_20px_rgba(201,168,76,.4)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img 
                  src="logo.png" 
                  alt="MJ Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h1 className="playfair text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#C9A84C] via-white to-[#C9A84C] bg-size-[200%_auto]">
              MJ Dance Academy
            </h1>
          </div>

          <div className="card rounded-2xl p-8 lg:p-10 fade-up">
            <div className="mb-8 hidden lg:block">
              <h2 className="playfair text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-white/50">Sign in to continue your dance journey</p>
            </div>
            <div className="mb-8 lg:hidden text-center">
              <h2 className="playfair text-2xl font-bold text-white mb-1">Welcome Back</h2>
              <p className="text-white/50 text-sm">Sign in to continue your dance journey</p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm bg-red-400/10 border border-red-400/30 text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="fade-up" style={{ animationDelay: '.1s', opacity: 0 }}>
                <label className="block text-sm text-white/60 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  placeholder="you@example.com" 
                  className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all placeholder-white/30" 
                  required 
                />
              </div>

              <div className="fade-up" style={{ animationDelay: '.2s', opacity: 0 }}>
                <label className="block text-sm text-white/60 mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(null); }}
                    placeholder="Enter your password" 
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-[rgba(201,168,76,.2)] text-white focus:outline-none focus:border-(--gold) focus:bg-[rgba(201,168,76,.08)] transition-all pr-12 placeholder-white/30" 
                    required 
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-3 text-white/40 hover:text-(--gold) transition-colors bg-transparent border-none cursor-pointer" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between fade-up" style={{ animationDelay: '.3s', opacity: 0 }}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded cursor-pointer" 
                    style={{ accentColor: 'var(--gold)' }} 
                  />
                  <span className="text-white/60 text-sm">Remember me</span>
                </label>
                <button type="button" onClick={() => navigate('/forgot-password')} className="text-sm transition-colors text-(--gold) hover:text-[#F0D080] bg-transparent border-none cursor-pointer p-0 font-inherit">
                  Forgot Password?
                </button>
              </div>

              <div className="fade-up" style={{ animationDelay: '.4s', opacity: 0 }}>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn-gold w-full py-3 rounded-xl text-sm tracking-wide border-none disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign In to Dashboard'}
                </button>
              </div>
            </form>

            <div className="relative text-center my-6 text-white/30 text-xs flex items-center justify-center">
              <div className="absolute left-0 w-[42%] h-px bg-linear-to-r from-transparent to-[rgba(201,168,76,.3)]"></div>
              <span className="bg-[rgba(28,28,40,.8)] px-2 z-10">OR</span>
              <div className="absolute right-0 w-[42%] h-px bg-linear-to-l from-transparent to-[rgba(201,168,76,.3)]"></div>
            </div>

            <p className="text-center text-white/50 text-sm mt-6">
              Don't have an account?{' '}
              <button onClick={() => navigate('/signup')} className="font-medium transition-colors text-(--gold) hover:text-[#F0D080] bg-transparent border-none cursor-pointer p-0 font-inherit hover:underline">
                Sign Up Free
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;