import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchProducts } from '../core/api';
import { useStore } from '../core/store';

const Products = () => {
  const products = useStore((state) => state.products);
  const setProducts = useStore((state) => state.setProducts);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    getProducts();
  }, []);

  return (
    <View>
      <Text>Productos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
};

export default Products;
