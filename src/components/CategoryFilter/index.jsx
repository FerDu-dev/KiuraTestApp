// CategoryFilter.js
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import useStore from '../../core/store/store';

const CategoryFilter = () => {
  const { categories, loadProductsByCategory, loadProducts } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const handleValueChange = (itemValue) => {
    setSelectedCategory(itemValue);
    if (itemValue === 'Todos') {
      loadProducts();
    } else {
      loadProductsByCategory(itemValue);
    }
  };

  return (
    <Picker
      selectedValue={selectedCategory}
      onValueChange={handleValueChange}
    >
      <Picker.Item label="Todos" value="Todos" />
      {categories && categories.map((category, index) => (
        <Picker.Item key={index} label={category} value={category} />
      ))}
    </Picker>
  );
};

export default CategoryFilter;
