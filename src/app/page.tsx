'use client'
import styles from "./page.module.css";
import { Course } from "@/contexts/course-mode/entities/course";
import { useState } from "react";
import { Conversation } from "@/shared/entities/conversation";
import { Chat } from "@/contexts/course-mode/interface/web/react/chat/client/Chat";
import { createNewCourseConversation } from "@/contexts/course-mode/interface/web/react/chat/server/chat-actions";

const mockCourse: Course = {
  id: "1",
  name: "Mock Course",
  roadmap: {
    id: "1",
    title: "Mock Course Roadmap",
    checkpoints: []
  },
  conversations: [],
  project: {
    id: "1",
    title: "Mock Project",
    materials: []
  }
};

export default function Home() {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  
  const handleCreateConversation = async () => {
    const newConversation = await createNewCourseConversation(mockCourse);
    setConversation(newConversation);
  };
  
  return (
    <div className={styles.home}>
      {!conversation ? (
        <section className={styles.gettingStarted}>
          <button className={styles.modernButton} onClick={handleCreateConversation}>Create new course</button>
        </section>
      ) : (
        <Chat conversation={conversation} />
      )}
    </div>
  );
}
