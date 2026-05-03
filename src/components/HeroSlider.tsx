"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const slides = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    label: "Wedding",
    tagline: "Eternal Moments",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1920&q=80",
    label: "Portrait",
    tagline: "Your True Self",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80",
    label: "Fashion",
    tagline: "Bold & Beautiful",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1920&q=80",
    label: "Baby",
    tagline: "First Wonders",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoplay();
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].url}
            alt={slides[current].label}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/30 to-stone-950/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-amber-400 text-xs font-medium tracking-[0.4em] uppercase">
              {slides[current].label} Photography
            </span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-stone-50 leading-none tracking-tight">
              {slides[current].tagline}
            </h1>
            <p className="text-stone-300 text-base md:text-lg max-w-xl leading-relaxed mt-2">
              Bangalore's premium photography studio — capturing emotions, stories, and the beauty of every fleeting second.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                href="/contact"
                className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
              >
                Book Your Session
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 border border-stone-300/50 hover:border-amber-400 text-stone-100 hover:text-amber-400 font-medium tracking-wider uppercase text-sm rounded-sm transition-all duration-300 backdrop-blur-sm"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Dots */}
        <div className="absolute bottom-28 flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`transition-all duration-500 rounded-full ${
                idx === current
                  ? "w-8 h-2 bg-amber-400"
                  : "w-2 h-2 bg-stone-400/50 hover:bg-stone-300"
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 flex flex-col items-center gap-1 text-stone-400"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <FiChevronDown size={18} />
        </motion.div>
      </div>

      {/* Category Tags — left side */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-10">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300 ${
              idx === current
                ? "text-amber-400"
                : "text-stone-500 hover:text-stone-300"
            }`}
          >
            {slide.label}
          </button>
        ))}
      </div>
    </section>
  );
}
