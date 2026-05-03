import Link from "next/link";
import { FiInstagram, FiFacebook, FiYoutube, FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Book a Session" },
  { href: "/admin", label: "Admin" },
];

const services = [
  "Wedding Photography",
  "Portrait Sessions",
  "Fashion Shoots",
  "Baby Photography",
  "Product Photography",
  "Candid Coverage",
];

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                <span className="text-stone-950 font-serif font-bold text-sm">P</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-stone-50">Parichay</span>
                <p className="text-[10px] text-stone-400 tracking-[0.2em] uppercase">Photography</p>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Crafting timeless visual stories across Bangalore. Every frame, a memory. Every moment, a masterpiece.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-stone-700 rounded-full flex items-center justify-center text-stone-400 hover:border-amber-500 hover:text-amber-400 transition-all duration-300 hover:scale-110"
              >
                <FiInstagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-stone-700 rounded-full flex items-center justify-center text-stone-400 hover:border-amber-500 hover:text-amber-400 transition-all duration-300 hover:scale-110"
              >
                <FiFacebook size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-stone-700 rounded-full flex items-center justify-center text-stone-400 hover:border-amber-500 hover:text-amber-400 transition-all duration-300 hover:scale-110"
              >
                <FiYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-stone-50 font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-400 text-sm hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-stone-600 group-hover:bg-amber-400 group-hover:w-6 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-stone-50 font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s} className="text-stone-400 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-stone-50 font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Studio
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-stone-400 text-sm leading-relaxed">
                  12, Indiranagar 100 Feet Road,<br />
                  Bengaluru, Karnataka 560038
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone size={16} className="text-amber-500 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-stone-400 text-sm hover:text-amber-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail size={16} className="text-amber-500 flex-shrink-0" />
                <a href="mailto:hello@parichayphotography.in" className="text-stone-400 text-sm hover:text-amber-400 transition-colors">
                  hello@parichayphotography.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-xs">
            © {new Date().getFullYear()} Parichay Photography. All rights reserved.
          </p>
          <p className="text-stone-600 text-xs">
            Crafted with ♥ in Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
