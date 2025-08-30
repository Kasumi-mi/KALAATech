import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Course = {
  id: string;
  title: string;
  image: string;
  subtopics: string[];
  completed: string[];
};

interface CourseContextType {
  courses: Course[];
  addCourse: (course: Course) => void;
  markSubtopicComplete: (courseId: string, subtopic: string) => void;
  isSubtopicCompleted: (courseId: string, subtopic: string) => boolean;
  resetProgress: (courseId: string) => void;

  getTotalProgressPercentage: () => number;
  level: number;
  xpProgress: number;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [level, setLevel] = useState(1);
  const [xpProgress, setXPProgress] = useState(0);

  const addCourse = (course: Course) => {
    setCourses(prev => {
      const exists = prev.some(c => c.id === course.id);
      return exists ? prev : [...prev, course];
    });
  };

  const increaseXP = (amount: number) => {
    setXPProgress(prevXP => {
      const newXP = prevXP + amount;

      if (newXP >= 100) {
        setLevel(prev => prev + 1);
        return 0;
      }

      return newXP;
    });
  };

  const markSubtopicComplete = (courseId: string, subtopic: string) => {
    setCourses(prevCourses => {
      const updatedCourses = prevCourses.map(course => {
        if (course.id !== courseId) return course;

        const isAlreadyCompleted = course.completed.includes(subtopic);
        const updatedCompleted = isAlreadyCompleted
          ? course.completed.filter(item => item !== subtopic)
          : [...course.completed, subtopic];

        // ✅ Award XP only for newly completed subtopics
        if (!isAlreadyCompleted) {
          const percentPerSubtopic = 100 / course.subtopics.length;
          increaseXP(percentPerSubtopic);
        }

        return { ...course, completed: updatedCompleted };
      });

      return updatedCourses;
    });
  };

  const isSubtopicCompleted = (courseId: string, subtopic: string) => {
    const course = courses.find(c => c.id === courseId);
    return course?.completed.includes(subtopic) || false;
  };

  const resetProgress = (courseId: string) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === courseId ? { ...course, completed: [] } : course
      )
    );
  };

  const calculateTotalProgress = (allCourses: Course[]) => {
    if (allCourses.length === 0) return 0;

    const total = allCourses.reduce((sum, course) => {
      const totalSubtopics = course.subtopics.length;
      const completed = course.completed.length;
      return sum + (totalSubtopics === 0 ? 0 : completed / totalSubtopics);
    }, 0);

    return Math.round((total / allCourses.length) * 100);
  };

  const getTotalProgressPercentage = () => {
    return calculateTotalProgress(courses);
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        addCourse,
        markSubtopicComplete,
        isSubtopicCompleted,
        resetProgress,
        getTotalProgressPercentage,
        level,
        xpProgress,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
