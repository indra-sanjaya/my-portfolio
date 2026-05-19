'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BrainCircuit, Layers3, Rocket, LineChart, RefreshCcw, Sparkles } from 'lucide-react';

const principles = [
  {
    number: '01',
    title: 'Systems first',
    icon: <Layers3 className="w-5 h-5" />,
    description:
      'My engineering background taught me to think beyond individual features — focusing on how systems behave, scale, and remain reliable under real-world conditions.',
  },
  {
    number: '02',
    title: 'Building for real problems',
    icon: <Rocket className="w-5 h-5" />,
    description:
      'I enjoy creating applications that solve operational and human problems, whether through automation, AI-assisted workflows, or better user experiences.',
  },
  {
    number: '03',
    title: 'Scalability and maintainability',
    icon: <BrainCircuit className="w-5 h-5" />,
    description:
      'Clean architecture, maintainable code, and long-term scalability matter more to me than short-term hacks or quick fixes.',
  },
  {
    number: '04',
    title: 'Data-driven thinking',
    icon: <LineChart className="w-5 h-5" />,
    description:
      'Years of working with compliance systems, environmental reporting, and industrial operations strengthened my analytical mindset and decision-making approach.',
  },
  {
    number: '05',
    title: 'Continuous improvement',
    icon: <RefreshCcw className="w-5 h-5" />,
    description:
      'Transitioning from engineering into software development reflects my belief that growth comes from curiosity, adaptability, and consistent learning.',
  },
  {
    number: '06',
    title: 'Technology with impact',
    icon: <Sparkles className="w-5 h-5" />,
    description:
      'I am especially interested in building scalable web platforms and AI-powered applications that improve workflows, productivity, and decision-making.',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export function PhilosophySection() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.section
      id="philosophy"
      ref={ref}
      className="
        relative overflow-hidden
        py-32 px-6
        bg-card
        border-t border-border
        scroll-mt-28
      "
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }}>
      {/* subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.04] blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          variants={itemVariants}
          custom={0}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Philosophy</span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-foreground">My Engineering Mindset</h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl">
            Principles that shape how I approach software engineering, problem-solving, scalability, and building
            technology that creates meaningful impact.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              variants={itemVariants}
              custom={index + 1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{
                y: -4,
              }}
              className="
                group relative overflow-hidden
                rounded-3xl
                border border-border
                bg-background/60
                backdrop-blur-sm
                p-7
                transition-all duration-300
                hover:border-primary/20
                hover:shadow-xl
              ">
              {/* hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent" />

              <div className="relative">
                {/* top row */}
                <div className="flex items-center justify-between mb-8">
                  <div
                    className="
                      w-12 h-12 rounded-2xl
                      flex items-center justify-center
                      bg-primary/10
                      text-primary
                    ">
                    {principle.icon}
                  </div>

                  <span className="text-sm font-mono text-muted-foreground">{principle.number}</span>
                </div>

                {/* content */}
                <h3
                  className="
                    text-2xl font-semibold
                    text-foreground
                    transition-colors duration-300
                  ">
                  {principle.title}
                </h3>

                <p className="mt-5 text-muted-foreground leading-8">{principle.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
