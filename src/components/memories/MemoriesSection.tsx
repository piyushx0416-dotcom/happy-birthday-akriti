"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Calendar, MapPin, Heart, Maximize2, Quote, BookOpen } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TIMELINE_EVENTS, MEMORY_GALLERY, LITTLE_MOMENTS, THINGS_I_REMEMBER, OUR_FAVORITE_MOMENTS } from "@/data/memories";
import { MemoryItem } from "@/types";
import { LightboxModal } from "@/components/gallery/LightboxModal";
import { useSound } from "@/hooks/useSound";

export function MemoriesSection() {
  const [selectedImage, setSelectedImage] = useState<MemoryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { playClick } = useSound();

  const filteredGallery =
    activeFilter === "all"
      ? MEMORY_GALLERY
      : MEMORY_GALLERY.filter((item) => item.category === activeFilter);

  return (
    <section id="memories" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Chapter Header */}
      <SectionHeader
        badge="SCRAPBOOK ARCHIVE"
        title="OUR LITTLE UNIVERSE"
        romanticNote="A sanctuary of shared memories, milestones, and inside jokes"
        subtitle="Every shared conversation and quiet memory holds its own constellation in this sky. Explore the timeline and treasures of our journey."
      />

      {/* =========================================================================
          FEATURE A: OUR TIMELINE
         ========================================================================= */}
      <div className="mb-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-gold">
            PART ONE • CHRONOLOGY
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-ivory mt-2">
            The Timeline of Us
          </h3>
          <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        <div className="relative border-l border-gold/25 ml-4 sm:ml-32 md:ml-48 space-y-12">
          {TIMELINE_EVENTS.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Golden Node Dot on Timeline */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-midnight border-2 border-gold shadow-[0_0_12px_rgba(214,189,139,0.8)] group-hover:scale-125 transition-transform duration-300" />

              {/* Date Marker (Desktop Floats Left, Mobile on Top) */}
              <div className="sm:absolute sm:-left-36 md:-left-44 top-0 mb-2 sm:mb-0 text-left sm:text-right">
                <span className="text-xs font-sans tracking-widest text-gold uppercase font-medium">
                  {event.date}
                </span>
                {event.location && (
                  <span className="flex items-center sm:justify-end gap-1 text-[11px] font-sans text-ivory/50 mt-0.5">
                    <MapPin className="w-3 h-3 text-gold/60" />
                    {event.location}
                  </span>
                )}
              </div>

              {/* Content Card */}
              <div className="editorial-frame p-6 sm:p-8 rounded-2xl max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-sans tracking-widest text-lavender uppercase px-2 py-0.5 rounded-full bg-purple-deep/80 border border-purple-royal">
                    {event.tag}
                  </span>
                </div>
                <h4 className="font-serif text-2xl text-ivory mb-3 font-normal">
                  {event.title}
                </h4>
                <p className="text-sm text-ivory/75 font-sans font-light leading-relaxed">
                  {event.description}
                </p>
                {event.image && (
                  <div className="mt-4 relative h-48 w-full rounded-xl overflow-hidden border border-gold/20">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          FEATURE B: MEMORY GALLERY
         ========================================================================= */}
      <div className="mb-24">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-gold">
            PART TWO • VISUAL ARCHIVE
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-ivory mt-2">
            The Memory Gallery
          </h3>
          <p className="text-xs sm:text-sm text-ivory/70 mt-2 font-sans font-light">
            Portraits and candid glimpses captured across the seasons. Click any photo to expand.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {["all", "portrait", "moment", "quiet", "adventure"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick(960);
                setActiveFilter(cat);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                activeFilter === cat
                  ? "bg-gold text-midnight border-gold font-medium"
                  : "border-gold/20 text-ivory/60 hover:text-gold hover:border-gold/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                playClick(1000);
                setSelectedImage(item);
              }}
              className="editorial-frame p-3 rounded-2xl group cursor-pointer relative overflow-hidden"
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[10px] font-sans tracking-widest text-gold uppercase">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-xl text-ivory mt-1">{item.title}</h4>
                  <p className="text-xs text-ivory/80 font-sans font-light line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-gold font-sans tracking-wider">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>EXPAND</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          FEATURE C & D: LITTLE MOMENTS & THINGS I REMEMBER
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inside Jokes & Little Moments */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-gold" />
            <h4 className="font-serif text-2xl sm:text-3xl text-ivory">
              Little Moments & Inside Jokes
            </h4>
          </div>
          <div className="space-y-4">
            {LITTLE_MOMENTS.map((moment, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-gold/15 hover:border-gold/40 transition-colors"
              >
                <p className="font-serif text-lg text-gold-light italic">
                  {moment.quote}
                </p>
                <p className="text-xs sm:text-sm text-ivory/70 font-sans font-light mt-2">
                  {moment.context}
                </p>
                <div className="mt-3 flex justify-between items-center text-[10px] font-sans tracking-widest text-lavender uppercase">
                  <span>{moment.mood}</span>
                  <span>MOMENT 0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Things I Remember About Her */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-dustypink" />
            <h4 className="font-serif text-2xl sm:text-3xl text-ivory">
              Things I Remember About You
            </h4>
          </div>
          <div className="editorial-frame p-6 sm:p-8 rounded-2xl space-y-4">
            {THINGS_I_REMEMBER.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 pb-3 border-b border-gold/15 last:border-b-0 last:pb-0"
              >
                <span className="font-mono text-xs text-gold/60 shrink-0 mt-0.5">
                  0{idx + 1}.
                </span>
                <p className="font-sans text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          FEATURE E: OUR FAVOURITE MOMENTS (POLAROID SCRAPBOOK)
         ========================================================================= */}
      <div className="mt-24 pt-16 border-t border-gold/20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-gold">
            PART FIVE • KEEPSAKES
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-ivory mt-2">
            Our Favourite Moments
          </h3>
          <p className="text-xs sm:text-sm text-ivory/70 mt-2 font-sans font-light">
            Polaroids pinned to our little universe — treasured snapshots of Akriti that never fade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {OUR_FAVORITE_MOMENTS.map((moment, idx) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-[#F9F5EC] p-4 pb-6 rounded-xl text-[#1E1729] shadow-2xl border border-[#E5DAC8] transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-20 cursor-pointer ${moment.tilt}`}
              onClick={() => {
                playClick(980);
                setSelectedImage({
                  id: moment.id,
                  title: moment.title,
                  caption: moment.note,
                  image: moment.image,
                  category: "polaroid",
                  aspectRatio: "portrait",
                  date: moment.date,
                });
              }}
            >
              {/* Golden Pushpin Accent */}
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-gold-dark via-gold to-white border border-gold/70 shadow-md mx-auto mb-3" />

              {/* Polaroid Photo Frame */}
              <div className="relative aspect-square w-full rounded-md overflow-hidden bg-black/10 shadow-inner">
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>

              {/* Handwritten Note Area */}
              <div className="mt-4 px-1 text-center">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#857262] block">
                  {moment.date}
                </span>
                <h4 className="font-serif text-lg text-[#1A1224] mt-0.5 font-medium leading-snug">
                  {moment.title}
                </h4>
                <p className="font-script text-base text-[#523E6B] mt-1.5 leading-snug">
                  &ldquo;{moment.note}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedImage}
        items={MEMORY_GALLERY}
        onClose={() => setSelectedImage(null)}
        onSelect={(it) => setSelectedImage(it)}
      />
    </section>
  );
}
