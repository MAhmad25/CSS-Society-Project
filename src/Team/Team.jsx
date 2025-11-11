import { Linkedin, Github } from "lucide-react";

const Team = () => {
      return (
            <section id="team" className="py-24 px-6 bg-white">
                  <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                              <h2 className="fade-in text-4xl md:text-6xl font-bold mb-4">
                                    Meet the creative minds behind <span className="italic font-serif text-blue-900">our success</span>
                              </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                              {[
                                    { name: "Maryam Gondal", role: "President", img: "/public/images/547753449_18066317705520974_4763108498937192760_n.webp", color: "from-blue-500 to-purple-500" },
                                    { name: "Zain Amir", role: "Vice President Operations", img: "/public/images/Zain amr.webp", color: "from-orange-400 to-pink-400" },
                                    { name: "Laiba Akram", role: "Vice President Logistics", img: "/public/images/laiba.webp", color: "from-yellow-400 to-orange-400" },
                                    { name: "Jibran Akhtar", role: "General Manager", img: "/public/images/Jibran.webp", color: "from-cyan-400 to-blue-400" },
                                    { name: "Rabail Ali", role: "General Secretary", img: "/public/images/Rabail.webp", color: "from-cyan-400 to-blue-400" },
                                    { name: "Muntaha Hamid", role: "Society Manager", img: "/public/images/muntaha.webp", color: "from-cyan-400 to-blue-400" },
                                    { name: "Muhmmad Shahroz", role: "Event Coordinator", img: "/public/images/shehroz.webp", color: "from-cyan-400 to-blue-400" },
                                    { name: "Faizan E Bahoo", role: "Information Secretary", img: "/public/images/faizan.webp", color: "from-cyan-400 to-blue-400" },
                              ].map((member, i) => (
                                    <div key={i} className="fade-in text-center group cursor-pointer">
                                          <div className={`relative w-full aspect-square rounded-3xl overflow-hidden mb-4 bg-linear-to-br ${member.color}`}>
                                                <img src={member.img} alt={member.name} className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500" />
                                          </div>
                                          <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                                          <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                                          <div className="flex justify-center gap-2">
                                                <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                                                      <Linkedin size={16} />
                                                </a>
                                                <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                                                      <Github size={16} />
                                                </a>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        <div className="fade-in bg-linear-to-br from-blue-900 to-blue-700 rounded-3xl p-12 text-white">
                              <div className="grid md:grid-cols-3 gap-8 items-center">
                                    <div className="md:col-span-1">
                                          <img src="/public/images/tauseef.webp" alt="Dr. Tauseef Iftikhar" className="rounded-2xl w-full" />
                                    </div>
                                    <div className="md:col-span-2">
                                          <span className="inline-block px-4 py-1.5 bg-yellow-400 text-blue-900 rounded-full text-sm font-bold mb-4">Faculty Advisor</span>
                                          <h3 className="text-4xl font-bold mb-3">Dr. Tauseef Iftikhar</h3>
                                          <p className="text-blue-100 text-lg mb-4">Assistant Professor</p>
                                          <p className="text-blue-50 leading-relaxed">The guiding force behind CSS, Dr. Tauseef Iftikhar combines wisdom with approachability, inspiring students to push their limits and achieve excellence in technology.</p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default Team;
