"use client";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Finally! No more awkward 'Wait, which Sarah?' moments. Our parent group actually feels like a community now.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1b4?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Mitchell",
    role: "Parent Group Admin",
  },
  {
    text: "Our football team went from chaos to organized in minutes. Parents know who's who, where to meet, everything.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Mike Thompson",
    role: "Youth Coach",
  },
  {
    text: "Game changer for our neighborhood group. The map feature for carpools alone is worth the £5.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Emma Rodriguez",
    role: "Community Organizer",
  },
  {
    text: "Our work WhatsApp was a mess. Now everyone has context on who does what. Simple brilliance.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "David Chen",
    role: "Team Lead",
  },
  {
    text: "Set up took literally 60 seconds. Kids' playgroup parents finally know each other's names!",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    name: "Lisa Park",
    role: "Playgroup Mom",
  },
  {
    text: "Best £5 we've spent. Our hiking group wiki has all the trail info, no more repeated questions.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    name: "James Wilson",
    role: "Hiking Group Leader",
  },
];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-6 rounded-2xl border border-gray-200 shadow-sm bg-white max-w-xs w-full" key={i}>
                  <div className="text-gray-700 mb-4 leading-relaxed">"{text}"</div>
                  <div className="flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-gray-900">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight text-gray-600 text-sm">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export { testimonials };