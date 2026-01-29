import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Edit, Trash2, Plus, Filter, X, Loader, Eye } from "lucide-react";
import { eventAPI } from "../services/api";
import { useAuth } from "../context/useAuth";
import { DetailModal } from "../components/DetailModal";
import useScrollTop from "../hooks/useScrollTop";
export const Events = () => {
      useScrollTop();
      const [events, setEvents] = useState([]);
      const [loading, setLoading] = useState(true);
      const [selectedCategory, setSelectedCategory] = useState("");
      const [selectedStatus, setSelectedStatus] = useState("");
      const [showCreateForm, setShowCreateForm] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [error, setError] = useState("");
      const [selectedEvent, setSelectedEvent] = useState(null);
      const [showModal, setShowModal] = useState(false);
      const { isAuthenticated, isAdmin } = useAuth();

      const [formData, setFormData] = useState({
            title: "",
            description: "",
            date: "",
            location: "",
            category: "workshop",
            maxParticipants: "",
            status: "upcoming",
            image: "",
      });
      const [imageFile, setImageFile] = useState(null);

      const categories = ["workshop", "competition", "seminar", "hackathon", "networking", "other"];
      const statuses = ["upcoming", "ongoing", "completed", "cancelled"];

      // Fetch Events
      useEffect(() => {
            const fetchEventsData = async () => {
                  try {
                        setLoading(true);
                        setError("");
                        const response = await eventAPI.getAllEvents(selectedCategory || undefined, selectedStatus || undefined);
                        setEvents(response.data.data.events || []);
                  } catch (err) {
                        console.error("Error fetching events:", err);
                        setError(err.response?.data?.message || "Failed to fetch events");
                  } finally {
                        setLoading(false);
                  }
            };
            fetchEventsData();
      }, [selectedCategory, selectedStatus]);

      const handleFormChange = (e) => {
            setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
            });
            if (e.target.name === "image") {
                  setImageFile(e.target.files[0]);
            }
      };

      const handleCreateEvent = async (e) => {
            e.preventDefault();
            setError("");

            if (!formData.title || !formData.description || !formData.date || !formData.location) {
                  setError("Please fill in all required fields");
                  return;
            }

            // Additional validation for title and description length
            if (formData.title.trim().length < 3) {
                  setError("Title must be at least 3 characters long");
                  return;
            }

            if (formData.description.trim().length < 10) {
                  setError("Description must be at least 10 characters long");
                  return;
            }

            try {
                  // Clean up form data - remove empty maxParticipants
                  let imageUrl = "";
                  if (imageFile) {
                        // Upload image to Cloudinary into single 'css' folder
                        const { uploadImageToCloudinary } = await import("../services/cloudinary");
                        imageUrl = await uploadImageToCloudinary(imageFile, "css");
                  }
                  const dataToSend = {
                        title: formData.title.trim(),
                        description: formData.description.trim(),
                        date: formData.date,
                        location: formData.location.trim(),
                        category: formData.category,
                        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants, 10) : undefined,
                        image: imageUrl || formData.image,
                  };

                  // Only include status if editing
                  if (editingId) {
                        dataToSend.status = formData.status;
                  }

                  if (editingId) {
                        await eventAPI.updateEvent(editingId, dataToSend);
                        setEditingId(null);
                  } else {
                        await eventAPI.createEvent(dataToSend);
                  }

                  // Reset form and refetch
                  setFormData({
                        title: "",
                        description: "",
                        date: "",
                        location: "",
                        category: "workshop",
                        maxParticipants: "",
                        status: "upcoming",
                        image: "",
                  });
                  setImageFile(null);
                  setShowCreateForm(false);

                  // Refetch events with current filters to show the newly created event
                  const response = await eventAPI.getAllEvents(selectedCategory || undefined, selectedStatus || undefined);
                  setEvents(response.data.data.events || []);

                  // Scroll to events section
                  setTimeout(() => {
                        document.getElementById("events-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 100);
            } catch (err) {
                  console.error("Create event error:", err);
                  // Handle validation errors array
                  if (err.response?.data?.data && Array.isArray(err.response.data.data)) {
                        const errorMessages = err.response.data.data.map((e) => e.msg).join(", ");
                        setError(errorMessages);
                  } else {
                        setError(err.response?.data?.message || "Failed to save event");
                  }
            }
      };

      const handleDeleteEvent = async (id) => {
            if (window.confirm("Are you sure you want to delete this event?")) {
                  try {
                        await eventAPI.deleteEvent(id);
                        // Clear filters and refetch all events
                        setSelectedCategory("");
                        setSelectedStatus("");
                        const response = await eventAPI.getAllEvents(undefined, undefined);
                        setEvents(response.data.data.events || []);
                  } catch (err) {
                        setError(err.response?.data?.message || "Failed to delete event");
                  }
            }
      };

      const handleEditEvent = (event) => {
            setFormData({
                  title: event.title,
                  description: event.description,
                  date: event.date.split("T")[0],
                  location: event.location,
                  category: event.category,
                  maxParticipants: event.maxParticipants,
                  status: event.status || "upcoming",
            });
            setEditingId(event._id);
            setShowCreateForm(true);
      };

      return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50 py-20 px-4">
                  <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                              <div>
                                    <h1 className="text-4xl font-bold text-gray-900">Events</h1>
                                    <p className="text-gray-600 mt-2">Join our exciting CSS Society events</p>
                              </div>
                              {isAdmin && (
                                    <button
                                          onClick={() => {
                                                setShowCreateForm(!showCreateForm);
                                                setEditingId(null);
                                                setFormData({
                                                      title: "",
                                                      description: "",
                                                      date: "",
                                                      location: "",
                                                      category: "workshop",
                                                      maxParticipants: "",
                                                });
                                          }}
                                          className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:shadow-lg"
                                    >
                                          <Plus size={20} />
                                          {showCreateForm ? "Cancel" : "Create Event"}
                                    </button>
                              )}
                        </div>

                        {/* Create/Edit Form */}
                        {showCreateForm && isAdmin && (
                              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{editingId ? "Edit Event" : "Create New Event"}</h2>

                                    <form onSubmit={handleCreateEvent} className="space-y-6">
                                          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{error}</div>}

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Title */}
                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                                                      <input type="text" name="title" value={formData.title} onChange={handleFormChange} placeholder="Event title" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>

                                                {/* Date */}
                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                                                      <input type="date" name="date" value={formData.date} onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>

                                                {/* Location */}
                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                                                      <input type="text" name="location" value={formData.location} onChange={handleFormChange} placeholder="Event location" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
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

                                                {/* Max Participants */}
                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                                                      <input type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleFormChange} placeholder="Leave empty for unlimited" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>

                                                {/* Status (only when editing) */}
                                                {editingId && (
                                                      <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                                            <select name="status" value={formData.status} onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                                                  {statuses.map((status) => (
                                                                        <option key={status} value={status}>
                                                                              {status.charAt(0).toUpperCase() + status.slice(1)}
                                                                        </option>
                                                                  ))}
                                                            </select>
                                                      </div>
                                                )}
                                          </div>
                                          {/* Description */}
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                                                <textarea name="description" value={formData.description} onChange={handleFormChange} placeholder="Event description" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"></textarea>
                                          </div>

                                          {/* Buttons */}
                                          <div className="flex gap-4">
                                                <button type="submit" className="px-6 py-2 bg-linear-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:shadow-lg font-medium">
                                                      {editingId ? "Update Event" : "Create Event"}
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

                        {/* Filters */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
                              <div className="flex items-center gap-4 mb-4">
                                    <Filter size={20} className="text-gray-600" />
                                    <h3 className="font-bold text-gray-900">Filter Events</h3>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                                <option value="">All Categories</option>
                                                {categories.map((cat) => (
                                                      <option key={cat} value={cat}>
                                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                      </option>
                                                ))}
                                          </select>
                                    </div>

                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                                <option value="">All Status</option>
                                                {statuses.map((status) => (
                                                      <option key={status} value={status}>
                                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                                      </option>
                                                ))}
                                          </select>
                                    </div>

                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
                                          <button
                                                onClick={() => {
                                                      setSelectedCategory("");
                                                      setSelectedStatus("");
                                                }}
                                                className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 font-medium"
                                          >
                                                Clear Filters
                                          </button>
                                    </div>
                              </div>
                        </div>

                        {/* Events Grid */}
                        {loading ? (
                              <div className="flex justify-center items-center py-20">
                                    <Loader size={40} className="animate-spin text-blue-600" />
                              </div>
                        ) : events.length === 0 ? (
                              <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
                                    <Calendar size={40} className="mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-xl font-bold text-gray-900">No events found</h3>
                                    <p className="text-gray-600 mt-2">Try adjusting your filters or check back later</p>
                              </div>
                        ) : (
                              <div id="events-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {events?.map((event) => {
                                          return (
                                                <div key={event._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-gray-200 flex flex-col h-full">
                                                      {/* Image or Status Badge */}
                                                      <div className="relative h-48 bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center overflow-hidden shrink-0">
                                                            {event.image ? <img src={event.image} alt={event.title} className="w-full h-full object-cover" /> : <Calendar size={40} className="text-white opacity-30" />}
                                                            <span className="absolute top-4 left-4 px-3 py-1 bg-white text-blue-900 text-xs font-bold rounded-full">{event.status}</span>
                                                            <span className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full">{event.category}</span>
                                                      </div>

                                                      {/* Content */}
                                                      <div className="p-6 flex-1 flex flex-col">
                                                            <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>

                                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                                                            {/* Details */}
                                                            <div className="space-y-2 mb-6 flex-1">
                                                                  <div className="flex items-center gap-2 text-gray-700">
                                                                        <Calendar size={18} className="text-blue-600" />
                                                                        <span>{new Date(event.date).toLocaleDateString()}</span>
                                                                  </div>
                                                                  <div className="flex items-center gap-2 text-gray-700">
                                                                        <MapPin size={18} className="text-blue-600" />
                                                                        <span>{event.location}</span>
                                                                  </div>
                                                                  <div className="flex items-center gap-2 text-gray-700">
                                                                        <Users size={18} className="text-blue-600" />
                                                                        <span>
                                                                              {event.registrations.length}
                                                                              {event.maxParticipants ? ` / ${event.maxParticipants}` : ""} participants
                                                                        </span>
                                                                  </div>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex gap-2 mt-auto">
                                                                  <button
                                                                        onClick={() => {
                                                                              setSelectedEvent(event);
                                                                              setShowModal(true);
                                                                        }}
                                                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
                                                                  >
                                                                        <Eye size={18} />
                                                                        View Details
                                                                  </button>

                                                                  {isAuthenticated && !isAdmin && <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">Register</button>}

                                                                  {isAdmin && (
                                                                        <>
                                                                              <button onClick={() => handleEditEvent(event)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium text-sm">
                                                                                    <Edit size={18} />
                                                                                    Edit
                                                                              </button>
                                                                              <button onClick={() => handleDeleteEvent(event._id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm">
                                                                                    <Trash2 size={18} />
                                                                                    Delete
                                                                              </button>
                                                                        </>
                                                                  )}
                                                            </div>
                                                      </div>
                                                </div>
                                          );
                                    })}
                              </div>
                        )}
                  </div>

                  {/* Event Detail Modal */}
                  <DetailModal
                        isOpen={showModal}
                        onClose={() => {
                              setShowModal(false);
                              setSelectedEvent(null);
                        }}
                        title={selectedEvent?.title}
                  >
                        {selectedEvent && (
                              <div className="space-y-6">
                                    {/* Status & Category Badges */}
                                    <div className="flex gap-3">
                                          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium text-sm">{selectedEvent.status}</span>
                                          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-medium text-sm">{selectedEvent.category}</span>
                                    </div>

                                    {/* Description */}
                                    <div>
                                          <h3 className="font-bold text-gray-900 mb-2">📝 Description</h3>
                                          <p className="text-gray-700 whitespace-pre-wrap">{selectedEvent.description}</p>
                                    </div>

                                    {/* Event Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                                                      <Calendar size={18} /> Date
                                                </h4>
                                                <p className="text-gray-700">{new Date(selectedEvent.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                                          </div>

                                          <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                                                      <MapPin size={18} /> Location
                                                </h4>
                                                <p className="text-gray-700">{selectedEvent.location}</p>
                                          </div>

                                          <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                                                      <Users size={18} /> Participants
                                                </h4>
                                                <p className="text-gray-700">
                                                      {selectedEvent.registrations.length}
                                                      {selectedEvent.maxParticipants ? ` / ${selectedEvent.maxParticipants}` : ""} registered
                                                </p>
                                          </div>

                                          <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-900 mb-2">📊 Status</h4>
                                                <p className="text-gray-700 capitalize">{selectedEvent.status}</p>
                                          </div>
                                    </div>

                                    {/* Action Button */}
                                    {isAuthenticated && !isAdmin && <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">✓ Register for This Event</button>}
                              </div>
                        )}
                  </DetailModal>
            </div>
      );
};
