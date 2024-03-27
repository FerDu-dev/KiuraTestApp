import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { fetchProductDetails } from '../core/api';

const ProductDetails = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      const product = await fetchProductDetails(productId);
      setProduct(product);
    };

    getProductDetails();
  }, [productId]);

  return (
    <View>
      <Text>Detalles del producto</Text>
      {product && (
        <>
          <Text>{product.name}</Text>
          <Text>{product.description}</Text>
        </>
      )}
    </View>
  );
};

export default ProductDetails;
