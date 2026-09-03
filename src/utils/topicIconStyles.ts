export interface TopicIconTheme {
  containerBg: string;
  borderColor: string;
  iconColor: string;
  glowShadow: string;
}

const THEMES: TopicIconTheme[] = [
  // 0: Royal Blue (#2563EB / #1D4ED8)
  {
    containerBg:
      'bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-700',
    borderColor: 'border-blue-400/40 border-t-white/30',
    iconColor: 'text-white',
    glowShadow:
      'shadow-[0_6px_18px_-2px_rgba(37,99,235,0.45)] dark:shadow-[0_0_20px_rgba(59,130,246,0.5)]',
  },
  // 1: Deep Royal Blue & Indigo (#1D4ED8 / #4F46E5)
  {
    containerBg:
      'bg-gradient-to-br from-blue-700 to-indigo-600 dark:from-blue-600 dark:to-indigo-600',
    borderColor: 'border-indigo-400/40 border-t-white/30',
    iconColor: 'text-white',
    glowShadow:
      'shadow-[0_6px_18px_-2px_rgba(37,99,235,0.45)] dark:shadow-[0_0_20px_rgba(79,70,229,0.5)]',
  },
  // 2: Royal Blue with Indigo Tint
  {
    containerBg:
      'bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-600',
    borderColor: 'border-blue-400/40 border-t-white/30',
    iconColor: 'text-white',
    glowShadow:
      'shadow-[0_6px_18px_-2px_rgba(37,99,235,0.45)] dark:shadow-[0_0_20px_rgba(59,130,246,0.5)]',
  },
  // 3: Deep Cobalt Blue (#1D4ED8 / #1E40AF)
  {
    containerBg:
      'bg-gradient-to-br from-blue-700 to-blue-800 dark:from-blue-600 dark:to-blue-800',
    borderColor: 'border-blue-400/40 border-t-white/30',
    iconColor: 'text-white',
    glowShadow:
      'shadow-[0_6px_18px_-2px_rgba(29,78,216,0.45)] dark:shadow-[0_0_20px_rgba(37,99,235,0.5)]',
  },
  // 4: Royal Blue Dominant to Indigo
  {
    containerBg:
      'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-600 dark:from-blue-500 dark:via-blue-600 dark:to-indigo-600',
    borderColor: 'border-blue-400/40 border-t-white/30',
    iconColor: 'text-white',
    glowShadow:
      'shadow-[0_6px_18px_-2px_rgba(59,130,246,0.45)] dark:shadow-[0_0_20px_rgba(37,99,235,0.5)]',
  },
  // 5: Rich Royal Blue & Deep Indigo
  {
    containerBg:
      'bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 dark:from-blue-500 dark:via-indigo-600 dark:to-indigo-700',
    borderColor: 'border-indigo-400/40 border-t-white/30',
    iconColor: 'text-white',
    glowShadow:
      'shadow-[0_6px_18px_-2px_rgba(37,99,235,0.45)] dark:shadow-[0_0_20px_rgba(79,70,229,0.5)]',
  },
  // 6: Deep Navy Royal Blue (#172554)
  {
    containerBg:
      'bg-gradient-to-br from-blue-800 to-indigo-900 dark:from-blue-700 dark:to-indigo-900',
    borderColor: 'border-blue-400/40 border-t-white/30',
    iconColor: 'text-white',
    glowShadow:
      'shadow-[0_6px_18px_-2px_rgba(29,78,216,0.45)] dark:shadow-[0_0_20px_rgba(37,99,235,0.5)]',
  },
  // 7: Royal Blue Accent Fusion
  {
    containerBg:
      'bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-600',
    borderColor: 'border-blue-400/40 border-t-white/30',
    iconColor: 'text-white',
    glowShadow:
      'shadow-[0_6px_18px_-2px_rgba(37,99,235,0.45)] dark:shadow-[0_0_20px_rgba(59,130,246,0.5)]',
  },
];

// Mapping for all 18 DSA Topics distributed across Royal Blue and Indigo variants
const TOPIC_THEME_MAP: Record<string, number> = {
  'data-structures-and-types': 0, // Royal Blue
  'linear-search': 4,            // Royal Blue -> Indigo
  'binary-search': 1,            // Indigo
  'sorting': 2,                  // Royal Blue -> Indigo
  'hashing-and-collision-resolution': 4, // Royal Blue Dominant to Indigo
  'insertion-sort': 2,           // Royal Blue -> Indigo
  'bubble-sort': 7,              // Royal Blue Fusion
  'selection-sort': 6,           // Deep Navy Royal Blue
  'hashing': 4,                  // Royal Blue Dominant
  'collision-resolution-techniques': 5, // Rich Royal Blue & Deep Indigo
  'merge-sort': 3,               // Deep Cobalt Blue
  'quick-sort': 5,               // Rich Royal Blue & Deep Indigo
  'singly-linked-list': 0,       // Royal Blue
  'doubly-linked-list': 1,       // Indigo
  'circular-linked-list': 2,     // Royal Blue -> Indigo
  'stack': 4,                    // Royal Blue -> Indigo
  'queue': 7,                    // Royal Blue Fusion
  'deque': 3,                    // Deep Cobalt Blue
  'binary-tree': 1,              // Indigo
  'binary-search-tree': 5,       // Rich Royal Blue & Deep Indigo
  'heap-priority-queue': 0,      // Royal Blue
  'graph-representation': 2,     // Royal Blue -> Indigo
};

export const getTopicIconTheme = (topicId: string, fallbackIndex = 0): TopicIconTheme => {
  const index = TOPIC_THEME_MAP[topicId] !== undefined ? TOPIC_THEME_MAP[topicId] : fallbackIndex % THEMES.length;
  return THEMES[index];
};
