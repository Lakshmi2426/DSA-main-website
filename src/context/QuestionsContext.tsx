import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentQuestion, TeacherMessage } from '../types';
import { useUser } from './UserContext';

const INITIAL_QUESTIONS: StudentQuestion[] = [
  {
    id: 'q-101',
    studentId: 'std-101',
    studentName: 'Rahul Sharma',
    studentAvatar: '',
    teacherId: 'teacher-priya',
    teacherName: 'Dr. Priya Sharma',
    teacherSubject: 'Data Structures & Algorithms',
    topicTitle: 'Binary Search Tree',
    status: 'Pending',
    createdAt: 'Today, 10:24 AM',
    updatedAt: 'Today, 10:24 AM',
    messages: [
      {
        messageId: 'm-1',
        conversationId: 'q-101',
        senderId: 'std-101',
        senderRole: 'student',
        senderName: 'Rahul Sharma',
        message: 'Why do we compare the new node with the root first in BST insertion? Can we start from a leaf node instead?',
        createdAt: '10:24 AM',
      },
    ],
  },
  {
    id: 'q-102',
    studentId: 'std-102',
    studentName: 'Ananya Patel',
    studentAvatar: '',
    teacherId: 'teacher-kavitha',
    teacherName: 'Ms. Kavitha Reddy',
    teacherSubject: 'Linear Data Structures',
    topicTitle: 'Doubly Linked List',
    status: 'Pending',
    createdAt: 'Today, 11:45 AM',
    updatedAt: 'Today, 11:45 AM',
    messages: [
      {
        messageId: 'm-2',
        conversationId: 'q-102',
        senderId: 'std-102',
        senderRole: 'student',
        senderName: 'Ananya Patel',
        message: 'How does deletion in a Doubly Linked List maintain both prev and next pointers without creating dangling references?',
        createdAt: '11:45 AM',
      },
    ],
  },
  {
    id: 'q-103',
    studentId: 'std-103',
    studentName: 'Marcus Vance',
    studentAvatar: '',
    teacherId: 'teacher-arjun',
    teacherName: 'Prof. Arjun Mehta',
    teacherSubject: 'Algorithms & Complexity',
    topicTitle: 'Graph Algorithms',
    status: 'Answered',
    createdAt: 'Yesterday, 4:10 PM',
    updatedAt: 'Yesterday, 4:42 PM',
    messages: [
      {
        messageId: 'm-3',
        conversationId: 'q-103',
        senderId: 'std-103',
        senderRole: 'student',
        senderName: 'Marcus Vance',
        message: 'What is the time complexity difference between adjacency matrix and adjacency list when doing BFS?',
        createdAt: '4:10 PM',
      },
      {
        messageId: 'm-4',
        conversationId: 'q-103',
        senderId: 'teacher-arjun',
        senderRole: 'teacher',
        senderName: 'Prof. Arjun Mehta',
        message: 'In an adjacency list, BFS takes O(V + E) time because you only examine neighbors that actually exist. With an adjacency matrix, you must iterate over all V cells in a row for every vertex, resulting in O(V²) time regardless of edge count. For sparse graphs, the list is much faster!',
        createdAt: '4:42 PM',
      },
    ],
  },
];

interface QuestionsContextType {
  questions: StudentQuestion[];
  sendQuestion: (params: {
    teacherId: string;
    teacherName: string;
    teacherSubject: string;
    topicTitle?: string;
    message: string;
  }) => Promise<StudentQuestion>;
  sendAnswer: (params: {
    questionId: string;
    answer: string;
    teacherName?: string;
  }) => Promise<void>;
  getStudentQuestions: () => StudentQuestion[];
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

export const QuestionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [questions, setQuestions] = useState<StudentQuestion[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('algolearn_student_questions');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return parsed.map((q: StudentQuestion) => ({
              ...q,
              studentAvatar: q.studentAvatar && q.studentAvatar.includes('unsplash.com') ? '' : q.studentAvatar,
            }));
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_QUESTIONS;
  });

  // Try to fetch questions from backend on mount
  useEffect(() => {
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data) => {
        if (data?.questions && Array.isArray(data.questions)) {
          // Merge with any local questions
          setQuestions((prev) => {
            const ids = new Set(data.questions.map((q: StudentQuestion) => q.id));
            const localOnly = prev.filter((q) => !ids.has(q.id));
            const merged = [...data.questions, ...localOnly];
            localStorage.setItem('algolearn_student_questions', JSON.stringify(merged));
            return merged;
          });
        }
      })
      .catch((err) => {
        // Backend fallback - gracefully use local state
        console.log('Using local questions storage fallback', err);
      });
  }, []);

  // Save to localStorage whenever questions change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('algolearn_student_questions', JSON.stringify(questions));
    }
  }, [questions]);

  const sendQuestion = async (params: {
    teacherId: string;
    teacherName: string;
    teacherSubject: string;
    topicTitle?: string;
    message: string;
  }): Promise<StudentQuestion> => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newId = 'q-' + Date.now();

    const newQuestion: StudentQuestion = {
      id: newId,
      studentId: user.id || 'std-current',
      studentName: user.name || 'Algo Learner',
      studentAvatar: user.avatar || '',
      teacherId: params.teacherId,
      teacherName: params.teacherName,
      teacherSubject: params.teacherSubject,
      topicTitle: params.topicTitle || 'DSA Question',
      status: 'Pending',
      createdAt: 'Today, ' + timeStr,
      updatedAt: 'Today, ' + timeStr,
      messages: [
        {
          messageId: 'msg-' + Date.now(),
          conversationId: newId,
          senderId: user.id || 'std-current',
          senderRole: 'student',
          senderName: user.name || 'You',
          message: params.message,
          createdAt: timeStr,
        },
      ],
    };

    // Update local state immediately for responsive UI
    setQuestions((prev) => [newQuestion, ...prev]);

    // Send to server backend
    try {
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: user.id,
          studentName: user.name,
          studentAvatar: user.avatar,
          teacherId: params.teacherId,
          teacherName: params.teacherName,
          teacherSubject: params.teacherSubject,
          topicTitle: params.topicTitle,
          message: params.message,
        }),
      });
    } catch (e) {
      console.log('Saved to local storage fallback');
    }

    return newQuestion;
  };

  const sendAnswer = async (params: {
    questionId: string;
    answer: string;
    teacherName?: string;
  }): Promise<void> => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === params.questionId) {
          const teacherReply: TeacherMessage = {
            messageId: 'msg-reply-' + Date.now(),
            conversationId: q.id,
            senderId: q.teacherId,
            senderRole: 'teacher',
            senderName: params.teacherName || q.teacherName,
            message: params.answer,
            createdAt: timeStr,
          };
          return {
            ...q,
            status: 'Answered',
            updatedAt: 'Today, ' + timeStr,
            messages: [...q.messages, teacherReply],
          };
        }
        return q;
      })
    );

    // Call server backend
    try {
      await fetch(`/api/questions/${params.questionId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer: params.answer,
          teacherName: params.teacherName,
        }),
      });
    } catch (e) {
      console.log('Answer saved to local storage fallback');
    }
  };

  const getStudentQuestions = () => {
    // Return all questions for the current user, or questions created by student
    return questions.filter((q) => q.studentId === user.id || q.studentName === user.name);
  };

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        sendQuestion,
        sendAnswer,
        getStudentQuestions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
};
