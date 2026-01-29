import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 overflow-hidden px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/images/logo.jpg"
                  alt="CSS GCU Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-lg">CSS GCU</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering future technologists since 2002
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="hover:text-white transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-white transition-colors">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>GC University Lahore</li>
              <li>Katchery Road</li>
              <li>css@gcu.edu.pk</li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link
                  to="/announcements"
                  className="hover:text-white transition-colors"
                >
                  Newsletters
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-full  flex flex-col overflow-hidden md:overflow-visible  md:flex-row justify-between items-center   gap-4">
          <h1 className="absolute text-3xl md:text-7xl left-1/2 -translate-x-1/2 bottom-0 translate-y-6 bg-[#101828] text-nowrap uppercase text-gray-600">
            Computer Science Society
          </h1>
          <h1 className="absolute text-3xl md:text-7xl left-1/2 -translate-x-1/2 bottom-0 translate-y-12 bg-[#101828] text-nowrap uppercase text-gray-400">
            Computer Science Society
          </h1>
          <h1 className="absolute text-3xl font-Regular md:text-7xl left-1/2 -translate-x-1/2 bg-[#101828]  translate-y-20 uppercase text-nowrap bottom-0">
            Computer Science Society
          </h1>
        </div>
      </div>
    </footer>
  );
};
