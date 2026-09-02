import React from 'react';
import { motion } from 'motion/react';
import { Code2, Trophy, Gamepad2, Flame } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const QuickStatsSection: React.FC = () => {
  const { user } = useUser();

  const stats = [
    {
      id: 'topics',
      label: 'DSA Topics',
      value: '20+',
      subtext: 'Linear, Trees, Graphs & DP',
      icon: Code2,
      gradient: 'from-blue-600 via-indigo-600 to-violet-600',
      accentBorder: 'rgba(139,92,246,0.8)',
    },
    {
      id: 'challenges',
      label: 'Interactive Challenges',
      value: '50+',
      subtext: 'Step-by-step test verification',
      icon: Trophy,
      gradient: 'from-blue-600 via-indigo-600 to-violet-600',
      accentBorder: 'rgba(139,92,246,0.8)',
    },
    {
      id: 'games',
      label: 'Learning Games',
      value: '10+',
      subtext: 'Real-time algorithm showdowns',
      icon: Gamepad2,
      gradient: 'from-blue-600 via-indigo-600 to-violet-600',
      accentBorder: 'rgba(139,92,246,0.8)',
    },
    {
      id: 'streak',
      label: 'Your Learning Streak',
      value: `${user.streak} Days`,
      subtext: `${user.xp.toLocaleString()} total XP gained`,
      icon: Flame,
      gradient: 'from-blue-600 via-indigo-600 to-violet-600',
      accentBorder: 'rgba(139,92,246,0.8)',
    },
  ];

  return (
    <section className="relative py-8 -mt-6 sm:-mt-8 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/90 hover:border-violet-500/80 dark:border-slate-800 dark:hover:border-violet-500/80 shadow-[0_6px_24px_-2px_rgba(37,99,235,0.11),0_3px_10px_-1px_rgba(124,58,237,0.05)] hover:shadow-[0_16px_34px_-4px_rgba(37,99,235,0.18),0_8px_16px_-2px_rgba(124,58,237,0.10)] dark:shadow-none backdrop-blur-md overflow-hidden transition-all duration-200 group text-left"
              >
                {/* Subtle top accent border: Blue -> Indigo -> Violet */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px] opacity-80 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600"
                />

                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110 duration-200 bg-gradient-to-br ${stat.gradient}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                    {stat.value}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {stat.subtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
