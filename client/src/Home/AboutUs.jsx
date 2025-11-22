import { ArrowRight } from "lucide-react";

const AboutUs = () => {
      return (
            <section id="about" className="py-24 px-6 bg-white">
                  <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                              <div className="fade-in">
                                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                          Where innovation meets <span className="italic font-serif text-blue-900">excellence</span>
                                    </h2>
                                    <p className="text-lg text-gray-600 leading-relaxed mb-6">The Computer Science Society (CSS) of GC University was established in 2002 by Professor Iftikhar Hussain Shah with a vision to create a platform that fosters innovation, learning, and leadership among computer science students.</p>
                                    <p className="text-lg text-gray-600 leading-relaxed mb-8">We bridge the gap between academics and industry through workshops, competitions, and networking events that prepare students for real-world challenges.</p>
                              </div>
                              <div className="fade-in">
                                    <img src="/events/1 (2).jpg" alt="CSS Team" className="rounded-3xl w-full shadow-2xl" />
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default AboutUs;
