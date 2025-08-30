import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { usePurchases } from '@/Context/PurchasesContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const PurchasesScreen = () => {
  const { purchaseHistory } = usePurchases();
  const navigation = useNavigation();

  const primaryColor = '#000000'; // Text and icons should be black on white background
  const backgroundColor = '#ffffff';
  const accentColor = '#D69992'; // Optional cute café accent (pink-ish tone)

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={primaryColor} />
        <Text style={[styles.backText, { color: primaryColor }]}></Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color:'#354024' }]}>Your Purchases</Text>

      {purchaseHistory.length === 0 ? (
        <Text style={[styles.empty, { color: '#354024' }]}>No purchases yet.</Text>
      ) : (
        <FlatList
          data={purchaseHistory}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item: purchase, index }) => (
            <View style={[styles.purchaseBlock, { borderColor: '#ffffff' }]} key={index}>
              <Text style={[styles.header, { color: '#354024' }]}>
                Purchase {index + 1}
              </Text>

              {purchase.map((item, idx) => (
                <View key={item.id + idx} style={styles.item}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.info}>
                    <Text style={[styles.name, { color: primaryColor }]}>{item.name}</Text>
                    <Text style={[styles.price, { color: '#354024' }]}>
                      ₹{item.price} × {item.quantity}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default PurchasesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 48,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 2,
  },
  backText: {
    fontSize: 16,
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    width: 410,
    marginLeft: -20,
    borderRadius: 50,
    textAlign: 'center',
    height: 150,
    paddingTop: 100,
    marginTop: -90,
    zIndex: 1,
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  purchaseBlock: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
  },
});
