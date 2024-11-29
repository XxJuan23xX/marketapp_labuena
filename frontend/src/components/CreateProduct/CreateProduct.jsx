import React, { useState, useEffect, useContext } from 'react';
import './CreateProduct.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserProductsContext } from '../../context/UserProductsContext';
import api from '../../../api';

const BASE_URL = 'https://marketapp-backend.onrender.com';

const CreateProduct = () => {
  const { addProduct } = useContext(UserProductsContext); // Accede a la función addProduct del contexto
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    images: [],
    type: 'venta',  // Venta o Subasta
    price: '',
    stock: '', 
    startingPrice: '',
    auctionStartTime: '',
    auctionEndTime: '', // Se manejará automáticamente
    auctionType: 'normal', // Nuevo campo: normal o flash
    flashDuration: 60, // Duración por defecto en minutos (1 hora)
  });

  const [categories, setCategories] = useState([]); 
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const navigate = useNavigate();

  // Obtener categorías desde el backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(`${BASE_URL}/api/categories`); // usa `api` para la solicitud
        console.log("Categorías obtenidas:", response.data); // Verifica los datos obtenidos
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + product.images.length > 5) {
      alert("Solo puedes subir un máximo de 5 imágenes.");
      return;
    }

    const updatedImages = [...product.images, ...files].slice(0, 5);
    setProduct({ ...product, images: updatedImages });

    const previews = updatedImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    if (!mainImage && previews.length > 0) {
      setMainImage(previews[0]);
    }
  };

  const handleThumbnailClick = (src) => {
    setMainImage(src);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Agregar todos los campos del producto al formData
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('type', product.type);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('startingPrice', product.startingPrice);
    formData.append('auctionStartTime', product.auctionStartTime);

    // Calcular y agregar la fecha de fin de la subasta (si es subasta flash)
    if (product.auctionType === 'flash') {
      const auctionEndTime = new Date(product.auctionStartTime);
      auctionEndTime.setMinutes(auctionEndTime.getMinutes() + parseInt(product.flashDuration));
      formData.append('auctionEndTime', auctionEndTime.toISOString());
    }

    formData.append('auctionType', product.auctionType); 
    formData.append('flashDuration', product.flashDuration);

    // Agregar las imágenes
    product.images.forEach((file) => formData.append('images', file));

    // Enviar la solicitud POST para crear el producto
    try {
      const response = await api.post(`${BASE_URL}/api/products/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Si necesitas agregar un token de autenticación, agrégalo aquí
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // O el método que uses para el token
        }
      });

      if (response.status === 201) {
        // Si la creación es exitosa, puedes agregar el producto al contexto o redirigir al usuario
        addProduct(response.data); // Si tienes una función para añadir el producto al contexto
        navigate('/'); // Redirigir a la página principal
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
      alert('Hubo un problema al crear el producto. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="create-product-container">
      <button className="back-button" onClick={() => navigate('/')} >
        <FaArrowLeft /> Regresar a la página principal
      </button>

      <div className="create-product-container">
        <div className="image-preview-container">
          {mainImage ? (
            <img src={mainImage} alt="Vista principal" className="image-preview" />
          ) : (
            <p className="placeholder-text">Selecciona imágenes para ver la vista previa</p>
          )}
          <div className="thumbnail-container">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index}`}
                className="thumbnail"
                onClick={() => handleThumbnailClick(src)}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="create-product-form">
          <h2 className="create-product-title">Crear Producto</h2>
          
          <label className="create-product-label">Nombre del Producto:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="create-product-input"
          />

          <label className="create-product-label">Descripción:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="create-product-textarea"
          />

          <label className="create-product-label">Categoría:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="create-product-select"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <label className="create-product-label">Tipo de Producto:</label>
          <select 
            name="type" 
            value={product.type} 
            onChange={handleChange} 
            required 
            className="create-product-select"
          >
            <option value="venta">Venta</option>
            <option value="subasta">Subasta</option>
          </select>

          {/* Si es subasta, agregar el tipo de subasta (normal o flash) */}
          {product.type === 'subasta' && (
            <>
              <label className="create-product-label">Tipo de Subasta:</label>
              <select 
                name="auctionType" 
                value={product.auctionType} 
                onChange={handleChange} 
                required
                className="create-product-select"
              >
                <option value="normal">Normal</option>
                <option value="flash">Flash</option>
              </select>

              {/* Si es subasta flash, mostrar la duración */}
              {product.auctionType === 'flash' && (
                <>
                  <label className="create-product-label">Duración de Subasta Flash:</label>
                  <select 
                    name="flashDuration" 
                    value={product.flashDuration} 
                    onChange={handleChange} 
                    required
                    className="create-product-select"
                  >
                    <option value={30}>30 minutos</option>
                    <option value={60}>1 hora</option>
                    <option value={120}>2 horas</option>
                  </select>
                </>
              )}

              <label className="create-product-label">Precio Inicial:</label>
              <input
                type="number"
                name="startingPrice"
                value={product.startingPrice}
                onChange={handleChange}
                required
                className="create-product-input"
              />

              <label className="create-product-label">Fecha de Inicio de Subasta:</label>
              <input
                type="datetime-local"
                name="auctionStartTime"
                value={product.auctionStartTime}
                onChange={handleChange}
                required
                className="create-product-input"
              />
            </>
          )}

          {/* Resto de los campos de producto como precio y stock si es venta */}
          {product.type === 'venta' && (
            <>
              <label className="create-product-label">Precio:</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                className="create-product-input"
              />

              <label className="create-product-label">Stock:</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
                className="create-product-input"
              />
            </>
          )}

          {/* Campo para seleccionar imágenes */}
          <label className="create-product-label">Imágenes del Producto:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="create-product-file-input"
          />

          <button type="submit" className="create-product-submit">Crear Producto</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
