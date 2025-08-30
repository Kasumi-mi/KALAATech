import React from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';

interface CategoryTabsProps {
  selected: string;
  onSelect: (category: string) => void;
}

// You can replace these with movie genres or any other categories
const categories = ['All', 'Topic1', 'Topic2', 'Topic3', 'Topic4', 'Topic5', 'Topic6'];

export default function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  return (
    <View
      style={{
        backgroundColor: '#354024',
        paddingVertical: 12,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        borderWidth: 2,
        borderColor: '#354024',
        alignContent: 'center',
        shadowColor: '#aaa',
        shadowOpacity: 0.9, 
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6, 
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat} onPress={() => onSelect(cat)} style={{ marginRight: 16 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: selected === cat ? '#ffffff' : '#56683b',
                borderBottomWidth: selected === cat ? 2 : 0,
                borderBottomColor: '#ffffff',
                paddingBottom: 4,
                textAlign: 'center',
                paddingRight: 10,
              }}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
