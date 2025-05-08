"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../page.module.css";
import ParameterInput from "./ParameterInput";

interface Prompt {
  id: string;
  title: string;
  text: string;
  parameters?: {
    name: string;
    label: string;
    type: string;
    placeholder: string;
  }[];
}

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(true);

  useEffect(() => {
    import("../prompts.json").then((mod) => setPrompts(mod.default));
  }, []);

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

  const handlePromptClick = (prompt: Prompt) => {
    if (prompt.parameters) {
      setSelectedPrompt(prompt);
    } else {
      setInput(prompt.text);
    }
  };

  const handleParameterComplete = (values: Record<string, string>) => {
    if (!selectedPrompt) return;
    
    let finalText = selectedPrompt.text;
    Object.entries(values).forEach(([key, value]) => {
      finalText = finalText.replace(`{${key}}`, value);
    });

    const userMsg = { sender: "user", text: finalText };
    const botMsg = { sender: "bot", text: finalText };
    setMessages((msgs) => [...msgs, userMsg, botMsg]);
    setSelectedPrompt(null);
    setShouldScroll(true);
  };

  const handleParameterCancel = () => {
    setSelectedPrompt(null);
  };

  return (
    <div className={styles.chatContainer}>
      {prompts.length > 0 && (
        <div className={styles.promptPicker}>
          {prompts.map((p) => (
            <button
              key={p.id}
              type="button"
              className={styles.promptButton}
              onClick={() => handlePromptClick(p)}
              title={p.parameters ? "This prompt requires additional input" : undefined}
            >
              {p.title}
              {p.parameters && (
                <span style={{ marginLeft: 6, verticalAlign: 'middle', display: 'inline-flex', alignItems: 'center' }}>
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle' }}>
                    <path d="M15.232 2.232a3 3 0 0 1 4.243 4.243l-10.5 10.5a2 2 0 0 1-.878.513l-4 1a1 1 0 0 1-1.213-1.213l1-4a2 2 0 0 1 .513-.878l10.5-10.5zm2.829 1.414a1 1 0 0 0-1.415 0l-1.086 1.086 1.415 1.415 1.086-1.086a1 1 0 0 0 0-1.415zm-2.5 2.5-9.586 9.586-.5 2 2-.5 9.586-9.586-1.415-1.415z" fill="#4299e1"/>
                  </svg>
                </span>
              )}
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
      
      <div
        className={
          styles.parameterBackdrop +
          (selectedPrompt ? ' ' : ' ' + styles.parameterBackdropHidden)
        }
        onClick={selectedPrompt ? handleParameterCancel : undefined}
        aria-label="Close parameter input"
        aria-hidden={!selectedPrompt}
      />
      <div
        className={
          styles.parameterPanelModal +
          (selectedPrompt ? ' ' + styles.parameterPanelModalOpen : '')
        }
        style={{ pointerEvents: selectedPrompt ? 'auto' : 'none' }}
      >
        {selectedPrompt && (
          <ParameterInput
            parameters={selectedPrompt.parameters || []}
            onComplete={handleParameterComplete}
            onCancel={handleParameterCancel}
          />
        )}
      </div>
      {!selectedPrompt && (
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
      )}
    </div>
  );
} 