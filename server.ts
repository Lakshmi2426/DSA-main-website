import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!aiClient && apiKey) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // ============================================================
  // HEALTH CHECK
  // ============================================================

  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      app: "AlgoLearn API",
      timestamp: new Date().toISOString(),
    });
  });

  // ============================================================
  // STUDENT QUESTIONS & TEACHER REPLIES STORE
  // ============================================================

  let serverQuestions = [
    {
      id: "q-101",
      studentId: "std-101",
      studentName: "Rahul Sharma",
      studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      teacherId: "teacher-priya",
      teacherName: "Dr. Priya Sharma",
      teacherSubject: "Data Structures & Algorithms",
      topicTitle: "Binary Search Tree",
      status: "Pending",
      createdAt: "Today, 10:24 AM",
      updatedAt: "Today, 10:24 AM",
      messages: [
        {
          messageId: "m-1",
          conversationId: "q-101",
          senderId: "std-101",
          senderRole: "student",
          senderName: "Rahul Sharma",
          message: "Why do we compare the new node with the root first in BST insertion? Can we start from a leaf node instead?",
          createdAt: "10:24 AM",
        },
      ],
    },
    {
      id: "q-102",
      studentId: "std-102",
      studentName: "Ananya Patel",
      studentAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      teacherId: "teacher-kavitha",
      teacherName: "Ms. Kavitha Reddy",
      teacherSubject: "Linear Data Structures",
      topicTitle: "Doubly Linked List",
      status: "Pending",
      createdAt: "Today, 11:45 AM",
      updatedAt: "Today, 11:45 AM",
      messages: [
        {
          messageId: "m-2",
          conversationId: "q-102",
          senderId: "std-102",
          senderRole: "student",
          senderName: "Ananya Patel",
          message: "How does deletion in a Doubly Linked List maintain both prev and next pointers without creating dangling references?",
          createdAt: "11:45 AM",
        },
      ],
    },
    {
      id: "q-103",
      studentId: "std-103",
      studentName: "Marcus Vance",
      studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      teacherId: "teacher-arjun",
      teacherName: "Prof. Arjun Mehta",
      teacherSubject: "Algorithms & Complexity",
      topicTitle: "Graph Algorithms",
      status: "Answered",
      createdAt: "Yesterday, 4:10 PM",
      updatedAt: "Yesterday, 4:42 PM",
      messages: [
        {
          messageId: "m-3",
          conversationId: "q-103",
          senderId: "std-103",
          senderRole: "student",
          senderName: "Marcus Vance",
          message: "What is the time complexity difference between adjacency matrix and adjacency list when doing BFS?",
          createdAt: "4:10 PM",
        },
        {
          messageId: "m-4",
          conversationId: "q-103",
          senderId: "teacher-arjun",
          senderRole: "teacher",
          senderName: "Prof. Arjun Mehta",
          message: "In an adjacency list, BFS takes O(V + E) time because you only examine neighbors that actually exist. With an adjacency matrix, you must iterate over all V cells in a row for every vertex, resulting in O(V²) time regardless of edge count. For sparse graphs, the list is much faster!",
          createdAt: "4:42 PM",
        },
      ],
    },
  ];

  app.get("/api/questions", (_req, res) => {
    res.json({ questions: serverQuestions });
  });

  app.post("/api/questions", (req, res) => {
    const { studentId, studentName, studentAvatar, teacherId, teacherName, teacherSubject, topicTitle, message } = req.body;
    if (!message || !teacherId) {
      return res.status(400).json({ error: "Missing required question parameters." });
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newQuestion = {
      id: "q-" + Date.now(),
      studentId: studentId || "std-current",
      studentName: studentName || "Student",
      studentAvatar: studentAvatar || "",
      teacherId,
      teacherName: teacherName || "Teacher",
      teacherSubject: teacherSubject || "DSA Expert",
      topicTitle: topicTitle || "Data Structures",
      status: "Pending",
      createdAt: "Today, " + timeStr,
      updatedAt: "Today, " + timeStr,
      messages: [
        {
          messageId: "msg-" + Date.now(),
          conversationId: "q-" + Date.now(),
          senderId: studentId || "std-current",
          senderRole: "student",
          senderName: studentName || "Student",
          message,
          createdAt: timeStr,
        },
      ],
    };

    serverQuestions.unshift(newQuestion);
    res.status(201).json({ question: newQuestion });
  });

  app.post("/api/questions/:id/reply", (req, res) => {
    const { id } = req.params;
    const { answer, teacherName, teacherId } = req.body;
    if (!answer) {
      return res.status(400).json({ error: "Reply message cannot be empty." });
    }

    const question = serverQuestions.find((q) => q.id === id);
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const replyMessage = {
      messageId: "msg-reply-" + Date.now(),
      conversationId: id,
      senderId: teacherId || question.teacherId,
      senderRole: "teacher",
      senderName: teacherName || question.teacherName,
      message: answer,
      createdAt: timeStr,
    };

    question.messages.push(replyMessage);
    question.status = "Answered";
    question.updatedAt = "Today, " + timeStr;

    res.json({ question });
  });

  // ============================================================
  // AI CHAT
  // ============================================================

  const handleAiChat = async (
    req: express.Request,
    res: express.Response
  ) => {
    const startTime = Date.now();

    try {
      const { message, mode, history, code, topic } = req.body;

      // --------------------------------------------------------
      // VALIDATE REQUEST
      // --------------------------------------------------------

      if (!message && !code) {
        return res.status(400).json({
          error: "Please enter a question or provide code.",
        });
      }

      // --------------------------------------------------------
      // CHECK API KEY
      // --------------------------------------------------------

      const apiKey = process.env.GEMINI_API_KEY?.trim();

      if (!apiKey) {
        console.error("GEMINI_API_KEY is missing or empty.");

        return res.status(500).json({
          error: "Gemini API configuration is missing.",
        });
      }

      const client = getGeminiClient();

      if (!client) {
        return res.status(500).json({
          error: "Gemini API configuration is missing.",
        });
      }

      // ========================================================
      // OPTIMIZED ALGOLEARN AI SYSTEM INSTRUCTION
      // ========================================================

      let systemInstruction = `
You are AlgoLearn AI, the AI assistant for the AlgoLearn learning platform.

Your job is to help users with:
1. AlgoLearn website questions.
2. DSA questions.
3. Programming and software-development questions.

ALGOLEARN:
AlgoLearn is an interactive platform for learning Data Structures and Algorithms through explanations, topics, visualizations, animations, quizzes, practice, and AI assistance.

You can answer questions about:
- AlgoLearn
- Home
- Topics
- Visualize
- Quiz
- AI Assistant
- Learning features
- DSA topics
- How to use AlgoLearn
- How to learn topics using AlgoLearn

DSA:
- Arrays
- Strings
- Linked Lists
- Stacks
- Queues
- Trees
- Graphs
- Heaps
- Hash Tables
- Searching
- Sorting
- Recursion
- Dynamic Programming
- Greedy Algorithms
- Backtracking
- Big-O
- Time Complexity
- Space Complexity
- Coding problems

PROGRAMMING:
- JavaScript
- TypeScript
- ReactJS
- React Hooks
- useState
- useEffect
- useContext
- useRef
- Node.js
- Express.js
- MongoDB
- MERN Stack
- HTML
- CSS
- APIs
- Git
- GitHub
- Debugging
- Web development

IMPORTANT:
You are NOT a DSA-only assistant.

Do NOT say:
"I can only answer DSA questions."

If the user asks about AlgoLearn, answer in the context of AlgoLearn.

If the user asks a DSA question, answer the DSA question.

If the user asks a programming question, answer the programming question.

If the user asks about both AlgoLearn and DSA/programming, answer both.

Be clear, accurate, friendly, and beginner-friendly.

For technical questions:
- Explain the concept first.
- Use examples when useful.
- Give code when requested.
- Explain important code.
- Give time and space complexity for algorithm questions when relevant.

For AlgoLearn questions:
- Give practical guidance.
- Do not invent pages, buttons, features, or UI details.
- If you do not know a specific website detail, say so honestly.

For completely unrelated questions, politely explain that AlgoLearn AI is primarily designed for AlgoLearn, DSA, programming, and technical learning.
`;

      // ========================================================
      // SPECIAL MODES
      // ========================================================

      if (mode === "debug") {
        systemInstruction += `
        
DEBUG MODE:
Analyze the provided code.

Identify:
- Syntax errors
- Logic errors
- Runtime errors
- Edge cases
- Performance problems

Then provide:
1. Problem
2. Why it happens
3. Corrected code
4. Explanation
5. Time complexity
6. Space complexity when relevant
`;
      } else if (mode === "explain") {
        systemInstruction += `
        
EXPLAIN MODE:
Explain the concept step-by-step.

Use:
- Simple definition
- Example
- Real-world analogy when useful
- Code when useful
- Big-O when relevant

Assume the user may be a beginner.
`;
      } else if (mode === "practice") {
        systemInstruction += `
        
PRACTICE MODE:
Create a practice problem containing:
- Problem statement
- Input
- Output
- Example
- Constraints
- Hints
- Expected approach
- Time complexity
- Space complexity

Do not immediately give the complete solution unless the user asks.
`;
      }

      // ========================================================
      // CURRENT TOPIC
      // ========================================================

      if (topic) {
        systemInstruction += `

Current topic:
${String(topic).slice(0, 500)}
`;
      }

      // ========================================================
      // LIMIT CONVERSATION HISTORY
      // ========================================================
      //
      // Only the most recent 6 messages are sent.
      // This keeps requests smaller and faster.

      const recentHistory =
        Array.isArray(history) ? history.slice(-6) : [];

      const formattedContents: any[] = [];

      for (const item of recentHistory) {
        if (item.role && item.parts) {
          formattedContents.push({
            role: item.role === "user" ? "user" : "model",
            parts: Array.isArray(item.parts)
              ? item.parts
              : [{ text: String(item.parts) }],
          });
        } else if (item.sender && item.content) {
          formattedContents.push({
            role: item.sender === "user" ? "user" : "model",
            parts: [
              {
                text: String(item.content),
              },
            ],
          });
        }
      }

      // ========================================================
      // CURRENT USER MESSAGE
      // ========================================================

      let promptText = "";

      if (code) {
        promptText += `Code provided by the user:

\`\`\`
${String(code)}
\`\`\`

`;
      }

      promptText +=
        message ||
        "Please analyze and explain the provided code.";

      formattedContents.push({
        role: "user",
        parts: [
          {
            text: promptText,
          },
        ],
      });

      // ========================================================
      // GEMINI MODELS
      // ========================================================
      //
      // Use a fast primary model.
      // If it fails, use the second model as fallback.

      const candidateModels = [
        "gemini-3.6-flash",
        "gemini-3.5-flash-lite",
      ];

      let generatedReply: string | null = null;
      let usedModel = "";
      let lastError: any = null;

      // ========================================================
      // CALL GEMINI
      // ========================================================

      for (const candidate of candidateModels) {
        try {
          console.log(`Trying Gemini model: ${candidate}`);

          const response = await client.models.generateContent({
            model: candidate,
            contents: formattedContents,
            config: {
              systemInstruction,
              temperature: 0.5,

              // Prevent unnecessarily long responses.
              maxOutputTokens: 1200,
            },
          });

          if (response?.text) {
            generatedReply = response.text;
            usedModel = candidate;

            console.log(
              `Gemini response successful using ${candidate}`
            );

            break;
          }
        } catch (modelError: any) {
          lastError = modelError;

          console.error(`Gemini model ${candidate} failed:`, {
            message: modelError?.message || String(modelError),
            status: modelError?.status,
            code: modelError?.code,
            name: modelError?.name,
          });
        }
      }

      // ========================================================
      // SUCCESS
      // ========================================================

      if (generatedReply) {
        const responseTime = Date.now() - startTime;

        console.log(
          `AI response generated in ${responseTime}ms using ${usedModel}`
        );

        return res.json({
          reply: generatedReply,
          model: usedModel,
          responseTime,
        });
      }

      // ========================================================
      // ALL MODELS FAILED
      // ========================================================

      console.error("All Gemini models failed:", {
        message: lastError?.message || String(lastError),
        status: lastError?.status,
        code: lastError?.code,
        name: lastError?.name,
      });

      return res.status(500).json({
        error: "AI Assistant is temporarily unavailable.",
        details:
          process.env.NODE_ENV !== "production"
            ? lastError?.message || String(lastError)
            : undefined,
      });
    } catch (err: any) {
      console.error(
        "API /api/ai handler error:",
        err?.message || err
      );

      return res.status(500).json({
        error:
          "AI Assistant is temporarily unavailable. Please try again.",
      });
    }
  };

  // ============================================================
  // AI ROUTES
  // ============================================================

  app.post("/api/ai", handleAiChat);
  app.post("/api/ai/chat", handleAiChat);

  // ============================================================
  // VITE DEVELOPMENT SERVER
  // ============================================================

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");

    app.use(express.static(distPath));

    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // ============================================================
  // START SERVER
  // ============================================================

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `AlgoLearn server running on http://0.0.0.0:${PORT}`
    );
  });
}

startServer();