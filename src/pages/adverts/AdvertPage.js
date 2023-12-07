import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdvert, deleteAdvert } from './service'; 

// Componente de confirmación (puede ser más complejo, como un modal)
const ConfirmDialog = ({ onConfirm, onCancel }) => (
  <div>
    <p>¿Estás seguro de que quieres borrar este anuncio?</p>
    <button onClick={onConfirm}>Confirmar Borrado</button>
    <button onClick={onCancel}>Cancelar</button>
  </div>
);

const AdvertPage = () => {
  const [advert, setAdvert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadAdvert = async () => {
      try {
        const result = await getAdvert(id);
        setAdvert(result.data);
      } catch (error) {
        setError(error);
        if (error.response && error.response.status === 404) {
          navigate('/not-found');
        }
      } finally {
        setLoading(false);
      }
    };

    loadAdvert();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await deleteAdvert(id); // Llama función de servicio y borra anuncio
      console.log('Advert deleted');
      navigate('/adverts'); 
    } catch (error) {
      console.error('Failed to delete the advert', error);
      // Aquí debes manejar los errores, por ejemplo mostrando un mensaje al usuario
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar el anuncio: {error.toString()}</div>;
  if (!advert) return null; // o <Redirect to="/not-found" /> si estás usando react-router v5

  const placeholderImage = '/path-to-your-placeholder.png'; // Asegúrate de tener una imagen de placeholder

  return (
    <div>
      <h1>{advert.name}</h1>
      <img src={advert.photo || placeholderImage} alt={advert.name} />
      <p>Precio: {advert.price}</p>
      <p>Tipo: {advert.sale ? 'Venta' : 'Compra'}</p>
      <p>Tags: {advert.tags.join(', ')}</p>
      <button onClick={() => setConfirmDelete(true)}>Borrar Anuncio</button>
      {confirmDelete && (
        <ConfirmDialog
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
};

export default AdvertPage;

