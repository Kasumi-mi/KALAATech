import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCourses } from '../Context/CourseContext';

type CourseType = {
  id: string;
  title: string;
  image: string;
  subtopics: string[];
  completed: string[];
};

const CourseCard = ({ course }: { course: CourseType }) => {
  const { courses } = useCourses();
  const router = useRouter();
  
  // ✅ Get latest course data
  const updated = courses.find(c => c.id === course.id) || course;

  // ✅ Progress logic
  const total = updated.subtopics?.length || 1;
  const done = updated.completed?.length || 0;
  const progressRatio = total === 0 ? 0 : done / total;
  const progressPercent = Math.min(progressRatio * 100, 100);

  const isComplete = progressPercent === 100;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/courses/[id]',
          params: { id: updated.id, from: 'courses' },
        })
      }
      style={styles.card}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: updated.image }} style={styles.image} />
        {isComplete && (
          <View style={styles.tickBadge}>
            <Text style={styles.tickText}>✓</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{updated.title}</Text>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
        </View>

        <Text style={styles.progressText}>
          {Math.round(progressPercent)}% Complete
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
  },
  tickBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickText: {
    color: '#354024',
    fontWeight: 'bold',
    fontSize: 16,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#354024',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
});

export default CourseCard;
