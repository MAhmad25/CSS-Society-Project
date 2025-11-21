import { Link } from "react-router-dom";

export const Footer = () => {
      return (
            <footer className="bg-gray-900 text-white py-16 px-6">
                  <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-4 gap-12 mb-12">
                              {/* About */}
                              <div>
                                    <div className="flex items-center gap-2 mb-4">
                                          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center overflow-hidden">
                                                <img src="/images/logo.jpg" alt="CSS GCU Logo" className="w-full h-full object-cover" />
                                          </div>
                                          <span className="font-bold text-lg">CSS GCU</span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">Empowering future technologists since 2002</p>
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
                                                <Link to="/events" className="hover:text-white transition-colors">
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

                              {/* Resources */}
                              <div>
                                    <h4 className="font-bold mb-4">Resources</h4>
                                    <ul className="space-y-2 text-gray-400 text-sm">
                                          <li>
                                                <Link to="/register" className="hover:text-white transition-colors">
                                                      Join CSS
                                                </Link>
                                          </li>
                                          <li>
                                                <Link to="/announcements" className="hover:text-white transition-colors">
                                                      Newsletters
                                                </Link>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white transition-colors">
                                                      Gallery
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white transition-colors">
                                                      FAQs
                                                </a>
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
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                              <p className="text-gray-400 text-sm">© 2025 Computer Science Society, GC University Lahore</p>
                              <p className="text-gray-400 text-sm">Crafted with 💙 by CSS Tech</p>
                        </div>
                  </div>
            </footer>
      );
};
