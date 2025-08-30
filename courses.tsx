import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useCourses } from '@/Context/CourseContext';
import { usePurchases } from '@/Context/PurchasesContext';
import CourseCard from '@/components/CourseCard';
import { Ionicons } from '@expo/vector-icons';  // Add Ionicons for the back button
import { useRouter } from 'expo-router';

const CoursesScreen = () => {
  const { courses, addCourse } = useCourses();
  const { purchaseHistory } = usePurchases();
  const router = useRouter();

  useEffect(() => {
    if (!purchaseHistory || purchaseHistory.length === 0) return;

    const allItems = purchaseHistory.flat();

    allItems.forEach(item => {
      const existingCourse = courses.find(course => course.id === item.id);
      const newVariant = item.variant || null;
      const fallbackSubtopics = getDefaultSubtopics(item.name);

      if (existingCourse) {
        // ✅ Add the new variant only if it’s not already present
        if (newVariant && !existingCourse.subtopics.includes(newVariant)) {
          const updatedSubtopics = [...new Set([...existingCourse.subtopics, newVariant])];

          addCourse({
            ...existingCourse,
            subtopics: updatedSubtopics,
          });
        }
      } else {
        // ✅ Add new course with 10 lessons or variant fallback
        const subtopics =
          newVariant && typeof newVariant === 'string'
            ? getDefaultSubtopics(item.name)
            : fallbackSubtopics;

        addCourse({
          id: item.id,
          title: item.name,
          image: item.image,
          subtopics,
          completed: [],
        });
      }
    });
  }, [purchaseHistory]);

  const handleBackPress = () => {
    router.back();  // This will navigate back to the previous screen
  };

  if (courses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You haven't purchased any courses yet!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button at the top right */}
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#354024" />
      </TouchableOpacity>

      <Text style={styles.title}>Your Purchased Courses</Text>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </ScrollView>
  );
};

// ✅ Always return 10 default lessons
const getDefaultSubtopics = (courseName: string): string[] => {
  return Array.from({ length: 10 }, (_, i) => `Lesson ${i + 1}`);
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: -20,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    textAlign: 'center',
    width: 400,
    marginLeft: -20,
    height: 150,
    paddingTop: 100,
    color:'#354024',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#354024',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
});

export default CoursesScreen;
