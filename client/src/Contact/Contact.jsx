import { Mail, Users, Calendar, Facebook, Instagram, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
      return (
            <section id="contact" className="py-24 px-6 bg-white">
                  <div className="max-w-4xl mx-auto text-center">
                        <h2 className="fade-in text-4xl md:text-6xl font-bold mb-8">
                              Let's <span className="italic font-serif text-blue-900">collaborate</span>
                        </h2>
                        <p className="fade-in text-xl text-gray-600 mb-12 max-w-2xl mx-auto">Ready to join the leading CS society? Get in touch and start your journey with us.</p>

                        <div className="fade-in grid md:grid-cols-3 gap-6 mb-12">
                              <div className="p-8 bg-gray-50 rounded-3xl text-left">
                                    <Mail className="text-blue-600 mb-4" size={32} />
                                    <h4 className="font-bold mb-2">Email</h4>
                                    <Link to="mailto:css@gcu.edu.pk" className="text-blue-700">
                                          css@gcu.edu.pk
                                    </Link>
                              </div>
                              <div className="p-8 bg-gray-50 rounded-3xl text-left">
                                    <Users className="text-blue-600 mb-4" size={32} />
                                    <h4 className="font-bold mb-2">Location</h4>
                                    <p className="text-gray-600">GC University, Lahore</p>
                              </div>
                              <div className="p-8 bg-gray-50 rounded-3xl text-left">
                                    <Calendar className="text-blue-600 mb-4" size={32} />
                                    <h4 className="font-bold mb-2">Office Hours</h4>
                                    <p className="text-gray-600">Mon-Fri, 9AM-5PM</p>
                              </div>
                        </div>

                        <div className="fade-in flex justify-center gap-4">
                              <Link to="https://www.facebook.com/CSSGCU" target="__blank" className="w-14 h-14 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-all">
                                    <Facebook className="text-white" size={22} />
                              </Link>
                              <Link to="https://www.instagram.com/css.gcu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="__blank" className="w-14 h-14 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-all">
                                    <Instagram className="text-white" size={22} />
                              </Link>
                              <Link to="https://www.linkedin.com/company/computer-science-society-gcu/about/" target="__blank" className="w-14 h-14 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-all">
                                    <Linkedin className="text-white" size={22} />
                              </Link>
                        </div>
                  </div>
            </section>
      );
};

export default Contact;
