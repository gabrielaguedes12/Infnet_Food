import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RestaurantDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { restaurant } = route.params;

    const MOCKED_MENU = [
        { id: 'm1', name: 'Prato Executivo do Dia', price: 35.90, description: 'Opção completa com proteína, arroz, feijão e salada.' },
        { id: 'm2', name: 'Salada Gourmet (Opção Vegana)', price: 28.50, description: 'Mix de folhas, grãos, castanhas e molho de mostarda e mel.' },
        { id: 'm3', name: 'Sobremesa da Casa', price: 15.00, description: 'Mousse de chocolate com raspas de laranja.' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.imageText}>[Imagem do Restaurante]</Text>
                </View>

                <View style={styles.detailsBlock}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>Avaliação: ⭐ {restaurant.rating}</Text>
                        <Text style={styles.cuisineText}>{restaurant.cuisine}</Text>
                    </View>
                    
                    <Text style={styles.sectionTitle}>Localização</Text>
                    <Text style={styles.addressText}>
                        Centro do Rio de Janeiro. Próximo à estação de metrô.
                    </Text>
                    <Text style={styles.addressText}>
                        Endereço Simulado: Rua da Harmonia, 50
                    </Text>

                    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Exemplo de Cardápio</Text>
                    
                    {MOCKED_MENU.map(item => (
                        <View key={item.id} style={styles.menuItem}>
                            <Text style={styles.menuItemName}>{item.name}</Text>
                            <Text style={styles.menuItemDescription}>{item.description}</Text>
                            <Text style={styles.menuItemPrice}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
                        </View>
                    ))}

                    <TouchableOpacity 
                        style={styles.fullMenuButton}
                        onPress={() => navigation.navigate('Home')} 
                    >
                        <Text style={styles.fullMenuButtonText}>Ver Cardápio Completo e Fazer Pedido</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollContent: {
        paddingBottom: 30,
    },
    imagePlaceholder: {
        height: 200,
        backgroundColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    imageText: {
        fontSize: 18,
        color: '#666',
        fontWeight: 'bold',
    },
    detailsBlock: {
        paddingHorizontal: 20,
    },
    restaurantName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingBottom: 10,
    },
    ratingText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFD700',
    },
    cuisineText: {
        fontSize: 16,
        fontWeight: '600',
        backgroundColor: '#E0F7FA',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        color: '#007BFF',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 15,
        marginBottom: 10,
    },
    addressText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    menuItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#28A745',
        elevation: 1,
    },
    menuItemName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#333',
        marginBottom: 3,
    },
    menuItemDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    menuItemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
        textAlign: 'right',
    },
    fullMenuButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    fullMenuButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
