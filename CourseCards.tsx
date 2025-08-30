import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';

type Course = {
  id: string;
  title: string;
  image: string;
  rating: number;
  mentor: string;
  launchDate: string;
  description: string;
};

type CourseCardsProps = {
  courses: Course[];
  scrollToCourse: (courseId: string) => void;
  onCardLayout: (id: string, y: number) => void;
};

const CourseCards = ({ courses, scrollToCourse, onCardLayout }: CourseCardsProps) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={courses}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View
          style={styles.card}
          onLayout={(event: LayoutChangeEvent) => {
            const y = event.nativeEvent.layout.y;
            onCardLayout(item.id, y);
          }}
        >
          <TouchableOpacity onPress={() => scrollToCourse(item.id)} activeOpacity={0.8}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.mentor}>By {item.mentor}</Text>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
            <Text style={styles.launch}>Launches on {item.launchDate}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.learnMore}></Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.1, 
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 12,
    padding: 14,
    width: 240,
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.1, 
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    height: 100,
    width: '100%',
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
    color: '#354024',
  },
  mentor: {
    fontSize: 13,
    color: '#f3cb19',
    marginBottom: 2,
  },
  rating: {
    fontSize: 13,
    color: '#f1ba29',
    marginBottom: 2,
  },
  launch: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#354024',
    marginBottom: 10,
  },
  learnMore: {
    color: '#3e7bfa',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CourseCards;
