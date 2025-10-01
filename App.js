import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  { useState, useEffect } from 'react'; 
import { ActivityIndicator, View, StyleSheet } from 'react-native';



import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx'; 
import ProductScreen from './screens/ProductScreen.jsx'; 
import CartScreen from './screens/CartScreen.jsx'; 
import ProfileScreen from './screens/ProfileScreen.jsx'; 
import OrdersScreen from './screens/OrdersScreen.jsx'; 
import MapScreen from './screens/MapScreen.jsx'; 
import CheckoutScreen from './screens/CheckoutScreen.jsx'; 
import RestaurantDetailScreen from './screens/RestaurantDetailScreen.jsx'; 


const Stack = createStackNavigator();

const AuthStack = ({ handleLogin }) => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login">
            {props => <LoginScreen {...props} onLogin={handleLogin} />} 
        </Stack.Screen>
    </Stack.Navigator>
);

const AppStack = ({ cartItems, addToCart }) => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Home">
          {props => (
            <HomeScreen 
              {...props} 
              cartItems={cartItems} 
              addToCart={addToCart} 
            />
          )}
        </Stack.Screen>
        
        <Stack.Screen name="Produtos" component={ProductScreen} />
        <Stack.Screen name="Carrinho" component={CartScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="Pedidos" component={OrdersScreen} />
        <Stack.Screen name="Mapa" component={MapScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="DetalhesRestaurante" component={RestaurantDetailScreen} />
    </Stack.Navigator>
);


export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += 1;
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  if (isLoading) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#003366" />
        </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
          <AppStack cartItems={cartItems} addToCart={addToCart} />
      ) : (
          <AuthStack handleLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    }
});
