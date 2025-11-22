import React from "react";

const MissionVision = () => {
      return (
            <section id="about" className="py-24 px-6">
                  <div className="max-w-5xl mx-auto text-center">
                        <h2 className="fade-in text-3xl sm:text-5xl  font-bold mb-8 leading-tight">
                              Crafting exceptional, well-experienced & technology driven strategies to drive <span className="italic font-serif text-blue-900">impactful results</span>
                        </h2>

                        <div className="fade-in flex flex-wrap justify-center gap-3 mb-16">
                              <span className="px-6 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">✨ Creativity</span>
                              <span className="px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">💡 Innovation</span>
                              <span className="px-6 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">🎯 Strategy</span>
                        </div>

                        <div className="fade-in grid md:grid-cols-5 gap-6">
                              <div className="bg-purple-50 p-8 rounded-3xl text-left hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-3">🎨</div>
                                    <h4 className="font-bold text-gray-900 mb-2">Brand Strategy</h4>
                                    <p className="text-sm text-gray-600">Building CSS identity</p>
                              </div>
                              <div className="bg-pink-50 p-8 rounded-3xl text-left hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-3">🚀</div>
                                    <h4 className="font-bold text-gray-900 mb-2">Web Development</h4>
                                    <p className="text-sm text-gray-600">Digital presence</p>
                              </div>
                              <div className="bg-blue-50 p-8 rounded-3xl text-left hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-3">📱</div>
                                    <h4 className="font-bold text-gray-900 mb-2">Digital Marketing</h4>
                                    <p className="text-sm text-gray-600">Social engagement</p>
                              </div>
                              <div className="bg-yellow-50 p-8 rounded-3xl text-left hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-3">🎯</div>
                                    <h4 className="font-bold text-gray-900 mb-2">UX/UI Design</h4>
                                    <p className="text-sm text-gray-600">User experience</p>
                              </div>
                              <div className="bg-green-50 p-8 rounded-3xl text-left hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-3">📊</div>
                                    <h4 className="font-bold text-gray-900 mb-2">Analytics & Reporting</h4>
                                    <p className="text-sm text-gray-600">Data insights</p>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default MissionVision;
