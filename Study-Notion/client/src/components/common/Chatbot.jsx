import React, { useState, useRef } from "react";

const EXPERT_PROMPT = `You are StudyNotion's expert AI assistant.\n- You know all about the platform's courses, features, and student support.\n- Always provide clear, concise, and actionable answers.\n- If a student asks about a course, give specific guidance, tips, or resources.\n- If you detect a frequently asked question (FAQ), answer directly and link to help if possible.\n- Suggest platform features, study tips, and motivation.\n- If the student is viewing a course, tailor your help to that course.\n- After each answer, ask if the response was helpful.\n- Be friendly, supportive, and concise.`;

const FAQS = [
  { q: /reset.*password/i, a: "To reset your password, go to Settings > Update Password or use the Forgot Password link on the login page." },
  { q: /enroll.*course/i, a: "To enroll in a course, click the 'Enroll Now' button on the course page and complete the payment process." },
  { q: /contact.*support/i, a: "You can contact support via the Contact page or email support@studynotion.com." },
  { q: /refund/i, a: "For refunds, please check our refund policy on the Help page or contact support." },
  { q: /certificate/i, a: "Certificates are available after course completion. Check your dashboard for downloadable certificates." },
];

const QUICK_ACTIONS = [
  { label: "Show my courses", value: "Show my enrolled courses" },
  { label: "How to enroll?", value: "How do I enroll in a course?" },
  { label: "Contact support", value: "How do I contact support?" },
  { label: "Tips for learning", value: "Give me some tips for effective online learning." },
  { label: "Platform features", value: "What features does StudyNotion offer?" },
];

const dummyResources = {
  "React": ["https://react.dev/", "https://www.freecodecamp.org/news/learn-react-js-in-5-minutes/"]
};

const logConversation = (messages) => {
  try {
    const logs = JSON.parse(localStorage.getItem("chatbot_logs") || "[]");
    logs.push({ timestamp: Date.now(), messages });
    localStorage.setItem("chatbot_logs", JSON.stringify(logs));
  } catch {}
};

const Chatbot = ({ isStudent, courseName }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastMsgIdx, setLastMsgIdx] = useState(null);
  const chatEndRef = useRef(null);

  // FAQ detection
  const checkFAQ = (text) => {
    for (const faq of FAQS) {
      if (faq.q.test(text)) return faq.a;
    }
    return null;
  };

  // Resource suggestion stub
  const suggestResources = (text) => {
    if (/react/i.test(text)) {
      return `Here are some helpful React resources: ${dummyResources["React"].join(", ")}`;
    }
    return null;
  };

  const sendMessage = async (e, quickValue) => {
    if (e) e.preventDefault();
    const userInput = quickValue || input;
    if (!userInput.trim()) return;
    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setShowFeedback(false);
    setLastMsgIdx(newMessages.length);

    // FAQ check
    const faqAnswer = checkFAQ(userInput);
    if (faqAnswer) {
      setMessages((msgs) => [...msgs, { role: "assistant", content: faqAnswer + "\n\nWas this answer helpful?" }]);
      setShowFeedback(true);
      setLoading(false);
      logConversation([...newMessages, { role: "assistant", content: faqAnswer }]);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      return;
    }
    // Resource suggestion
    const resource = suggestResources(userInput);
    if (resource) {
      setMessages((msgs) => [...msgs, { role: "assistant", content: resource + "\n\nWas this answer helpful?" }]);
      setShowFeedback(true);
      setLoading(false);
      logConversation([...newMessages, { role: "assistant", content: resource }]);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      return;
    }
    try {
      // Compose system prompt
      let systemPrompt = EXPERT_PROMPT;
      if (courseName) {
        systemPrompt += `\nThe student is currently viewing the course: ${courseName}.`;
      }
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk-demo-key-1234567890abcdef`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            ...newMessages,
          ],
          max_tokens: 200,
        }),
      });
      const data = await res.json();
      const aiMsg = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
      setMessages((msgs) => [...msgs, { role: "assistant", content: aiMsg + "\n\nWas this answer helpful?" }]);
      setShowFeedback(true);
      logConversation([...newMessages, { role: "assistant", content: aiMsg }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: "assistant", content: "Error: Unable to reach AI service." }]);
    }
    setLoading(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleFeedback = (helpful) => {
    setShowFeedback(false);
    setMessages((msgs) => [...msgs, { role: "system", content: helpful ? "Thank you for your feedback!" : "Thanks for your feedback. We'll keep improving!" }]);
    // Optionally log feedback
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  if (!isStudent) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      {!open && (
        <button
          className="bg-yellow-50 text-richblack-900 rounded-full shadow-lg p-3 hover:bg-yellow-100 transition"
          onClick={() => setOpen(true)}
          aria-label="Open chatbot"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 3C7.03 3 3 6.58 3 11c0 1.61.62 3.09 1.69 4.36-.13.47-.5 1.7-.64 2.19-.1.33.24.63.56.5.66-.27 1.98-.81 2.61-1.07C8.7 17.59 10.29 18 12 18c4.97 0 9-3.58 9-8s-4.03-7-9-7z" fill="#161D29"/></svg>
        </button>
      )}
      {/* Chat Window */}
      {open && (
        <div className="w-80 max-w-[90vw] bg-richblack-800 rounded-lg shadow-2xl flex flex-col border border-richblack-700">
          <div className="flex items-center justify-between px-4 py-2 border-b border-richblack-700 bg-richblack-900 rounded-t-lg">
            <span className="font-semibold text-yellow-50">AI Chatbot</span>
            <button onClick={() => setOpen(false)} className="text-richblack-200 hover:text-yellow-50">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-80 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`text-sm p-2 rounded-lg ${msg.role === "assistant" ? "bg-richblack-700 text-yellow-25 self-start" : msg.role === "system" ? "bg-richblack-900 text-richblack-300 self-center" : "bg-yellow-50 text-richblack-900 self-end"}`}>{msg.content}</div>
            ))}
            <div ref={chatEndRef} />
          </div>
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                className="bg-yellow-50 text-richblack-900 text-xs font-semibold px-2 py-1 rounded hover:bg-yellow-100 transition"
                onClick={() => sendMessage(null, action.value)}
                disabled={loading}
              >
                {action.label}
              </button>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex items-center border-t border-richblack-700 bg-richblack-900 rounded-b-lg">
            <input
              className="flex-1 bg-transparent px-3 py-2 text-richblack-5 placeholder-richblack-400 focus:outline-none"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 text-yellow-50 font-semibold hover:text-yellow-100 disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
          {/* Feedback */}
          {showFeedback && (
            <div className="flex justify-center gap-2 py-2 bg-richblack-900 border-t border-richblack-700 rounded-b-lg">
              <button className="text-green-400 font-bold" onClick={() => handleFeedback(true)}>👍 Yes</button>
              <button className="text-red-400 font-bold" onClick={() => handleFeedback(false)}>👎 No</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot; 