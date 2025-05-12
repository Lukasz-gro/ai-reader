import React from 'react';
import { CourseContextProvider } from "@/contexts/course-mode/interface/web/react/course-context/CourseContext";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CourseContextProvider>
      {children}
    </CourseContextProvider>
  );
} 