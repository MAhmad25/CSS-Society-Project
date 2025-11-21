import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, AlertCircle, Loader } from "lucide-react";
import { useAuth } from "../context/useAuth";

export const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const { login } = useAuth();

      const handleSubmit = async (e) => {
            e.preventDefault();
            setError("");
            setLoading(true);

            if (!email || !password) {
                  setError("Please fill in all fields");
                  setLoading(false);
                  return;
            }

            // Check if it's an admin email
            if (!email.toLowerCase().includes("admin")) {
                  setError("❌ Only admin accounts can login. Guest users don't need to login - use the menu above to explore events, announcements, and team.");
                  setLoading(false);
                  return;
            }

            const result = await login(email, password);
            setLoading(false);

            if (result.success) {
                  navigate("/admin");
            } else {
                  setError(result.message);
            }
      };

      return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center py-12 px-4 pt-24">
                  <div className="w-full max-w-md">
                        {/* Card */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200/60">
                              {/* Header */}
                              <div className="mb-8">
                                    <div className="flex justify-center mb-4">
                                          <div className="w-12 h-12 bg-linear-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">CSS</div>
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900 text-center">🔐 Admin Access Only</h1>
                                    <p className="text-gray-600 text-center mt-2">Administrative login for CSS Society management</p>
                              </div>

                              {/* Form */}
                              <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Error Alert */}
                                    {error && (
                                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                                                <AlertCircle size={20} className="text-red-600 mt-0.5 shrink-0" />
                                                <p className="text-red-700 text-sm">{error}</p>
                                          </div>
                                    )}

                                    {/* Email */}
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                          <div className="relative">
                                                <Mail size={20} className="absolute left-3 top-3 text-gray-400" />
                                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                          </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                          <div className="relative">
                                                <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
                                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                          </div>
                                    </div>

                                    {/* Demo Credentials */}
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                          <p className="text-sm text-yellow-900 font-medium mb-2">👥 For Guest Users:</p>
                                          <p className="text-sm text-yellow-800 mb-3">No login required! Use the menu to explore events, announcements, and team members.</p>
                                          <p className="text-sm text-yellow-900 font-medium mb-2">✅ Demo Admin Account:</p>
                                          <p className="text-sm text-yellow-700">
                                                Email: <code className="bg-white px-2 py-1 rounded">admin@gcu.edu.pk</code>
                                          </p>
                                          <p className="text-sm text-yellow-700">
                                                Password: <code className="bg-white px-2 py-1 rounded">Admin@123456</code>
                                          </p>
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" disabled={loading} className="w-full bg-linear-to-r from-blue-900 to-blue-700 text-white font-bold py-2.5 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50">
                                          {loading ? (
                                                <>
                                                      <Loader size={20} className="animate-spin" />
                                                      Signing in...
                                                </>
                                          ) : (
                                                "Sign In"
                                          )}
                                    </button>
                              </form>

                              {/* Divider */}
                              <div className="my-6 flex items-center">
                                    <div className="flex-1 border-t border-gray-300"></div>
                                    <span className="px-4 text-gray-500 text-sm">Back to Site</span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                              </div>

                              {/* Back to Home Link */}
                              <Link to="/" className="w-full block text-center bg-gray-100 text-gray-900 font-bold py-2.5 rounded-lg hover:bg-gray-200 transition">
                                    ← Back to Home (Guest Access)
                              </Link>

                              {/* Back to Home */}
                              <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">Guest users have full access to explore the site without login! 👍</p>
                              </div>
                        </div>
                  </div>
            </div>
      );
};
