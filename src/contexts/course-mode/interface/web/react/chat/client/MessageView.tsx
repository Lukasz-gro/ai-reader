"use client";
import styles from "./page.module.css";
import { Conversation } from "@/shared/entities/conversation";

interface ChatViewProps {
  conversation: Conversation;
}

export function MessageView({ conversation }: ChatViewProps) {
  return (
    <div className={styles.chatBox}>
      <div className={styles.chatContainer}>
        <div className={styles.chatHistory}>
          {conversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={
                msg.role === 'USER'
                  ? styles.userMessage
                  : styles.botMessage
              }
            >
              {msg.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 