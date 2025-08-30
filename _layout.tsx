import { Stack } from 'expo-router';
import { CourseProvider } from '@/Context/CourseContext';
import { CartProvider } from '@/Context/CartContext';
import { FavoritesProvider } from '@/Context/FavoritesContext';
import { PurchasesProvider } from '@/Context/PurchasesContext';

export default function RootLayout() {
  return (
    <CourseProvider>
      <PurchasesProvider>
        <FavoritesProvider>
          <CartProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </CartProvider>
        </FavoritesProvider>
      </PurchasesProvider>
    </CourseProvider>
  );
}
