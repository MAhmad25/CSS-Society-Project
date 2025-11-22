import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

export const Header = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const navigate = useNavigate();
      const { isAuthenticated, user, logout, isAdmin } = useAuth();

      const handleLogout = () => {
            logout();
            setIsMenuOpen(false);
            navigate("/");
      };

      return (
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                              <div className="w-9 h-9 bg-linear-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center">
                                    <img src="/images/logo.jpg" className="text-yellow-400 font-bold text-sm"></img>
                              </div>

                              {/* Desktop Navigation */}
                              <nav className="hidden md:flex items-center gap-8">
                                    <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
                                          Home
                                    </Link>
                                    <Link to="/events" className="text-gray-600 hover:text-gray-900 font-medium">
                                          Events
                                    </Link>
                                    <Link to="/announcements" className="text-gray-600 hover:text-gray-900 font-medium">
                                          News
                                    </Link>
                                    <Link to="/team" className="text-gray-600 hover:text-gray-900 font-medium">
                                          CSS Members
                                    </Link>
                              </nav>

                              {/* Auth Buttons */}
                              <div className="hidden md:flex items-center gap-3">
                                    {isAuthenticated ? (
                                          <>
                                                {isAdmin && (
                                                      <Link to="/admin" className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                                                            Admin Panel
                                                      </Link>
                                                )}
                                                <Link to="/profile" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2">
                                                      <User size={18} />
                                                      {user?.fullName}
                                                </Link>
                                                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-2">
                                                      <LogOut size={18} />
                                                      Logout
                                                </button>
                                          </>
                                    ) : (
                                          <>
                                                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2">
                                                      <LogIn size={18} />
                                                      Admin Login
                                                </Link>
                                          </>
                                    )}
                              </div>

                              {/* Mobile Menu Button */}
                              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600 hover:text-gray-900">
                                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                              </button>
                        </div>

                        {/* Mobile Menu */}
                        {isMenuOpen && (
                              <div className="md:hidden border-t border-gray-200/60 py-4">
                                    <nav className="space-y-3">
                                          <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                                                Home
                                          </Link>
                                          <Link to="/events" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                                                Events
                                          </Link>
                                          <Link to="/announcements" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                                                News
                                          </Link>
                                          <Link to="/team" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                                                Team
                                          </Link>

                                          <div className="border-t border-gray-200 pt-3 mt-3">
                                                {isAuthenticated ? (
                                                      <>
                                                            {isAdmin && (
                                                                  <Link to="/admin" className="block px-4 py-2 text-purple-600 font-medium hover:bg-purple-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                                                                        Admin Panel
                                                                  </Link>
                                                            )}
                                                            <Link to="/profile" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                                                                  Profile
                                                            </Link>
                                                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                                  Logout
                                                            </button>
                                                      </>
                                                ) : (
                                                      <>
                                                            <Link to="/login" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                                                                  Admin Login
                                                            </Link>
                                                      </>
                                                )}
                                          </div>
                                    </nav>
                              </div>
                        )}
                  </div>
            </header>
      );
};
