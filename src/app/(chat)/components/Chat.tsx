"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../page.module.css";

// Type for prompt
interface Prompt {
  id: string;
  title: string;
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(true);

  useEffect(() => {
    import("../prompts.json").then((mod) => setPrompts(mod.default));
  }, []);

  // Only scroll if user is near the bottom or a new message is sent by the user
  useEffect(() => {
    if (!chatHistoryRef.current) return;
    const el = chatHistoryRef.current;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    if (shouldScroll || isNearBottom) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [messages, shouldScroll]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: input };
    setMessages((msgs) => [...msgs, userMsg, botMsg]);
    setInput("");
    setShouldScroll(true);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className={styles.chatContainer}>
      {/* Prompt Picker */}
      {prompts.length > 0 && (
        <div className={styles.promptPicker}>
          {prompts.map((p) => (
            <button
              key={p.id}
              type="button"
              className={styles.promptButton}
              onClick={() => handlePromptClick(p.text)}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}
      <div className={styles.chatHistory} ref={chatHistoryRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.sender === "user"
                ? styles.userMessage
                : styles.botMessage
            }
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form className={styles.chatInputSection} onSubmit={handleSend}>
        <textarea
          className={styles.textArea}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(e as unknown as React.FormEvent);
            }
          }}
        />
        <button
          className={styles.sendButton}
          type="submit"
          aria-label="Send message"
          disabled={!input.trim()}
        >
          <svg className={styles.sendIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.172 16.172a4 4 0 0 1 0-5.656l7.778-7.778a4 4 0 1 1 5.656 5.656l-7.778 7.778a4 4 0 0 1-5.656 0z" fill="currentColor"/>
            <path d="M7 13l6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </form>
    </div>
  );
} 