// components/MentorScroll.tsx
import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const mentors = [
  {
    id: 'm1',
    name: 'Dr. Aisha',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 'm2',
    name: 'Prof. Ken',
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    id: 'm3',
    name: 'Sara M.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 'm4',
    name: 'Michael J.',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    id: 'm5',
    name: 'Emily Z.',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
];

export default function MentorScroll() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>B e s t   M e n t o r s</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {mentors.map((mentor) => (
          <View key={mentor.id} style={styles.card}>
            <Image source={{ uri: mentor.image }} style={styles.image} />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{mentor.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#354024',
    marginBottom: 8,
  },
  card: {
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    elevation: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  nameContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#354024',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  name: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
});
