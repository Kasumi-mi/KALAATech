import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useCart } from '../Context/CartContext';
import { useFavorites } from '../Context/FavoritesContext';

type DrinkCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  subtitle: string;
  rating: string;
  isSelected: boolean;
  onSelect: () => void;
};

export default function DrinkCard({
  id,
  name,
  price,
  image,
  description,
  subtitle,
  rating,
  isSelected,
  onSelect,
}: DrinkCardProps) {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const inCart = cartItems.find(item => item.id === id);

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some(item => item.id === id);

  const handleCardPress = () => {
    router.push({
      pathname: '/Purchases/[id]',
      params: { id },
    });
  };

  return (
    <TouchableOpacity
  activeOpacity={0.9}
  style={{
    backgroundColor: isSelected ? '#000000' : '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    position: 'relative',
  }}
>
      {/* Heart icon */}
      <TouchableOpacity
  onPress={e => {
    e.stopPropagation();
    isFavorite
      ? removeFromFavorites(id)
      : addToFavorites({ id, name, price, image });
  }}
  style={{
    position: 'absolute',
    top: 90,
    right: 20,
    zIndex: 10,
  }}
>
  <Ionicons
    name={isFavorite ? 'heart' : 'heart-outline'}
    size={24} // can adjust size if you want
    color={isFavorite ? '#B90E0A' : '#B90E0A'}
  />
</TouchableOpacity>


      {/* Image + Content */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Left Image */}
        <Image
          source={{ uri: image }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 12,
            backgroundColor: '#ffe4e1',
            marginRight: 12,
            borderWidth: 6,
            borderColor: '#ffffff',
          }}
          resizeMode="cover"
        />

        {/* Right Side Content */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ color: '#354024', fontSize: 16, fontWeight: '600' }} numberOfLines={1}>
            {name}
          </Text>

          <Text
            style={{
              color: '#354024',
              fontSize: 10,
              marginTop: 2,
            }}
            numberOfLines={1}
          >
            {subtitle}
          </Text>

          <Text
            style={{
              color: '#354024',
              fontSize: 12,
              marginTop: 4,
            }}
            numberOfLines={1}
          >
            {description}
          </Text>

          <Text
            style={{
              color: '#354024',
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: 6,
            }}
          >
            ₹{price.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Buttons at bottom */}
      {inCart ? (
        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#354024',
            padding: 8,
            borderRadius: 12,
          }}
        >
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              updateQuantity(id, -1);
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 20, paddingHorizontal: 10 }}>−</Text>
          </TouchableOpacity>
          <Text style={{ color: '#ffffff', fontSize: 16 }}>{inCart.quantity}</Text>
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              updateQuantity(id, 1);
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 20, paddingHorizontal: 10 }}>＋</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              addToCart({ id, name, price, image });
            }}
            style={{
              flex: 1,
              backgroundColor: '#354024',
              paddingVertical: 8,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#ffffff', fontWeight: '600' }}>Add</Text>
          </TouchableOpacity>

          {/* View Info Button */}
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              router.push({
                pathname: '/Purchases/[id]',
                params: { id },
              });
            }}
            style={{
              width: 48,
              borderColor: '#354024',
              borderWidth: 1,
              paddingVertical: 8,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="information-circle-outline" size={20} color="#354024" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}
