import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  UserCheck,
  BookOpen,
  TrendingUp,
  Activity,
  Search,
  Filter,
  ArrowUpDown,
  Flame,
  CheckCircle2,
  Clock,
  ChevronRight,
  X,
  ExternalLink,
  Shield,
  Layers,
  GraduationCap,
  Sparkles,
  BarChart3,
  Calendar,
  Mail,
  Award,
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { StudentProgressRecord, NavigationTab } from '../../types';

interface AdminDashboardViewProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ setActiveTab }) => {
  const { studentsList, user, logout } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgressFilter, setSelectedProgressFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [sortBy, setSortBy] = useState<'progress' | 'streak' | 'name' | 'lastActive'>('progress');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedStudent, setSelectedStudent] = useState<StudentProgressRecord | null>(null);

  // Overview metrics
  const totalStudents = 1420;
  const activeStudents = 894;
  const totalTopics = 18;
  const averageProgress = 68;
  const recentlyActiveToday = 42;

  // Filter & sort students
  const filteredStudents = useMemo(() => {
    return studentsList
      .filter((std) => {
        const matchesSearch =
          std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          std.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          std.currentStage.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesFilter = true;
        if (selectedProgressFilter === 'High') {
          matchesFilter = std.overallProgress >= 75;
        } else if (selectedProgressFilter === 'Medium') {
          matchesFilter = std.overallProgress >= 40 && std.overallProgress < 75;
        } else if (selectedProgressFilter === 'Low') {
          matchesFilter = std.overallProgress < 40;
        }

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortBy === 'progress') {
          diff = a.overallProgress - b.overallProgress;
        } else if (sortBy === 'streak') {
          diff = a.streak - b.streak;
        } else if (sortBy === 'name') {
          diff = a.name.localeCompare(b.name);
        } else {
          diff = a.topicsCompleted - b.topicsCompleted;
        }
        return sortOrder === 'desc' ? -diff : diff;
      });
  }, [studentsList, searchQuery, selectedProgressFilter, sortBy, sortOrder]);

  const toggleSort = (column: 'progress' | 'streak' | 'name' | 'lastActive') => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header & Admin Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
              <Shield className="w-3.5 h-3.5" />
              Administrative Control Center
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Student Progress & Curriculum Monitor
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Track student engagement, topic completion rates, and learning streaks across 18 DSA modules.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('topics')}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
            >
              Browse 18 Modules
            </button>
            <button
              onClick={() => {
                logout();
                setActiveTab('home');
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              Exit Admin Mode
            </button>
          </div>
        </div>

        {/* 5 OVERVIEW STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Students */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/85 hover:border-blue-400 dark:border-slate-800 shadow-[0_4px_18px_-2px_rgba(37,99,235,0.08)] hover:shadow-[0_10px_24px_-4px_rgba(37,99,235,0.14)] dark:shadow-none hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Total Students</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-transparent flex items-center justify-center shadow-2xs">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {totalStudents.toLocaleString()}
            </div>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +14% this month
            </span>
          </div>

          {/* Active Students */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/85 hover:border-blue-400 dark:border-slate-800 shadow-[0_4px_18px_-2px_rgba(37,99,235,0.08)] hover:shadow-[0_10px_24px_-4px_rgba(37,99,235,0.14)] dark:shadow-none hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Active Students</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-transparent flex items-center justify-center shadow-2xs">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {activeStudents.toLocaleString()}
            </div>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 mt-1">
              <Activity className="w-3 h-3" /> 63% active weekly
            </span>
          </div>

          {/* Total Topics */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/85 hover:border-blue-400 dark:border-slate-800 shadow-[0_4px_18px_-2px_rgba(37,99,235,0.08)] hover:shadow-[0_10px_24px_-4px_rgba(37,99,235,0.14)] dark:shadow-none hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Total Modules</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-transparent flex items-center justify-center shadow-2xs">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {totalTopics}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1 block">
              6 Progressive Phases
            </span>
          </div>

          {/* Overall Learning Progress */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/85 hover:border-blue-400 dark:border-slate-800 shadow-[0_4px_18px_-2px_rgba(37,99,235,0.08)] hover:shadow-[0_10px_24px_-4px_rgba(37,99,235,0.14)] dark:shadow-none hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Avg Completion</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-transparent flex items-center justify-center shadow-2xs">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {averageProgress}%
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-full" style={{ width: `${averageProgress}%` }} />
            </div>
          </div>

          {/* Active Today */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/85 hover:border-blue-400 dark:border-slate-800 shadow-[0_4px_18px_-2px_rgba(37,99,235,0.08)] hover:shadow-[0_10px_24px_-4px_rgba(37,99,235,0.14)] dark:shadow-none hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Active Today</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-transparent flex items-center justify-center shadow-2xs">
                <Flame className="w-4 h-4 fill-current" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {recentlyActiveToday}
            </div>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 mt-1">
              Active sessions live
            </span>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/85 dark:border-slate-800 shadow-[0_4px_18px_-2px_rgba(37,99,235,0.06)] dark:shadow-none flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student name, email, stage..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="admin-search-input"
            />
          </div>

          {/* Progress Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">Filter:</span>
            {(['All', 'High', 'Medium', 'Low'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedProgressFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedProgressFilter === filter
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700'
                }`}
              >
                {filter === 'All' ? 'All Progress' : filter === 'High' ? '>75%' : filter === 'Medium' ? '40-75%' : '<40%'}
              </button>
            ))}
          </div>
        </div>

        {/* STUDENT PROGRESS TABLE */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-200/85 dark:border-slate-800 shadow-[0_8px_30px_-4px_rgba(37,99,235,0.08)] dark:shadow-none overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Individual Student Tracking
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                Showing {filteredStudents.length} enrolled scholars with verified activity telemetry.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[11px] font-mono text-slate-400 uppercase">
                  <th
                    onClick={() => toggleSort('name')}
                    className="py-3.5 px-6 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Student</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3.5 px-6">Current Stage</th>
                  <th className="py-3.5 px-6 text-center">Modules Started</th>
                  <th className="py-3.5 px-6 text-center">Modules Mastered</th>
                  <th
                    onClick={() => toggleSort('progress')}
                    className="py-3.5 px-6 text-right cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Overall Progress</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => toggleSort('streak')}
                    className="py-3.5 px-6 text-right cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Streak</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3.5 px-6 text-right">Last Active</th>
                  <th className="py-3.5 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                {filteredStudents.map((std) => (
                  <tr
                    key={std.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Student Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={std.avatar}
                          alt={std.name}
                          className="w-9 h-9 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {std.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {std.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Current Stage */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        {std.currentStage}
                      </span>
                    </td>

                    {/* Started */}
                    <td className="py-4 px-6 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                      {std.topicsStarted} / 18
                    </td>

                    {/* Mastered */}
                    <td className="py-4 px-6 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {std.topicsCompleted} / 18
                    </td>

                    {/* Progress Bar & % */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-block text-right">
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                          {std.overallProgress}%
                        </span>
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden ml-auto">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${std.overallProgress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Streak */}
                    <td className="py-4 px-6 text-right font-mono font-bold text-amber-500">
                      <span className="inline-flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        {std.streak}d
                      </span>
                    </td>

                    {/* Last Active */}
                    <td className="py-4 px-6 text-right font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {std.lastActive}
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => setSelectedStudent(std)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-200 dark:border-blue-800 transition-colors inline-flex items-center gap-1"
                        id={`btn-view-student-${std.id}`}
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* STUDENT DETAILS MODAL / DRAWER */}
        <AnimatePresence>
          {selectedStudent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-left"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedStudent.avatar}
                      alt={selectedStudent.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                          {selectedStudent.name}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold">
                          {selectedStudent.currentStage}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {selectedStudent.email} • ID: {selectedStudent.id}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Metrics Summary Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block">OVERALL MASTERY</span>
                    <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                      {selectedStudent.overallProgress}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">MODULES STARTED</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      {selectedStudent.topicsStarted} / 18
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">MODULES COMPLETED</span>
                    <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                      {selectedStudent.topicsCompleted} / 18
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">LEARNING STREAK</span>
                    <span className="text-base font-bold text-amber-500 flex items-center gap-1">
                      <Flame className="w-4 h-4 fill-current" />
                      {selectedStudent.streak} Days
                    </span>
                  </div>
                </div>

                {/* Explored Modules Progress Breakdown */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    Module Mastery Breakdown
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedStudent.exploredTopics.map((topic) => (
                      <div
                        key={topic.id}
                        className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {topic.title}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            Last accessed: {topic.lastAccessed}
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`text-xs font-mono font-bold ${
                              topic.status === 'completed'
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-blue-600 dark:text-blue-400'
                            }`}
                          >
                            {topic.progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities Log */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    Recent Telemetry Activities
                  </h3>
                  <div className="space-y-2">
                    {selectedStudent.recentActivities.map((act) => (
                      <div
                        key={act.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                          <span>{act.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {act.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Close Drawer
                  </button>
                  <button
                    onClick={() => {
                      alert(`Progress summary report generated for ${selectedStudent.name}.`);
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20"
                  >
                    Export Progress Report
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
