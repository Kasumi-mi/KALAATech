import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type CourseFilterProps = {
  onFilterChange: (sortOrder: 'low' | 'high' | null, filterType: string) => void;
};

const CourseFilter: React.FC<CourseFilterProps> = ({ onFilterChange }) => {
  const [sortOrder, setSortOrder] = useState<'low' | 'high' | null>(null);
  const [filterType, setFilterType] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    onFilterChange(sortOrder, filterType);
  }, [sortOrder, filterType]);

  return (
    <View>
      <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.filterButton}>
        <Text style={styles.filterButtonText}>🔍 Filter</Text>
      </TouchableOpacity>

      {showFilters && (
        <View style={styles.filterSection}>
          {/* Sort */}
          <Text style={styles.filterTitle}>Sort by Price:</Text>
          <View style={styles.filterRow}>
            <TouchableOpacity onPress={() => setSortOrder('low')}>
              <Text style={[styles.filterOption, sortOrder === 'low' && styles.filterSelected]}>⬇️ Low to High</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortOrder('high')}>
              <Text style={[styles.filterOption, sortOrder === 'high' && styles.filterSelected]}>⬆️ High to Low</Text>
            </TouchableOpacity>
          </View>

          {/* Type */}
          <Text style={styles.filterTitle}>Filter by Type:</Text>
          <View style={styles.filterRow}>
            {['All', 'Psychology', 'Web Dev', 'Design'].map((type) => (
              <TouchableOpacity key={type} onPress={() => setFilterType(type)}>
                <Text
                  style={[
                    styles.filterOption,
                    filterType === type && styles.filterSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default CourseFilter;

const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: '#89BB07',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  filterSection: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
  },
  filterTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  filterOption: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  filterSelected: {
    backgroundColor: '#89BB07',
    color: '#fff',
    fontWeight: '600',
  },
});
