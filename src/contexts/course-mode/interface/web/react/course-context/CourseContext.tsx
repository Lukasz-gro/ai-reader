'use client'
import React, { createContext, useContext, ReactNode } from 'react';
import { CourseModeController } from '@/contexts/course-mode/interface/controllers/course-mode-controller';
import { StartCourseConversationConcrete } from '@/contexts/course-mode/application/use-cases/start-course-conversation-concrete';
import { InMemoryCourseRepo } from '@/contexts/course-mode/infra/repo/in-memory-course-repo';
import { UuidProvider } from '@/shared/infra/id/uuid-provider';
import { MockLLMProvider } from '@/shared/infra/llms/mock-llm-provider';

const startCourseConversation = new StartCourseConversationConcrete();
const courseRepo = new InMemoryCourseRepo();
const idProvider = new UuidProvider();
const llmProvider = new MockLLMProvider();

const controller = new CourseModeController(llmProvider, courseRepo, idProvider, startCourseConversation);

interface CourseContextType {
  controller: CourseModeController;
}

const CourseContext = createContext<CourseContextType | null>(null);

export function CourseContextProvider({ children }: { children: ReactNode }) {
  
  const value = {
    controller,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (context === null) {
    throw new Error('useCourseContext must be used within an CourseContextProvider');
  }
  return context;
}
