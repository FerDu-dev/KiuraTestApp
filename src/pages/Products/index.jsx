import React, { useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { useStore } from '../../core/store/store';
import { useNavigation } from '@react-navigation/native';
import { fetchProductDetails } from '../../core/api/api';
import useCartStore from '../../core/store/cartStore';
import CategoryFilter from '../../components/CategoryFilter';

const Products = () => {
  const { products, loadProducts, loadCategories } = useStore();
  const { addItemToCart } = useCartStore();
  const navigation = useNavigation();
  

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleAddToCart = (product) => {
    addItemToCart(product);
  };

  const handleViewDetails = async (product) => {
    const productDetails = await fetchProductDetails(product.id);
    navigation.navigate('Detalles del producto', { product: productDetails });
  };

  return (
    <View>
       <CategoryFilter />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
          />
        )}
      />
    </View>
  );
};

export default Products;
