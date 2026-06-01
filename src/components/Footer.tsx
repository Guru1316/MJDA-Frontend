import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-(--dark2) border-t border-[rgba(201,168,76,.1)] pt-16 px-6 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#C9A84C] to-[#F0D080] flex items-center justify-center">
                <span className="playfair font-bold text-[#0A0A0F]">MJ</span>
              </div>
              <span className="playfair font-bold text-lg">MJ Dance Academy</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-70">
              Chennai's premier dance school. Inspiring movement, empowering artists, building community since 2010.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-4 text-(--gold) text-sm tracking-wider uppercase">Quick Links</div>
            {/* Using explicit objects for exact routing paths */}
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'FAQ', path: '/faq' },
              { name: 'Contact Us', path: '/contact' }
            ].map((link) => (
              <a key={link.name} href={link.path} className="block text-sm text-white/50 no-underline mb-2 transition-colors hover:text-(--gold)">
                {link.name}
              </a>
            ))}
          </div>
          <div>
            <div className="font-semibold mb-4 text-(--gold) text-sm tracking-wider uppercase">Legal</div>
            <a href="/privacy" className="block text-sm text-white/50 no-underline mb-2 transition-colors hover:text-(--gold)">Privacy Policy</a>
            <a href="/terms" className="block text-sm text-white/50 no-underline mb-2 transition-colors hover:text-(--gold)">Terms & Conditions</a>
          </div>
          <div>
            <div className="font-semibold mb-4 text-(--gold) text-sm tracking-wider uppercase">Contact</div>
            <p className="text-sm text-white/50 mb-2">📍 123 Anna Salai, Chennai</p>
            <p className="text-sm text-white/50 mb-2">📞 +91 98765 43210</p>
            <p className="text-sm text-white/50">✉️ hello@mjdance.com</p>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 text-center text-sm text-white/30">
          © {new Date().getFullYear()} MJ Dance Academy. All rights reserved. Made with ❤️ in Chennai.
        </div>
      </div>
    </footer>
  );
};

export default Footer;