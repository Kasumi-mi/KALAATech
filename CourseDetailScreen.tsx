import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  findNodeHandle,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { drinkData } from '@/app/drink';
import { UIManager } from 'react-native';

const CoffeeDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const courseDetailRef = useRef<View>(null);
  const scrollRef = useRef<ScrollView>(null);

  const drink = drinkData.find((item) => String(item.id) === String(id));

  useEffect(() => {
    // Scroll to course details if available
    if (drink?.mentor && courseDetailRef.current && scrollRef.current) {
      const handle = findNodeHandle(courseDetailRef.current);
      if (handle) {
        UIManager.measureLayout(
          handle,
          findNodeHandle(scrollRef.current) ?? 0,
          () => {},
          (x, y) => {
            scrollRef.current?.scrollTo({ y: y - 20, animated: true });
          }
        );
      }
    }
  }, [drink]);

  if (!drink) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Course or Drink not found!</Text>
      </View>
    );
  }

  const { name, price, image, description, mentor, rating, launchdate } = drink;

  return (
    <ScrollView contentContainerStyle={styles.container} ref={scrollRef}>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Text style={styles.name}>{name}</Text>
      {price !== undefined && <Text style={styles.price}>₹{price}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}

      {(mentor || rating || launchdate) && (
        <View ref={courseDetailRef} style={styles.courseDetails}>
          {mentor && <Text style={styles.detail}>👩‍🏫 Mentor: {mentor}</Text>}
          {rating && <Text style={styles.detail}> Rating: {rating}</Text>}
          {launchdate && (
            <Text style={styles.detail}>🚀 Launch Date: {launchdate}</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default CoffeeDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 20,
  },
  courseDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
});