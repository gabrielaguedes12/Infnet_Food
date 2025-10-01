import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const CartItem = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
                <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <View style={styles.itemPriceArea}>
                <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</Text>
                <TouchableOpacity style={styles.removeButton}>
                    <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function CartScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    
   
    const { cartItems } = route.params;

    // --- Cálculos ---
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 0 ? 10.00 : 0.00; 
    const total = subtotal + deliveryFee;
    const isCartEmpty = cartItems.length === 0;

   
    const handleCheckout = () => {
        if (!isCartEmpty) {
           
            navigation.navigate('Checkout', { cartItems });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Seu Carrinho</Text>

            {isCartEmpty ? (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>🛒 Seu carrinho está vazio!</Text>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>Voltar ao Menu</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CartItem item={item} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}

            
            {!isCartEmpty && (
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Entrega (Simulada)</Text>
                        <Text style={styles.summaryValue}>R$ {deliveryFee.toFixed(2).replace('.', ',')}</Text>
                    </View>
                    
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.summaryTotalLabel}>Total a Pagar</Text>
                        <Text style={styles.summaryTotalValue}>R$ {total.toFixed(2).replace('.', ',')}</Text>
                    </View>

                  
                    <TouchableOpacity 
                        style={styles.checkoutButton}
                        onPress={handleCheckout}
                    >
                        <Text style={styles.checkoutButtonText}>Prosseguir para Checkout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#F5F5F5',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#003366',
        textAlign: 'center',
        marginBottom: 20,
    },
    listContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    // Estilos do Item do Carrinho
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#FFD700',
        elevation: 2,
    },
    itemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    itemQuantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#003366',
        marginRight: 10,
    },
    itemName: {
        fontSize: 16,
        color: '#333',
        flexShrink: 1, 
    },
    itemPriceArea: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
        marginLeft: 10,
    },
    removeButton: {
        marginLeft: 15,
        padding: 5,
        backgroundColor: '#FF4136',
        borderRadius: 4,
    },
    removeButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
    // Estilos do Resumo
    summaryContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#DDD',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#666',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
    },
    totalRow: {
        borderTopWidth: 2,
        borderTopColor: '#003366',
        paddingTop: 10,
        marginTop: 10,
    },
    summaryTotalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
    },
    summaryTotalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
    },
    checkoutButton: {
        backgroundColor: '#28A745', // Verde para o Checkout
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
        elevation: 3,
    },
    checkoutButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Carrinho Vazio
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyCartText: {
        fontSize: 20,
        color: '#666',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
