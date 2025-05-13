"use client";

import { useState } from "react";
import { MessageView } from "./MessageView";
import { Conversation } from "@/shared/entities/conversation";
import styles from "../../page.module.css";
import { addUserMessageToChat } from "./actions";

interface ChatProps {
  conversation: Conversation;
}

export function Chat({ conversation }: ChatProps) {
  const [message, setMessage] = useState("");
  const [currentConversation, setCurrentConversation] = useState<Conversation>(conversation);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const updatedConversation = await addUserMessageToChat(currentConversation, message);
    setCurrentConversation(updatedConversation);
    setMessage("");
  };

  return (
    <div className={styles.chatBox}>
      <MessageView conversation={currentConversation} />
      <form onSubmit={handleSubmit} className={styles.messageForm}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about anything..."
          className={styles.messageInput}
        />
        <button type="submit" className={styles.modernButton}>
          Send
        </button>
      </form>
    </div>
  );
}