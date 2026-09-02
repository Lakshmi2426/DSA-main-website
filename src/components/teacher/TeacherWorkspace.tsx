import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  Send,
  User,
  X,
  ChevronDown,
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useQuestions } from '../../context/QuestionsContext';
import { Teacher, NavigationTab } from '../../types';
import { TEACHERS } from '../../data/teachersData';
import { AdminTeacherQuestionsView } from './AdminTeacherQuestionsView';

interface TeacherWorkspaceProps {
  initialTopicTitle?: string;
  setActiveTab?: (tab: NavigationTab) => void;
}

export const TeacherWorkspace: React.FC<TeacherWorkspaceProps> = ({
  initialTopicTitle,
  setActiveTab = () => {},
}) => {
  const { user, role } = useUser();
  const { questions, sendQuestion } = useQuestions();

  // If authenticated user is ADMIN, render the Admin/Teacher Questions Management View
  if (role === 'admin') {
    return <AdminTeacherQuestionsView setActiveTab={setActiveTab} />;
  }

  // ── STUDENT VIEW ──────────────────────────────────────────────────────────
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(() => TEACHERS[0] || null);
  const [showTeacherModal, setShowTeacherModal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccessMsg, setSentSuccessMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Find existing conversation for current user with the selected teacher (if any)
  const currentConversation = selectedTeacher
    ? questions.find(
        (q) =>
          (q.studentId === user.id || q.studentName === user.name) &&
          q.teacherId === selectedTeacher.id
      )
    : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  const handleSelectTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowTeacherModal(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    if (!selectedTeacher) {
      setShowTeacherModal(true);
      return;
    }

    const text = inputValue.trim();
    setInputValue('');
    setIsSending(true);

    await sendQuestion({
      teacherId: selectedTeacher.id,
      teacherName: selectedTeacher.name,
      teacherSubject: selectedTeacher.subject,
      topicTitle: initialTopicTitle || 'General DSA',
      message: text,
    });

    setIsSending(false);
    setSentSuccessMsg(`Question sent to ${selectedTeacher.name}. Waiting for teacher response.`);
    setTimeout(() => setSentSuccessMsg(null), 4000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Sample prompt buttons
  const SAMPLE_STARTERS = [
    'Why do we compare the new node with the root first in BST insertion?',
    'How does cycle detection in a Linked List work using Floyd’s algorithm?',
    'Can you explain the difference between BFS and DFS traversal with an example?',
  ];

  return (
    <div className="pt-20 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col pb-6">

        {/* ── CHAT HEADER ──────────────────────────────────────────────────── */}
        <div className="py-3.5 px-4 sm:px-6 mb-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-blue-200/80 dark:border-slate-800 shadow-xs backdrop-blur-md sticky top-20 z-20 flex items-center justify-between gap-3 text-left">
          {/* Feature Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-xs">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Ask a Teacher
                </h1>
                {initialTopicTitle && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[11px] font-mono">
                    <BookOpen className="w-3 h-3" /> {initialTopicTitle}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Get help from a teacher when you're stuck.
              </p>
            </div>
          </div>

          {/* Active Teacher Card / Select Button */}
          {selectedTeacher ? (
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {selectedTeacher.name}
                </span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono truncate max-w-[160px]">
                  {selectedTeacher.subject}
                </span>
              </div>
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${selectedTeacher.avatarGradient} flex items-center justify-center text-white font-bold text-xs font-mono shadow-xs`}>
                {selectedTeacher.avatarInitials}
              </div>
              <button
                onClick={() => setShowTeacherModal(true)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                id="change-teacher-btn"
                title="Change Teacher"
              >
                Change
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowTeacherModal(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              id="header-select-teacher-btn"
            >
              <User className="w-3.5 h-3.5" />
              <span>Select a Teacher</span>
            </button>
          )}
        </div>

        {/* ── CHAT MESSAGES CONTAINER ──────────────────────────────────────── */}
        <div className="flex-1 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-blue-200/60 dark:border-slate-800 p-4 sm:p-6 overflow-y-auto min-h-[380px] max-h-[calc(100vh-320px)] flex flex-col justify-between text-left">
          
          {/* Message List or Greeting Screen */}
          {currentConversation && currentConversation.messages.length > 0 ? (
            <div className="space-y-4 mb-4">
              {currentConversation.messages.map((msg) => {
                const isStudent = msg.senderRole === 'student';
                return (
                  <motion.div
                    key={msg.messageId}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'}`}
                  >
                    {/* Message Sender Header */}
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-sans">
                        {isStudent ? 'You' : `Teacher (${msg.senderName})`}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{msg.createdAt}</span>
                    </div>

                    {/* Bubble */}
                    <div
                      className={`p-4 rounded-2xl max-w-xl text-sm leading-relaxed ${
                        isStudent
                          ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white rounded-tr-xs shadow-sm shadow-blue-600/20 font-medium'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-tl-xs shadow-xs'
                      }`}
                    >
                      {msg.message}
                    </div>

                    {/* Status under student message */}
                    {isStudent && (
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        {currentConversation.status === 'Answered' ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Answered by Teacher
                          </span>
                        ) : (
                          <span className="text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Sent / Waiting for response
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* ── CHATBOT-STYLE GREETING LANDING SCREEN ─────────────────────── */
            <div className="my-auto py-10 px-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white mx-auto mb-4 shadow-md shadow-blue-500/20">
                <MessageCircle className="w-7 h-7" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                👋 Hi, {user.name.split(' ')[0] || 'Student'}!
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
                What would you like help with? Type your DSA question below or pick a teacher to get started.
              </p>

              {/* Selected teacher badge or Select Teacher button */}
              {selectedTeacher ? (
                <div className="inline-flex items-center gap-3 p-2 pr-4 rounded-2xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 shadow-xs mb-6 text-left">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedTeacher.avatarGradient} flex items-center justify-center text-white font-bold text-sm font-mono`}>
                    {selectedTeacher.avatarInitials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {selectedTeacher.name}
                    </p>
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">
                      {selectedTeacher.subject}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTeacherModal(true)}
                    className="ml-2 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowTeacherModal(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-sm font-bold shadow-md shadow-blue-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer mb-6"
                  id="select-teacher-landing-btn"
                >
                  Select a Teacher
                </button>
              )}

              {/* Sample starters */}
              <div className="max-w-lg mx-auto space-y-2 text-left">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-center mb-2">
                  Sample questions:
                </p>
                {SAMPLE_STARTERS.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputValue(sample);
                      inputRef.current?.focus();
                    }}
                    className="w-full p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 text-left transition-colors flex items-center justify-between gap-2 group cursor-pointer"
                  >
                    <span className="truncate">{sample}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {sentSuccessMsg && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="my-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{sentSuccessMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── QUESTION COMPOSER ────────────────────────────────────────────── */}
        <div className="mt-3">
          <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-sm">
            <form
              onSubmit={handleSend}
              className="relative flex items-end gap-2 p-2 rounded-[14.5px] bg-white dark:bg-slate-900"
            >
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  selectedTeacher
                    ? `Type your question for ${selectedTeacher.name}...`
                    : 'Type your question...'
                }
                rows={1}
                className="flex-1 py-2 px-3 text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none resize-none max-h-32"
                id="ask-teacher-input"
                style={{ lineHeight: '1.5' }}
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isSending}
                className="p-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 disabled:opacity-40 text-white transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer shrink-0 disabled:cursor-not-allowed"
                id="ask-teacher-send-btn"
                aria-label="Send question"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          <p className="text-[11px] text-slate-400 text-center mt-1.5 font-mono">
            Enter to send · Shift + Enter for new line · Direct teacher response, no AI
          </p>
        </div>

      </div>

      {/* ── INTEGRATED TEACHER SELECTION MODAL ─────────────────────────────── */}
      <AnimatePresence>
        {showTeacherModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-blue-200 dark:border-slate-800 shadow-2xl p-6 text-left max-h-[85vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Select a Teacher
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Choose an expert teacher to send your DSA question.
                  </p>
                </div>
                <button
                  onClick={() => setShowTeacherModal(false)}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Minimal Teachers List: ONLY Photo/Avatar, Name, Subject/Expertise, Select Button */}
              <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
                {TEACHERS.map((teacher) => {
                  const isCurrent = selectedTeacher?.id === teacher.id;
                  return (
                    <div
                      key={teacher.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500/80 shadow-xs'
                          : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-700'
                      }`}
                      id={`teacher-option-${teacher.id}`}
                    >
                      {/* Photo / Avatar */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${teacher.avatarGradient} flex items-center justify-center text-white font-bold text-sm font-mono shadow-xs shrink-0`}
                        >
                          {teacher.avatarInitials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {teacher.name}
                          </h4>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-mono truncate">
                            {teacher.subject}
                          </p>
                        </div>
                      </div>

                      {/* Select Button */}
                      <button
                        onClick={() => handleSelectTeacher(teacher)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                          isCurrent
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-700 hover:bg-gradient-to-r hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 hover:text-white text-slate-700 dark:text-slate-200'
                        }`}
                        id={`select-btn-${teacher.id}`}
                      >
                        {isCurrent ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
