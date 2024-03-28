import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal } from 'react-native';
import useCartStore from '../../core/store/cartStore';
import ProductCartCard from '../../components/ProductCartCard';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const { cartItems, getTotal, clearCart } = useCartStore();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handlePurchase = () => {
    setModalVisible(true);
  };

  const handleOnBuy = () => {
    clearCart();
    navigation.navigate('FurniPro App');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCartCard product={item} />
        )}
      />
      <View style={styles.totalContainer}>
        <Button color={'#4CC671'} title={`Realizar compra $${getTotal()}`} onPress={handlePurchase} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Factura</Text>
            {cartItems.map((item, index) => (
              <Text key={index}>{item.title}: {item.quantity} x ${item.price} = ${item.quantity * item.price}</Text>
            ))}
            <Text>Total: ${getTotal()}</Text>
            <View style={styles.modalButtons} >
                 <Button
                color={'#0594A4'}
                title="Atras"
                onPress={() => setModalVisible(!modalVisible)}
                />
                <Button
                color={'#4CC671'}
                title="Comprar"
                onPress={() => {
                    // Handle the purchase here
                    setModalVisible(!modalVisible);
                    handleOnBuy();
                }}
                />
               

            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalButtons: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
});

export default Cart;
