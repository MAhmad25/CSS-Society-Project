import { ArrowRight } from "lucide-react";
const Events = () => {
      return (
            <section id="events" className="py-24 px-6">
                  <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                              <h2 className="fade-in text-4xl md:text-6xl font-bold mb-4">
                                    How we transformed a small society's <span className="italic font-serif text-blue-900">online presence</span>
                              </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                              <div className="fade-in group cursor-pointer">
                                    <div className="relative overflow-hidden rounded-3xl  aspect-4/3 mb-6">
                                          <img className="w-full h-full object-cover" src="/public/events/1 (1).jpg" alt="" />
                                          <div className="absolute inset-0 flex items-center justify-center"></div>
                                    </div>
                                    <h4 className="text-2xl font-bold mb-2">Tech Taakra 2025</h4>
                                    <p className="text-gray-600 mb-3">Web dev, app dev & innovation challenges</p>
                                    <span className="text-sm text-blue-600 font-medium">Competition • March 2025</span>
                              </div>

                              <div className="fade-in group cursor-pointer">
                                    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-blue-400 aspect-4/3 mb-6">
                                          <img className="w-full h-full object-cover" src="/public/events/1 (7).jpg" alt="" />
                                    </div>
                                    <h4 className="text-2xl font-bold mb-2">Pure Logics</h4>
                                    <p className="text-gray-600 mb-3">Machine Learning & Deep Learning fundamentals</p>
                                    <span className="text-sm text-blue-600 font-medium">Tour •  2025</span>
                              </div>
                        </div>

                        <div className="fade-in bg-gray-900 text-white rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                              <div>
                                    <h3 className="text-3xl font-bold mb-4">See our work in action.</h3>
                                    <p className="text-gray-300 text-lg">Start your creative journey with Us!</p>
                              </div>
                              <div className="flex gap-4">
                                    <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all flex items-center gap-2">
                                          Get Started
                                          <ArrowRight size={18} />
                                    </button>
                                    <button className="px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-gray-900 transition-all">View Portfolio</button>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default Events;
