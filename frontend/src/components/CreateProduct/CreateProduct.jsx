import React, { useState } from 'react';
import './CreateProduct.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    images: [],
    type: 'venta',
    price: '',
    discount: '',
    startingPrice: '',
    auctionStartTime: '',
    auctionEndTime: '',
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Limitar a 5 imágenes
    if (files.length + product.images.length > 5) {
      alert("Solo puedes subir un máximo de 5 imágenes.");
      return;
    }

    // Actualizar el estado con las nuevas imágenes
    const updatedImages = [...product.images, ...files].slice(0, 5); // Limita a 5 imágenes
    setProduct({ ...product, images: updatedImages });

    // Generar vistas previas y actualizar mainImage si no está configurado
    const previews = updatedImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    if (!mainImage && previews.length > 0) {
      setMainImage(previews[0]); // Establece la primera imagen como principal
    }
  };

  const handleThumbnailClick = (src) => {
    setMainImage(src);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === 'images') {
        product.images.forEach((file) => formData.append('images', file));
      } else {
        formData.append(key, product[key]);
      }
    });

    try {
      const response = await fetch('http://localhost:5000/api/product', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Producto creado:', data);
    } catch (error) {
      console.error('Error creando el producto:', error);
    }
  };

  return (

    <div className="create-product-container">
      {/* Botón para regresar a la página de productos */}
      <button className="back-button" onClick={() => navigate('/productos')}>
        <FaArrowLeft /> Regresar a Productos
      </button>

    <div className="create-product-container">
      {/* Contenedor para la vista previa de imágenes */}
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

      {/* Formulario */}
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
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="create-product-input"
        />

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

            <label className="create-product-label">Descuento:</label>
            <input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              className="create-product-input"
            />
          </>
        )}

        {product.type === 'subasta' && (
          <>
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

            <label className="create-product-label">Fecha de Fin de Subasta:</label>
            <input
              type="datetime-local"
              name="auctionEndTime"
              value={product.auctionEndTime}
              onChange={handleChange}
              required
              className="create-product-input"
            />
          </>
        )}

        <label className="create-product-label">Imágenes:</label>
        <input
          type="file"
          name="images"
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="create-product-file-input"
        />

        <button type="submit" className="createbotonazo">Crear Producto</button>
      </form>
    </div>
    </div>
  );
};

export default CreateProduct;
