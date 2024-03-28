import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de instalar esta librería
import useCartStore from '../../core/store/cartStore';

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  const { addItemToCart } = useCartStore();

  const handleAddItemToCart = (product) => { 
    addItemToCart(product);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.thumbnail }} style={styles.image} />
          <View style={styles.discountLabel}>
            <Text style={styles.discountText}>-{product.discountPercentage}% </Text>
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.imageRow}>
          {product.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.smallImage} />
          ))}
        </ScrollView>
        <View style={styles.card} >
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.details}><Ionicons name="star" size={16} color="#FFD700" /> Rating: {product.rating}</Text>
          <Text style={styles.details}><Ionicons name="layers" size={16} color="#FF6347" /> Stock: {product.stock}</Text>
          <Text style={styles.details}><Ionicons name="pricetag" size={16} color="#000000" /> Marca: {product.brand}</Text>
          <Text style={styles.details}><Ionicons name="list-outline" size={16} color="#000000" /> Categoria: {product.category}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button color={'#4CC671'} title="+ Agregar al carrito" onPress={() => handleAddItemToCart(product)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
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
  imageRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  smallImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  card: {
    display: 'flex',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    height: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
  },
  price: {
    fontSize: 20,
    color: '#173B48',
  },
  details: {
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default ProductDetails;
