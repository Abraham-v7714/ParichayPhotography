"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "baby",
    title: "Baby",
    subtitle: "First Wonders",
    description: "Tender moments captured with warmth — from newborns to first steps.",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
    color: "from-rose-900/60",
  },
  {
    id: "portrait",
    title: "Portrait",
    subtitle: "Your Essence",
    description: "Soulful, editorial portraits that reveal the real you.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    color: "from-stone-900/60",
  },
  {
    id: "candid",
    title: "Candid",
    subtitle: "Raw Emotions",
    description: "Unscripted, honest storytelling in every decisive moment.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    color: "from-zinc-900/60",
  },
  {
    id: "wedding",
    title: "Marriage",
    subtitle: "Eternal Bonds",
    description: "Complete wedding coverage — from haldi to reception.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    color: "from-amber-900/60",
  },
  {
    id: "product",
    title: "Products",
    subtitle: "Visual Commerce",
    description: "Studio-grade product photography that drives conversions.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    color: "from-neutral-900/60",
  },
  {
    id: "fashion",
    title: "Fashion",
    subtitle: "Bold Statements",
    description: "High-fashion editorial shoots with editorial styling.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    color: "from-purple-900/60",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ServicesGrid() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-stone-950">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 text-xs tracking-[0.35em] uppercase font-medium">
            What We Do
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-50 mt-3 mb-4">
            Our Services
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto leading-relaxed">
            From intimate baby portraits to grand wedding extravaganzas — we cover every chapter of your story.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group relative h-80 rounded-sm overflow-hidden cursor-pointer"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${service.color} to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500`}
              />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-amber-400 text-[10px] tracking-[0.3em] uppercase font-medium mb-1">
                  {service.subtitle}
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-50 mb-2">
                  {service.title}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-amber-400 text-xs tracking-widest uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  Book Now →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
