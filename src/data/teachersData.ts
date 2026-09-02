import { Teacher } from '../types';

// ─── Minimal Teacher Profiles ────────────────────────────────────────────────
// Only: photo/avatar, teacher name, subject/expertise

export const TEACHERS: Teacher[] = [
  {
    id: 'teacher-priya',
    name: 'Dr. Priya Sharma',
    subject: 'Data Structures & Algorithms',
    avatarInitials: 'PS',
    avatarGradient: 'from-blue-600 via-indigo-600 to-violet-600',
  },
  {
    id: 'teacher-arjun',
    name: 'Prof. Arjun Mehta',
    subject: 'Algorithms & Complexity Analysis',
    avatarInitials: 'AM',
    avatarGradient: 'from-blue-700 via-indigo-600 to-indigo-500',
  },
  {
    id: 'teacher-kavitha',
    name: 'Ms. Kavitha Reddy',
    subject: 'Linear Data Structures & Pointers',
    avatarInitials: 'KR',
    avatarGradient: 'from-indigo-600 via-blue-600 to-blue-500',
  },
  {
    id: 'teacher-ravi',
    name: 'Dr. Ravi Kumar',
    subject: 'Advanced Trees, Heaps & Hashing',
    avatarInitials: 'RK',
    avatarGradient: 'from-blue-600 to-violet-600',
  },
  {
    id: 'teacher-meera',
    name: 'Ms. Meera Nair',
    subject: 'Recursion, Backtracking & DP',
    avatarInitials: 'MN',
    avatarGradient: 'from-indigo-700 via-indigo-600 to-violet-600',
  },
];
