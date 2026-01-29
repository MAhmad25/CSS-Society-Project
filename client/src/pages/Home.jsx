import { useEffect } from "react";
import Events from "../Events/Events";
import Team from "../Team/Team";
import Announcement from "../Announcements/Announcement";
import Contact from "../Contact/Contact";
import Register from "../pages/Register";
import AboutUS from "../Home/AboutUs";
import { DotScreenShader } from "../components/DotGradient";
import useScrollTop from "../hooks/useScrollTop";

export const Home = () => {
  useScrollTop();
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
      { threshold: 0.1 },
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
      {/* Floating Images */}
      <section
        id="home"
        className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 pt-32 pb-20 rounded-b-xl"
      >
        <div className="absolute w-28 h-28 sm:w-40 sm:h-40 z-10 top-28 left-10  sm:left-40 rotate-12 overflow-hidden rounded-xl">
          <img
            className="w-full h-full object-cover"
            src="/events/1 (8).webp"
            alt="Images"
          />
        </div>
        <div className="absolute w-28 h-28 sm:w-40 sm:h-40 z-10 top-28 left-10  sm:left-40 overflow-hidden rounded-xl">
          <img
            className="w-full h-full object-cover"
            src="/events/1 (10).webp"
            alt="Images"
          />
        </div>
        <div className="absolute w-28 h-28 sm:w-40 sm:h-40 z-10 bottom-20 right-10 sm:right-30 overflow-hidden rounded-xl">
          <img
            className="w-full h-full object-cover"
            src="/events/1 (12).webp"
            alt="Images"
          />
        </div>
        <div className="absolute w-28 h-28 sm:w-40 sm:h-40 z-10 bottom-20 right-10 sm:right-30 -rotate-12  overflow-hidden rounded-xl">
          <img
            className="w-full h-full object-cover"
            src="/events/1 (14).webp"
            alt="Images"
          />
        </div>
        <div className="absolute inset-0  flex flex-col justify-center items-center">
          <div className="absolute  w-full px-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none sm:w-1/2 text-center space-y-10 pt-10 inset-0  flex flex-col justify-center items-center">
            <h1
              className="
    animate-fade-in text-center -translate-y-4
    text-5xl md:text-7xl font-semibold leading-none
    bg-clip-text text-transparent
    bg-linear-to-b from-gray-900 to-gray-900
    dark:from-gray-900 dark:to-gray-900
    font-Regular
  "
            >
              Join the Computer Science Society
            </h1>
            <p className="text-center font-semibold text-pretty">
              Learn with peers, work on real projects, and get mentorship that
              helps you land internships and build a stronger portfolio. We turn
              curiosity into real skills fast.
            </p>
          </div>
          <DotScreenShader />
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
      <section
        id="contact"
        className="fade-in py-5 px-6 bg-white/50 backdrop-blur border-t border-gray-200"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Register for Membership
            </h2>
            <p className="text-gray-600 mt-2">
              Have a question or want to collaborate? Send us a message and
              we'll get back to you.
            </p>
          </div>
          <div className="mx-auto">
            <Register />
          </div>
        </div>
      </section>
    </div>
  );
};
