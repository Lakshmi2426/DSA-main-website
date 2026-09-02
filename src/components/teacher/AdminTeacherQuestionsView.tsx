import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  ArrowLeft,
  Send,
  User,
  CheckCircle2,
  Clock,
  BookOpen,
  Search,
  Filter,
  LogOut,
  Shield,
  Check,
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useQuestions } from '../../context/QuestionsContext';
import { StudentQuestion, NavigationTab } from '../../types';

interface AdminTeacherQuestionsViewProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const AdminTeacherQuestionsView: React.FC<AdminTeacherQuestionsViewProps> = ({ setActiveTab }) => {
  const { user, logout } = useUser();
  const { questions, sendAnswer } = useQuestions();

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Answered'>('All');
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId) || null;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topicTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.messages.some((m) => m.message.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = questions.filter((q) => q.status === 'Pending').length;
  const answeredCount = questions.filter((q) => q.status === 'Answered').length;

  const handleOpenQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    setAnswerText('');
    setSentSuccess(false);
  };

  const handleSendAnswer = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!answerText.trim() || !selectedQuestion || isSubmitting) return;

    setIsSubmitting(true);
    await sendAnswer({
      questionId: selectedQuestion.id,
      answer: answerText.trim(),
      teacherName: user.name || 'Instructor',
    });

    setIsSubmitting(false);
    setAnswerText('');
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendAnswer();
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Top Header with Admin Title and Profile Icon on TOP RIGHT */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
              <Shield className="w-3.5 h-3.5" />
              Teacher & Administrator Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Student Questions
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Questions submitted by students across DSA topics. Review questions and reply directly.
            </p>
          </div>

          {/* Right Header: Switch tabs + Profile Avatar Dropdown */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('admin')}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Curriculum Dashboard
            </button>

            {/* Profile Avatar with Sign Out Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowAdminMenu(!showAdminMenu)}
                className="flex items-center gap-2 p-1.5 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500/50 hover:border-blue-500 transition-all cursor-pointer shadow-xs"
                id="admin-profile-avatar-btn"
                aria-label="Admin Profile Menu"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-xs">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    'AD'
                  )}
                </div>
              </button>

              <AnimatePresence>
                {showAdminMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/90 dark:border-slate-800 shadow-xl p-2 z-50 text-left"
                  >
                    <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                        {user.name}
                      </p>
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-[9px] font-bold">
                        ADMINISTRATOR
                      </span>
                    </div>

                    <div className="py-1 space-y-0.5">
                      <button
                        onClick={() => {
                          setActiveTab('profile');
                          setShowAdminMenu(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50/70 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-blue-500" />
                        Profile
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => {
                          logout();
                          setShowAdminMenu(false);
                          setActiveTab('home');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors cursor-pointer"
                        id="admin-sign-out-btn"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── CONVERSATION / ANSWER VIEW ────────────────────────────────────── */}
        {selectedQuestion ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/90 dark:border-slate-800 shadow-sm overflow-hidden"
          >
            {/* Conversation Header */}
            <div className="p-5 sm:p-6 bg-slate-50/80 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedQuestionId(null)}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                  id="back-to-questions-btn"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Questions</span>
                </button>

                <div className="w-10 h-10 rounded-xl overflow-hidden bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300 shrink-0">
                  {selectedQuestion.studentAvatar ? (
                    <img src={selectedQuestion.studentAvatar} alt={selectedQuestion.studentName} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{selectedQuestion.studentName}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                        selectedQuestion.status === 'Answered'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-500/30'
                      }`}
                    >
                      {selectedQuestion.status}
                    </span>
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
                      <BookOpen className="w-3 h-3" /> {selectedQuestion.topicTitle}
                    </span>
                    <span>•</span>
                    <span>Assigned to {selectedQuestion.teacherName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[480px] overflow-y-auto bg-[#fafcff] dark:bg-[#060b17]">
              {selectedQuestion.messages.map((msg) => {
                const isStudent = msg.senderRole === 'student';
                return (
                  <div
                    key={msg.messageId}
                    className={`flex flex-col ${isStudent ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-sans">
                        {isStudent ? `Student: ${msg.senderName}` : `Teacher: ${msg.senderName}`}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{msg.createdAt}</span>
                    </div>

                    <div
                      className={`p-4 rounded-2xl max-w-2xl text-sm leading-relaxed ${
                        isStudent
                          ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-tl-xs shadow-xs'
                          : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white rounded-tr-xs shadow-sm shadow-blue-600/20 font-medium'
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Success alert */}
            <AnimatePresence>
              {sentSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mx-6 mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Answer submitted successfully! The student will now see your response.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Teacher Reply Composer */}
            <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Teacher Response
              </label>
              <form onSubmit={handleSendAnswer} className="space-y-3">
                <textarea
                  ref={textareaRef}
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your detailed DSA explanation or answer to this student... (Enter to send, Shift+Enter for newline)"
                  rows={4}
                  className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y"
                  id="admin-answer-input"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Press <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border">Enter</kbd> to send answer
                  </span>

                  <button
                    type="submit"
                    disabled={!answerText.trim() || isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-2 shadow-sm shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                    id="admin-send-answer-btn"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Answer</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          /* ── QUESTIONS LIST VIEW ─────────────────────────────────────────── */
          <div className="space-y-6">

            {/* Quick Metrics & Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Filter tabs */}
              <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 max-w-sm">
                <button
                  onClick={() => setStatusFilter('All')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'All'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  All ({questions.length})
                </button>
                <button
                  onClick={() => setStatusFilter('Pending')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'Pending'
                      ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setStatusFilter('Answered')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'Answered'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Answered ({answeredCount})
                </button>
              </div>

              {/* Search input */}
              <div className="relative flex-1 max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions by student, topic..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Questions Cards List */}
            {filteredQuestions.length > 0 ? (
              <div className="space-y-3">
                {filteredQuestions.map((q) => {
                  const firstStudentMsg = q.messages.find((m) => m.senderRole === 'student')?.message || '';
                  return (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      id={`question-card-${q.id}`}
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        {/* Student info & Topic */}
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <div className="w-7 h-7 rounded-lg overflow-hidden bg-blue-100 dark:bg-blue-950 flex items-center justify-center font-bold text-xs text-blue-700 dark:text-blue-300 shrink-0">
                            {q.studentAvatar ? (
                              <img src={q.studentAvatar} alt={q.studentName} className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-3.5 h-3.5" />
                            )}
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            {q.studentName}
                          </h3>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 font-semibold flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {q.topicTitle}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                              q.status === 'Answered'
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30'
                                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-500/30'
                            }`}
                          >
                            {q.status}
                          </span>
                        </div>

                        {/* Question excerpt */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 italic font-sans pl-1 border-l-2 border-blue-500/40">
                          "{firstStudentMsg}"
                        </p>

                        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-3">
                          <span>Assigned to: {q.teacherName}</span>
                          <span>•</span>
                          <span>{q.createdAt}</span>
                          <span>•</span>
                          <span>{q.messages.length} {q.messages.length === 1 ? 'message' : 'messages'}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenQuestion(q.id)}
                          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
                        >
                          View Question
                        </button>
                        <button
                          onClick={() => handleOpenQuestion(q.id)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-xs transition-all hover:scale-105 cursor-pointer"
                        >
                          {q.status === 'Answered' ? 'View Conversation' : 'Answer'}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  No student questions yet.
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  New questions from students will appear here.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
