import { Teacher } from '../types';

// ─── Minimal Teacher Profiles ────────────────────────────────────────────────
// Only: photo/avatar, teacher name, subject/expertise

export const TEACHERS: Teacher[] = [
  {
    id: 'teacher-priya',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@algolearn.edu',
    subject: 'Data Structures & Algorithms',
    avatarInitials: 'PS',
    avatarGradient: 'from-blue-600 via-indigo-600 to-violet-600',
    description: 'Specializes in BSTs, tree traversals, and algorithmic complexity.',
  },
  {
    id: 'teacher-arjun',
    name: 'Prof. Arjun Mehta',
    email: 'arjun.mehta@algolearn.edu',
    subject: 'Algorithms & Complexity Analysis',
    avatarInitials: 'AM',
    avatarGradient: 'from-blue-700 via-indigo-600 to-indigo-500',
    description: 'Expert in divide and conquer, graph traversals, and recurrence relations.',
  },
  {
    id: 'teacher-kavitha',
    name: 'Ms. Kavitha Reddy',
    email: 'kavitha.reddy@algolearn.edu',
    subject: 'Linear Data Structures & Pointers',
    avatarInitials: 'KR',
    avatarGradient: 'from-indigo-600 via-blue-600 to-blue-500',
    description: 'Specialist in linked lists, stack/queue architectures, and pointer safety.',
  },
  {
    id: 'teacher-ravi',
    name: 'Dr. Ravi Kumar',
    email: 'ravi.kumar@algolearn.edu',
    subject: 'Advanced Trees, Heaps & Hashing',
    avatarInitials: 'RK',
    avatarGradient: 'from-blue-600 to-violet-600',
    description: 'Author and instructor covering priority queues and hash collision resolution.',
  },
  {
    id: 'teacher-meera',
    name: 'Ms. Meera Nair',
    email: 'meera.nair@algolearn.edu',
    subject: 'Recursion, Backtracking & DP',
    avatarInitials: 'MN',
    avatarGradient: 'from-indigo-700 via-indigo-600 to-violet-600',
    description: 'Coach focusing on recursive state trees and optimal subproblem decompositions.',
  },
];
