import React, { useState, useEffect, useContext } from 'react';
import './CreateProduct.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserProductsContext } from '../../context/UserProductsContext';
import api from '../../../api'; // Cambiamos a `api`

const CreateProduct = () => {
  const { addProduct } = useContext(UserProductsContext); // Accede a la función addProduct del contexto
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

  const [categories, setCategories] = useState([]); 
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const navigate = useNavigate();

  // Obtener categorías desde el backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories'); // usa `api` para la solicitud
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
    
    // Convierte los datos del producto a FormData para manejar archivos
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === 'images') {
        product.images.forEach((file) => formData.append('images', file));
      } else {
        formData.append(key, product[key]);
      }
    });

    await addProduct(formData); // Usa addProduct del contexto para enviar el producto

    setProduct({
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
    setImagePreviews([]);
    setMainImage(null);
  };

  return (
    <div className="create-product-container">
      <button className="back-button" onClick={() => navigate('/')}>
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
          <div className="file-input-container">
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="create-product-file-input"
              id="file"
            />
            <label htmlFor="file" className="file-input-label">
              Elegir archivos
            </label>
            <span className="file-selected">
              {product.images.length > 0
                ? `${product.images.length} archivo(s) seleccionado(s)`
                : "Ningún archivo seleccionado"}
            </span>
          </div>

          <button type="submit" className="createbotonazo">Crear Producto</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
