import axios from 'axios';

// Se crea una instancia de axios con la URL base de la API
const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

// Función para obtener todos los productos
export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

// Función para obtener los detalles de un producto por su ID
export const fetchProductDetails = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Función para obtener todas las categorías de productos
export const fetchCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};

// Función para filtrar productos por categoría
export const fetchProductsByCategory = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};
