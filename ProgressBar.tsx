import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }: { progress: number }) => {
  const clampedProgress = Math.max(0, Math.min(progress, 1)); // ✅ clamp between 0 and 1

  return (
    <View style={styles.wrapper}>
      <View style={[styles.bar, { width: `${clampedProgress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  bar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
});

export default ProgressBar;
