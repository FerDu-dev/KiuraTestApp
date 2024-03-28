import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetail';
import { Ionicons } from '@expo/vector-icons';
import useCartStore from '../core/store/cartStore';
import { View, Text, Image } from 'react-native';
import Cart from '../pages/Cart';
import { Alert } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const cartCount = useCartStore(state => state.cartCount);
  const [count, setCount] = useState(cartCount);

  useEffect(() => {
    setCount(cartCount);
  }, [cartCount]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Products">
        <Stack.Screen
          name="FurniPro App"
          component={Products}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Image
                source={require('../../assets/logoFurniPro.png')} 
                style={{ width: 50, height: 50, marginLeft: 10 }} 
              />
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <Ionicons
                  name="cart"
                  size={35}
                  onPress={() => {
                    if (count > 0) {
                      navigation.navigate('Carrito de compras');
                    } else {
                      Alert.alert('Aun no has agregado ningun producto al carrito');
                    }
                  }}
                />
                {count > 0 && (
                  <Text>{count}</Text>
                )}
              </View>
            ),
          })}
        />
        <Stack.Screen name="Detalles del producto" component={ProductDetails} />
        <Stack.Screen name="Carrito de compras" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
