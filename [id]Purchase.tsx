import { useLocalSearchParams, router } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { drinkData } from '@/app/drink'; // Adjust path if needed
import { useCart } from '../../Context/CartContext';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const drink = drinkData.find((item) => item.id === id);

  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const handleVariantSelect = (variant: string) => {
    setSelectedVariant(variant);
  };

  useEffect(() => {
    if (!drink || !drink.variants || drink.variants.length === 0) return;

    let current = 0;
    const interval = setInterval(() => {
      setSelectedVariant(drink.variants![current]);
      current++;

      if (current >= drink.variants!.length) {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [drink]);

  if (!drink) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff' }}>Course not found 😢</Text>
      </View>
    );
  }

  const {
    name,
    price,
    image,
    description,
    subtitle,
    rating,
    variants,
    mentor,
    launchdate,
  } = drink;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
      <View style={styles.container}>
        {/* BACK BUTTON */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#354024" />
        </TouchableOpacity>

        {/* Coffee Image */}
        <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />

        {/* Course Info */}
        <View style={styles.infoSection}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.rating}>⭐ {rating}</Text>
          {mentor && <Text style={styles.mentor}>👩‍🏫 Mentor: {mentor}</Text>}
          {launchdate && <Text style={styles.launch}>🚀 Launch Date: {launchdate}</Text>}
        </View>

        {/* Description */}
        <Text style={styles.description}>
          {description || 'No description available.'}
        </Text>

        {/* Variant Selection */}
        {variants && variants.length > 0 && (
          <View style={styles.milkSection}>
            <Text style={styles.milkLabel}>Subtopics</Text>
            <View style={styles.milkButtons}>
              {variants.map((variant) => (
                <TouchableOpacity
                  key={variant}
                  onPress={() => handleVariantSelect(variant)}
                  style={[
                    styles.milkButton,
                    selectedVariant === variant && styles.milkButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.milkButtonText,
                      selectedVariant === variant && styles.milkButtonTextSelected,
                    ]}
                  >
                    {variant}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Price + Buy Now */}
        <View style={styles.bottomSection}>
          <View>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>₹{price}</Text>
          </View>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => {
              addToCart({
                id,
                name,
                price,
                image,
                variant: selectedVariant || undefined,
              });
            }}
          >
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Decorative Bottom Image */}
      <Image
        source={{
          uri: 'https://i.pinimg.com/736x/24/b7/90/24b790fe71225c6567c935a1b3b67fb6.jpg',
        }}
        style={styles.bottomImage}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 16,
    marginTop: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  infoSection: {
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    color: '#354024',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#354024',
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: '#354024',
    marginTop: 4,
    fontWeight: 'bold'
  },
  mentor: {
    fontSize: 14,
    color: '#354024',
    marginTop: 4,
    fontWeight: 'bold'
  },
  launch: {
    fontSize: 14,
    color: '#354024',
    marginTop: 4,
    fontWeight: 'bold'
  },
  description: {
    color: '#000000',
    fontSize: 14,
    marginVertical: 12,
    lineHeight: 20,
  },
  milkSection: {
    marginVertical: 12,
  },
  milkLabel: {
    color: '#354024',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  milkButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingTop: 30,
    paddingBottom: 50,
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  milkButton: {
    borderWidth: 1,
    borderColor: '#354024',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  milkButtonSelected: {
    backgroundColor: '#354024',
    borderColor: '#354024',
  },
  milkButtonText: {
    color: '#000000',
    fontSize: 12,
  },
  milkButtonTextSelected: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomSection: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#333',
  },
  priceLabel: {
    color: '#354024',
    fontSize: 14,
  },
  price: {
    color: '#354024',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  buyButton: {
    backgroundColor: '#354024',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    marginTop: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
