import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onMenuPress?: () => void; // ⬅️ Optional handler for the hamburger button
}

export default function SearchBar({ searchQuery, setSearchQuery, onMenuPress }: SearchBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Hamburger Menu */}

        {/* Search Input */}
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="⌕  Search for your Courses..."
          placeholderTextColor="#354024"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          keyboardAppearance="dark"
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 48,
    backgroundColor: '#ffffff',
    marginLeft: -20
  },
  container: {
    flexDirection: 'row', // ⬅️ Align hamburger + input horizontally
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.1, 
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6, 
    height: 61,
    marginTop: 5,
    marginLeft: -5,
    marginRight: -5
  },
  menuIcon: {
    fontSize: 20,
    color: '#354024',
  },
  input: {
    flex: 1,
    color: '#354024',
    fontSize: 14,
    fontWeight: '100',
  },
});
