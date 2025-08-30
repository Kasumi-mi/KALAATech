import { FlatList, Image, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useFavorites } from '../../Context/FavoritesContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen() {
  const { favorites, removeFromFavorites } = useFavorites();
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1524055988636-436cfa46e59e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpdGUlMjBncmVlbnxlbnwwfHwwfHx8MA%3D%3D' }}
      style={{ flex: 1, padding: 16 }}
      resizeMode="cover"
    >
      {/* 🔙 Back Button (Top Right Corner) */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: 'absolute',
          top: 48,
          left: 16,
          backgroundColor: '#ffffff',
          padding: 6,
          borderRadius: 20,
          zIndex: 10,
        }}
      >
        <Ionicons name="arrow-back" size={24} color="#354024" />
      </TouchableOpacity>

      {/* Decorative Image */}
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/c0/4d/5c/c04d5c9de2dfeb845de44fe56056c9ff.jpg' }}
        style={{
          width: 80,
          height: 80,
          alignSelf: 'center',
          marginTop: 48,
          marginBottom: 12,
        }}
      />

      {/* Title */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#354024',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 56,
          paddingVertical: 8,
          paddingHorizontal: 24,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
          marginTop: -160,
          width: 410,
          marginLeft: -25,
          height: 150,
          paddingTop: 100,
        }}
      >
        Your Favorites
      </Text>

      {/* List or Empty */}
      {favorites.length === 0 ? (
        <Text style={{ color: '#56683b', fontSize: 16, textAlign: 'center', marginTop: 20, fontWeight: 'bold', }}>
       No favorites yet...
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                marginBottom: 16,
                padding: 12,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 4 },
                elevation: 4,
                position: 'relative',
              }}
            >
              {/* ❌ Remove Button */}
              <TouchableOpacity
                onPress={() => removeFromFavorites(item.id)}
                style={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  zIndex: 10,
                  backgroundColor: '#ffffff',
                  borderRadius: 12,
                  padding: 4,
                }}
              >
                <Text style={{ fontSize: 16, color: '#000000' }}>✖</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    marginRight: 12,
                    backgroundColor: '#fceeee',
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#3d3833', fontWeight: 'bold', fontSize: 16 }}>
                    {item.name}
                  </Text>
                  <Text style={{ color: '#7a6b5e', fontSize: 14, marginTop: 4 }}>
                    ₹{item.price}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </ImageBackground>
  );
}
