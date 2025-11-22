"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";

const items = [
      {
            id: 1,
            url: "/events/1 (1).jpg",
            title: "Misty Mountain Majesty",
      },
      {
            id: 2,
            url: "/events/1 (2).jpg",
            title: "Winter Wonderland",
      },
      {
            id: 3,
            url: "/events/1 (3).jpg",
            title: "Autumn Mountain Retreat",
      },
      {
            id: 4,
            url: "/events/1 (4).jpg",
            title: "Tranquil Lake Reflection",
      },
      {
            id: 5,
            url: "/events/1 (5).jpg",
            title: "Misty Mountain Peaks",
      },
      {
            id: 6,
            url: "/events/1 (6).jpg",
            title: "Golden Hour Glow",
      },
      {
            id: 7,
            url: "/events/1 (7).jpg",
            title: "Snowy Mountain Highway",
      },
      {
            id: 8,
            url: "/events/1 (8).jpg",
            title: "Foggy Mountain Forest",
      },
];

export default function Events() {
      const [index, setIndex] = useState(0);
      const containerRef = useRef(null);

      const x = useMotionValue(0);

      useEffect(() => {
            if (containerRef.current) {
                  const containerWidth = containerRef.current.offsetWidth || 1;
                  const targetX = -index * containerWidth;

                  animate(x, targetX, {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                  });
            }
      }, [index, x]);

      return (
            <div className="lg:p-10 sm:p-4 p-2  max-w-4xl mx-auto">
                  <h1 className="text-3xl sm:text-5xl font-bold font-Regular mb-10 text-center">Slide Through Our Successful Events</h1>
                  <div className="flex flex-col gap-3">
                        <div className="relative overflow-hidden rounded-lg" ref={containerRef}>
                              <motion.div className="flex" style={{ x }}>
                                    {items.map((item) => (
                                          <div key={item.id} className="shrink-0 w-full h-[500px]">
                                                <img src={item.url} alt={item.title} className="w-full h-full object-cover rounded-lg select-none pointer-events-none" draggable={false} />
                                          </div>
                                    ))}
                              </motion.div>

                              {/* Navigation Buttons */}
                              <motion.button
                                    disabled={index === 0}
                                    onClick={() => setIndex((i) => Math.max(0, i - 1))}
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
              ${index === 0 ? "opacity-40 cursor-not-allowed" : "bg-white hover:scale-110 hover:opacity-100 opacity-70"}`}
                              >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                              </motion.button>

                              {/* Next Button */}
                              <motion.button
                                    disabled={index === items.length - 1}
                                    onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
              ${index === items.length - 1 ? "opacity-40 cursor-not-allowed" : "bg-white hover:scale-110 hover:opacity-100 opacity-70"}`}
                              >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                              </motion.button>
                              {/* Progress Indicator */}
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-white/20 rounded-xl border border-white/30">
                                    {items.map((_, i) => (
                                          <button key={i} onClick={() => setIndex(i)} className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-2 bg-white/50"}`} />
                                    ))}
                              </div>
                        </div>
                  </div>
            </div>
      );
}
