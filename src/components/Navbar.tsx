import React, { useEffect, useState } from 'react';

// Exporting Session so we can use it in Home.tsx too!
export interface Session {
  name: string;
  email: string;
  role: string;
  loggedIn: boolean;
}

interface NavbarProps {
  activePage: string;
  session: Session | null;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, session }) => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('mj_session');
    localStorage.removeItem('mj_remember');
    window.location.href = '/login';
  };

  const navLinks = [
    { label: 'Home', href: '/', id: 'home' },
    { label: 'About', href: '/about', id: 'about' },
    { label: 'Courses', href: '/courses', id: 'courses' },
    { label: 'Contact', href: '/contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[rgba(201,168,76,.15)] backdrop-blur-xl ${scrolled ? 'bg-[rgba(10,10,15,.98)]' : 'bg-[rgba(10,10,15,.9)]'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 no-underline group">
          {/* Glowing Gold Ring Wrapper */}
          <div className="relative w-11 h-11 rounded-full p-0.5 bg-linear-to-br from-[#C9A84C] to-[#F0D080] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(201,168,76,.4)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
              {/* Replace 'src' with your actual image path (e.g., '/mj-logo.jpg' inside your public folder) */}
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
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(l => (
            <a 
              key={l.id} 
              href={l.href} 
              className={`no-underline text-sm font-medium transition-colors hover:text-(--gold) ${activePage === l.id ? 'text-(--gold)' : 'text-white/70'}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Auth / Profile Actions */}
        <div className="flex items-center gap-4">
          {session ? (
            <div className="relative hidden lg:block"> {/* <--- FIXED: Hidden on mobile! */}
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="flex items-center gap-2 bg-[rgba(201,168,76,.1)] border border-[rgba(201,168,76,.2)] px-3.5 py-2 rounded-full cursor-pointer text-white"
              >
                <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#C9A84C] to-[#F0D080] flex items-center justify-center text-xs font-bold text-[#0A0A0F]">
                  {session.name ? session.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-sm max-w-25 overflow-hidden text-ellipsis whitespace-nowrap">
                  {session.name || 'User'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3.5 h-3.5 text-white/50">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] bg-[#1C1C28] border border-[rgba(201,168,76,.15)] rounded-xl min-w-45 overflow-hidden shadow-2xl">
                  <div className="p-4 border-b border-white/5">
                    <div className="text-sm font-semibold text-white">{session.name || 'User'}</div>
                    <div className="text-xs text-white/40 capitalize">{session.role || 'student'}</div>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 bg-transparent border-none cursor-pointer hover:bg-red-400/10 transition-colors"
                  >
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <a href="/login" className="no-underline text-sm text-white/70 px-4 py-2 rounded-lg border border-white/10 transition-all hover:bg-white/5">Sign In</a>
              <a href="/signup" className="no-underline text-sm font-semibold text-[#0A0A0F] px-4.5 py-2 rounded-lg bg-linear-to-br from-[#C9A84C] to-[#F0D080] transition-transform hover:-translate-y-px">Join Now</a>
            </div>
          )}

          {/* Mobile Toggle Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden bg-transparent border-none text-white cursor-pointer ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full p-6 border-t border-[rgba(201,168,76,.1)] bg-[rgba(10,10,15,.98)] backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col mb-4">
            {[...navLinks].map(l => (
              <a 
                key={l.id} 
                href={l.href} 
                className={`block py-3 no-underline text-base border-b border-white/5 ${activePage === l.id ? 'text-(--gold) font-semibold' : 'text-white/70'}`}
              >
                {l.label}
              </a>
            ))}
          </div>
          
          {/* Mobile User Profile & Auth Section */}
          {session ? (
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#C9A84C] to-[#F0D080] flex items-center justify-center text-sm font-bold text-[#0A0A0F]">
                  {session.name ? session.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="text-base font-semibold text-white">{session.name || 'User'}</div>
                  <div className="text-xs text-(--gold) capitalize font-medium">{session.role || 'student'}</div>
                </div>
              </div>
              <button 
                onClick={handleLogout} 
                className="w-full text-center py-3 text-red-400 bg-red-400/10 rounded-xl border-none cursor-pointer text-sm font-semibold transition-colors hover:bg-red-400/20"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a href="/login" className="block text-center w-full py-3 text-white/70 border border-white/10 rounded-xl no-underline text-sm font-semibold">Sign In</a>
              <a href="/signup" className="block text-center w-full py-3 bg-linear-to-br from-[#C9A84C] to-[#F0D080] text-[#0A0A0F] font-bold rounded-xl no-underline text-sm">Join Now</a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;