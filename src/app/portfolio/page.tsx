"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";

type Category = "all" | "wedding" | "portrait" | "fashion" | "product" | "baby" | "candid";

const filters: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Wedding", value: "wedding" },
  { label: "Portrait", value: "portrait" },
  { label: "Fashion", value: "fashion" },
  { label: "Product", value: "product" },
  { label: "Baby", value: "baby" },
  { label: "Candid", value: "candid" },
];

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", category: "wedding", alt: "Wedding couple", height: 600 },
  { id: 2, src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", category: "portrait", alt: "Portrait", height: 800 },
  { id: 3, src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", category: "fashion", alt: "Fashion", height: 500 },
  { id: 4, src: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80", category: "baby", alt: "Baby", height: 700 },
  { id: 5, src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", category: "product", alt: "Product", height: 600 },
  { id: 6, src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", category: "candid", alt: "Candid", height: 550 },
  { id: 7, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", category: "wedding", alt: "Wedding ceremony", height: 750 },
  { id: 8, src: "https://images.unsplash.com/photo-1502230831726-fe5549140034?w=800&q=80", category: "portrait", alt: "Portrait outdoor", height: 650 },
  { id: 9, src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80", category: "fashion", alt: "Fashion outdoor", height: 900 },
  { id: 10, src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80", category: "baby", alt: "Baby portrait", height: 600 },
  { id: 11, src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80", category: "product", alt: "Product shoes", height: 500 },
  { id: 12, src: "https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=800&q=80", category: "candid", alt: "Candid laughter", height: 700 },
  { id: 13, src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80", category: "wedding", alt: "Bridal portrait", height: 800 },
  { id: 14, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", category: "portrait", alt: "Male portrait", height: 550 },
  { id: 15, src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", category: "fashion", alt: "Fashion editorial", height: 700 },
];

const breakpointCols = {
  default: 3,
  1280: 3,
  1024: 2,
  640: 1,
};

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<(typeof galleryImages)[0] | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return galleryImages;
    return galleryImages.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-stone-950 pt-28 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amber-500 text-xs tracking-[0.35em] uppercase font-medium">
            Our Work
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-50 mt-3 mb-4">
            Portfolio
          </h1>
          <p className="text-stone-400 max-w-lg mx-auto">
            A curated selection of our finest work across genres — each image a story told in light.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mt-10"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-5 py-2 text-xs tracking-[0.2em] uppercase font-medium rounded-sm border transition-all duration-300 ${
                activeFilter === f.value
                  ? "bg-amber-500 border-amber-500 text-stone-950"
                  : "border-stone-700 text-stone-400 hover:border-amber-500/50 hover:text-amber-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Masonry
              breakpointCols={breakpointCols}
              className="masonry-grid"
              columnClassName="masonry-grid-col"
            >
              {filtered.map((img, idx) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="mb-4 group relative overflow-hidden rounded-sm cursor-pointer"
                  onClick={() => setLightbox(img)}
                >
                  <div className="relative w-full" style={{ paddingBottom: `${(img.height / 800) * 100}%` }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/40 transition-all duration-500 flex items-center justify-center">
                      <span className="text-stone-50 text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-stone-50/50 px-4 py-2 rounded-sm">
                        View
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-1 bg-stone-950/70 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-amber-400 text-[9px] tracking-[0.2em] uppercase">{img.category}</span>
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                width={1200}
                height={800}
                className="object-contain max-h-[85vh] w-full rounded-sm"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-stone-950/80 rounded-full flex items-center justify-center text-stone-300 hover:text-amber-400 text-xl"
              >
                ×
              </button>
              <span className="absolute bottom-4 left-4 text-amber-400 text-xs tracking-[0.25em] uppercase">{lightbox.category}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
