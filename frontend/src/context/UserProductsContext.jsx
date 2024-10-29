import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const UserProductsContext = createContext();

export const UserProductsProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Aseguramos que el contexto tenga el estado de autenticación
  const [userProducts, setUserProducts] = useState([]);
  const [globalProducts, setGlobalProducts] = useState([]);

  const loadGlobalProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error("Error al cargar productos globales");
      }
      const products = await response.json();
      setGlobalProducts(products);
      console.log("Productos globales cargados:", products);
    } catch (error) {
      console.error("Error al cargar productos globales:", error);
    }
  };

  const loadUserProducts = async () => {
    const token = localStorage.getItem('token');
    console.log("Token para cargar productos del usuario:", token);

    try {
      if (!token) {
        throw new Error("Token no encontrado");
      }
      const response = await fetch('http://localhost:5000/api/user-products', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error("Error al cargar productos del usuario");
      }
      const products = await response.json();
      setUserProducts(products);
      console.log("Productos del usuario cargados:", products);
    } catch (error) {
      console.error("Error al cargar productos del usuario:", error);
    }
  };

  useEffect(() => {
    console.log("Efecto ejecutado - isAuthenticated:", isAuthenticated);
    if (isAuthenticated) { // Solo cargar si el usuario está autenticado
      loadGlobalProducts();
      loadUserProducts();
    }
  }, [isAuthenticated]);

  const addProduct = async (productData) => {
    const token = localStorage.getItem('token');
    console.log("Token para añadir producto:", token);

    try {
      if (!token) {
        throw new Error("Token no encontrado al intentar añadir producto");
      }
      const response = await fetch('http://localhost:5000/api/products/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: productData, // Aquí se usa FormData en lugar de JSON.stringify()
      });
      if (response.ok) {
        const newProduct = await response.json();
        setUserProducts((prevProducts) => [...prevProducts, newProduct]);
        console.log("Producto añadido:", newProduct);
      } else {
        console.error('Error al crear el producto. Código de respuesta:', response.status);
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };

  return (
    <UserProductsContext.Provider value={{ userProducts, globalProducts, addProduct }}>
      {children}
    </UserProductsContext.Provider>
  );
};
