import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MOCKED_ORDERS = [
    { 
        id: 'o1', 
        date: '28/09/2025', 
        status: 'Concluído', 
        total: 55.00, 
        items: ['X-Tudo Mega', 'Coca-Cola (Lata)'] 
    },
    { 
        id: 'o2', 
        date: '25/09/2025', 
        status: 'Em Preparação', 
        total: 100.00, 
        items: ['Spaghetti à Carbonara', 'Torta de Limão', 'Suco de Laranja Natural'] 
    },
    { 
        id: 'o3', 
        date: '20/09/2025', 
        status: 'Concluído', 
        total: 12.50, 
        items: ['Hot Dog Simples'] 
    },
    { 
        id: 'o4', 
        date: '15/09/2025', 
        status: 'Entregue', 
        total: 75.50, 
        items: ['Lasanha Bolonhesa', 'Açaí com Granola'] 
    },
];


const OrderItem = ({ order }) => {
    // Define a cor de acordo com o status do pedido
    const getStatusColor = (status) => {
        switch (status) {
            case 'Concluído':
            case 'Entregue':
                return '#28A745'; // Verde
            case 'Em Preparação':
                return '#FFC107'; // Amarelo
            default:
                return '#6C757D'; // Cinza
        }
    };

    return (
        <View style={styles.orderContainer}>
            <View style={styles.headerRow}>
                <Text style={styles.orderId}>Pedido #{order.id.replace('o', '')}</Text>
                <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                    {order.status.toUpperCase()}
                </Text>
            </View>
            
            <Text style={styles.dateText}>Data: {order.date}</Text>
            
            <View style={styles.itemsBlock}>
                <Text style={styles.itemsLabel}>Itens:</Text>
                <Text style={styles.itemsList}>{order.items.join(', ')}</Text>
            </View>

            <View style={styles.footerRow}>
                <Text style={styles.totalLabel}>Total Pago:</Text>
                <Text style={styles.totalValue}>R$ {order.total.toFixed(2).replace('.', ',')}</Text>
            </View>
        </View>
    );
};

export default function OrdersScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Meus Pedidos Atuais</Text>
            
            {/* Uso da FlatList para listar os pedidos mockados */}
            <FlatList
                data={MOCKED_ORDERS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <OrderItem order={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 20,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    orderContainer: {
        backgroundColor: '#FFFFFF',
        padding: 18,
        borderRadius: 10,
        marginBottom: 15,
        borderLeftWidth: 6,
        borderLeftColor: '#007BFF',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    orderId: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    statusText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingBottom: 5,
    },
    itemsBlock: {
        marginBottom: 10,
    },
    itemsLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#003366',
    },
    itemsList: {
        fontSize: 14,
        color: '#333',
        marginTop: 3,
        fontStyle: 'italic',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#CCC',
        marginTop: 5,
    },
    totalLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28A745', // Verde forte para o valor
    }
});
