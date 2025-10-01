import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MOCKED_USER = {
    name: 'Gabriela Guedes',
    email: 'gabriela.guedes@infnet.edu.br',
    phone: '(21) 98765-4321',
    address: 'Rua Batata quente 345',
};

 export default function ProfileScreen() {
    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.navigate('Login');
    };
    
    const handleNavigateToOrders = () => {
        navigation.navigate('Pedidos');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Meu Perfil</Text>
            <View style={styles.card}>
                <Text style={styles.avatar}>GG</Text>
                
                <Text style={styles.name}>{MOCKED_USER.name}</Text>
                <Text style={styles.email}>{MOCKED_USER.email}</Text>
            </View>

            <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Telefone</Text>
                <Text style={styles.infoValue}>{MOCKED_USER.phone}</Text>
            </View>
            <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Endereço Principal</Text>
                <Text style={styles.infoValue}>{MOCKED_USER.address}</Text>
            </View>

            <TouchableOpacity 
                style={[styles.actionButton, {backgroundColor: '#007BFF'}]}
                onPress={handleNavigateToOrders}
            >
                <Text style={styles.actionButtonText}>Histórico de Pedidos</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.actionButton, styles.logoutButton]}
                onPress={handleLogout}
            >
                <Text style={styles.actionButtonText}>Sair / Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 50,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 30,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 25,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#007BFF',
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 80,
        marginBottom: 15,
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    infoBlock: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#003366',
        elevation: 1,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#999',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 2,
    },
    actionButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#FF4136', 
    },
});
