import { useEffect } from "react";
import Events from "../Events/Events";
import Team from "../Team/Team";
import Announcement from "../Announcements/Announcement";
import Contact from "../Contact/Contact";
import MissionVision from "../Home/MissionVision";
import AboutUS from "../Home/AboutUs";
import { Link } from "react-router-dom";

export const Home = () => {
      useEffect(() => {
            const observer = new IntersectionObserver(
                  (entries) => {
                        entries.forEach((entry) => {
                              if (entry.isIntersecting) {
                                    entry.target.style.opacity = "1";
                                    entry.target.style.transform = "translateY(0)";
                              }
                        });
                  },
                  { threshold: 0.1 }
            );

            document.querySelectorAll(".fade-in").forEach((el) => {
                  el.style.opacity = "0";
                  el.style.transform = "translateY(40px)";
                  el.style.transition = "opacity 1s ease, transform 1s ease";
                  observer.observe(el);
            });

            return () => observer.disconnect();
      }, []);

      return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50 text-gray-900">
                  {/* Hero Section */}
                  <section id="home" className="min-h-screen relative flex items-center justify-center px-6 pt-32 pb-20">
                        <div className="absolute inset-0">
                              <video loop autoPlay muted preload="auto" className="w-full h-full object-cover" src="/video.mp4" aria-hidden="true" />
                        </div>
                        <div className="max-w-6xl mx-auto text-center">
                              <div className="fade-in flex flex-col sm:flex-row items-center justify-center gap-6"></div>
                        </div>
                  </section>

                  <section className="py-16 px-6 border-y border-gray-200 bg-white/50 backdrop-blur">
                        <div className="max-w-6xl mx-auto">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    <div className="fade-in text-center">
                                          <div className="text-5xl font-bold text-gray-900 mb-2">+500</div>
                                          <div className="text-sm text-gray-600">Active Members</div>
                                    </div>
                                    <div className="fade-in text-center">
                                          <div className="text-5xl font-bold text-gray-900 mb-2">+50</div>
                                          <div className="text-sm text-gray-600">Annual Events</div>
                                    </div>
                                    <div className="fade-in text-center">
                                          <div className="text-5xl font-bold text-gray-900 mb-2">+10</div>
                                          <div className="text-sm text-gray-600">Partner Companies</div>
                                    </div>
                              </div>
                        </div>
                  </section>
                  <MissionVision />
                  <AboutUS />
                  {/* Events Section */}
                  <Events />
                  {/* Team Section */}
                  <Team />
                  {/* Announcements Section */}
                  <Announcement />
                  {/* Contact Section */}
                  <Contact />
                  {/* Contact Section */}
                  <section id="contact" className="fade-in py-20 px-6 bg-white/50 backdrop-blur border-t border-gray-200">
                        <div className="max-w-6xl mx-auto">
                              <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
                                    <p className="text-gray-600 mt-2">Have a question or want to collaborate? Send us a message and we'll get back to you.</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                                    {/* Contact Details */}
                                    <div className="space-y-6">
                                          <div className="p-6 bg-linear-to-br from-blue-50 to-white rounded-xl border border-gray-100 shadow-sm">
                                                <h3 className="font-semibold text-lg text-gray-900 mb-2">Contact Information</h3>
                                                <p className="text-sm text-gray-600">GC University Lahore</p>
                                                <p className="text-sm text-gray-600">Katchery Road</p>
                                                <p className="text-sm text-gray-600">
                                                      Email:{" "}
                                                      <a href="mailto:css@gcu.edu.pk" className="text-blue-600 hover:underline">
                                                            css@gcu.edu.pk
                                                      </a>
                                                </p>
                                                <p className="text-sm text-gray-600">Office Hours: Mon - Fri, 9:00 AM - 5:00 PM</p>
                                          </div>

                                          <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm">
                                                <h4 className="font-medium text-gray-900 mb-3">Follow Us</h4>
                                                <div className="flex items-center gap-4">
                                                      <Link to="https://www.facebook.com/CSSGCU" className="text-gray-600 hover:text-blue-600" href="#" aria-label="Facebook">
                                                            Facebook
                                                      </Link>
                                                      <Link to="https://www.instagram.com/css.gcu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-600 hover:text-blue-600" href="#" aria-label="Instagram">
                                                            Instagram
                                                      </Link>
                                                      <Link to="https://www.linkedin.com/company/computer-science-society-gcu/about/" className="text-gray-600 hover:text-blue-600" href="#" aria-label="LinkedIn">
                                                            LinkedIn
                                                      </Link>
                                                </div>
                                          </div>
                                    </div>

                                    {/* Contact Form */}
                                    <form
                                          onSubmit={(e) => {
                                                e.preventDefault();
                                                const form = e.target;
                                                const name = form.name.value.trim();
                                                const email = form.email.value.trim();
                                                const subject = form.subject.value.trim() || "Message from CSS Website";
                                                const message = form.message.value.trim();

                                                if (!name || !email || !message) {
                                                      alert("Please fill in your name, email and message.");
                                                      return;
                                                }

                                                const mailto = `mailto:css@gcu.edu.pk?subject=${encodeURIComponent(subject + " — from " + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

                                                // Open user's email client with prefilled content
                                                window.location.href = mailto;
                                          }}
                                          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
                                    >
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <label className="flex flex-col">
                                                      <span className="text-sm text-gray-700 mb-1">Name</span>
                                                      <input name="name" type="text" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Your name" />
                                                </label>
                                                <label className="flex flex-col">
                                                      <span className="text-sm text-gray-700 mb-1">Email</span>
                                                      <input name="email" type="email" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="you@domain.com" />
                                                </label>
                                          </div>

                                          <label className="flex flex-col mt-4">
                                                <span className="text-sm text-gray-700 mb-1">Subject</span>
                                                <input name="subject" type="text" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Subject (optional)" />
                                          </label>

                                          <label className="flex flex-col mt-4">
                                                <span className="text-sm text-gray-700 mb-1">Message</span>
                                                <textarea name="message" rows="6" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Write your message..." />
                                          </label>

                                          <div className="mt-6 flex items-center gap-4">
                                                <button type="submit" className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition">
                                                      Send Message
                                                </button>
                                                <button
                                                      type="button"
                                                      onClick={() => {
                                                            const form = document.querySelector("#contact form");
                                                            if (form) form.reset();
                                                      }}
                                                      className="px-4 py-3 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
                                                >
                                                      Reset
                                                </button>
                                          </div>

                                          <p className="text-sm text-gray-500 mt-4">
                                                Or email us directly at{" "}
                                                <a href="mailto:css@gcu.edu.pk" className="text-blue-600 hover:underline">
                                                      css@gcu.edu.pk
                                                </a>
                                          </p>
                                    </form>
                              </div>
                        </div>
                  </section>
            </div>
      );
};
