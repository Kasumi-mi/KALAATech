// app/courseDetail.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function CourseDetail() {
  const { title, image, rating, mentor, launchDate, description } = useLocalSearchParams();

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image as string }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.info}>⭐ {rating}   🎓 {mentor}</Text>
      <Text style={styles.info}>📅 Launch Date: {launchDate}</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  description: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  backButton: {
    marginTop: 24,
  },
  backText: {
    color: '#89BB07',
    fontSize: 16,
  },
});
