import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const CATEGORIES = [
  { id: 'c1', title: 'Lanches Rápidos' },
  { id: 'c2', title: 'Bebidas e Sucos' },
  { id: 'c3', title: 'Sobremesas Frias' },
  { id: 'c4', title: 'Massas Italianas' },
  { id: 'c5', title: 'Saladas Frescas' },
  { id: 'c6', title: 'Pratos Principais' },
  { id: 'c7', title: 'Café da Manhã' },
  { id: 'c8', title: 'Opções Veganas' },
];

const CategoryItem = ({ title, onSelect }) => {
  return (
    <TouchableOpacity 
      style={styles.categoryContainer} 
      onPress={onSelect} 
    >
      <Text style={styles.categoryTitle}>{title}</Text>
    </TouchableOpacity>
  );
};


export default function HomeScreen({ cartItems, addToCart }) {
  const navigation = useNavigation();

  const navigateToProducts = (categoryId) => {
    navigation.navigate('Produtos', { 
      categoryId: categoryId,
      addToCart: addToCart 
    });
  };
  
  const navigateToProfile = () => {
    navigation.navigate('Perfil');
  };
  
  const navigateToMap = () => {
    navigation.navigate('Mapa');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigateToCart = () => {
      navigation.navigate('Carrinho', { cartItems });
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.customHeader}>
        <Text style={styles.headerTitle}>Explore as Categorias</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={navigateToProfile} 
        >
          
          <Text style={styles.profileIcon}>👤</Text> 
        </TouchableOpacity>
      </View>
      
      
      <TouchableOpacity 
        style={styles.mapButton}
        onPress={navigateToMap}
      >
        <Text style={styles.mapButtonText}>🗺️ Ver no Mapa (Centro RJ)</Text>
      </TouchableOpacity>
      
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryItem 
            title={item.title} 
            onSelect={() => navigateToProducts(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      
      <TouchableOpacity 
          style={styles.cartSummary}
          onPress={navigateToCart}
          disabled={totalItems === 0} 
      >
        <Text style={styles.cartSummaryText}>
            {totalItems > 0 ? `Ver Carrinho (${totalItems} item${totalItems > 1 ? 's' : ''})` : 'Carrinho Vazio'}
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#F5F5F5',
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#003366',
  },
  profileButton: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  profileIcon: {
    fontSize: 20,
  },
  mapButton: {
    backgroundColor: '#FFD700', 
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  mapButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 10, 
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007BFF', 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003366', 
  },
  cartSummary: {
    padding: 15,
    backgroundColor: '#003366', 
    alignItems: 'center',
  },
  cartSummaryText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

const mockAddToCart = jest.fn();
const mockCartItems = [
    { id: 'p1', quantity: 2 },
    { id: 'p2', quantity: 1 },
    { id: 'p3', quantity: 5 }, 
];

describe('HomeScreen Navigation and Cart Summary Tests', () => {

    beforeEach(() => {
        mockNavigate.mockClear();
    });

   
    test('should navigate to "Produtos" with categoryId and addToCart function when a category is selected', () => {
        const { getByText } = render(
            <HomeScreen 
                cartItems={[]} 
                addToCart={mockAddToCart} 
            />
        );
      
        fireEvent.press(getByText('Lanches Rápidos'));
        
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('Produtos', { 
            categoryId: 'c1',
            addToCart: mockAddToCart 
        });
    });

    test('should navigate to "Carrinho" with cart items when the summary button is pressed', () => {
        const { getByText } = render(
            <HomeScreen 
                cartItems={mockCartItems} 
                addToCart={mockAddToCart} 
            />
        );
        
     
        fireEvent.press(getByText('Ver Carrinho (8 itens)')); 
        
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('Carrinho', { cartItems: mockCartItems });
    });
    
    test('should navigate to "Perfil" when the Profile button is pressed (👤)', () => {
        const { getByText } = render(
            <HomeScreen 
                cartItems={[]} 
                addToCart={mockAddToCart} 
            />
        );
      
        const profileIcon = getByText('👤');
        fireEvent.press(profileIcon.parent); 
        
        expect(mockNavigate).toHaveBeenCalledWith('Perfil');
    });

    test('should navigate to "Mapa" when the Map button is pressed (🗺️)', () => {
        const { getByText } = render(
            <HomeScreen 
                cartItems={[]} 
                addToCart={mockAddToCart} 
            />
        );
        
        fireEvent.press(getByText('🗺️ Ver no Mapa (Centro RJ)'));
        
       
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('Mapa');
    });
    

    test('should display the correct total item count in the cart summary, handling singular/plural/empty states', () => {
        const { getByText, rerender } = render(
            <HomeScreen 
                cartItems={mockCartItems} 
                addToCart={mockAddToCart} 
            />
        );

        
        expect(getByText('Ver Carrinho (8 itens)')).toBeTruthy();
        
       
        rerender(
            <HomeScreen 
                cartItems={[{ id: 'p4', quantity: 1 }]} 
                addToCart={mockAddToCart} 
            />
        );

        expect(getByText('Ver Carrinho (1 item)')).toBeTruthy();
        
        rerender(
            <HomeScreen 
                cartItems={[]} 
                addToCart={mockAddToCart} 
            />
        );

        expect(getByText('Carrinho Vazio')).toBeTruthy();
    });
    
   
    test('Cart Summary button should be disabled when the cart is empty (0 items)', () => {
        const { getByText } = render(
            <HomeScreen 
                cartItems={[]} 
                addToCart={mockAddToCart} 
            />
        );
        
        const cartButton = getByText('Carrinho Vazio').parent;
       
        expect(cartButton.props.disabled).toBe(true);
    });

});
