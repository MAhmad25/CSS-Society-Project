import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// Pages
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Events } from "./pages/Events";
import { Announcements } from "./pages/Announcements";
import { Team } from "./pages/Team";
import { Profile } from "./pages/Profile";
import { AdminDashboard } from "./pages/AdminDashboard";

export default function App() {
      return (
            <Router>
                  <AuthProvider>
                        <div className="flex flex-col min-h-screen">
                              <Header />
                              <main className="grow">
                                    <Routes>
                                          {/* Public Routes */}
                                          <Route path="/" element={<Home />} />
                                          <Route path="/login" element={<Login />} />
                                          <Route path="/events" element={<Events />} />
                                          <Route path="/announcements" element={<Announcements />} />
                                          <Route path="/team" element={<Team />} />

                                          {/* Protected Routes */}
                                          <Route
                                                path="/profile"
                                                element={
                                                      <ProtectedRoute>
                                                            <Profile />
                                                      </ProtectedRoute>
                                                }
                                          />

                                          {/* Admin Routes */}
                                          <Route
                                                path="/admin"
                                                element={
                                                      <ProtectedRoute requireAdmin>
                                                            <AdminDashboard />
                                                      </ProtectedRoute>
                                                }
                                          />
                                          <Route path="*" element={<Navigate to="/" replace />} />
                                    </Routes>
                              </main>
                              <Footer />
                        </div>
                  </AuthProvider>
            </Router>
      );
}
