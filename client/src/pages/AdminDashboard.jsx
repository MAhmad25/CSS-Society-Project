import { useState, useEffect } from "react";
import { Users, Calendar, MessageSquare, BarChart3, Edit, Trash2, Loader, AlertCircle } from "lucide-react";
import { eventAPI, announcementAPI, teamAPI } from "../services/api";
import { useAuth } from "../context/useAuth";
import useScrollTop from "../hooks/useScrollTop";
export const AdminDashboard = () => {
      useScrollTop();
      const [activeTab, setActiveTab] = useState("overview");
      const [stats, setStats] = useState({
            totalUsers: 0,
            totalEvents: 0,
            totalAnnouncements: 0,
            totalTeamMembers: 0,
      });
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState("");
      const { isAdmin } = useAuth();

      // Fetch Data
      useEffect(() => {
            if (!isAdmin) return;

            const fetchDashboardData = async () => {
                  try {
                        setLoading(true);
                        setError("");

                        if (activeTab === "overview") {
                              const eventsRes = await eventAPI.getAllEvents();
                              const announcementsRes = await announcementAPI.getAllAnnouncementsAdmin();
                              const teamRes = await teamAPI.getAllTeamMembers();

                              setStats((prev) => ({
                                    ...prev,
                                    totalEvents: eventsRes.data.data.events?.length || 0,
                                    totalAnnouncements: announcementsRes.data.data.announcements?.length || 0,
                                    totalTeamMembers: teamRes.data.data.teamMembers?.length || 0,
                              }));
                        }
                  } catch (err) {
                        setError(err.response?.data?.message || "Failed to fetch data");
                  } finally {
                        setLoading(false);
                  }
            };

            fetchDashboardData();
      }, [isAdmin, activeTab]);

      if (!isAdmin) {
            return (
                  <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center">
                        <div className="text-center">
                              <AlertCircle size={48} className="text-red-600 mx-auto mb-4" />
                              <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
                              <p className="text-gray-600 mt-2">You do not have permission to access this page</p>
                        </div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50 py-20 px-4 pt-24">
                  <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
                              <p className="text-gray-600 mt-2">Manage CSS Society</p>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-4 mb-8 flex-wrap">
                              {[
                                    { id: "overview", label: "Overview", icon: BarChart3 },
                                    { id: "events", label: "Events", icon: Calendar },
                                    { id: "announcements", label: "News", icon: MessageSquare },
                                    { id: "team", label: "Team", icon: Users },
                              ].map((tab) => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition ${activeTab === tab.id ? "bg-blue-900 text-white shadow-lg" : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"}`}>
                                          <tab.icon size={20} />
                                          {tab.label}
                                    </button>
                              ))}
                        </div>

                        {/* Content */}
                        {loading ? (
                              <div className="flex justify-center items-center py-20">
                                    <Loader size={40} className="animate-spin text-blue-600" />
                              </div>
                        ) : (
                              <>
                                    {/* Overview Tab */}
                                    {activeTab === "overview" && (
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                                {[
                                                      { icon: Users, label: "Total Users", value: stats.totalUsers, color: "blue" },
                                                      { icon: Calendar, label: "Total Events", value: stats.totalEvents, color: "green" },
                                                      {
                                                            icon: MessageSquare,
                                                            label: "Total News",
                                                            value: stats.totalAnnouncements,
                                                            color: "purple",
                                                      },
                                                      {
                                                            icon: Users,
                                                            label: "Total Team Members",
                                                            value: stats.totalTeamMembers,
                                                            color: "orange",
                                                      },
                                                ].map((stat, index) => (
                                                      <div key={index} className={`bg-white rounded-xl shadow-lg p-8 border-t-4 ${stat.color === "blue" ? "border-blue-600" : stat.color === "green" ? "border-green-600" : stat.color === "purple" ? "border-purple-600" : "border-orange-600"}`}>
                                                            <div className="flex items-center justify-between">
                                                                  <div>
                                                                        <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                                                                        <p className="text-4xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                                                  </div>
                                                                  <stat.icon size={40} className={stat.color === "blue" ? "text-blue-600" : stat.color === "green" ? "text-green-600" : stat.color === "purple" ? "text-purple-600" : "text-orange-600"} />
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    )}

                                    {/* Events Tab */}
                                    {activeTab === "events" && (
                                          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Management</h2>
                                                <div className="text-center py-12">
                                                      <Calendar size={40} className="mx-auto text-gray-400 mb-4" />
                                                      <p className="text-gray-600 mb-4">Go to Events page to manage events</p>
                                                      <a href="/events" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                            Manage Events
                                                      </a>
                                                </div>
                                          </div>
                                    )}

                                    {/* Announcements Tab */}
                                    {activeTab === "announcements" && (
                                          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Announcements Management</h2>
                                                <div className="text-center py-12">
                                                      <MessageSquare size={40} className="mx-auto text-gray-400 mb-4" />
                                                      <p className="text-gray-600 mb-4">Go to News page to manage announcements</p>
                                                      <a href="/announcements" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                            Manage News
                                                      </a>
                                                </div>
                                          </div>
                                    )}

                                    {/* Team Tab */}
                                    {activeTab === "team" && (
                                          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Management</h2>
                                                <div className="text-center py-12">
                                                      <Users size={40} className="mx-auto text-gray-400 mb-4" />
                                                      <p className="text-gray-600 mb-4">Go to Team page to manage team members</p>
                                                      <a href="/team" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                            Manage Team
                                                      </a>
                                                </div>
                                          </div>
                                    )}
                              </>
                        )}

                        {error && (
                              <div className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
                                    <AlertCircle size={20} />
                                    <span>{error}</span>
                              </div>
                        )}
                  </div>
            </div>
      );
};
