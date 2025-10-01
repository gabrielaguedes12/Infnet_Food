import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Dados de Produtos Mockados (Em um app real, estes viriam de uma API)
const PRODUCTS = [
    { id: 'p1', categoryId: 'c1', name: 'X-Tudo Mega', description: 'Hambúrguer completo com tudo que tem direito!', price: 35.00 },
    { id: 'p2', categoryId: 'c1', name: 'Hot Dog Simples', description: 'Salsicha, pão e mostarda.', price: 12.50 },
    { id: 'p3', categoryId: 'c2', name: 'Coca-Cola (Lata)', description: 'Refrigerante clássico.', price: 6.00 },
    { id: 'p4', categoryId: 'c2', name: 'Suco de Laranja Natural', description: 'Espremido na hora.', price: 15.00 },
    { id: 'p5', categoryId: 'c3', name: 'Açaí com Granola', description: 'Energético e refrescante.', price: 22.00 },
    { id: 'p6', categoryId: 'c3', name: 'Torta de Limão', description: 'Fatia de torta gelada.', price: 18.00 },
    { id: 'p7', categoryId: 'c4', name: 'Spaghetti à Carbonara', description: 'Ovos, queijo e bacon.', price: 45.00 },
    { id: 'p8', categoryId: 'c4', name: 'Lasanha Bolonhesa', description: 'Prato gratinado com carne.', price: 50.00 },
];

const ProductItem = ({ product, onAddToCart }) => {
    return (
        <View style={styles.productContainer}>
            <View style={styles.details}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <Text style={styles.productPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
            </View>
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => onAddToCart(product)} // Adiciona o produto inteiro ao carrinho
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default function ProductScreen() {
    const route = useRoute();
    // Pega o categoryId e a função addToCart que vieram da HomeScreen
    const { categoryId, addToCart } = route.params;

    // Filtra os produtos com base no categoryId recebido
    const filteredProducts = PRODUCTS.filter(product => product.categoryId === categoryId);

    // Identifica o nome da categoria (simplesmente pegando o ID, pode ser melhorado)
    const categoryName = `Produtos da Categoria ${categoryId.toUpperCase()}`;

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>{categoryName}</Text>

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductItem 
                        product={item} 
                        onAddToCart={addToCart} // Passa a função de adicionar ao carrinho
                    />
                )}
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
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#003366',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginVertical: 6,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#007BFF',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    details: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#003366',
        marginTop: 8,
    },
    addButton: {
        backgroundColor: '#007BFF',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 24,
        lineHeight: 28, // Ajuste para centralizar o '+'
        fontWeight: 'bold',
    },
});
