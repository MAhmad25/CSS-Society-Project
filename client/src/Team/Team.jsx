import { createContext, useContext, useState, useCallback, forwardRef } from "react";
import { motion, MotionConfig } from "motion/react";

function splitText(text) {
      const words = text.split(" ").map((word) => word.concat(" "));
      const characters = words.map((word) => word.split("")).flat(1);

      return {
            words,
            characters,
      };
}

const HoverSliderContext = createContext(undefined);

function useHoverSliderContext() {
      const context = useContext(HoverSliderContext);
      if (context === undefined) {
            throw new Error("useHoverSliderContext must be used within a HoverSliderProvider");
      }
      return context;
}

const HoverSlider = forwardRef(({ children, className }) => {
      const [activeSlide, setActiveSlide] = useState(0);
      const changeSlide = useCallback((index) => setActiveSlide(index), [setActiveSlide]);
      return (
            <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
                  <div className={className}>{children}</div>
            </HoverSliderContext.Provider>
      );
});
HoverSlider.displayName = "HoverSlider";

const TextStaggerHover = forwardRef(({ text, index, className, ...props }, ref) => {
      const { activeSlide, changeSlide } = useHoverSliderContext();
      const { characters } = splitText(text);
      const isActive = activeSlide === index;
      const handleMouse = () => changeSlide(index);

      return (
            <span className={`relative inline-block origin-bottom overflow-hidden ${className || ""}`} {...props} ref={ref} onMouseEnter={handleMouse}>
                  {characters.map((char, idx) => (
                        <span key={`${char}-${idx}`} className="relative inline-block overflow-hidden">
                              <MotionConfig
                                    transition={{
                                          delay: idx * 0.025,
                                          duration: 0.3,
                                          ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                              >
                                    <motion.span className="inline-block opacity-20 text-black" initial={{ y: "0%" }} animate={isActive ? { y: "-110%" } : { y: "0%" }}>
                                          {char}
                                          {char === " " && idx < characters.length - 1 && <>&nbsp;</>}
                                    </motion.span>

                                    <motion.span className="absolute left-0 text-black top-0 inline-block opacity-100" initial={{ y: "110%", color: "black" }} animate={isActive ? { y: "0%" } : { y: "110%", color: "gray" }}>
                                          {char}
                                    </motion.span>
                              </MotionConfig>
                        </span>
                  ))}
            </span>
      );
});
TextStaggerHover.displayName = "TextStaggerHover";

const clipPathVariants = {
      visible: {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      hidden: {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
      },
};

const HoverSliderImageWrap = forwardRef(({ className, ...props }, ref) => {
      return <div ref={ref} className={`grid  [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full ${className || ""}`} {...props} />;
});
HoverSliderImageWrap.displayName = "HoverSliderImageWrap";

const HoverSliderImage = forwardRef(({ index, className, ...props }, ref) => {
      const { activeSlide } = useHoverSliderContext();
      return <motion.img className={`inline-block align-middle ${className || ""}`} transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }} variants={clipPathVariants} animate={activeSlide === index ? "visible" : "hidden"} ref={ref} {...props} />;
});
HoverSliderImage.displayName = "HoverSliderImage";

const TEAM_MEMBERS = [
      { name: "Maryam Gondal", role: "President", img: "/images/547753449_18066317705520974_4763108498937192760_n.webp" },
      { name: "Zain Amir", role: "Vice President Operations", img: "/images/Zain amr.webp" },
      { name: "Laiba Akram", role: "Vice President Logistics", img: "/images/laiba.webp" },
      { name: "Jibran Akhtar", role: "General Manager", img: "/images/Jibran.webp" },
      { name: "Rabail Ali", role: "General Secretary", img: "/images/Rabail.webp" },
      { name: "Muntaha Hamid", role: "Society Manager", img: "/images/muntaha.webp" },
      { name: "Muhmmad Shahroz", role: "Event Coordinator", img: "/images/shehroz.webp" },
      { name: "Faizan E Bahoo", role: "Information Secretary", img: "/images/faizan.webp" },
];

export default function Team() {
      return (
            <HoverSlider className="min-h-screen overflow-hidden flex flex-col gap-5 items-center justify-center p-6 md:px-12">
                  <div className="max-w-7xl w-full">
                        <h1 className="mb-20 text-5xl font-medium text-center capitalize font-Regular tracking-wide">Meat Our Team</h1>
                        <div className="flex flex-wrap items-center justify-evenly gap-6 md:gap-12">
                              <div className="flex flex-col space-y-2 md:space-y-4">
                                    {TEAM_MEMBERS.map((member, index) => (
                                          <div key={member.name} className="flex flex-col">
                                                <TextStaggerHover index={index} className="cursor-pointer selection:bg-gray-300 text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white" text={member.name} />
                                                <span className="text-sm  ml-1">{member.role}</span>
                                          </div>
                                    ))}
                              </div>
                              <HoverSliderImageWrap>
                                    {TEAM_MEMBERS.map((member, index) => (
                                          <div key={member.name} className="relative -top-[250%]  sm:inset-0 -right-30">
                                                <HoverSliderImage index={index} imageUrl={member.img} src={member.img} alt={member.name} className="size-full max-h-96 sm:w-80 w-30 object-cover rounded-lg shadow-2xl" loading="eager" decoding="async" />
                                                <div className={`absolute inset-0  opacity-20 rounded-lg`}></div>
                                          </div>
                                    ))}
                              </HoverSliderImageWrap>
                        </div>
                  </div>
                  <div className="fade-in bg-linear-to-br from-blue-900 to-blue-700 rounded-3xl p-12 text-white">
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                              <div className="md:col-span-1">
                                    <img src="/images/tauseef.webp" alt="Dr. Tauseef Iftikhar" className="rounded-2xl w-full" />
                              </div>
                              <div className="md:col-span-2">
                                    <span className="inline-block px-4 py-1.5 bg-yellow-400 text-blue-900 rounded-full text-sm font-bold mb-4">Faculty Advisor</span>
                                    <h3 className="text-4xl font-bold mb-3">Dr. Tauseef Iftikhar</h3>
                                    <p className="text-blue-100 text-lg mb-4">Assistant Professor</p>
                                    <p className="text-blue-50 leading-relaxed">The guiding force behind CSS, Dr. Tauseef Iftikhar combines wisdom with approachability, inspiring students to push their limits and achieve excellence in technology.</p>
                              </div>
                        </div>
                  </div>
            </HoverSlider>
      );
}
