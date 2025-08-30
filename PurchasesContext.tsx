import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Subtopic = {
  id: string;
  title: string;
  completed: boolean;
};

export type PurchaseItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
  type?: 'course' | 'product';
  subtopics?: Subtopic[]; // ✅ For course progress
};

interface PurchasesContextType {
  purchaseHistory: PurchaseItem[][];
  purchasedCourses: PurchaseItem[]; // ✅ Flat list of course purchases
  addToPurchases: (items: PurchaseItem[]) => void;
  toggleSubtopicCompletion: (courseId: string, subtopicId: string) => void;
  getCourseProgress: (courseId: string) => number;
  getGlobalProgress: () => number;
}

const PurchasesContext = createContext<PurchasesContextType | undefined>(undefined);

export const PurchasesProvider = ({ children }: { children: ReactNode }) => {
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseItem[][]>([]);

  const addToPurchases = (items: PurchaseItem[]) => {
    const copy = items.map((item) => ({ ...item }));
    setPurchaseHistory((prev) => [...prev, copy]);
  };

  // ✅ Flatten and extract all purchased courses
  const purchasedCourses: PurchaseItem[] = purchaseHistory
    .flat()
    .filter((item) => item.type === 'course');

  // ✅ Toggle subtopic completion by course + subtopic ID
  const toggleSubtopicCompletion = (courseId: string, subtopicId: string) => {
    setPurchaseHistory((prevHistory) =>
      prevHistory.map((group) =>
        group.map((item) => {
          if (item.type === 'course' && item.id === courseId && item.subtopics) {
            const updatedSubtopics = item.subtopics.map((subtopic) =>
              subtopic.id === subtopicId
                ? { ...subtopic, completed: !subtopic.completed }
                : subtopic
            );
            return { ...item, subtopics: updatedSubtopics };
          }
          return item;
        })
      )
    );
  };

  // ✅ Get progress for a single course (0–100)
  const getCourseProgress = (courseId: string): number => {
    const course = purchasedCourses.find((c) => c.id === courseId);
    if (!course || !course.subtopics || course.subtopics.length === 0) return 0;
    const completed = course.subtopics.filter((s) => s.completed).length;
    return Math.round((completed / course.subtopics.length) * 100);
  };

  // ✅ Global progress across all purchased courses
  const getGlobalProgress = (): number => {
    if (purchasedCourses.length === 0) return 0;

    const total = purchasedCourses.reduce((acc, course) => {
      const courseProgress = getCourseProgress(course.id);
      return acc + courseProgress;
    }, 0);

    return Math.round(total / purchasedCourses.length);
  };

  return (
    <PurchasesContext.Provider
      value={{
        purchaseHistory,
        purchasedCourses,
        addToPurchases,
        toggleSubtopicCompletion,
        getCourseProgress,
        getGlobalProgress,
      }}
    >
      {children}
    </PurchasesContext.Provider>
  );
};

export const usePurchases = (): PurchasesContextType => {
  const context = useContext(PurchasesContext);
  if (!context) throw new Error('usePurchases must be used within a PurchasesProvider');
  return context;
};
