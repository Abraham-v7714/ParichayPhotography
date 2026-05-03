"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const stats = [
  { value: "500+", label: "Weddings Shot" },
  { value: "10K+", label: "Happy Clients" },
  { value: "8", label: "Years of Craft" },
  { value: "15+", label: "Awards Won" },
];

export default function AboutSection() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-stone-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative grid grid-cols-2 gap-4 h-[500px]"
          >
            <div className="relative rounded-sm overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80"
                alt="Wedding photography"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            <div className="relative rounded-sm overflow-hidden mt-10">
              <Image
                src="https://images.unsplash.com/photo-1502230831726-fe5549140034?w=600&q=80"
                alt="Portrait photography"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            {/* Accent badge */}
            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-amber-500 rounded-full flex flex-col items-center justify-center z-10">
              <span className="font-serif text-2xl font-bold text-stone-950">8+</span>
              <span className="text-stone-950 text-[10px] text-center font-semibold uppercase tracking-wide leading-tight">
                Years of<br />Excellence
              </span>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-500 text-xs tracking-[0.35em] uppercase font-medium">
              Our Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-50 mt-3 mb-6 leading-tight">
              Passion Behind<br />Every Lens
            </h2>
            <p className="text-stone-400 leading-relaxed mb-4">
              Founded in the heart of Bangalore, Parichay Photography was born from a deep love for visual storytelling. We believe every person, every couple, every family carries a unique narrative — and it's our privilege to frame it.
            </p>
            <p className="text-stone-400 leading-relaxed mb-8">
              Our team of award-winning photographers brings technical mastery and artistic intuition to every shoot, whether it's an intimate newborn session or a sprawling 3-day wedding.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-serif text-3xl font-bold text-amber-400">{stat.value}</span>
                  <p className="text-stone-400 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-50 hover:bg-amber-400 text-stone-950 font-semibold text-sm tracking-wider uppercase rounded-sm transition-all duration-300 group"
            >
              Start Your Journey
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
