import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; // Asegúrate de instalar esta librería

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {

  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

return (

  <TouchableOpacity onPress={() => onViewDetails(product)}>
    <View style={styles.card}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.discountLabel}>
        <Text style={styles.discountText}>-{product.discountPercentage}% </Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{product.title}</Text>
        <Text >{product.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.originalPrice}>${originalPrice} </Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <FontAwesome name="cart-plus" size={28} color="#4CC671" onPress={(event) => {
          event.stopPropagation();
          onAddToCart(product);
        }} />
       
      </View>
    </View>
  </TouchableOpacity>
);
}


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    height: '100%',
    width: 100,
    marginRight: 10,
    position: 'relative',
  },
  discountLabel: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'red',
    padding: 2,
    
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 0.8,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    color:'#0594A4'
  },
  cardActions: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    marginLeft: 5,
    fontSize: 12,
  },
});

export default ProductCard;
