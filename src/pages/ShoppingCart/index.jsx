import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useCart } from '../core/cart';

const Cart = () => {
  const { cart } = useCart();

  return (
    <View>
      <Text>Carrito de compras</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
};

export default Cart;
