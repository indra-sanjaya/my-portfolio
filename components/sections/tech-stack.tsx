'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiApollographql,
  SiExpo,
  SiTailwindcss,
  SiSequelize,
} from 'react-icons/si';
import { FaUserLock } from 'react-icons/fa6';
import { MdOutlineAccountBox } from 'react-icons/md';
import { LiaReact } from 'react-icons/lia';
import { IoIosLock } from 'react-icons/io';
import { FaMobileAlt, FaBoxes } from 'react-icons/fa';

type Tech = {
  name: string;
  category: string;
  icon: React.ReactNode;
  color: string;
};

const technologies: Tech[] = [
  { name: 'JavaScript', category: 'Language', icon: <SiJavascript />, color: '#F7DF1E' },
  { name: 'TypeScript', category: 'Language', icon: <SiTypescript />, color: '#3178C6' },

  { name: 'React', category: 'Frontend', icon: <SiReact />, color: '#61DAFB' },
  { name: 'Next.js', category: 'Frontend', icon: <SiNextdotjs />, color: '#888888' }, // fixed
  { name: 'React Native', category: 'Frontend', icon: <FaMobileAlt />, color: '#61DAFB' },
  { name: 'Expo', category: 'Frontend', icon: <SiExpo />, color: '#888888' }, // fixed
  { name: 'Tailwind CSS', category: 'Styling', icon: <SiTailwindcss />, color: '#38BDF8' },

  { name: 'Node.js', category: 'Backend', icon: <SiNodedotjs />, color: '#68A063' },
  { name: 'Express', category: 'Backend', icon: <SiExpress />, color: '#888888' },

  { name: 'GraphQL', category: 'API', icon: <SiGraphql />, color: '#E10098' },
  { name: 'Apollo Client', category: 'API', icon: <SiApollographql />, color: '#311C87' },

  { name: 'PostgreSQL', category: 'Database', icon: <SiPostgresql />, color: '#336791' },
  { name: 'MongoDB', category: 'Database', icon: <SiMongodb />, color: '#47A248' },
  { name: 'Redis', category: 'Database', icon: <SiRedis />, color: '#DC382D' },

  { name: 'Sequelize', category: 'ORM', icon: <SiSequelize />, color: '#52B0E7' },
  { name: 'bcryptjs', category: 'Security', icon: <FaUserLock />, color: '#F59E0B' },
  { name: 'Express Session', category: 'Auth', icon: <MdOutlineAccountBox />, color: '#10B981' },

  { name: 'React Navigation', category: 'Mobile', icon: <LiaReact />, color: '#61DAFB' },
  { name: 'Expo Secure Store', category: 'Mobile', icon: <IoIosLock />, color: '#A855F7' },
  { name: 'EAS Build', category: 'Mobile', icon: <FaBoxes />, color: '#F97316' },
];

export function TechStackSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="tech-stack" className="py-32 px-6 scroll-mt-28" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Tools</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-medium tracking-tight text-foreground">Tech Stack</h2>
        </div>

        <div className="flex flex-wrap gap-5">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ y: -6, scale: 1.04 }}
              whileTap={{ y: 1, scale: 0.98 }}
              className="group relative">
              {/* OUTER GLOW */}
              <div
                className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition"
                style={{
                  background: `radial-gradient(circle, ${tech.color}33, transparent 70%)`,
                }}
              />

              {/* CARD */}
              <div
                className="
                  relative flex items-center gap-2
                  px-5 py-3 rounded-xl
                  border border-border
                  bg-card
                  shadow-sm
                  transition-all duration-300
                  group-hover:shadow-md
                ">
                {/* subtle tint */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition"
                  style={{
                    background: `linear-gradient(to bottom, ${tech.color}22, transparent)`,
                  }}
                />

                {/* ICON */}
                <span className="text-lg z-10 transition" style={{ color: tech.color }}>
                  {tech.icon}
                </span>

                {/* TEXT */}
                <span className="z-10 text-foreground group-hover:text-foreground">{tech.name}</span>

                {/* BADGE */}
                <span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-background border border-border opacity-0 group-hover:opacity-100 transition">
                  {tech.category.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
