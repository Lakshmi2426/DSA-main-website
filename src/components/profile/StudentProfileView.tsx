import React from 'react';
import { motion } from 'motion/react';
import {
  User,
  Zap,
  Flame,
  Calendar,
  Clock,
  Award,
  BookOpen,
  Sparkles,
  Mail,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const StudentProfileView: React.FC = () => {
  const { user } = useUser();

  // Generate 52 weeks of mock heatmap intensity (0-4)
  const heatmapData = Array.from({ length: 52 * 7 }, (_, i) => {
    const isRecent = i > 52 * 7 - 60;
    if (isRecent && Math.random() > 0.3) {
      return Math.floor(Math.random() * 4) + 1;
    }
    return Math.random() > 0.75 ? Math.floor(Math.random() * 3) + 1 : 0;
  });

  const getIntensityColor = (val: number) => {
    switch (val) {
      case 1:
        return 'bg-blue-200 dark:bg-blue-950/80';
      case 2:
        return 'bg-blue-400 dark:bg-blue-800';
      case 3:
        return 'bg-blue-500 dark:bg-blue-600';
      case 4:
        return 'bg-blue-600 dark:bg-blue-500';
      default:
        return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      case 'Epic':
        return 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'Rare':
        return 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30';
      default:
        return 'text-slate-500 bg-slate-500/10 border-slate-500/30';
    }
  };

  const remainingMinutes = Math.max(0, user.weeklyGoalMinutes - user.weeklyProgressMinutes);
  const weeklyPercentage = Math.min(100, Math.round((user.weeklyProgressMinutes / user.weeklyGoalMinutes) * 100));

  return (
    <div className="relative pt-28 pb-20 min-h-screen">
      {/* Light Mode Soft Ambient Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-500/8 via-indigo-500/6 to-violet-500/4 blur-[130px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
        {/* Top 2 Cards: Student Info Card & Weekly Learning Goal Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 1. Student Info Card (Col 1-7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-blue-200/85 hover:border-blue-400/80 dark:border-slate-800 shadow-[0_4px_20px_-2px_rgba(37,99,235,0.08),0_2px_8px_-1px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(37,99,235,0.14)] dark:shadow-none transition-all relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-md shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {user.name}
                    </h1>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50/90 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800 shadow-2xs">
                      Lvl {user.level}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
                    <span>@{user.username}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      {user.email}
                    </span>
                  </p>

                  <p className="text-xs text-slate-400 font-mono pt-0.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Member since {user.joinedDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Streak & XP Strip */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
                  <Zap className="w-4 h-4" />
                  {user.xp.toLocaleString()} Total XP
                </span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
                  <Flame className="w-4 h-4 fill-current" />
                  {user.streak} Days Streak
                </span>
              </div>

              <span className="px-2.5 py-1 rounded-lg bg-blue-50/80 dark:bg-slate-800 text-blue-700 dark:text-slate-400 border border-blue-100 dark:border-transparent text-[11px] font-semibold">
                XP to Level {user.level + 1}: {user.xp % 350} / 350
              </span>
            </div>
          </div>

          {/* 2. Weekly Learning Goal Card (Col 8-12) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-blue-200/85 hover:border-blue-400/80 dark:border-slate-800 shadow-[0_4px_20px_-2px_rgba(37,99,235,0.08),0_2px_8px_-1px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(37,99,235,0.14)] dark:shadow-none transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center shadow-2xs">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Weekly Learning Goal
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Dedicated Study Focus
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-50/90 dark:bg-blue-950/70 px-2.5 py-1 rounded-full border border-blue-200/80 dark:border-blue-800 shadow-2xs">
                  {weeklyPercentage}% Achieved
                </span>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-baseline justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">Current Progress</span>
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {user.weeklyProgressMinutes} mins{' '}
                    <span className="text-xs text-slate-400 font-normal">/ {user.weeklyGoalMinutes} mins</span>
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-full transition-all duration-500"
                    style={{ width: `${weeklyPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>Target: {user.weeklyGoalMinutes / 60} hrs/week</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {remainingMinutes > 0 ? `${remainingMinutes} mins remaining` : 'Weekly goal completed! 🎉'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Consistent 30m daily study improves algorithm retention by 3.2x.</span>
            </div>
          </div>
        </div>

        {/* 52-Week Activity Matrix */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-blue-200/85 dark:border-slate-800 shadow-[0_4px_20px_-2px_rgba(37,99,235,0.08),0_2px_8px_-1px_rgba(0,0,0,0.04)] dark:shadow-none">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                52-Week Practice Consistency Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                Telemetry from visualizer inspections, practice exercises, and AI tutoring inquiries.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800" />
              <div className="w-3 h-3 rounded-sm bg-blue-200 dark:bg-blue-950/80" />
              <div className="w-3 h-3 rounded-sm bg-blue-400 dark:bg-blue-800" />
              <div className="w-3 h-3 rounded-sm bg-blue-600 dark:bg-blue-500" />
              <span>More</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[640px]">
              {heatmapData.map((intensity, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)}`}
                  title={`Activity Level: ${intensity}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3. Earned Badges & 4. Recent Activity Feed Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 3. Earned Badges Card (Col 1-7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-blue-200/85 dark:border-slate-800 shadow-[0_4px_20px_-2px_rgba(37,99,235,0.08),0_2px_8px_-1px_rgba(0,0,0,0.04)] dark:shadow-none">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-500" />
                Earned Badges & Milestones
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {user.badges.filter((b) => b.unlocked).length} / {user.badges.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    badge.unlocked
                      ? 'bg-slate-50/80 dark:bg-slate-800/60 border-blue-100/90 dark:border-slate-800 shadow-2xs'
                      : 'bg-slate-100/40 dark:bg-slate-900/40 border-dashed border-slate-200 dark:border-slate-800 opacity-50'
                  } flex items-start gap-3`}
                >
                  <div className="text-2xl p-2 rounded-xl bg-white dark:bg-slate-900 shadow-2xs border border-blue-100/60 dark:border-transparent">
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {badge.name}
                      </h4>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getRarityBadge(
                          badge.rarity
                        )}`}
                      >
                        {badge.rarity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {badge.description}
                    </p>
                    {badge.unlockedAt && (
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono mt-1 block">
                        ✓ Unlocked {badge.unlockedAt}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Recent Activity Feed (Col 8-12) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-blue-200/85 dark:border-slate-800 shadow-[0_4px_20px_-2px_rgba(37,99,235,0.08),0_2px_8px_-1px_rgba(0,0,0,0.04)] dark:shadow-none">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Recent Activity Feed
            </h3>

            <div className="space-y-3.5">
              {user.recentActivity.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-blue-100/80 dark:border-slate-800 flex items-center justify-between shadow-2xs"
                >
                  <div>
                    <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 block">
                      {act.action}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {act.target}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {act.timestamp}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 px-2 py-1 rounded-lg">
                    +{act.xpEarned} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
