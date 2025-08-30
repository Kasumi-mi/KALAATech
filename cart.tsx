import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useCart } from '@/Context/CartContext';
import { useRouter } from 'expo-router';
import { usePurchases } from '@/Context/PurchasesContext';
import { useFavorites } from '@/Context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart() ?? {};

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const { addToPurchases } = usePurchases() ?? {};
  const router = useRouter();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites() ?? {};

  useEffect(() => {
    console.log('Cart items changed:', cartItems);
  }, [cartItems]);

  const totalPrice = safeCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleBuyNow = () => {
    if (!safeCartItems?.[0]) return;

    const copiedItems = safeCartItems.map(item => ({ ...item }));
    addToPurchases?.(copiedItems);
    clearCart?.();
    router.push('/');
  };

  return (
    <ImageBackground
      source={{uri: 'https://i.pinimg.com/1200x/9c/51/77/9c5177d4ce5ef4433cad282226e8f0e3.jpg'}}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.cartBox}>
          <ThemedText type="title" style={styles.cartTitle}>
            Your Cart
          </ThemedText>
        </View>

        <View style={styles.cartContainer}>
          {safeCartItems?.[0] == null ? (
            <ThemedText style={styles.emptyText}>
              Your cart is empty...
            </ThemedText>
          ) : (
            <FlatList
              data={safeCartItems}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.cartList}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <TouchableOpacity
                  style={styles.favIcon}
                  onPress={() => {
                    const isFavorite = favorites.some((fav) => fav.id === item.id);
                    if (isFavorite) {
                      removeFromFavorites(item.id);
                    } else {
                      addToFavorites(item);
                    }
                     }}>
                      <Ionicons
                      name={
                        favorites.some((fav) => fav.id === item.id)? 'heart': 'heart-outline'}
                        size={20}
                        color="#d78289"/>
                        </TouchableOpacity>

                  <Image source={{ uri: item.image }} style={styles.cartImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>

                    <View style={styles.quantityControl}>
                      <TouchableOpacity onPress={() => updateQuantity?.(item.id, -1)}>
                        <Text style={styles.qtyButton}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyCount}>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => updateQuantity?.(item.id, 1)}>
                        <Text style={styles.qtyButton}>＋</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                    style={styles.removeIcon}
                    onPress={() => removeFromCart?.(item.id)}>
                      <Text style={styles.removeIconText}>×</Text>
                      </TouchableOpacity>

                  </View>
                </View>
              )}
            />
          )}
        </View>

        {safeCartItems?.[0] != null && (
          <View style={styles.bottomBar}>
            <Text style={styles.totalText}>Total: ₹{totalPrice}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
              <Text style={styles.buyButtonText}>Buy </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  cartBox: {
    padding: 16,
    borderWidth: 10,
    borderColor: '#ffffff',
    borderBottomEndRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    height: 120,
    paddingTop: 20,
    borderRadius: 30,

  },
  cartTitle: {
    color: '#354024',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    zIndex: 1,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 24,
    paddingBottom: 100,
    paddingHorizontal: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1, 
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6, 
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#354024',
    borderRadius: 29,
    paddingTop: 250,
    fontWeight: 'bold',
  },
  cartList: {
    paddingBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#ffffff',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1, 
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6, 
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center', // center with image vertically
  },
  itemName: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 10,
  },
  itemPrice: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 8,
  },
  removeText: {
    color: '#ffffff',
    marginTop: 4,
    backgroundColor: '#9A0D1b',
    width: 100,
    textAlign: 'center',
    borderRadius: 20,
    paddingVertical: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  qtyButton: {
    fontSize: 24,
    color: '#354024',
    paddingHorizontal: 10,
    marginHorizontal: 4,
  },
  qtyCount: {
    fontSize: 16,
    color: '#354024',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  totalText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#354024',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  removeIcon: {
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: '#ffffff',
  borderRadius: 12,
  width: 24,
  height: 24,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
},

removeIconText: {
  color: '#000000',
  fontSize: 16,
  fontWeight: 'bold',
  lineHeight: 16,
},

favIcon: {
  position: 'absolute',
  top: 8,
  left: 8,
  backgroundColor: '#fff',
  borderRadius: 12,
  width: 24,
  height: 24,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
  borderWidth: 1,
  borderColor: '#9A0D1b',
},


});
