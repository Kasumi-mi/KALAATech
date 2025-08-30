import React, { useRef, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import CourseFilter from '@/components/Coursefilter';
import SearchBar from '@/components/SearchBar';
import CategoryTabs from '@/components/CategoryTabs';
import DrinkCards from '@/components/DrinkCards';
import CourseCards from '@/components/CourseCards';
import { drinkData } from '@/app/drink';
import { Ionicons } from '@expo/vector-icons';
import { useCourses } from '@/Context/CourseContext';
import MentorScroll from '@/components/mentorscroll';
import { useRouter } from 'expo-router';
import HeaderLogo from '@/components/HeaderLogo';

const courseData = [
  {
    id: 'Card 1',
    title: 'Card 1',
    image: 'https://i.pinimg.com/736x/35/c9/8a/35c98a3d3b0db5b21acb93b7b353b127.jpg',
    rating: 4.8,
    mentor: 'Dr. Rina Das',
    launchDate: 'Aug 10, 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
    type: 'Card 1',
    price: 1999,
  },
  {
    id: 'Card 2',
    title: 'Card 2',
    image: 'https://i.pinimg.com/736x/92/61/01/926101733dfac0b194748f5612ac7350.jpg',
    rating: 4.6,
    mentor: 'Mr. Aditya Mehra',
    launchDate: 'Sep 5, 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
    type: 'Card 2',
    price: 2499,
  },
  {
    id: 'Card 3',
    title: 'Card 3',
    image: 'https://i.pinimg.com/736x/61/b7/c7/61b7c7843e00246f295fb755b9a12b39.jpg',
    rating: 4.9,
    mentor: 'Ms. Kavya Rao',
    launchDate: 'Oct 2, 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    type: 'Card 3',
    price: 1799,
  },
];

type Drink = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  subtitle?: string;
  rating?: string | number;
};

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrinks, setSelectedDrinks] = useState<{ [id: string]: boolean }>({});
  const { getTotalProgressPercentage, level } = useCourses();
  const globalProgress = getTotalProgressPercentage();
  const router = useRouter();

  const scrollRef = useRef<ScrollView>(null);
  const [courseLayouts, setCourseLayouts] = useState<{ [key: string]: number }>({});

  const [sortOrder, setSortOrder] = useState<'low' | 'high' | null>(null);
  const [filterType, setFilterType] = useState('All');

  const handleFilterChange = (sort: 'low' | 'high' | null, type: string) => {
    setSortOrder(sort);
    setFilterType(type);
  };

  const filteredCourses = courseData
    .filter((course) => filterType === 'All' || course.type === filterType)
    .sort((a, b) => {
      if (sortOrder === 'low') return a.price - b.price;
      if (sortOrder === 'high') return b.price - a.price;
      return 0;
    });

  const filteredDrinks = drinkData
    .filter((drink: Drink) => {
      const categoryMatch =
        selectedCategory === 'All' || drink.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const typeMatch =
        filterType === 'All' || drink.category.toLowerCase() === filterType.toLowerCase();

      const searchMatch = drink.name.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && typeMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortOrder === 'low') return a.price - b.price;
      if (sortOrder === 'high') return b.price - a.price;
      return 0;
    });

  const scrollToCourse = (title: string) => {
    const titleToIdMap: Record<string, string> = {
      'Learn Web Dev': 'web-dev-beginners',
      'Design Basics': 'uiux-design-art',
      'Psychology': 'psychology-101',
    };

    const courseId = titleToIdMap[title];
    const y = courseLayouts[courseId];

    if (typeof y === 'number' && scrollRef.current) {
      scrollRef.current.scrollTo({ y: y - 100, animated: true });
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/736x/24/b7/90/24b790fe71225c6567c935a1b3b67fb6.jpg',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        
        {/* Background behind logo */}
        <View style={styles.logoBackground}>
          <HeaderLogo />
        </View>

        {/* Top progress bar */}
        <View style={styles.topBar}>
          <View style={styles.progressWrapper}>
            <Text style={styles.levelText}>Level {level}</Text>
            <Text style={styles.progressText}>{Math.round(globalProgress)}%</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min(globalProgress, 100)}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Sticky Search Row */}
        <View style={styles.searchRow}>
          {/* 🍔 Hamburger Button */}
          <TouchableOpacity
            onPress={() => router.push('/drawer')}
            style={styles.menuButton}
          >
            <Ionicons name="menu" size={26} color="#354024" />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </View>

          <TouchableOpacity
            onPress={() => console.log('Search:', searchQuery)}
            style={styles.searchButton}
          >
            <Ionicons name="search" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView style={styles.scroll} ref={scrollRef}>
          <View style={styles.mentorContainer}>
            <MentorScroll />
          </View>

          {/* Popular Courses */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.secTitle}>
                P o p u l a r    C o u r s e s
              </Text>
              <TouchableOpacity onPress={() => scrollToCourse('Psychology')}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Learn More
                </Text>
              </TouchableOpacity>
            </View>

            <CourseCards
              courses={filteredCourses}
              scrollToCourse={scrollToCourse}
              onCardLayout={(id, y) =>
                setCourseLayouts((prev) => ({ ...prev, [id]: y }))
              }
            />
          </View>

          <CategoryTabs
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All'
              ? 'All Courses'
              : selectedCategory}
          </Text>

          <View style={styles.singleColumn}>
            {filteredDrinks.map((drink) => (
              <View
                key={drink.id}
                style={styles.singleCardWrapper}
                onLayout={(event) => {
                  const y = event.nativeEvent.layout.y;
                  setCourseLayouts((prev) => ({
                    ...prev,
                    [drink.id]: y,
                  }));
                }}
              >
                <DrinkCards
                  id={drink.id}
                  name={drink.name}
                  price={Number(drink.price)}
                  image={drink.image}
                  description={drink.description}
                  subtitle={drink.subtitle || ''}
                  rating={drink.rating?.toString() || ''}
                  isSelected={!!selectedDrinks[drink.id]}
                  onSelect={() =>
                    setSelectedDrinks((prev) => ({
                      ...prev,
                      [drink.id]: !prev[drink.id],
                    }))
                  }
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scroll: { flex: 1 },
  logoBackground: {
    backgroundColor: '#354024', // change to your preferred color
    paddingVertical: 15,
    alignItems: 'center',
    height: 75,
    borderRadius: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  progressWrapper: {
    flex: 1,
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#354024',
    marginTop: 50,
    marginBottom: -30,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginBottom: -30,
    marginTop: 40,
    zIndex: 3
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 1,
    marginTop: 40,
    zIndex: 2,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#57a10e',
    borderRadius: 10,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingBottom: 8,
    paddingTop: 8,
    marginTop: -30,
    zIndex: 1,
  },
  menuButton: {
    padding: 10,
    borderRadius: 50,
    marginRight: 10,
    marginTop: 42,
  },
  searchButton: {
    backgroundColor: '#354024',
    padding: 10,
    borderRadius: 50,
    marginLeft: 8,
    marginTop: 42,
  },
  mentorContainer: {
    marginTop: 10,
    marginBottom: -15,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  secTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#354024',
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#354024',
  },
  singleColumn: {
    paddingHorizontal: 16,
    marginBottom: 100,
  },
  singleCardWrapper: {
    marginBottom: 12,
  },
});

