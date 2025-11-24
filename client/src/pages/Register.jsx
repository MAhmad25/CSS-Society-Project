import { useState } from "react";
import { registrationAPI } from "../services/api";

const Register = () => {
      const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");

      const handleChange = (e) => {
            const { id, value } = e.target;
            setForm((s) => ({ ...s, [id]: value }));
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setError("");
            setSuccess("");

            // Basic validation
            if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.subject.trim()) {
                  setError("Please fill in all required fields");
                  return;
            }

            // Email basic regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(form.email.trim())) {
                  setError("Please provide a valid email address");
                  return;
            }

            setLoading(true);
            try {
                  const dataToSend = {
                        firstName: form.firstName.trim(),
                        lastName: form.lastName.trim(),
                        email: form.email.trim(),
                        subject: form.subject.trim(),
                        message: form.message.trim() || undefined,
                  };

                  await registrationAPI.createRegistration(dataToSend);
                  setSuccess("Registration submitted successfully. We'll contact you soon.");
                  setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
            } catch (err) {
                  console.error("Registration error:", err);
                  if (err.response?.data?.data && Array.isArray(err.response.data.data)) {
                        setError(err.response.data.data.map((d) => d.msg).join(", "));
                  } else {
                        setError(err.response?.data?.message || "Failed to submit registration");
                  }
            } finally {
                  setLoading(false);
            }
      };

      return (
            <section className="py-32 bg-background">
                  <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl">
                              <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-lg border border-gray-200 p-10 bg-white shadow-sm">
                                    {error && <div className="text-red-700 bg-red-50 p-3 rounded">{error}</div>}
                                    {success && <div className="text-green-700 bg-green-50 p-3 rounded">{success}</div>}
                                    <div className="flex gap-4">
                                          <div className="grid w-full items-center gap-1.5">
                                                <label htmlFor="firstName" className="text-sm font-medium">
                                                      First Name
                                                </label>
                                                <input id="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="First Name" className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                          </div>
                                          <div className="grid w-full items-center gap-1.5">
                                                <label htmlFor="lastName" className="text-sm font-medium">
                                                      Last Name
                                                </label>
                                                <input id="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Last Name" className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                          </div>
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                          <label htmlFor="email" className="text-sm font-medium">
                                                Email
                                          </label>
                                          <input id="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                          <label htmlFor="subject" className="text-sm font-medium">
                                                Subject
                                          </label>
                                          <input id="subject" value={form.subject} onChange={handleChange} type="text" placeholder="Subject" className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    </div>
                                    <div className="grid w-full gap-1.5">
                                          <label htmlFor="message" className="text-sm font-medium">
                                                Message (optional)
                                          </label>
                                          <textarea id="message" value={form.message} onChange={handleChange} placeholder="Type your message here." className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                                    </div>
                                    <button disabled={loading} type="submit" className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                          {loading ? "Submitting..." : "Register for membership"}
                                    </button>
                              </form>
                        </div>
                  </div>
            </section>
      );
};

export default Register;
