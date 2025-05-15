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
          <button
            className="
              px-6 py-3 
              bg-gradient-to-r from-blue-500 to-blue-700 
              text-white 
              rounded-full 
              font-semibold 
              tracking-wide
              shadow-lg 
              hover:from-blue-600 hover:to-blue-800 
              hover:scale-105 
              transition-all 
              duration-200 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-400 
              focus:ring-offset-2
            "
            onClick={handleCreateConversation}
          >
            Create new course
          </button>
        </section>
      ) : (
        <Chat conversation={conversation} />
      )}
    </div>
  );
}
