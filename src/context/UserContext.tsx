import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile, AchievementBadge, StudentProgressRecord, UserRole } from '../types';
import { TEACHERS } from '../data/teachersData';

export const INITIAL_STUDENTS: StudentProgressRecord[] = [
  {
    id: 'std-101',
    name: 'Alex Mercer',
    email: 'alex.mercer@dev.io',
    avatar: '',
    topicsStarted: 12,
    topicsCompleted: 4,
    overallProgress: 68,
    lastActive: 'Today, 2:40 PM',
    streak: 7,
    currentStage: 'Phase 2: Fundamental Structures',
    exploredTopics: [
      { id: 'data-structures-and-types', title: 'Data Structure and Types', progress: 100, lastAccessed: 'Today', status: 'completed' },
      { id: 'linear-search', title: 'Linear Search', progress: 100, lastAccessed: 'Yesterday', status: 'completed' },
      { id: 'binary-search', title: 'Binary Search', progress: 85, lastAccessed: 'Today', status: 'in_progress' },
      { id: 'sorting', title: 'Sorting', progress: 100, lastAccessed: '3 days ago', status: 'completed' },
      { id: 'stack', title: 'Stack', progress: 75, lastAccessed: 'Today', status: 'in_progress' },
      { id: 'singly-linked-list', title: 'Singly Linked List (SLL)', progress: 60, lastAccessed: '2 days ago', status: 'in_progress' },
      { id: 'queue', title: 'Queue', progress: 40, lastAccessed: '5 days ago', status: 'in_progress' },
    ],
    recentActivities: [
      { id: 'act-1', title: 'Explored Binary Search Midpoint halving', type: 'visualization_run', timestamp: '2 hours ago' },
      { id: 'act-2', title: 'Asked Teacher about Stack vs Queue memory', type: 'teacher_question', timestamp: '4 hours ago' },
      { id: 'act-3', title: 'Completed Sorting module test', type: 'quiz_completed', timestamp: 'Yesterday' },
    ],
  },
  {
    id: 'std-102',
    name: 'Elena Rostova',
    email: 'elena.rostova@tech.edu',
    avatar: '',
    topicsStarted: 16,
    topicsCompleted: 9,
    overallProgress: 88,
    lastActive: 'Today, 11:15 AM',
    streak: 19,
    currentStage: 'Phase 4: Graphs & Search',
    exploredTopics: [
      { id: 'data-structures-and-types', title: 'Data Structure and Types', progress: 100, lastAccessed: '1 week ago', status: 'completed' },
      { id: 'linear-search', title: 'Linear Search', progress: 100, lastAccessed: '1 week ago', status: 'completed' },
      { id: 'binary-search', title: 'Binary Search', progress: 100, lastAccessed: '5 days ago', status: 'completed' },
      { id: 'stack', title: 'Stack', progress: 100, lastAccessed: '4 days ago', status: 'completed' },
      { id: 'singly-linked-list', title: 'Singly Linked List (SLL)', progress: 100, lastAccessed: '3 days ago', status: 'completed' },
      { id: 'doubly-linked-list', title: 'Doubly Linked List (DLL)', progress: 100, lastAccessed: '2 days ago', status: 'completed' },
      { id: 'trees', title: 'Trees', progress: 90, lastAccessed: 'Today', status: 'in_progress' },
      { id: 'breadth-first-search', title: 'Breadth-First Search (BFS)', progress: 80, lastAccessed: 'Today', status: 'in_progress' },
    ],
    recentActivities: [
      { id: 'act-4', title: 'Completed Trees Level-Order Traversal', type: 'concept_read', timestamp: 'Today, 11:15 AM' },
      { id: 'act-5', title: 'Practiced BFS frontier queues', type: 'visualization_run', timestamp: 'Yesterday' },
    ],
  },
  {
    id: 'std-103',
    name: 'Marcus Vance',
    email: 'marcus.v@cloudcorp.org',
    avatar: '',
    topicsStarted: 7,
    topicsCompleted: 2,
    overallProgress: 34,
    lastActive: 'Yesterday, 6:10 PM',
    streak: 4,
    currentStage: 'Phase 1: Foundations',
    exploredTopics: [
      { id: 'data-structures-and-types', title: 'Data Structure and Types', progress: 100, lastAccessed: 'Yesterday', status: 'completed' },
      { id: 'linear-search', title: 'Linear Search', progress: 100, lastAccessed: '3 days ago', status: 'completed' },
      { id: 'binary-search', title: 'Binary Search', progress: 45, lastAccessed: 'Yesterday', status: 'in_progress' },
      { id: 'sorting', title: 'Sorting', progress: 20, lastAccessed: '4 days ago', status: 'in_progress' },
    ],
    recentActivities: [
      { id: 'act-6', title: 'Solved Linear Search early exit optimization', type: 'quiz_completed', timestamp: 'Yesterday' },
    ],
  },
  {
    id: 'std-104',
    name: 'Priya Sharma',
    email: 'priya.sharma@algorithmics.in',
    avatar: '',
    topicsStarted: 18,
    topicsCompleted: 14,
    overallProgress: 94,
    lastActive: 'Today, 3:05 PM',
    streak: 31,
    currentStage: 'Phase 6: Advanced Data Structures',
    exploredTopics: [
      { id: 'data-structures-and-types', title: 'Data Structure and Types', progress: 100, lastAccessed: '2 weeks ago', status: 'completed' },
      { id: 'binary-search', title: 'Binary Search', progress: 100, lastAccessed: '1 week ago', status: 'completed' },
      { id: 'trees', title: 'Trees', progress: 100, lastAccessed: '4 days ago', status: 'completed' },
      { id: 'binary-search-tree', title: 'Binary Search Tree', progress: 100, lastAccessed: '3 days ago', status: 'completed' },
      { id: 'hashing-and-collision-resolution', title: 'Hashing & Collision Resolution', progress: 100, lastAccessed: 'Yesterday', status: 'completed' },
    ],
    recentActivities: [
      { id: 'act-7', title: 'Simulated Quadratic Probing collisions', type: 'visualization_run', timestamp: 'Today, 3:05 PM' },
      { id: 'act-8', title: 'Mastered Hash Load Factor rehash threshold', type: 'concept_read', timestamp: 'Yesterday' },
    ],
  },
  {
    id: 'std-105',
    name: 'David Kim',
    email: 'david.kim@seoulcode.kr',
    avatar: '',
    topicsStarted: 9,
    topicsCompleted: 3,
    overallProgress: 48,
    lastActive: '2 days ago',
    streak: 2,
    currentStage: 'Phase 2: Fundamental Structures',
    exploredTopics: [
      { id: 'data-structures-and-types', title: 'Data Structure and Types', progress: 100, lastAccessed: '5 days ago', status: 'completed' },
      { id: 'linear-search', title: 'Linear Search', progress: 100, lastAccessed: '4 days ago', status: 'completed' },
      { id: 'singly-linked-list', title: 'Singly Linked List (SLL)', progress: 70, lastAccessed: '2 days ago', status: 'in_progress' },
      { id: 'stack', title: 'Stack', progress: 55, lastAccessed: '3 days ago', status: 'in_progress' },
    ],
    recentActivities: [
      { id: 'act-9', title: 'Practiced pointer inversion on SLL', type: 'visualization_run', timestamp: '2 days ago' },
    ],
  },
  {
    id: 'std-106',
    name: 'Sophia Laurent',
    email: 'sophia.l@sorbonne.fr',
    avatar: '',
    topicsStarted: 14,
    topicsCompleted: 8,
    overallProgress: 76,
    lastActive: 'Today, 9:20 AM',
    streak: 12,
    currentStage: 'Phase 3: Hierarchies & Trees',
    exploredTopics: [
      { id: 'data-structures-and-types', title: 'Data Structure and Types', progress: 100, lastAccessed: '1 week ago', status: 'completed' },
      { id: 'binary-search-tree', title: 'Binary Search Tree', progress: 85, lastAccessed: 'Today', status: 'in_progress' },
      { id: 'priority-queue', title: 'Priority Queue', progress: 65, lastAccessed: 'Yesterday', status: 'in_progress' },
    ],
    recentActivities: [
      { id: 'act-10', title: 'Completed BST Search Invariant proof', type: 'concept_read', timestamp: 'Today, 9:20 AM' },
    ],
  },
];

