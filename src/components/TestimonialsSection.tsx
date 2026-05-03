"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    id: 1,
    name: "Priya & Rohit Sharma",
    event: "Wedding — Taj West End, Bangalore",
    quote:
      "Parichay captured every emotion of our wedding day flawlessly. Looking at the photos takes us right back to those magical moments. Best investment of our entire wedding!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Ananya Krishnan",
    event: "Maternity & Baby Shoot",
    quote:
      "The team was so patient and creative with our newborn session. The photos are absolutely breathtaking — we have them framed all over the house.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Kiran Patel",
    event: "Corporate Portrait Session",
    quote:
      "Professional, punctual, and incredibly talented. My LinkedIn profile picture got more engagement in a week than it had in years. Highly recommended!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-stone-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 text-xs tracking-[0.35em] uppercase font-medium">
            Kind Words
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-50 mt-3">
            What Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-stone-900/60 border border-stone-800/50 rounded-sm p-8 hover:border-amber-500/30 transition-colors duration-300"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FiStar key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <p className="text-stone-50 font-semibold text-sm">{t.name}</p>
                  <p className="text-stone-500 text-xs mt-0.5">{t.event}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
