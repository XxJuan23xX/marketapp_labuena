import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const UserProductsContext = createContext();

export const UserProductsProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [userProducts, setUserProducts] = useState([]);
  const [globalProducts, setGlobalProducts] = useState([]);

  const loadGlobalProducts = async () => {
    const response = await fetch('http://localhost:5000/api/products');
    const products = await response.json();
    setGlobalProducts(products);
  };

  const loadUserProducts = async () => {
    const response = await fetch('http://localhost:5000/api/user-products', {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Aquí debe ir el token
        'Content-Type': 'application/json'

       },
    });
    const products = await response.json();
    setUserProducts(products);
  };

  useEffect(() => {
    loadGlobalProducts();
    loadUserProducts();
  }, [token]);



  const addProduct = async (productData) => {
    try {
      const response = await fetch('http://localhost:5000/api/products/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Añade el token
        },
        body: productData, // Aquí se usa FormData en lugar de JSON.stringify()
      });
      if (response.ok) {
        const newProduct = await response.json();
        setUserProducts((prevProducts) => [...prevProducts, newProduct]);
      } else {
        console.error('Error al crear el producto');
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
