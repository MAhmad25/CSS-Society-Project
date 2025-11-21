import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, AlertCircle, Loader } from "lucide-react";
import { useAuth } from "../context/useAuth";

export const Register = () => {
      const [formData, setFormData] = useState({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
      });
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const { register } = useAuth();

      const handleChange = (e) => {
            setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
            });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setError("");

            // Validation
            if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
                  setError("Please fill in all fields");
                  return;
            }

            if (formData.password.length < 8) {
                  setError("Password must be at least 8 characters");
                  return;
            }

            if (formData.password !== formData.confirmPassword) {
                  setError("Passwords do not match");
                  return;
            }

            setLoading(true);
            const result = await register(formData.email, formData.password, formData.fullName);
            setLoading(false);

            if (result.success) {
                  navigate("/");
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
                                    <h1 className="text-3xl font-bold text-gray-900 text-center">Join CSS Society</h1>
                                    <p className="text-gray-600 text-center mt-2">Create your account to get started</p>
                              </div>

                              {/* Form */}
                              <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Error Alert */}
                                    {error && (
                                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                                                <AlertCircle size={20} className="text-red-600 mt-0.5 shrink-0" />
                                                <p className="text-red-700 text-sm">{error}</p>
                                          </div>
                                    )}

                                    {/* Full Name */}
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                          <div className="relative">
                                                <User size={20} className="absolute left-3 top-3 text-gray-400" />
                                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                          </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                          <div className="relative">
                                                <Mail size={20} className="absolute left-3 top-3 text-gray-400" />
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                          </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                          <div className="relative">
                                                <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
                                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="At least 8 characters" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                          </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                          <div className="relative">
                                                <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
                                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                          </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" disabled={loading} className="w-full bg-linear-to-r from-blue-900 to-blue-700 text-white font-bold py-2.5 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 mt-6">
                                          {loading ? (
                                                <>
                                                      <Loader size={20} className="animate-spin" />
                                                      Creating Account...
                                                </>
                                          ) : (
                                                "Create Account"
                                          )}
                                    </button>
                              </form>

                              {/* Divider */}
                              <div className="my-6 flex items-center">
                                    <div className="flex-1 border-t border-gray-300"></div>
                                    <span className="px-4 text-gray-500 text-sm">Already have an account?</span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                              </div>

                              {/* Login Link */}
                              <Link to="/login" className="w-full block text-center bg-gray-100 text-gray-900 font-bold py-2.5 rounded-lg hover:bg-gray-200 transition">
                                    Sign In Instead
                              </Link>

                              {/* Back to Home */}
                              <div className="mt-6 text-center">
                                    <Link to="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                          ← Back to Home
                                    </Link>
                              </div>
                        </div>
                  </div>
            </div>
      );
};
