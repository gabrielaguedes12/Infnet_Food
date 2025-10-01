import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


const RESTAURANTS = [
    { id: 'r1', name: 'Confeitaria Colombo', cuisine: 'Clássica', rating: 4.8, top: '10%', left: '30%' },
    { id: 'r2', name: 'Carioca da Gema', cuisine: 'Brasileira', rating: 4.5, top: '25%', left: '15%' },
    { id: 'r3', name: 'Bar do Omar', cuisine: 'Boteco', rating: 4.2, top: '40%', left: '60%' },
    { id: 'r4', name: 'Rio Scenarium', cuisine: 'Gastropub', rating: 4.6, top: '55%', left: '25%' },
    { id: 'r5', name: 'Sushi Leblon Centro', cuisine: 'Japonesa', rating: 4.9, top: '70%', left: '45%' },
    { id: 'r6', name: 'Churrascaria Palace', cuisine: 'Churrasco', rating: 4.7, top: '5%', left: '75%' },
    { id: 'r7', name: 'Casa do Alemão', cuisine: 'Alemã', rating: 4.0, top: '20%', left: '85%' },
    { id: 'r8', name: 'Lamen Hood', cuisine: 'Asiática', rating: 4.4, top: '65%', left: '10%' },
    { id: 'r9', name: 'Restaurante Cais do Oriente', cuisine: 'Contemporânea', rating: 4.5, top: '35%', left: '40%' },
    { id: 'r10', name: 'Osteria Del Corso', cuisine: 'Italiana', rating: 4.3, top: '80%', left: '30%' },
];


const MapMarker = ({ restaurant, onPress }) => (
    <TouchableOpacity
        style={[styles.marker, { top: restaurant.top, left: restaurant.left }]}
        onPress={() => onPress(restaurant)}
    >
        <View style={styles.markerPin}>
            <Text style={styles.markerText}>📍</Text>
        </View>
    </TouchableOpacity>
);

export default function MapScreen() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const handleMarkerPress = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Restaurantes no Centro do Rio</Text>

          
            <View style={styles.mapArea}>
                <Text style={styles.mapTitle}>
                   
                    [Imagem Simulação de Mapa - Centro RJ]
                </Text>
                
                {RESTAURANTS.map(r => (
                    <MapMarker key={r.id} restaurant={r} onPress={handleMarkerPress} />
                ))}
            </View>

           
            {selectedRestaurant ? (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsName}>{selectedRestaurant.name}</Text>
                    <Text style={styles.detailsCuisine}>Cozinha: {selectedRestaurant.cuisine}</Text>
                    <Text style={styles.detailsRating}>Avaliação: ⭐ {selectedRestaurant.rating}</Text>
                    <TouchableOpacity style={styles.viewMenuButton}>
                        <Text style={styles.viewMenuButtonText}>Ver Menu e Pedir</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsPlaceholder}>Clique em um marcador (📍) para ver os detalhes.</Text>
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
        fontSize: 26,
        fontWeight: 'bold',
        color: '#003366',
        paddingHorizontal: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    mapArea: {
        flex: 1,
        backgroundColor: '#C8E6C9', 
        marginHorizontal: 15,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#AAA',
        position: 'relative',
        minHeight: 300,
    },
    mapTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        padding: 20,
        opacity: 0.5,
    },
    marker: {
        position: 'absolute',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    markerPin: {
        backgroundColor: 'rgba(255, 65, 54, 0.8)', 
        borderRadius: 15,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    markerText: {
        fontSize: 18,
        lineHeight: 20,
    },
    
    detailsContainer: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#DDD',
        minHeight: 120, 
    },
    detailsName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 5,
    },
    detailsCuisine: {
        fontSize: 16,
        color: '#666',
    },
    detailsRating: {
        fontSize: 16,
        color: '#FFD700', 
        fontWeight: 'bold',
        marginVertical: 5,
    },
    detailsPlaceholder: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        paddingVertical: 20,
    },
    viewMenuButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10,
    },
    viewMenuButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
