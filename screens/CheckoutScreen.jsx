import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const useNavigation = () => ({ navigate: (screen) => console.log(`Navigating to: ${screen}`) });

const useRoute = () => ({ 
    params: { 
        cartItems: [
            { id: 'p1', name: 'Pizza Margherita', price: 35.00, quantity: 2 },
            { id: 'p2', name: 'Refrigerante 2L', price: 8.00, quantity: 1 },
        ] 
    } 
}); 

const Notifications = {
    getPermissionsAsync: async () => ({ status: 'granted' }),
    requestPermissionsAsync: async () => ({ status: 'granted' }),
    scheduleNotificationAsync: async (config) => {
        console.log("Notificação agendada (simulação):", config.content.title, config.content.body);
    }
};

const MOCKED_ADDRESS = 'Rua das Flores, 100 - Apto 301, Centro, RJ';
const MOCKED_PAYMENT = [
    { label: 'Cartão de Crédito (Final 1234)', value: 'credit' },
    { label: 'Pix', value: 'pix' },
    { label: 'Dinheiro na Entrega', value: 'cash' },
];

async function scheduleOrderStatusNotification(total, address) { 
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {        
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
            console.log("Permissão de notificação não concedida.");
            return;
        }
    }
    
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "🍕 Pedido Enviado! InfnetFood",
            body: `Seu pedido de R$ ${total.toFixed(2).replace('.', ',')} para ${address.substring(0, 30)}... está em preparo e será entregue em breve.`,
            data: { orderId: Date.now() },
        },
        trigger: { seconds: 2 }, 
    });
}

export default function CheckoutScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    
    const cartItems = route.params?.cartItems && route.params.cartItems.length > 0 ? route.params.cartItems : useRoute().params.cartItems;

    const [deliveryAddress, setDeliveryAddress] = useState(MOCKED_ADDRESS);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [deliveryNotes, setDeliveryNotes] = useState('');
    const [error, setError] = useState('');

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 10.00; 
    const total = subtotal + deliveryFee;

    const handlePlaceOrder = () => {
        if (!deliveryAddress.trim() || !selectedPaymentMethod) {
            setError('Por favor, preencha o endereço de entrega e selecione um método de pagamento.');
            return;
        }

        setError(''); 
        
        scheduleOrderStatusNotification(total, deliveryAddress);

        Alert.alert(
            'Pedido Enviado!',
            `Seu pedido no valor de R$ ${total.toFixed(2).replace('.', ',')} foi enviado com sucesso para: ${deliveryAddress}.`,
            [
                { text: 'Cancelar', style: 'cancel' }, 
                { 
                    text: 'OK', 
                    onPress: () => {                         
                        navigation.navigate('Home'); 
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Finalizar Pedido (Checkout)</Text>

            <ScrollView style={styles.scrollContent}>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. Itens do Pedido</Text>
                    {cartItems.length === 0 && <Text style={styles.emptyCart}>Seu carrinho está vazio.</Text>}
                    {cartItems.map(item => (
                        <View key={item.id} style={styles.itemRow}>
                            <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</Text>
                        </View>
                    ))}

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Entrega</Text>
                        <Text style={styles.summaryValue}>R$ {deliveryFee.toFixed(2).replace('.', ',')}</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.summaryTotalLabel}>TOTAL</Text>
                        <Text style={styles.summaryTotalValue}>R$ {total.toFixed(2).replace('.', ',')}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. Endereço de Entrega *</Text>
                    <TextInput
                        style={styles.input}
                        value={deliveryAddress}
                        onChangeText={setDeliveryAddress}
                        placeholder="Digite seu endereço completo"
                        multiline
                    />
                    <TextInput
                        style={styles.input}
                        value={deliveryNotes}
                        onChangeText={setDeliveryNotes}
                        placeholder="Observações (ex: deixar na portaria)"
                        multiline
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. Método de Pagamento *</Text>
                    {MOCKED_PAYMENT.map(method => (
                        <TouchableOpacity 
                            key={method.value}
                            style={styles.paymentOption}
                            onPress={() => setSelectedPaymentMethod(method.value)}
                        >
                            <Text style={styles.paymentLabel}>{method.label}</Text>
                            <View style={[
                                styles.radio,
                                selectedPaymentMethod === method.value && styles.radioSelected
                            ]}>
                                {selectedPaymentMethod === method.value && <View style={styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

            </ScrollView>

            <TouchableOpacity 
                style={styles.placeOrderButton}
                onPress={handlePlaceOrder}
            >
                <Text style={styles.placeOrderButtonText}>Finalizar Pedido (R$ {total.toFixed(2).replace('.', ',')})</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 50, 
    },
    headerTitle: {
        fontSize: 24, 
        fontWeight: 'bold',
        color: '#003366',
        textAlign: 'center',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    scrollContent: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    section: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#EEE',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 18, 
        fontWeight: '700',
        color: '#003366',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingBottom: 5,
    },
    emptyCart: {
        textAlign: 'center',
        padding: 15,
        color: '#666',
        fontStyle: 'italic',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        alignItems: 'center',
    },
    itemQuantity: {
        fontSize: 14, 
        color: '#666',
        fontWeight: 'bold',
    },
    itemName: {
        flex: 1,
        fontSize: 15, 
        color: '#333',
        marginLeft: 10,
    },
    itemPrice: {
        fontSize: 15, 
        fontWeight: '600',
        color: '#333',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        paddingTop: 5,
    },
    summaryLabel: {
        fontSize: 15, 
        color: '#666',
    },
    summaryValue: {
        fontSize: 15, 
        fontWeight: '600',
        color: '#666',
    },
    totalRow: {
        borderTopWidth: 2,
        borderTopColor: '#003366',
        marginTop: 10,
        paddingTop: 10,
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
    
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#F9F9F9',
        fontSize: 15,
        minHeight: 40,
        textAlignVertical: 'top', 
    },
    paymentOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    paymentLabel: {
        fontSize: 16, 
        color: '#333',
    },
    radio: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        borderColor: '#003366',
    },
    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#003366',
    },
    errorText: {
        color: '#FF4136',
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '600',
    },
    
    placeOrderButton: {
        backgroundColor: '#28A745', 
        padding: 18,
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4, 
    },
    placeOrderButtonText: {
        color: '#FFFFFF',
        fontSize: 18, 
        fontWeight: 'bold',
    }
});
