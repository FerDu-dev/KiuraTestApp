import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import useCartStore from '../../core/store/cartStore';
import { fetchProductDetails } from '../../core/api/api';
import { useNavigation } from '@react-navigation/native';

const ProductCartCard = ({ product }) => {
  const { increaseQuantity, decreaseQuantity, removeItemFromCart } = useCartStore();
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);

  const handleRemoveFromCart = () => {
    Alert.alert(
      "Eliminar producto",
      "¿Estás seguro de que quieres eliminar este producto del carrito?",
      [
        {
          text: "No",
          style: "cancel"
        },
        { text: "Sí", onPress: () => removeItemFromCart(product.id) }
      ]
    );
  };

  const onViewDetails = async (product) => {
    const productDetails = await fetchProductDetails(product.id);
    navigation.navigate('Detalles del producto', { product: productDetails });
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text>Stock: {product.stock}</Text>
        <View style={styles.quantityContainer}>
          <Button 
            title="-" 
            color={'#4CC671 '}
            onPress={() => {
            if (quantity > 1) {
              decreaseQuantity(product.id);
              setQuantity(quantity - 1);
            }
          }} />
          <Text>{quantity}</Text>
          <Button 
            title="+"
            color={'#4CC671'} 
            onPress={() => {
            if (quantity < product.stock) {
              increaseQuantity(product.id);
              setQuantity(quantity + 1);
            }
          }} />
        </View>
      </View>
      <View style={styles.cardActions}>
        <FontAwesome 
            name="eye" 
            size={28} 
            color="#0594A4"
            onPress={() => {
              onViewDetails(product);
            }}
            />
        <FontAwesome name="trash" size={28} color="#FA8072" onPress={handleRemoveFromCart} />
      </View>
    </View>
  );
};

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
  cardContent: {
    flex: 0.8,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
    price: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#0594A4',
    },
  quantityContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  cardActions: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default ProductCartCard;