interface UserContextType {
  user: UserProfile;
  role: UserRole;
  isAuthenticated: boolean;
  studentsList: StudentProgressRecord[];
  addXP: (amount: number, reason?: string) => void;
  markTopicProgress: (topicId: string, progress: number) => void;
  solveProblem: (problemName: string, xpReward?: number) => void;
  login: (emailOrRegdNo: string, name?: string, regdNo?: string) => void;
  registerStudent: (data: {
    name: string;
    regdNo: string;
    email: string;
    password?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  isRegdNoTaken: (regdNo: string, currentEmail?: string) => boolean;
  loginAsAdmin: (email: string, adminCode: string, name?: string) => { success: boolean; message?: string };
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authModalMode: 'login' | 'signup' | 'admin';
  setAuthModalMode: (mode: 'login' | 'signup' | 'admin') => void;
  triggerConfetti: () => void;
}

const initialBadges: AchievementBadge[] = [
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Began your DSA journey on AlgoLearn',
    icon: '🚀',
    unlocked: true,
    unlockedAt: '2 days ago',
    rarity: 'Common',
  },
  {
    id: 'array-architect',
    name: 'Array Architect',
    description: 'Mastered 2-Pointer & Sliding Window techniques',
    icon: '🧱',
    unlocked: true,
    unlockedAt: 'Yesterday',
    rarity: 'Rare',
  },
  {
    id: 'tree-whisperer',
    name: 'Tree Whisperer',
    description: 'Solved all Binary Tree & BST traversals',
    icon: '🌲',
    unlocked: false,
    rarity: 'Epic',
  },
  {
    id: 'graph-navigator',
    name: 'Graph Navigator',
    description: 'Conquered Dijkstra & Topological Sort algorithms',
    icon: '🕸️',
    unlocked: false,
    rarity: 'Epic',
  },
  {
    id: 'speed-sorter',
    name: 'Speed Sorter',
    description: 'Won 5 algorithm race battles in the Arcade',
    icon: '⚡',
    unlocked: true,
    unlockedAt: 'Today',
    rarity: 'Rare',
  },
  {
    id: 'streak-champion',
    name: 'Streak Champion',
    description: 'Maintained a 7-day consecutive practice streak',
    icon: '🔥',
    unlocked: true,
    unlockedAt: 'Today',
    rarity: 'Legendary',
  },
];

const defaultUser: UserProfile = {
  id: 'usr-9428',
  name: 'Alex Mercer',
  username: 'alex_codes',
  email: 'alex.mercer@dev.io',
  avatar: '',
  xp: 2850,
  level: 8,
  streak: 7,
  problemsSolved: 42,
  topicsMastered: 4,
  weeklyGoalMinutes: 180,
  weeklyProgressMinutes: 145,
  joinedDate: 'August 2026',
  badges: initialBadges,
  recentActivity: [
    {
      id: 'act-1',
      action: 'Completed Challenge',
      target: 'Two Sum & 3-Sum Optimal',
      xpEarned: 150,
      timestamp: '2 hours ago',
    },
    {
      id: 'act-2',
      action: 'Explored Topic',
      target: 'Binary Search Midpoint halving',
      xpEarned: 75,
      timestamp: '5 hours ago',
    },
    {
      id: 'act-3',
      action: 'Mastered Topic',
      target: 'Stacks & Monotonic Queues',
      xpEarned: 300,
      timestamp: 'Yesterday',
    },
    {
      id: 'act-4',
      action: 'Teacher Question Session',
      target: 'Dijkstra Priority Queue Proof',
      xpEarned: 50,
      timestamp: '2 days ago',
    },
  ],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('algolearn_user');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.avatar && parsed.avatar.includes('unsplash.com')) {
            parsed.avatar = '';
          }
          return parsed;
        } catch (e) {
          console.error(e);
        }
      }
    }
    return defaultUser;
  });

  const [role, setRole] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      const savedRole = localStorage.getItem('algolearn_role');
      if (savedRole === 'admin' || savedRole === 'student') {
        return savedRole as UserRole;
      }
    }
    return 'student';
  });

  const [registeredStudents, setRegisteredStudents] = useState<StudentProgressRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('algolearn_registered_students');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_STUDENTS;
  });

  // Sync registered students from server API on mount
  useEffect(() => {
    fetch('/api/students')
      .then((res) => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then((data) => {
        if (data?.students && Array.isArray(data.students) && data.students.length > 0) {
          setRegisteredStudents((prev) => {
            const map = new Map<string, StudentProgressRecord>();
            prev.forEach((s) => map.set(s.id, s));
            data.students.forEach((s: any) => {
              const existing = map.get(s.id);
              if (existing) {
                map.set(s.id, { ...existing, ...s });
              } else {
                map.set(s.id, {
                  id: s.id,
                  name: s.name,
                  email: s.email,
                  avatar: s.avatar || '',
                  regdNo: s.regdNo,
                  topicsStarted: 0,
                  topicsCompleted: 0,
                  overallProgress: 0,
                  lastActive: 'Just now',
                  streak: 1,
                  currentStage: 'Phase 1: Foundations',
                  exploredTopics: [],
                  recentActivities: [],
                });
              }
            });
            const merged = Array.from(map.values());
            if (typeof window !== 'undefined') {
              localStorage.setItem('algolearn_registered_students', JSON.stringify(merged));
            }
            return merged;
          });
        }
      })
      .catch(() => {
        // Fallback to local storage
      });
  }, []);

  // Save registered students whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('algolearn_registered_students', JSON.stringify(registeredStudents));
    }
  }, [registeredStudents]);

  // Fresh visitor must be logged out unless explicit valid session exists
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('algolearn_auth') === 'true';
    }
    return false;
  });

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'admin'>('login');

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('algolearn_auth', 'true');
      localStorage.setItem('algolearn_user', JSON.stringify(user));
      localStorage.setItem('algolearn_role', role);
    } else {
      localStorage.removeItem('algolearn_auth');
    }
  }, [isAuthenticated, user, role]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563eb', '#3b82f6', '#60a5fa', '#1d4ed8', '#93c5fd'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  const addXP = (amount: number, reason?: string) => {
    setUser((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 350) + 1;
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        triggerConfetti();
      }

      const newActivity = reason
        ? [
            {
              id: 'act-' + Date.now(),
              action: leveledUp ? 'Leveled Up!' : 'Earned XP',
              target: reason,
              xpEarned: amount,
              timestamp: 'Just now',
            },
            ...prev.recentActivity.slice(0, 7),
          ]
        : prev.recentActivity;

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        recentActivity: newActivity,
      };
    });
  };

  const markTopicProgress = (topicId: string, _progress: number) => {
    addXP(100, `Progressed in Topic`);
  };

  const solveProblem = (problemName: string, xpReward = 120) => {
    setUser((prev) => ({
      ...prev,
      problemsSolved: prev.problemsSolved + 1,
    }));
    addXP(xpReward, `Solved: ${problemName}`);
    triggerConfetti();
  };

  const isRegdNoTaken = (regdNo: string, currentEmail?: string): boolean => {
    const trimmed = regdNo.trim().toUpperCase();
    if (!trimmed) return false;
    return registeredStudents.some(
      (s) =>
        s.regdNo &&
        s.regdNo.toUpperCase() === trimmed &&
        (!currentEmail || s.email.toLowerCase() !== currentEmail.toLowerCase())
    );
  };

  const login = (emailOrRegdNo: string, name?: string, regdNo?: string) => {
    setIsAuthenticated(true);
    setRole('student');

    const trimmedInput = emailOrRegdNo.trim();
    // Check against registered students
    const matched = registeredStudents.find(
      (s) =>
        s.email.toLowerCase() === trimmedInput.toLowerCase() ||
        (s.regdNo && s.regdNo.toUpperCase() === trimmedInput.toUpperCase())
    );

    const resolvedRegdNo = regdNo || matched?.regdNo || undefined;
    const resolvedEmail = matched?.email || (trimmedInput.includes('@') ? trimmedInput : `${trimmedInput.toLowerCase()}@algolearn.edu`);
    const resolvedName = matched?.name || name || resolvedEmail.split('@')[0];
    const resolvedUsername = matched?.email ? matched.email.split('@')[0].toLowerCase() : resolvedEmail.split('@')[0].toLowerCase();

    setUser((prev) => ({
      ...prev,
      email: resolvedEmail,
      name: resolvedName,
      username: resolvedUsername,
      regdNo: resolvedRegdNo,
    }));

    if (resolvedRegdNo) {
      fetch('/api/leaderboard/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: resolvedName,
          regdNo: resolvedRegdNo,
        }),
      }).catch(() => {});
    }

    setShowAuthModal(false);
  };

  const registerStudent = async (data: {
    name: string;
    regdNo: string;
    email: string;
    password?: string;
  }): Promise<{ success: boolean; message?: string }> => {
    const trimmedRegd = data.regdNo.trim();
    const regdRegex = /^[A-Za-z0-9]{10}$/;

    if (!trimmedRegd) {
      return {
        success: false,
        message: 'Regd No. must be exactly 10 characters and contain only letters and numbers.',
      };
    }

    if (!regdRegex.test(trimmedRegd)) {
      return {
        success: false,
        message: 'Regd No. must be exactly 10 characters and contain only letters and numbers.',
      };
    }

    if (isRegdNoTaken(trimmedRegd, data.email)) {
      return {
        success: false,
        message: 'Registration Number is already registered to another student account.',
      };
    }

    // Attempt server API save
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          regdNo: trimmedRegd,
          email: data.email.trim(),
          password: data.password || '',
        }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        if (errorData?.error) {
          return { success: false, message: errorData.error };
        }
      }
    } catch (e) {
      // Offline fallback
    }

    const newRecord: StudentProgressRecord = {
      id: 'std-' + Date.now(),
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      avatar: '',
      regdNo: trimmedRegd,
      topicsStarted: 0,
      topicsCompleted: 0,
      overallProgress: 0,
      lastActive: 'Just now',
      streak: 1,
      currentStage: 'Phase 1: Foundations',
      exploredTopics: [],
      recentActivities: [
        {
          id: 'act-' + Date.now(),
          title: 'Registered on AlgoLearn',
          type: 'concept_read',
          timestamp: 'Just now',
        },
      ],
    };

    setRegisteredStudents((prev) => [newRecord, ...prev]);

    // Log the student in with the registered credentials and Regd No.
    login(data.email, data.name, trimmedRegd);

    return { success: true };
  };

  const loginAsAdmin = (
    email: string,
    adminCode: string,
    staffName?: string
  ): { success: boolean; message?: string } => {
    const trimmedCode = adminCode.trim().toUpperCase();

    if (trimmedCode !== 'ADMIN2026') {
      return {
        success: false,
        message: 'Invalid Admin Access Code. Please enter the authorized administrator key.',
      };
    }

    // Determine the real authenticated admin/teacher name
    let resolvedName = staffName?.trim();

    if (!resolvedName && email) {
      const emailLower = email.trim().toLowerCase();
      // Check against known faculty in TEACHERS catalog
      const matchedTeacher = TEACHERS.find(
        (t) =>
          t.email.toLowerCase() === emailLower ||
          t.name.toLowerCase() === emailLower
      );
      if (matchedTeacher) {
        resolvedName = matchedTeacher.name;
      } else {
        const prefix = emailLower.split('@')[0];
        if (prefix.includes('priya')) {
          resolvedName = 'Dr. Priya Sharma';
        } else if (prefix.includes('arjun')) {
          resolvedName = 'Prof. Arjun Mehta';
        } else if (prefix.includes('kavitha')) {
          resolvedName = 'Ms. Kavitha Reddy';
        } else if (prefix.includes('ravi')) {
          resolvedName = 'Dr. Ravi Kumar';
        } else if (prefix.includes('meera')) {
          resolvedName = 'Ms. Meera Nair';
        } else {
          resolvedName = prefix
            .replace(/[._-]/g, ' ')
            .split(' ')
            .filter(Boolean)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ');
        }
      }
    }

    if (!resolvedName) {
      resolvedName = 'System Administrator';
    }

    setIsAuthenticated(true);
    setRole('admin');
    setUser((prev) => ({
      ...prev,
      email: email || 'admin@algolearn.edu',
      name: resolvedName,
      username: email ? email.split('@')[0].toLowerCase() : 'admin_staff',
    }));
    setShowAuthModal(false);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole('student');
    setUser(defaultUser);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('algolearn_auth');
      localStorage.removeItem('algolearn_role');
      localStorage.removeItem('algolearn_user');
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        studentsList: registeredStudents,
        addXP,
        markTopicProgress,
        solveProblem,
        login,
        registerStudent,
        isRegdNoTaken,
        loginAsAdmin,
        logout,
        showAuthModal,
        setShowAuthModal,
        authModalMode,
        setAuthModalMode,
        triggerConfetti,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
