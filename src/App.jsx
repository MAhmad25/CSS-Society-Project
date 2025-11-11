import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import MissionVision from "./Home/MissionVision";
import Events from "./Events/Events";
import Team from "./Team/Team";
import Announcement from "./Announcements/Announcement";
import Contact from "./Contact/Contact";
import Squares from "./Squares/Squares";

const App = () => {
      const [activeSection, setActiveSection] = useState("home");
      const [scrolled, setScrolled] = useState(false);
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      useEffect(() => {
            const handleScroll = () => {
                  setScrolled(window.scrollY > 50);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
      }, []);

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

      const navigation = [
            { name: "Home", id: "home" },
            { name: "About", id: "about" },
            { name: "Events", id: "events" },
            { name: "Team", id: "team" },
            { name: "Reviews", id: "announcements" },
            { name: "Contact", id: "contact" },
      ];

      const scrollToSection = (id) => {
            const element = document.getElementById(id);
            if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                  setActiveSection(id);
                  setIsMenuOpen(false);
            }
      };

      return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50 text-gray-900">
                  {/* Floating Navigation */}
                  <nav className="fixed top-0 left-0 right-0 z-50">
                        <div className={`hidden lg:flex items-center gap-2 bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-full px-3 py-3 shadow-xl shadow-gray-900/5 fixed top-8 left-1/2 -translate-x-1/2 transition-all duration-500 ${scrolled ? "top-4 scale-95" : ""}`}>
                              <div className="px-4 flex items-center gap-2 mr-2">
                                    <div className="w-9 h-9 bg-linear-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center">
                                          <img src="/images/logo.jpg" className="text-yellow-400 font-bold text-sm"></img>
                                    </div>
                                    <span className="font-bold text-gray-900">CSS</span>
                              </div>
                              {navigation.map((item) => (
                                    <button key={item.id} onClick={() => scrollToSection(item.id)} className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${activeSection === item.id ? "bg-gray-900 text-white shadow-lg" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}>
                                          {item.name}
                                    </button>
                              ))}
                        </div>

                        <button className="lg:hidden fixed top-6 right-6 w-14 h-14 bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-full flex items-center justify-center shadow-xl z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>

                        {isMenuOpen && (
                              <div className="lg:hidden fixed inset-0 bg-white/98 backdrop-blur-xl pt-28 px-8 z-40">
                                    <div className="space-y-3">
                                          {navigation.map((item) => (
                                                <button key={item.id} onClick={() => scrollToSection(item.id)} className={`block w-full text-left py-4 px-6 rounded-3xl text-lg font-medium transition-all ${activeSection === item.id ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-50"}`}>
                                                      {item.name}
                                                </button>
                                          ))}
                                    </div>
                              </div>
                        )}
                  </nav>

                  {/* Hero Section */}
                  <section id="home" className="min-h-screen relative flex items-center justify-center px-6 pt-32 pb-20">
                        <div className="absolute inset-0">
                              <Squares />
                        </div>
                        <div className="max-w-6xl mx-auto text-center">
                              <div className="fade-in mb-8">
                                    <span className="inline-block px-5 py-2 bg-white backdrop-blur border border-gray-200/60 text-gray-700 rounded-full text-sm font-medium shadow-sm">Est. 2002 • GC University Lahore</span>
                              </div>

                              <h1 className="fade-in text-3xl md:text-5xl   font-bold mb-6 leading-[1.1] tracking-tight">
                                    Welcome to the Computer Science Society
                                    <br />
                                    <span className="italic font-serif text-blue-900"></span>
                              </h1>

                              <p className="fade-in text-lg md:text-xl text-gray-600 font-semibold max-w-3xl mx-auto mb-12 leading-relaxed">From Curiosity to Creativity That's the CSS Way.</p>

                              <div className="fade-in flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <button onClick={() => scrollToSection("events")} className="group relative px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 flex items-center gap-3">
                                          Explore Events
                                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                                <ArrowRight className="text-blue-600 group-hover:translate-x-0.5 transition-transform" size={20} />
                                          </div>
                                    </button>
                              </div>
                        </div>
                  </section>

                  {/* Stats Section */}
                  <section className="py-16 px-6 border-y border-gray-200 bg-white/50 backdrop-blur">
                        <div className="max-w-6xl mx-auto">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    <div className="fade-in text-center">
                                          <div className="text-5xl font-bold text-gray-900 mb-2">+20</div>
                                          <div className="text-sm text-gray-600">Years of Excellence</div>
                                    </div>
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

                  {/* Mission Section */}
                  <MissionVision />
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
                                                      <a className="text-gray-600 hover:text-blue-600" href="#" aria-label="Facebook">
                                                            Facebook
                                                      </a>
                                                      <a className="text-gray-600 hover:text-blue-600" href="#" aria-label="Twitter">
                                                            Twitter
                                                      </a>
                                                      <a className="text-gray-600 hover:text-blue-600" href="#" aria-label="Instagram">
                                                            Instagram
                                                      </a>
                                                      <a className="text-gray-600 hover:text-blue-600" href="#" aria-label="LinkedIn">
                                                            LinkedIn
                                                      </a>
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
                  {/* Footer */}
                  <footer className="bg-gray-900 text-white py-16 px-6">
                        <div className="max-w-6xl mx-auto">
                              <div className="grid md:grid-cols-4 gap-12 mb-12">
                                    <div>
                                          <div className="flex items-center gap-2 mb-4">
                                                <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center">
                                                      <img src="/images/logo.jpg" className="text-white font-bold" />
                                                </div>
                                                <span className="font-bold text-lg">CSS GCU</span>
                                          </div>
                                          <p className="text-gray-400 text-sm leading-relaxed">Empowering future technologists since 2002</p>
                                    </div>

                                    <div>
                                          <h4 className="font-bold mb-4">Quick Links</h4>
                                          <ul className="space-y-2 text-gray-400 text-sm">
                                                <li>
                                                      <a href="#home" className="hover:text-white transition-colors">
                                                            Home
                                                      </a>
                                                </li>
                                                <li>
                                                      <a href="#about" className="hover:text-white transition-colors">
                                                            About
                                                      </a>
                                                </li>
                                                <li>
                                                      <a href="#events" className="hover:text-white transition-colors">
                                                            Events
                                                      </a>
                                                </li>
                                                <li>
                                                      <a href="#team" className="hover:text-white transition-colors">
                                                            Team
                                                      </a>
                                                </li>
                                          </ul>
                                    </div>

                                    <div>
                                          <h4 className="font-bold mb-4">Resources</h4>
                                          <ul className="space-y-2 text-gray-400 text-sm">
                                                <li>
                                                      <a href="#" className="hover:text-white transition-colors">
                                                            Join CSS
                                                      </a>
                                                </li>
                                                <li>
                                                      <a href="#" className="hover:text-white transition-colors">
                                                            Newsletters
                                                      </a>
                                                </li>
                                                <li>
                                                      <a href="#" className="hover:text-white transition-colors">
                                                            Gallery
                                                      </a>
                                                </li>
                                                <li>
                                                      <a href="#" className="hover:text-white transition-colors">
                                                            FAQs
                                                      </a>
                                                </li>
                                          </ul>
                                    </div>

                                    <div>
                                          <h4 className="font-bold mb-4">Contact</h4>
                                          <ul className="space-y-2 text-gray-400 text-sm">
                                                <li>GC University Lahore</li>
                                                <li>Katchery Road</li>
                                                <li>css@gcu.edu.pk</li>
                                          </ul>
                                    </div>
                              </div>

                              <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                                    <p className="text-gray-400 text-sm">© 2025 Computer Science Society, GC University Lahore</p>
                                    <p className="text-gray-400 text-sm">Crafted with 💙 by CSS Tech Team</p>
                              </div>
                        </div>
                  </footer>
            </div>
      );
};

export default App;
