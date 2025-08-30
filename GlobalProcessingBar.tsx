// components/ProgressBar.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ progress, level }: { progress: number; level: number }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Level {level}</Text>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: {
    height: 8,
    backgroundColor: '#89BB07',
  },
});

export default ProgressBar;
