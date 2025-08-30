// components/HeaderLogo.tsx
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

export default function HeaderLogo() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bg} />
      <Image
        source={require('@/assets/images/KALAAA.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  bg: {
    position: 'absolute',
    top: 0,
    width: width, // full screen width
    height: 80,
    backgroundColor: '#202715ff', // background color behind logo
    zIndex: 1, // behind the logo
    borderRadius: 20,
  },
  logo: {
    width: 140,
    height: 180,
    borderRadius: 30,
    marginTop: -50,
    zIndex: 2,
  },
});
