import { useState } from "react";
import { User, Mail, Lock, Trash2, AlertCircle, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import useScrollTop from "../hooks/useScrollTop";
export const Profile = () => {
      useScrollTop();
      const { user, updateProfile, changePassword, logout } = useAuth();
      const navigate = useNavigate();
      const [activeTab, setActiveTab] = useState("profile");
      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
      const [loading, setLoading] = useState(false);

      // Profile Form
      const [profileData, setProfileData] = useState({
            fullName: user?.fullName || "",
            email: user?.email || "",
      });

      // Password Form
      const [passwordData, setPasswordData] = useState({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
      });

      // Handle Profile Update
      const handleProfileSubmit = async (e) => {
            e.preventDefault();
            setError("");
            setSuccess("");
            setLoading(true);

            const result = await updateProfile(profileData);
            setLoading(false);

            if (result.success) {
                  setSuccess(result.message);
                  setTimeout(() => setSuccess(""), 3000);
            } else {
                  setError(result.message);
            }
      };

      // Handle Password Change
      const handlePasswordSubmit = async (e) => {
            e.preventDefault();
            setError("");
            setSuccess("");

            if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
                  setError("Please fill in all password fields");
                  return;
            }

            if (passwordData.newPassword !== passwordData.confirmPassword) {
                  setError("New passwords do not match");
                  return;
            }

            if (passwordData.newPassword.length < 8) {
                  setError("New password must be at least 8 characters");
                  return;
            }

            setLoading(true);
            const result = await changePassword(passwordData.oldPassword, passwordData.newPassword, passwordData.confirmPassword);
            setLoading(false);

            if (result.success) {
                  setSuccess(result.message);
                  setPasswordData({
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                  });
                  setTimeout(() => setSuccess(""), 3000);
            } else {
                  setError(result.message);
            }
      };

      // Handle Account Delete
      const handleDeleteAccount = async () => {
            if (window.confirm("Are you sure? This action cannot be undone.")) {
                  if (window.confirm("This will permanently delete your account. Are you absolutely sure?")) {
                        setLoading(true);
                        try {
                              // const response = await userAPI.deleteAccount();
                              logout();
                              navigate("/");
                        } catch (err) {
                              setError(err.response?.data?.message || "Failed to delete account");
                              setLoading(false);
                        }
                  }
            }
      };

      return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50 py-20 px-4 pt-24">
                  <div className="max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
                              <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-linear-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white">
                                          <User size={32} />
                                    </div>
                                    <div>
                                          <h1 className="text-3xl font-bold text-gray-900">{user?.fullName}</h1>
                                          <p className="text-gray-600">{user?.email}</p>
                                          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{user?.role}</span>
                                    </div>
                              </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-4 mb-8">
                              <button onClick={() => setActiveTab("profile")} className={`px-6 py-3 font-bold rounded-lg transition ${activeTab === "profile" ? "bg-blue-900 text-white shadow-lg" : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"}`}>
                                    Profile
                              </button>
                              <button onClick={() => setActiveTab("password")} className={`px-6 py-3 font-bold rounded-lg transition ${activeTab === "password" ? "bg-blue-900 text-white shadow-lg" : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"}`}>
                                    Change Password
                              </button>
                              <button onClick={() => setActiveTab("delete")} className={`px-6 py-3 font-bold rounded-lg transition ${activeTab === "delete" ? "bg-red-600 text-white shadow-lg" : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"}`}>
                                    Delete Account
                              </button>
                        </div>

                        {/* Profile Tab */}
                        {activeTab === "profile" && (
                              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Profile</h2>

                                    {error && (
                                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
                                                <AlertCircle size={20} className="text-red-600 mt-0.5 shrink-0" />
                                                <p className="text-red-700">{error}</p>
                                          </div>
                                    )}

                                    {success && <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-green-700">✓ {success}</div>}

                                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                <div className="relative">
                                                      <User size={20} className="absolute left-3 top-3 text-gray-400" />
                                                      <input type="text" value={profileData.fullName} onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>
                                          </div>

                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                                <div className="relative">
                                                      <Mail size={20} className="absolute left-3 top-3 text-gray-400" />
                                                      <input type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>
                                          </div>

                                          <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-linear-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:shadow-lg transition font-bold disabled:opacity-50 flex items-center justify-center gap-2">
                                                {loading ? (
                                                      <>
                                                            <Loader size={20} className="animate-spin" />
                                                            Updating...
                                                      </>
                                                ) : (
                                                      "Update Profile"
                                                )}
                                          </button>
                                    </form>
                              </div>
                        )}

                        {/* Password Tab */}
                        {activeTab === "password" && (
                              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>

                                    {error && (
                                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
                                                <AlertCircle size={20} className="text-red-600 mt-0.5 shrink-0" />
                                                <p className="text-red-700">{error}</p>
                                          </div>
                                    )}

                                    {success && <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-green-700">✓ {success}</div>}

                                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                                <div className="relative">
                                                      <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
                                                      <input type="password" value={passwordData.oldPassword} onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })} placeholder="Enter current password" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>
                                          </div>

                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                                <div className="relative">
                                                      <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
                                                      <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} placeholder="At least 8 characters" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>
                                          </div>

                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                                <div className="relative">
                                                      <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
                                                      <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} placeholder="Confirm password" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>
                                          </div>

                                          <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-linear-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:shadow-lg transition font-bold disabled:opacity-50 flex items-center justify-center gap-2">
                                                {loading ? (
                                                      <>
                                                            <Loader size={20} className="animate-spin" />
                                                            Changing...
                                                      </>
                                                ) : (
                                                      "Change Password"
                                                )}
                                          </button>
                                    </form>
                              </div>
                        )}

                        {/* Delete Account Tab */}
                        {activeTab === "delete" && (
                              <div className="bg-white rounded-xl shadow-lg p-8 border border-red-200">
                                    <h2 className="text-2xl font-bold text-red-600 mb-6">Delete Account</h2>

                                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                                          <h3 className="font-bold text-red-900 mb-2">⚠️ Danger Zone</h3>
                                          <p className="text-red-700 mb-4">Deleting your account is permanent and cannot be undone. This will:</p>
                                          <ul className="list-disc list-inside text-red-700 space-y-2 mb-4">
                                                <li>Remove your account and all associated data</li>
                                                <li>Cancel your registrations for all events</li>
                                                <li>Remove you from the CSS Society community</li>
                                          </ul>
                                          <p className="text-red-700 font-medium">Please think carefully before proceeding.</p>
                                    </div>

                                    <button onClick={handleDeleteAccount} disabled={loading} className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition disabled:opacity-50 flex items-center justify-center gap-2">
                                          {loading ? (
                                                <>
                                                      <Loader size={20} className="animate-spin" />
                                                      Deleting...
                                                </>
                                          ) : (
                                                <>
                                                      <Trash2 size={20} />
                                                      Delete My Account
                                                </>
                                          )}
                                    </button>
                              </div>
                        )}
                  </div>
            </div>
      );
};
