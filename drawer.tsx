// app/drawer.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const menuItems = [
  { label: 'Profile', path: '/profile', icon: 'person-circle-outline' },
  { label: 'Refer & Earn', path: '/refer', icon: 'gift-outline' },
  { label: 'About Us', path: '/about', icon: 'information-circle-outline' },
  { label: 'Our ChatBot', path: '/ChatBot', icon: 'chatbubble-ellipses-outline' },
  { label: 'Offers', path: '/offer', icon: 'pricetags-outline' },
];

export default function DrawerScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Menu</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuList}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            activeOpacity={0.8}
            onPress={() => router.push(item.path as any)}
          >
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon as any} size={24} color="#89BB07" />
            </View>
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#89BB07',
    borderRadius: 50,
    padding: 8,
    marginRight: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: -15,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: -15,
  },
  menuList: {
    flexDirection: 'column',
    gap: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    marginBottom: -10,
  },
  menuIcon: {
    marginRight: 14,
  },
  menuText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
});
