import { useState, useEffect } from "react";
import { MessageSquare, Pin, Edit, Trash2, Plus, Loader, AlertCircle, Eye } from "lucide-react";
import { announcementAPI } from "../services/api";
import { useAuth } from "../context/useAuth";
import { DetailModal } from "../components/DetailModal";

export const Announcements = () => {
      const [announcements, setAnnouncements] = useState([]);
      const [loading, setLoading] = useState(true);
      const [showCreateForm, setShowCreateForm] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [error, setError] = useState("");
      const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
      const [showModal, setShowModal] = useState(false);
      const { isAdmin } = useAuth();

      const [formData, setFormData] = useState({
            title: "",
            content: "",
            category: "news",
      });

      const categories = ["news", "update", "achievement", "urgent", "other"];

      // Fetch Announcements
      useEffect(() => {
            const fetchAnnouncements = async () => {
                  try {
                        setLoading(true);
                        setError("");
                        const response = isAdmin ? await announcementAPI.getAllAnnouncementsAdmin() : await announcementAPI.getAllAnnouncements();
                        setAnnouncements(response.data.data.announcements || []);
                  } catch (err) {
                        setError(err.response?.data?.message || "Failed to fetch announcements");
                  } finally {
                        setLoading(false);
                  }
            };

            fetchAnnouncements();
      }, [isAdmin]);

      const handleFormChange = (e) => {
            setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
            });
      };

      const handleCreateAnnouncement = async (e) => {
            e.preventDefault();
            setError("");

            if (!formData.title || !formData.content) {
                  setError("Please fill in all required fields");
                  return;
            }

            // Additional validation for title and content length
            if (formData.title.trim().length < 3) {
                  setError("Title must be at least 3 characters long");
                  return;
            }

            if (formData.content.trim().length < 10) {
                  setError("Content must be at least 10 characters long");
                  return;
            }

            try {
                  const dataToSend = {
                        title: formData.title.trim(),
                        content: formData.content.trim(),
                        category: formData.category,
                  };

                  if (editingId) {
                        await announcementAPI.updateAnnouncement(editingId, dataToSend);
                        setEditingId(null);
                  } else {
                        await announcementAPI.createAnnouncement(dataToSend);
                  }

                  // Reset form and refetch
                  setFormData({
                        title: "",
                        content: "",
                        category: "news",
                  });
                  setShowCreateForm(false);

                  // Refetch
                  const response = isAdmin ? await announcementAPI.getAllAnnouncementsAdmin() : await announcementAPI.getAllAnnouncements();
                  setAnnouncements(response.data.data.announcements || []);
            } catch (err) {
                  console.error("Create announcement error:", err);
                  // Handle validation errors array
                  if (err.response?.data?.data && Array.isArray(err.response.data.data)) {
                        const errorMessages = err.response.data.data.map((e) => e.msg).join(", ");
                        setError(errorMessages);
                  } else {
                        setError(err.response?.data?.message || "Failed to save announcement");
                  }
            }
      };

      const handleDeleteAnnouncement = async (id) => {
            if (window.confirm("Are you sure you want to delete this announcement?")) {
                  try {
                        await announcementAPI.deleteAnnouncement(id);

                        // Refetch
                        const response = isAdmin ? await announcementAPI.getAllAnnouncementsAdmin() : await announcementAPI.getAllAnnouncements();
                        setAnnouncements(response.data.data.announcements || []);
                  } catch (err) {
                        setError(err.response?.data?.message || "Failed to delete announcement");
                  }
            }
      };

      const handleTogglePin = async (id) => {
            try {
                  await announcementAPI.togglePinAnnouncement(id);

                  // Refetch
                  const response = isAdmin ? await announcementAPI.getAllAnnouncementsAdmin() : await announcementAPI.getAllAnnouncements();
                  setAnnouncements(response.data.data.announcements || []);
            } catch (err) {
                  setError(err.response?.data?.message || "Failed to update announcement");
            }
      };

      const handleTogglePublish = async (id) => {
            try {
                  await announcementAPI.togglePublishAnnouncement(id);

                  // Refetch
                  const response = isAdmin ? await announcementAPI.getAllAnnouncementsAdmin() : await announcementAPI.getAllAnnouncements();
                  setAnnouncements(response.data.data.announcements || []);
            } catch (err) {
                  setError(err.response?.data?.message || "Failed to update announcement");
            }
      };

      const handleEditAnnouncement = (announcement) => {
            setFormData({
                  title: announcement.title,
                  content: announcement.content,
                  category: announcement.category,
            });
            setEditingId(announcement._id);
            setShowCreateForm(true);
      };

      return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50 py-20 px-4">
                  <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                              <div>
                                    <h1 className="text-4xl font-bold text-gray-900">News & Updates</h1>
                                    <p className="text-gray-600 mt-2">Stay informed with latest announcements</p>
                              </div>
                              {isAdmin && (
                                    <button
                                          onClick={() => {
                                                setShowCreateForm(!showCreateForm);
                                                setEditingId(null);
                                                setFormData({
                                                      title: "",
                                                      content: "",
                                                      category: "update",
                                                });
                                          }}
                                          className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:shadow-lg"
                                    >
                                          <Plus size={20} />
                                          {showCreateForm ? "Cancel" : "New Post"}
                                    </button>
                              )}
                        </div>

                        {/* Create/Edit Form */}
                        {showCreateForm && isAdmin && (
                              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{editingId ? "Edit Announcement" : "Create New Announcement"}</h2>

                                    <form onSubmit={handleCreateAnnouncement} className="space-y-6">
                                          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{error}</div>}

                                          {/* Title */}
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                                                <input type="text" name="title" value={formData.title} onChange={handleFormChange} placeholder="Announcement title" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                          </div>

                                          {/* Category */}
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                                <select name="category" value={formData.category} onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                                      {categories.map((cat) => (
                                                            <option key={cat} value={cat}>
                                                                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                            </option>
                                                      ))}
                                                </select>
                                          </div>

                                          {/* Content */}
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                                                <textarea name="content" value={formData.content} onChange={handleFormChange} placeholder="Announcement content" rows="6" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"></textarea>
                                          </div>

                                          {/* Buttons */}
                                          <div className="flex gap-4">
                                                <button type="submit" className="px-6 py-2 bg-linear-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:shadow-lg font-medium">
                                                      {editingId ? "Update Announcement" : "Create Announcement"}
                                                </button>
                                                <button
                                                      type="button"
                                                      onClick={() => {
                                                            setShowCreateForm(false);
                                                            setEditingId(null);
                                                      }}
                                                      className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 font-medium"
                                                >
                                                      Cancel
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        )}

                        {/* Announcements List */}
                        {loading ? (
                              <div className="flex justify-center items-center py-20">
                                    <Loader size={40} className="animate-spin text-blue-600" />
                              </div>
                        ) : announcements.length === 0 ? (
                              <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
                                    <MessageSquare size={40} className="mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-xl font-bold text-gray-900">No announcements yet</h3>
                                    <p className="text-gray-600 mt-2">Check back soon for updates</p>
                              </div>
                        ) : (
                              <div id="announcements-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {announcements.map((announcement) => (
                                          <div key={announcement._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition border border-gray-200 overflow-hidden flex flex-col">
                                                <div className="p-6 flex-1 flex flex-col">
                                                      {/* Header */}
                                                      <div className="mb-4">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{announcement.title}</h3>
                                                                  {announcement.isPinned && <Pin size={20} className="text-yellow-500 shrink-0" />}
                                                            </div>
                                                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{announcement.category}</span>
                                                      </div>

                                                      {/* Admin Badges */}
                                                      {isAdmin && (
                                                            <div className="flex gap-2 mb-3 flex-wrap">
                                                                  <span className={`px-2 py-1 rounded-full font-bold text-xs ${announcement.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>{announcement.isPublished ? "Published" : "Draft"}</span>
                                                            </div>
                                                      )}

                                                      {/* Content */}
                                                      <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3 flex-1">{announcement.content}</p>

                                                      {/* Meta */}
                                                      <div className="text-sm text-gray-500 mb-6">
                                                            Posted by {announcement.createdBy?.fullName} on {new Date(announcement.createdAt).toLocaleDateString()}
                                                      </div>

                                                      {/* Actions */}
                                                      <div className="flex gap-2 flex-wrap mt-auto">
                                                            <button
                                                                  onClick={() => {
                                                                        setSelectedAnnouncement(announcement);
                                                                        setShowModal(true);
                                                                  }}
                                                                  className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium text-sm transition"
                                                            >
                                                                  <Eye size={16} />
                                                                  Details
                                                            </button>

                                                            {isAdmin && (
                                                                  <>
                                                                        <button onClick={() => handleTogglePin(announcement._id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition ${announcement.isPinned ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                                                                              <Pin size={16} />
                                                                              {announcement.isPinned ? "Unpin" : "Pin"}
                                                                        </button>

                                                                        <button onClick={() => handleTogglePublish(announcement._id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition ${announcement.isPublished ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                                                                              {announcement.isPublished ? "✓" : "○"}
                                                                        </button>

                                                                        <button onClick={() => handleEditAnnouncement(announcement)} className="flex items-center gap-2 px-3 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 font-medium text-sm transition">
                                                                              <Edit size={16} />
                                                                              Edit
                                                                        </button>

                                                                        <button onClick={() => handleDeleteAnnouncement(announcement._id)} className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium text-sm transition">
                                                                              <Trash2 size={16} />
                                                                              Delete
                                                                        </button>
                                                                  </>
                                                            )}
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        )}

                        {error && (
                              <div className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
                                    <AlertCircle size={20} />
                                    <span>{error}</span>
                              </div>
                        )}

                        {/* Announcement Detail Modal */}
                        <DetailModal
                              isOpen={showModal}
                              onClose={() => {
                                    setShowModal(false);
                                    setSelectedAnnouncement(null);
                              }}
                              title={selectedAnnouncement?.title}
                        >
                              {selectedAnnouncement && (
                                    <div className="space-y-6">
                                          {/* Category Badge */}
                                          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium text-sm">{selectedAnnouncement.category}</span>

                                          {/* Full Content */}
                                          <div>
                                                <h3 className="font-bold text-gray-900 mb-3 text-lg">📝 Full Announcement</h3>
                                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedAnnouncement.content}</p>
                                          </div>

                                          {/* Meta Information */}
                                          <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                      <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Posted By</p>
                                                      <p className="text-gray-900 font-medium">{selectedAnnouncement.createdBy?.fullName}</p>
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                      <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Posted Date</p>
                                                      <p className="text-gray-900 font-medium">{new Date(selectedAnnouncement.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                                                </div>

                                                {selectedAnnouncement.isPinned && (
                                                      <div className="bg-yellow-50 p-4 rounded-lg col-span-2">
                                                            <p className="text-xs text-yellow-600 uppercase font-semibold mb-1">📌 Status</p>
                                                            <p className="text-yellow-900 font-medium">This announcement is pinned</p>
                                                      </div>
                                                )}

                                                {isAdmin && (
                                                      <div className={`p-4 rounded-lg col-span-2 ${selectedAnnouncement.isPublished ? "bg-green-50" : "bg-gray-50"}`}>
                                                            <p className="text-xs uppercase font-semibold mb-1" style={{ color: selectedAnnouncement.isPublished ? "#166534" : "#4b5563" }}>
                                                                  Visibility Status
                                                            </p>
                                                            <p style={{ color: selectedAnnouncement.isPublished ? "#166534" : "#4b5563" }} className="font-medium">
                                                                  {selectedAnnouncement.isPublished ? "✓ Published (Visible to guests)" : "○ Draft (Hidden from guests)"}
                                                            </p>
                                                      </div>
                                                )}
                                          </div>
                                    </div>
                              )}
                        </DetailModal>
                  </div>
            </div>
      );
};
