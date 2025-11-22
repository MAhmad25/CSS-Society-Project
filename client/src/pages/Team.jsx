import { useState, useEffect } from "react";
import { Users, Github, Linkedin, Twitter, Plus, Edit, Trash2, Loader, AlertCircle, Eye, Mail, Phone } from "lucide-react";
import { teamAPI } from "../services/api";
import { useAuth } from "../context/useAuth";
import { DetailModal } from "../components/DetailModal";

export const Team = () => {
      const [members, setMembers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [showCreateForm, setShowCreateForm] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [error, setError] = useState("");
      const [selectedMember, setSelectedMember] = useState(null);
      const [showModal, setShowModal] = useState(false);
      const { isAdmin } = useAuth();

      const [formData, setFormData] = useState({
            name: "",
            email: "",
            position: "Member",
            phone: "",
            bio: "",
            socialLinks: {
                  linkedin: "",
                  github: "",
                  twitter: "",
                  portfolio: "",
            },
      });

      const positions = ["President", "Vice President Operations", "Vice President Logistics", "General Manager", "General Secretary", "Society Manager", "Event Coordinator", "Information Secretary", "Member", "Other"];

      // Fetch Team Members
      useEffect(() => {
            const fetchMembers = async () => {
                  try {
                        setLoading(true);
                        setError("");
                        const response = await teamAPI.getAllTeamMembers();
                        setMembers(response.data.data.teamMembers || []);
                  } catch (err) {
                        setError(err.response?.data?.message || "Failed to fetch team members");
                  } finally {
                        setLoading(false);
                  }
            };

            fetchMembers();
      }, []);

      const handleFormChange = (e) => {
            const { name, value } = e.target;
            if (name.startsWith("social_")) {
                  const socialKey = name.replace("social_", "");
                  setFormData({
                        ...formData,
                        socialLinks: {
                              ...formData.socialLinks,
                              [socialKey]: value,
                        },
                  });
            } else {
                  setFormData({
                        ...formData,
                        [name]: value,
                  });
            }
      };

      const handleCreateMember = async (e) => {
            e.preventDefault();
            setError("");

            if (!formData.name || !formData.email || !formData.position) {
                  setError("Please fill in all required fields");
                  return;
            }

            // Additional validation for name length
            if (formData.name.trim().length < 2) {
                  setError("Name must be at least 2 characters long");
                  return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email.trim())) {
                  setError("Please provide a valid email address");
                  return;
            }

            try {
                  const dataToSend = {
                        name: formData.name.trim(),
                        email: formData.email.trim(),
                        position: formData.position,
                        phone: formData.phone.trim() || undefined,
                        bio: formData.bio.trim() || undefined,
                        socialLinks: formData.socialLinks,
                  };

                  if (editingId) {
                        await teamAPI.updateTeamMember(editingId, dataToSend);
                        setEditingId(null);
                  } else {
                        await teamAPI.createTeamMember(dataToSend);
                  }

                  // Reset form and refetch
                  setFormData({
                        name: "",
                        email: "",
                        position: "Member",
                        phone: "",
                        bio: "",
                        socialLinks: {
                              linkedin: "",
                              github: "",
                              twitter: "",
                              portfolio: "",
                        },
                  });
                  setShowCreateForm(false);

                  // Refetch
                  const response = await teamAPI.getAllTeamMembers();
                  setMembers(response.data.data.teamMembers || []);
            } catch (err) {
                  console.error("Create team member error:", err);
                  // Handle validation errors array
                  if (err.response?.data?.data && Array.isArray(err.response.data.data)) {
                        const errorMessages = err.response.data.data.map((e) => e.msg).join(", ");
                        setError(errorMessages);
                  } else {
                        setError(err.response?.data?.message || "Failed to save team member");
                  }
            }
      };

      const handleDeleteMember = async (id) => {
            if (window.confirm("Are you sure you want to delete this team member?")) {
                  try {
                        await teamAPI.deleteTeamMember(id);

                        // Refetch
                        const response = await teamAPI.getAllTeamMembers();
                        setMembers(response.data.data.teamMembers || []);
                  } catch (err) {
                        setError(err.response?.data?.message || "Failed to delete team member");
                  }
            }
      };

      const handleEditMember = (member) => {
            setFormData({
                  name: member.name,
                  email: member.email,
                  position: member.position,
                  phone: member.phone || "",
                  bio: member.bio || "",
                  socialLinks: member.socialLinks || {
                        linkedin: "",
                        github: "",
                        twitter: "",
                        portfolio: "",
                  },
            });
            setEditingId(member._id);
            setShowCreateForm(true);
      };

      const activemembers = members.filter((m) => m.isActive);
      const inactiveMembers = members.filter((m) => !m.isActive);

      return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50 py-20 px-4">
                  <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                              <div>
                                    <h1 className="text-4xl font-bold text-gray-900">Our CSS Members</h1>
                                    <p className="text-gray-600 mt-2">Meet the amazing CSS Members behind CSS Society</p>
                              </div>
                              {isAdmin && (
                                    <button
                                          onClick={() => {
                                                setShowCreateForm(!showCreateForm);
                                                setEditingId(null);
                                                setFormData({
                                                      name: "",
                                                      email: "",
                                                      position: "member",
                                                      phone: "",
                                                      bio: "",
                                                      socialLinks: {
                                                            linkedin: "",
                                                            github: "",
                                                            twitter: "",
                                                            portfolio: "",
                                                      },
                                                });
                                          }}
                                          className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:shadow-lg"
                                    >
                                          <Plus size={20} />
                                          {showCreateForm ? "Cancel" : "Add Member"}
                                    </button>
                              )}
                        </div>

                        {/* Create/Edit Form */}
                        {showCreateForm && isAdmin && (
                              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{editingId ? "Edit Team Member" : "Add New Team Member"}</h2>

                                    <form onSubmit={handleCreateMember} className="space-y-6">
                                          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{error}</div>}

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Name */}
                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                                                      <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Team member name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>

                                                {/* Email */}
                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                                      <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="email@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>

                                                {/* Position */}
                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                                                      <select name="position" value={formData.position} onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                                            {positions.map((pos) => (
                                                                  <option key={pos} value={pos}>
                                                                        {pos
                                                                              .split("_")
                                                                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                                              .join(" ")}
                                                                  </option>
                                                            ))}
                                                      </select>
                                                </div>

                                                {/* Phone */}
                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                                      <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="+92-XXX-XXXXXXX" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>
                                          </div>

                                          {/* Bio */}
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                                <textarea name="bio" value={formData.bio} onChange={handleFormChange} placeholder="Team member bio" rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"></textarea>
                                          </div>

                                          {/* Social Links */}
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                                                      <input type="url" name="social_linkedin" value={formData.socialLinks.linkedin} onChange={handleFormChange} placeholder="https://linkedin.com/in/..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>

                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                                                      <input type="url" name="social_github" value={formData.socialLinks.github} onChange={handleFormChange} placeholder="https://github.com/..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>

                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                                                      <input type="url" name="social_twitter" value={formData.socialLinks.twitter} onChange={handleFormChange} placeholder="https://twitter.com/..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>

                                                <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio</label>
                                                      <input type="url" name="social_portfolio" value={formData.socialLinks.portfolio} onChange={handleFormChange} placeholder="https://yourportfolio.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                                                </div>
                                          </div>

                                          {/* Buttons */}
                                          <div className="flex gap-4">
                                                <button type="submit" className="px-6 py-2 bg-linear-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:shadow-lg font-medium">
                                                      {editingId ? "Update Member" : "Add Member"}
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

                        {/* Team Members */}
                        {loading ? (
                              <div className="flex justify-center items-center py-20">
                                    <Loader size={40} className="animate-spin text-blue-600" />
                              </div>
                        ) : activemembers.length === 0 ? (
                              <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
                                    <Users size={40} className="mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-xl font-bold text-gray-900">No css members yet</h3>
                                    <p className="text-gray-600 mt-2">CSS members will appear here</p>
                              </div>
                        ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                    {activemembers.map((member) => (
                                          <div key={member._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-gray-200">
                                                {/* Header */}
                                                <div className="h-24 bg-linear-to-r from-blue-500 to-blue-700 flex items-end justify-center pb-4">
                                                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-blue-700">
                                                            <Users size={40} className="text-blue-600" />
                                                      </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6 text-center">
                                                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                                      <p className="text-blue-600 font-medium text-sm mb-3">
                                                            {member.position
                                                                  .split("_")
                                                                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                                  .join(" ")}
                                                      </p>

                                                      {member.bio && <p className="text-gray-600 text-sm mb-4">{member.bio}</p>}

                                                      {/* Contact */}
                                                      <div className="text-sm text-gray-600 space-y-1 mb-4">
                                                            {member.email && (
                                                                  <p className="flex items-center gap-2">
                                                                        <Mail size={16} /> {member.email}
                                                                  </p>
                                                            )}
                                                            {member.phone && (
                                                                  <p className="flex items-center gap-2">
                                                                        <Phone size={16} /> {member.phone}
                                                                  </p>
                                                            )}
                                                      </div>

                                                      {/* Social Links */}
                                                      <div className="flex justify-center gap-3 mb-6">
                                                            {member.socialLinks?.linkedin && (
                                                                  <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 text-blue-600 rounded-full hover:bg-blue-100">
                                                                        <Linkedin size={18} />
                                                                  </a>
                                                            )}
                                                            {member.socialLinks?.github && (
                                                                  <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200">
                                                                        <Github size={18} />
                                                                  </a>
                                                            )}
                                                            {member.socialLinks?.twitter && (
                                                                  <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 text-blue-400 rounded-full hover:bg-blue-50">
                                                                        <Twitter size={18} />
                                                                  </a>
                                                            )}
                                                            {member.socialLinks?.portfolio && (
                                                                  <a href={member.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200">
                                                                        🌐
                                                                  </a>
                                                            )}
                                                      </div>

                                                      {/* Actions */}
                                                      <div className="flex gap-2">
                                                            <button
                                                                  onClick={() => {
                                                                        setSelectedMember(member);
                                                                        setShowModal(true);
                                                                  }}
                                                                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium text-sm"
                                                            >
                                                                  <Eye size={16} />
                                                                  View Profile
                                                            </button>

                                                            {isAdmin && (
                                                                  <>
                                                                        <button onClick={() => handleEditMember(member)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 font-medium text-sm">
                                                                              <Edit size={16} />
                                                                              Edit
                                                                        </button>
                                                                        <button onClick={() => handleDeleteMember(member._id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium text-sm">
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

                        {/* Inactive Members (Admin only) */}
                        {isAdmin && inactiveMembers.length > 0 && (
                              <div className="mt-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Inactive Members</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
                                          {inactiveMembers.map((member) => (
                                                <div key={member._id} className="bg-white rounded-xl shadow-lg border border-gray-300">
                                                      <div className="h-24 bg-gray-300 flex items-end justify-center pb-4">
                                                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-gray-400">
                                                                  <Users size={40} className="text-gray-400" />
                                                            </div>
                                                      </div>

                                                      <div className="p-6 text-center">
                                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                                            <p className="text-gray-500 font-medium text-sm mb-3">Inactive</p>
                                                            <p className="text-gray-600 text-sm mb-6">{member.email}</p>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        )}

                        {error && (
                              <div className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
                                    <AlertCircle size={20} />
                                    <span>{error}</span>
                              </div>
                        )}

                        {/* Team Member Detail Modal */}
                        <DetailModal
                              isOpen={showModal}
                              onClose={() => {
                                    setShowModal(false);
                                    setSelectedMember(null);
                              }}
                              title={selectedMember?.name}
                        >
                              {selectedMember && (
                                    <div className="space-y-6">
                                          {/* Position Badge */}
                                          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                                                {selectedMember.position
                                                      .split("_")
                                                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                      .join(" ")}
                                          </div>

                                          {/* Bio */}
                                          {selectedMember.bio && (
                                                <div>
                                                      <h3 className="font-bold text-gray-900 mb-2">📝 Bio</h3>
                                                      <p className="text-gray-700 leading-relaxed">{selectedMember.bio}</p>
                                                </div>
                                          )}

                                          {/* Contact Information */}
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                      <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                                                            <Mail size={18} /> Email
                                                      </h4>
                                                      <a href={`mailto:${selectedMember.email}`} className="text-blue-600 hover:underline">
                                                            {selectedMember.email}
                                                      </a>
                                                </div>

                                                {selectedMember.phone && (
                                                      <div className="bg-gray-50 p-4 rounded-lg">
                                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                                                                  <Phone size={18} /> Phone
                                                            </h4>
                                                            <a href={`tel:${selectedMember.phone}`} className="text-blue-600 hover:underline">
                                                                  {selectedMember.phone}
                                                            </a>
                                                      </div>
                                                )}
                                          </div>

                                          {/* Social Links */}
                                          <div>
                                                <h3 className="font-bold text-gray-900 mb-3">🔗 Connect On Social</h3>
                                                <div className="flex flex-wrap gap-3">
                                                      {selectedMember.socialLinks?.linkedin && (
                                                            <a href={selectedMember.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                                                                  <Linkedin size={18} /> LinkedIn
                                                            </a>
                                                      )}
                                                      {selectedMember.socialLinks?.github && (
                                                            <a href={selectedMember.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                                                                  <Github size={18} /> GitHub
                                                            </a>
                                                      )}
                                                      {selectedMember.socialLinks?.twitter && (
                                                            <a href={selectedMember.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-400 rounded-lg hover:bg-blue-50">
                                                                  <Twitter size={18} /> Twitter
                                                            </a>
                                                      )}
                                                      {selectedMember.socialLinks?.portfolio && (
                                                            <a href={selectedMember.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                                                                  🌐 Portfolio
                                                            </a>
                                                      )}
                                                </div>
                                          </div>
                                    </div>
                              )}
                        </DetailModal>
                  </div>
            </div>
      );
};
