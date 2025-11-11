const Announcement = () => {
      return (
            <section id="announcements" className="py-24 px-6">
                  <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                              <h2 className="fade-in text-4xl md:text-6xl font-bold mb-4">
                                    What our satisfied students are saying <span className="italic font-serif text-blue-900">about us</span>
                              </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                              <div className="fade-in bg-gray-900 text-white p-10 rounded-3xl">
                                    <p className="text-xl leading-relaxed mb-8">"CSS has completely transformed my approach to tech. The workshops and competitions gave me real-world skills that landed me my first internship."</p>
                                    <div className="flex items-center gap-4">
                                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="" className="w-14 h-14 rounded-full" />
                                          <div>
                                                <div className="font-bold">Ahmed Hassan</div>
                                                <div className="text-sm text-gray-400">CS Senior, GCU</div>
                                          </div>
                                    </div>
                              </div>

                              <div className="fade-in bg-yellow-300 text-gray-900 p-10 rounded-3xl">
                                    <div className="text-6xl font-bold mb-4">91%</div>
                                    <p className="text-xl font-bold">Students recommend our events & workshops</p>
                              </div>

                              <div className="fade-in bg-white border-2 border-gray-200 p-10 rounded-3xl">
                                    <p className="text-lg leading-relaxed mb-8 text-gray-700">"Their dedication and attention to detail transformed our brand presence online with creativity and technical excellence."</p>
                                    <div className="flex items-center gap-4">
                                          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="" className="w-14 h-14 rounded-full" />
                                          <div>
                                                <div className="font-bold">Fatima Khan</div>
                                                <div className="text-sm text-gray-600">VP, CSS</div>
                                          </div>
                                    </div>
                              </div>

                              <div className="fade-in bg-white border-2 border-gray-200 p-10 rounded-3xl">
                                    <p className="text-lg leading-relaxed mb-8 text-gray-700">"Joining CSS was the best decision. I've learned so much and made connections that will last a lifetime."</p>
                                    <div className="flex items-center gap-4">
                                          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" alt="" className="w-14 h-14 rounded-full" />
                                          <div>
                                                <div className="font-bold">Ali Raza</div>
                                                <div className="text-sm text-gray-600">Technical Lead</div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default Announcement;
